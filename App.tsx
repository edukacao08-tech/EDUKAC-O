
import React, { useState, useEffect } from 'react';
import { ShortLink } from './types';
import { DashboardHeader } from './components/DashboardHeader';
import { LinkShortener } from './components/LinkShortener';
import { LinkCard } from './components/LinkCard';
import { AnalyticsDetail } from './components/AnalyticsDetail';

const MOCK_LINKS: ShortLink[] = [
  {
    id: '1',
    title: 'Campanha de Verão 2024',
    originalUrl: 'https://myshop.com/products/summer-collection-exclusive-offers?utm_source=ig',
    shortCode: 'verao24',
    createdAt: new Date().toISOString(),
    clicks: 1245,
    tags: ['Marketing', 'Ads']
  },
  {
    id: '2',
    title: 'Landing Page Bio Instagram',
    originalUrl: 'https://brand.com/links-hub?ref=bio',
    shortCode: 'links',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    clicks: 856,
    tags: ['Social']
  }
];

const App: React.FC = () => {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [selectedLink, setSelectedLink] = useState<ShortLink | null>(null);
  const [view, setView] = useState<'dashboard' | 'analytics'>('dashboard');

  useEffect(() => {
    // Persistent storage simulation
    const saved = localStorage.getItem('linkpro_links');
    if (saved) {
      setLinks(JSON.parse(saved));
    } else {
      setLinks(MOCK_LINKS);
    }
  }, []);

  useEffect(() => {
    if (links.length > 0) {
      localStorage.setItem('linkpro_links', JSON.stringify(links));
    }
  }, [links]);

  const handleNewLink = (link: ShortLink) => {
    setLinks([link, ...links]);
  };

  const handleSelectLink = (link: ShortLink) => {
    setSelectedLink(link);
    setView('analytics');
  };

  if (view === 'analytics' && selectedLink) {
    return (
      <AnalyticsDetail 
        link={selectedLink} 
        onBack={() => {
          setView('dashboard');
          setSelectedLink(null);
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Suas conexões mais curtas, <span className="text-blue-600">mais fortes.</span></h2>
          <p className="mt-2 text-lg text-gray-500">Crie links memoráveis e acompanhe cada clique com inteligência.</p>
        </div>

        <LinkShortener onShortened={handleNewLink} />

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Seus Links</h3>
            <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                    Filtrar
                </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {links.length > 0 ? (
              links.map((link) => (
                <LinkCard key={link.id} link={link} onSelect={handleSelectLink} />
              ))
            ) : (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Nenhum link ainda</h4>
                <p className="text-gray-500 mb-6">Cole uma URL longa acima para criar seu primeiro link profissional.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2024 LinkPro. Elevando a sua presença digital através de links inteligentes.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
