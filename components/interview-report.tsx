'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface InterviewReportData {
  metadata: {
    interview_id: string;
    date: string;
    interviewer?: string;
    confidence_overall?: number;
  };
  startup_info: {
    name: string;
    description?: string;
    revenue_last_12m: number;
    customers: number;
    time_operating_months: number;
    main_challenge?: string;
  };
  areas: Array<{
    area_name: string;
    score: number;
    faixa: number;
    confidence: number;
    evidences?: string[];
    gaps?: string[];
    strengths?: string[];
  }>;
  final_classification: {
    group: string;
    faixa: number;
    overall_score: number;
    momentum?: string;
  };
  insights?: {
    key_strengths?: string[];
    critical_gaps?: string[];
    next_steps?: string[];
  };
}

interface InterviewReportProps {
  data: InterviewReportData;
  onReset: () => void;
}

const getGroupColor = (group: string) => {
  switch (group) {
    case 'Diamante': return 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800';
    case 'Ouro': return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800';
    case 'Prata': return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800';
    case 'Bronze': return 'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-800';
    default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 8) return 'text-green-600 dark:text-green-400';
  if (score >= 6) return 'text-yellow-600 dark:text-yellow-400';
  if (score >= 4) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
};

export function InterviewReport({ data, onReset }: InterviewReportProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-fg0">Relatório de Avaliação</h1>
          <p className="text-fg2 mt-2">Análise completa da entrevista de diagnóstico</p>
        </div>
        <Button onClick={onReset} variant="outline" className="font-mono">
          Nova Análise
        </Button>
      </div>

      {/* Startup Info */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Informações da Startup</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-fg2">Nome</label>
            <p className="text-lg font-semibold">{data.startup_info.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-fg2">Receita (12 meses)</label>
            <p className="text-lg font-semibold">{formatCurrency(data.startup_info.revenue_last_12m)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-fg2">Clientes</label>
            <p className="text-lg font-semibold">{data.startup_info.customers.toLocaleString('pt-BR')}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-fg2">Tempo de Operação</label>
            <p className="text-lg font-semibold">{data.startup_info.time_operating_months} meses</p>
          </div>
          {data.startup_info.description && (
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-fg2">Descrição</label>
              <p className="text-sm">{data.startup_info.description}</p>
            </div>
          )}
          {data.startup_info.main_challenge && (
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-fg2">Principal Desafio</label>
              <p className="text-sm">{data.startup_info.main_challenge}</p>
            </div>
          )}
        </div>
      </div>

      {/* Classification */}
      <div className={`rounded-lg border p-6 ${getGroupColor(data.final_classification.group)}`}>
        <h2 className="text-xl font-semibold mb-4">Classificação Final</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium opacity-80">Grupo</label>
            <p className="text-2xl font-bold">{data.final_classification.group}</p>
          </div>
          <div>
            <label className="text-sm font-medium opacity-80">Faixa</label>
            <p className="text-2xl font-bold">{data.final_classification.faixa}</p>
          </div>
          <div>
            <label className="text-sm font-medium opacity-80">Score Geral</label>
            <p className="text-2xl font-bold">{data.final_classification.overall_score.toFixed(1)}</p>
          </div>
          {data.final_classification.momentum && (
            <div>
              <label className="text-sm font-medium opacity-80">Momentum</label>
              <p className="text-lg font-semibold">{data.final_classification.momentum}</p>
            </div>
          )}
        </div>
      </div>

      {/* Areas Analysis */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-6">Análise por Área</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.areas.map((area, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">{area.area_name}</h3>
                <div className="text-right">
                  <span className={`text-lg font-bold ${getScoreColor(area.score)}`}>
                    {area.score.toFixed(1)}
                  </span>
                  <span className="text-sm text-fg2 ml-2">Faixa {area.faixa}</span>
                </div>
              </div>
              
              <div className="mb-2">
                <span className="text-xs text-fg2">Confiança: </span>
                <span className="text-sm font-medium">{(area.confidence * 100).toFixed(0)}%</span>
              </div>

              {area.strengths && area.strengths.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Pontos Fortes</h4>
                  <ul className="text-xs space-y-1">
                    {area.strengths.map((strength, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-1">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {area.gaps && area.gaps.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Lacunas</h4>
                  <ul className="text-xs space-y-1">
                    {area.gaps.map((gap, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-red-500 mr-1">•</span>
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      {data.insights && (
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-6">Insights e Recomendações</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.insights.key_strengths && data.insights.key_strengths.length > 0 && (
              <div>
                <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">Principais Forças</h3>
                <ul className="space-y-2">
                  {data.insights.key_strengths.map((strength, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.insights.critical_gaps && data.insights.critical_gaps.length > 0 && (
              <div>
                <h3 className="font-semibold text-red-600 dark:text-red-400 mb-3">Lacunas Críticas</h3>
                <ul className="space-y-2">
                  {data.insights.critical_gaps.map((gap, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="text-red-500 mr-2 mt-1">⚠</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.insights.next_steps && data.insights.next_steps.length > 0 && (
              <div>
                <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">Próximos Passos</h3>
                <ul className="space-y-2">
                  {data.insights.next_steps.map((step, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="text-blue-500 mr-2 mt-1">→</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h3 className="font-medium mb-2">Metadados da Análise</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-fg2">
          <div>
            <span className="font-medium">ID da Entrevista:</span> {data.metadata.interview_id}
          </div>
          <div>
            <span className="font-medium">Data:</span> {formatDate(data.metadata.date)}
          </div>
          {data.metadata.confidence_overall && (
            <div>
              <span className="font-medium">Confiança Geral:</span> {(data.metadata.confidence_overall * 100).toFixed(0)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}