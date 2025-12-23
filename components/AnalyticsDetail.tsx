
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ShortLink } from '../types';
import { getLinkInsights } from '../services/geminiService';

interface Props {
  link: ShortLink;
  onBack: () => void;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export const AnalyticsDetail: React.FC<Props> = ({ link, onBack }) => {
  const [insights, setInsights] = useState<any[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(false);

  // Mock data for visualization
  const clickHistory = [
    { date: '2023-10-01', clicks: 45 },
    { date: '2023-10-02', clicks: 78 },
    { date: '2023-10-03', clicks: 120 },
    { date: '2023-10-04', clicks: 95 },
    { date: '2023-10-05', clicks: 150 },
    { date: '2023-10-06', clicks: 190 },
    { date: '2023-10-07', clicks: 210 },
  ];

  const deviceData = [
    { name: 'Mobile', value: 65 },
    { name: 'Desktop', value: 30 },
    { name: 'Tablet', value: 5 },
  ];

  useEffect(() => {
    async function loadInsights() {
      setLoadingInsights(true);
      const res = await getLinkInsights(link);
      setInsights(res.insights || []);
      setLoadingInsights(false);
    }
    loadInsights();
  }, [link]);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Voltar para Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{link.title}</h2>
                  <p className="text-gray-500 text-sm">{link.originalUrl}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-blue-600">{link.clicks}</span>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Cliques Totais</p>
                </div>
              </div>

              <div className="h-64 w-full">
                <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-widest">Atividade nos últimos 7 dias</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={clickHistory}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="clicks" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-widest text-center">Dispositivos</h3>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 text-xs font-medium text-gray-500">
                  {deviceData.map((d, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                      {d.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-widest">Referrers Populares</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Instagram', value: '42%' },
                    { name: 'Direct/Email', value: '30%' },
                    { name: 'WhatsApp', value: '18%' },
                    { name: 'Twitter (X)', value: '10%' }
                  ].map((ref, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 font-medium">{ref.name}</span>
                      <div className="flex-1 mx-4 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: ref.value }}></div>
                      </div>
                      <span className="text-xs text-gray-500 font-bold">{ref.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="font-bold text-lg">Insights de IA</h3>
              </div>
              
              {loadingInsights ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-white/20 rounded w-3/4"></div>
                  <div className="h-20 bg-white/10 rounded"></div>
                  <div className="h-20 bg-white/10 rounded"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {insights.length > 0 ? insights.map((insight, idx) => (
                    <div key={idx} className="bg-white/10 rounded-xl p-4 border border-white/10">
                      <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                      <p className="text-xs text-indigo-100 leading-relaxed">{insight.description}</p>
                    </div>
                  )) : (
                    <p className="text-sm text-indigo-100 italic">Analise mais dados para obter sugestões estratégicas.</p>
                  )}
                  
                  <button className="w-full mt-4 bg-white text-indigo-700 py-2 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors">
                    Gerar Novo Relatório
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors flex items-center justify-between">
                  <span>Exportar CSV</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 10l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </button>
                <button className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors flex items-center justify-between">
                  <span>Editar Link</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
                <button className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-red-50 text-red-600 border border-red-100 transition-colors flex items-center justify-between">
                  <span>Excluir Link</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
