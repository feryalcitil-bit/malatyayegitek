'use client';

import React from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import { Newspaper, Calendar, ExternalLink, ArrowRight } from 'lucide-react';

export default function RecentNews() {
  const { news } = useEcosystem();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
              <Newspaper className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
              HABERLER VE DUYURULAR
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Malatya Eğitim Haberleri
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            İl genelindeki eğitim teknolojileri, yarışma başarıları ve atölye duyuruları
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-400 transition flex flex-col justify-between group"
          >
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {item.summary}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">İl MEM Basın Birimi</span>
              <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition flex items-center space-x-1">
                <span>Haberi Oku</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
