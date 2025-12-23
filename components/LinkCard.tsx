
import React, { useState } from 'react';
import { ShortLink } from '../types';

interface Props {
  link: ShortLink;
  onSelect: (link: ShortLink) => void;
}

export const LinkCard: React.FC<Props> = ({ link, onSelect }) => {
  const [copied, setCopied] = useState(false);
  const shortUrl = `linkpro.co/${link.shortCode}`;

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={() => onSelect(link)}
      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate max-w-[200px] sm:max-w-md">
              {link.title}
            </h3>
            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase font-bold">
              {new Date(link.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-400 truncate max-w-[200px] sm:max-w-lg mb-1">{link.originalUrl}</p>
          <div className="flex items-center gap-2 text-blue-600 font-semibold">
            <span>{shortUrl}</span>
            <button 
                onClick={copyToClipboard}
                className={`p-1 rounded hover:bg-blue-50 transition-colors ${copied ? 'text-green-600' : 'text-blue-400'}`}
            >
              {copied ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
              )}
            </button>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            <span className="text-sm font-bold">{link.clicks}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
