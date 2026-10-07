'use client';

import React from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import ProjectCard from '@/components/projects/ProjectCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FeaturedProjects({ onViewAll }: { onViewAll: () => void }) {
  const { projects } = useEcosystem();

  const featuredList = projects.filter(p => p.featured || p.views > 1000).slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              BAŞARILAR VE VİZYON
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Öne Çıkan Eğitim Çalışmaları
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ulusal dereceler, patent başvuruları, TEKNOFEST finalleri ve uluslararası eTwinning projeleri
          </p>
        </div>

        <button
          onClick={onViewAll}
          className="self-start sm:self-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition cursor-pointer"
        >
          <span>Tüm Projeleri İncele ({projects.length})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featuredList.map(proj => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
      </div>
    </section>
  );
}
