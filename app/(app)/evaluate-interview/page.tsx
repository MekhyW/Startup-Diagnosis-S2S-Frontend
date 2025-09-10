'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AuthButton } from '@/components/auth/auth-button';

export default function EvaluateInterviewPage() {
  const router = useRouter();
  
  const handleGoBack = () => {
    router.push('/');
  };
  
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
      
      <div className="space-y-6 max-w-2xl px-6">
        <div className="space-y-4">
          <h1 className="text-fg0 text-3xl font-bold">
            Avaliar Entrevista Transcrita
          </h1>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <svg 
                className="w-6 h-6 text-yellow-600 dark:text-yellow-400" 
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
              <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                Trabalho em Progresso
              </h2>
            </div>
            
            <p className="mt-3 text-yellow-700 dark:text-yellow-300 leading-relaxed">
              Esta funcionalidade está sendo desenvolvida. Em breve você poderá:
            </p>
            
            <ul className="mt-4 space-y-2 text-yellow-700 dark:text-yellow-300">
              <li className="flex items-start space-x-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                <span>Fazer upload de transcrições de entrevistas</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                <span>Analisar automaticamente o conteúdo das entrevistas</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                <span>Receber feedback detalhado sobre o desempenho</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                <span>Visualizar métricas e pontuações da entrevista</span>
              </li>
            </ul>
          </div>
          
          <p className="text-fg2 text-sm">
            Enquanto isso, você pode usar a funcionalidade de chat com o agente entrevistador.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => router.push('/agent-chat')}
            className="font-mono"
          >
            Falar com agente entrevistador
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleGoBack}
            className="font-mono"
          >
            Voltar ao início
          </Button>
        </div>
      </div>
    </div>
  );
}