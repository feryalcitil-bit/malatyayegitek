'use client';

import React from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import {
  School,
  Layers,
  Laptop,
  FlaskConical,
  Globe,
  Rocket,
  Atom,
  Flame,
  Cpu,
  BarChart2
} from 'lucide-react';

export default function PlatformStats() {
  const { schools, districts, projects } = useEcosystem();

  const totalSchools = schools.length;
  const totalProjects = projects.length;
  const genctekCount = projects.filter(p => p.category === 'genctek').length;
  const stemCount = projects.filter(p => p.category === 'stem').length;
  const etwinningCount = projects.filter(p => p.category === 'etwinning').length;
  const classroomCount = projects.filter(p => p.category === 'innovative_classroom').length;
  const tubitakCount = projects.filter(p => p.category === 'tubitak').length;
  const teknofestCount = projects.filter(p => p.category === 'teknofest').length;
  const aiCount = projects.filter(p => p.category === 'ai').length;

  const statsList = [
    { label: 'Toplam Okul', count: totalSchools, icon: School, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Toplam Proje', count: totalProjects, icon: Layers, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'GençTek', count: genctekCount, icon: Laptop, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'STEM', count: stemCount, icon: FlaskConical, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'eTwinning', count: etwinningCount, icon: Globe, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Yenilikçi Sınıf', count: classroomCount, icon: Rocket, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'TÜBİTAK', count: tubitakCount, icon: Atom, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: 'TEKNOFEST', count: teknofestCount, icon: Flame, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Yapay Zekâ', count: aiCount, icon: Cpu, color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  return (
    <section className="bg-slate-900 text-white py-12 px-4 sm:px-8 border-y border-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">
              CANLI VERİLER
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
              Malatya Eğitim Ekosistemi Genel Göstergeleri
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>13 İlçe • 184+ Okul • Gerçek Zamanlı Arşiv</span>
          </div>
        </div>

        {/* Counter Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
          {statsList.map((st, idx) => {
            const Icon = st.icon;

            return (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl text-center flex flex-col items-center justify-between space-y-2 hover:border-slate-500 transition"
              >
                <div className={`p-2 rounded-xl ${st.bg} ${st.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black text-white block">
                    {st.count}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-0.5 line-clamp-1">
                    {st.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
