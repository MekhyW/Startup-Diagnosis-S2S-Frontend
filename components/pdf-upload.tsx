'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

interface PdfUploadProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

export function PdfUpload({ onFileSelect, isLoading = false }: PdfUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        onFileSelect(file);
      } else {
        alert('Por favor, selecione apenas arquivos PDF.');
      }
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        onFileSelect(file);
      } else {
        alert('Por favor, selecione apenas arquivos PDF.');
        e.target.value = '';
      }
    }
  }, [onFileSelect]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const resetFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isLoading}
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-fg0">
                Faça upload da transcrição da entrevista
              </h3>
              <p className="text-fg2 mt-2">
                Arraste e solte um arquivo PDF aqui, ou clique para selecionar
              </p>
            </div>
            
            <div className="text-sm text-fg2">
              <p>Apenas arquivos PDF são aceitos</p>
              <p>Tamanho máximo: 10MB</p>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="font-mono"
              disabled={isLoading}
            >
              {isLoading ? 'Processando...' : 'Selecionar Arquivo'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 text-green-600 dark:text-green-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200">
                  {selectedFile.name}
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            
            {!isLoading && (
              <Button
                onClick={resetFile}
                variant="outline"
                size="sm"
                className="font-mono"
              >
                Remover
              </Button>
            )}
          </div>
          
          {isLoading && (
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full"></div>
                <span className="text-sm text-green-700 dark:text-green-300">
                  Analisando transcrição com IA...
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}