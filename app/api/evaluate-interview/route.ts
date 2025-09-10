import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { readFileSync } from 'fs';
import { join } from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo fornecido' },
        { status: 400 }
      );
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Apenas arquivos PDF são permitidos' },
        { status: 400 }
      );
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Tamanho máximo: 10MB' },
        { status: 400 }
      );
    }

    const promptPath = join(process.cwd(), 'app', '(app)', 'evaluate-interview', 'report-prompt.txt');
    const schemaPath = join(process.cwd(), 'app', '(app)', 'evaluate-interview', 'schema.json');
    const promptContent = readFileSync(promptPath, 'utf-8');
    const schemaContent = readFileSync(schemaPath, 'utf-8');
    const fileBuffer = await file.arrayBuffer();
    const fileBase64 = Buffer.from(fileBuffer).toString('base64');
    const fullPrompt = `${promptContent}\n\n${schemaContent}`;
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: fullPrompt
            },
            {
              type: 'file',
              file: {
                filename: file.name,
                file_data: `data:application/pdf;base64,${fileBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 4000,
      temperature: 0.1
    });

    const result = response.choices[0]?.message?.content;
    
    if (!result) {
      return NextResponse.json(
        { error: 'Nenhuma resposta da IA. Tente novamente.' },
        { status: 500 }
      );
    }

    try {
      let cleanedResult = result.trim();
      if (cleanedResult.startsWith('```json')) {
        cleanedResult = cleanedResult.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedResult.startsWith('```')) {
        cleanedResult = cleanedResult.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      cleanedResult = cleanedResult.trim();
      const jsonResult = JSON.parse(cleanedResult);
      return NextResponse.json({ success: true, data: jsonResult });
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Failed to parse:', result);
      return NextResponse.json(
        { error: 'Resposta inválida da IA. Tente novamente ou verifique o formato do arquivo.', rawResponse: result },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing interview:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}