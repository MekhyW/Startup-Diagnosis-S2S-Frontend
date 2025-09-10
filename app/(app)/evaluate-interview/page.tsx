'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AuthButton } from '@/components/auth/auth-button';
import { PdfUpload } from '@/components/pdf-upload';
import { InterviewReport } from '@/components/interview-report';
import { toast } from 'sonner';

type PageState = 'upload' | 'loading' | 'report' | 'error';

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  rawResponse?: string;
}

export default function EvaluateInterviewPage() {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>('upload');
  const [reportData, setReportData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const handleGoBack = () => {
    router.push('/');
  };

  const handleFileSelect = async (file: File) => {
    setPageState('loading');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/evaluate-interview', {
        method: 'POST',
        body: formData,
      });

      const result: ApiResponse = await response.json();

      if (result.success && result.data) {
        setReportData(result.data);
        setPageState('report');
        toast.success('Análise concluída com sucesso!');
      } else {
        setErrorMessage(result.error || 'Erro desconhecido ao processar o arquivo');
        setPageState('error');
        toast.error('Erro ao analisar o arquivo');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Erro de conexão. Tente novamente.');
      setPageState('error');
      toast.error('Erro de conexão');
    }
  };

  const handleReset = () => {
    setPageState('upload');
    setReportData(null);
    setErrorMessage('');
  };

  if (pageState === 'report' && reportData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={handleGoBack}
              className="font-mono"
            >
              ← Voltar ao início
            </Button>
            <AuthButton />
          </div>
        </div>
        
        {/* Report Content */}
        <div className="py-8">
          <InterviewReport data={reportData} onReset={handleReset} />
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 z-10 mx-auto flex h-svh flex-col items-center justify-center text-center">
      {/* Authentication section */}
      <div className="absolute top-6 right-6">
        <AuthButton />
      </div>
      
      {/* Back button */}
      <div className="absolute top-6 left-6">
        <Button 
          variant="outline" 
          onClick={handleGoBack}
          className="font-mono"
        >
          ← Voltar
        </Button>
      </div>
      
      <div className="space-y-8 max-w-4xl px-6 w-full">
        <div className="space-y-4">
          <h1 className="text-fg0 text-3xl font-bold">
            Avaliar Entrevista Transcrita
          </h1>
          
          <p className="text-fg2 text-lg">
            Faça upload de uma transcrição em PDF para receber uma análise detalhada
          </p>
        </div>
        
        {pageState === 'upload' && (
          <PdfUpload onFileSelect={handleFileSelect} />
        )}
        
        {pageState === 'loading' && (
          <div className="space-y-6">
            <PdfUpload onFileSelect={handleFileSelect} isLoading={true} />
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                  Analisando transcrição...
                </h3>
              </div>
              
              <p className="mt-3 text-blue-700 dark:text-blue-300 text-center">
                Nossa IA está processando o conteúdo da entrevista e gerando o relatório de diagnóstico.
                Isso pode levar alguns minutos.
              </p>
            </div>
          </div>
        )}
        
        {pageState === 'error' && (
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <svg 
                  className="w-6 h-6 text-red-600 dark:text-red-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                  Erro no Processamento
                </h3>
              </div>
              
              <p className="mt-3 text-red-700 dark:text-red-300">
                {errorMessage}
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleReset}
                variant="outline"
                className="font-mono"
              >
                Tentar Novamente
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => router.push('/agent-chat')}
            className="font-mono"
          >
            Falar com agente entrevistador
          </Button>
        </div>
      </div>
    </div>
  );
}