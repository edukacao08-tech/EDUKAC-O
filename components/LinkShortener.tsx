
import React, { useState } from 'react';
import { suggestCustomSlugs } from '../services/geminiService';

interface Props {
  onShortened: (link: any) => void;
}

export const LinkShortener: React.FC<Props> = ({ onShortened }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const newLink = {
        id: Math.random().toString(36).substr(2, 9),
        originalUrl: url,
        title: title || 'Untitled Link',
        shortCode: slug || Math.random().toString(36).substr(2, 6),
        createdAt: new Date().toISOString(),
        clicks: 0,
        tags: []
      };
      onShortened(newLink);
      setUrl('');
      setTitle('');
      setSlug('');
      setAiSuggestions([]);
      setLoading(false);
    }, 800);
  };

  const fetchAiSuggestions = async () => {
    if (!url) return;
    setLoading(true);
    const suggestions = await suggestCustomSlugs(url, title);
    setAiSuggestions(suggestions);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
      <form onSubmit={handleShorten} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destino do Link</label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://exemplo.com/página-muito-longa"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? 'Encurtando...' : 'Encurtar Agora'}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
            <button 
                type="button" 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
                {showAdvanced ? 'Recolher Opções' : 'Personalização Avançada'}
                <svg className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            
            {url && (
                <button 
                    type="button"
                    onClick={fetchAiSuggestions}
                    className="text-sm bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200 hover:bg-purple-100 flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 10-2 0h-1a1 1 0 102 0h1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 10-2 0H2a1 1 0 102 0h1zM8 16v-1a1 1 0 10-2 0v1a1 1 0 102 0zM13.536 14.95a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM14 9a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    Sugerir com IA
                </button>
            )}
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 animate-in fade-in slide-in-from-top-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título do Link (Opcional)</label>
              <input
                type="text"
                placeholder="Ex: Campanha Black Friday"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug Personalizado</label>
              <div className="flex items-center">
                <span className="bg-gray-100 border border-r-0 border-gray-300 px-3 py-2 rounded-l-lg text-gray-500 text-sm">linkpro.co/</span>
                <input
                  type="text"
                  placeholder="promocao-especial"
                  className="w-full px-4 py-2 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {aiSuggestions.length > 0 && (
          <div className="pt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sugestões de IA:</p>
            <div className="flex flex-wrap gap-2">
              {aiSuggestions.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSlug(s)}
                  className={`px-3 py-1 rounded-full text-sm border transition-all ${slug === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
