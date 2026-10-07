'use client';

import React, { useState } from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import ProjectCard from '@/components/projects/ProjectCard';
import { Archive, Calendar, History, Sparkles, Filter, Award } from 'lucide-react';

export default function EducationMemoryView() {
  const { projects } = useEcosystem();

  const [selectedYear, setSelectedYear] = useState<number>(2026);

  const availableYears = [2027, 2026, 2025, 2024];

  const yearProjects = projects.filter(p => p.year === selectedYear);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-white/10 rounded-xl">
              <Archive className="w-5 h-5 text-indigo-300" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
              Kurumsal Dijital Arşiv
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Malatya Eğitim Hafızası
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Geçmişten geleceğe Malatya&apos;daki okullarımızın ürettiği bilimsel, teknolojik ve pedagojik çalışmaların kalıcı dijital arşivi. Yıllar boyunca biriken eğitim birikimini keşfedin.
          </p>
        </div>
      </div>

      {/* Year Selection Tabs (Timeline) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center space-x-2 shrink-0">
          <History className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700">Dönem / Yıl Seçimi:</span>
        </div>

        <div className="flex items-center space-x-2">
          {availableYears.map(yr => {
            const count = projects.filter(p => p.year === yr).length;
            const isSelected = selectedYear === yr;

            return (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{yr} Arşivi</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Year Projects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg">
            {selectedYear} Yılında Malatya&apos;da Gerçekleştirilen Projeler ({yearProjects.length})
          </h3>
          <span className="text-xs text-slate-500">
            Kalıcı Arşiv Kayıtları
          </span>
        </div>

        {yearProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {yearProjects.map(proj => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
            <Archive className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-700 text-base">Bu yıla ait arşiv kaydı henüz eklenmedi</h4>
            <p className="text-xs text-slate-400">Yönetim panelinden geçmiş dönem projeleri sisteme aktarılabilir.</p>
          </div>
        )}
      </div>
    </div>
  );
}
