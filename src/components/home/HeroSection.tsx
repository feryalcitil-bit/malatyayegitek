'use client';

import React, { useState } from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import { Search, Sparkles, ArrowRight, Layers } from 'lucide-react';

export default function HeroSection({ onSearchSubmit }: { onSearchSubmit: (query: string) => void }) {
  const { filters, setFilters, setAiSearchOpen } = useEcosystem();
  const [localQuery, setLocalQuery] = useState('');

  const sampleSearches = [
    'Battalgazi liseler',
    'STEM',
    'GençTek',
    'eTwinning',
    'Yenilikçi Sınıf',
    'Yapay zekâ',
    'TEKNOFEST'
  ];

  const handleSearch = (q: string) => {
    setLocalQuery(q);
    setFilters(prev => ({ ...prev, searchQuery: q }));
    onSearchSubmit(q);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-24 px-4 sm:px-8">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-10 right-10 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
        {/* Top Official Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-blue-200 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <span className="font-semibold tracking-wide">
            Malatya İl Millî Eğitim Müdürlüğü • Yeğitek İnovasyon Ağı
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight sm:leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200">
          Malatya Eğitim Ekosistemi
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Malatya&apos;daki okulları, eğitim projelerini, yenilikçi uygulamaları ve teknoloji çalışmalarını keşfedin.
        </p>

        {/* Large Grand Search Input Bar */}
        <div className="max-w-2xl mx-auto pt-4">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSearch(localQuery);
            }}
            className="relative flex items-center shadow-2xl rounded-2xl group"
          >
            <input
              type="text"
              value={localQuery}
              onChange={e => setLocalQuery(e.target.value)}
              placeholder="Okul, proje, ilçe veya eğitim çalışması ara…"
              className="w-full pl-12 pr-32 py-4 bg-white text-slate-800 placeholder-slate-400 rounded-2xl text-sm sm:text-base font-medium shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-400/40 transition"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none group-focus-within:text-blue-600 transition" />
            <button
              type="submit"
              className="absolute right-2.5 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-1.5 shadow-md shadow-blue-500/30 transition cursor-pointer"
            >
              <span>Keşfet</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Sample Search Quick Chips */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400">
            <span className="font-medium text-slate-400">Örnek aramalar:</span>
            {sampleSearches.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSearch(item)}
                className="bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white px-2.5 py-1 rounded-lg border border-white/10 transition cursor-pointer text-[11px]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* AI Natural Language Assistant CTA banner */}
        <div className="pt-2">
          <button
            onClick={() => setAiSearchOpen(true)}
            className="inline-flex items-center space-x-2 py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 border border-indigo-400/30 hover:border-indigo-400/60 text-indigo-200 hover:text-white text-xs font-semibold backdrop-blur-md transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Doğal dil ile yapay zekâ semantik arama asistanını başlat</span>
            <ArrowRight className="w-3 h-3 text-indigo-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
