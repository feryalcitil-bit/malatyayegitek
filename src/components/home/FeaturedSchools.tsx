'use client';

import React from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import SchoolCard from '@/components/schools/SchoolCard';
import { Building2, ArrowRight } from 'lucide-react';

export default function FeaturedSchools({ onViewAll }: { onViewAll: () => void }) {
  const { schools } = useEcosystem();

  const featuredSchools = schools.filter(s => s.featured).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
              <Building2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              LİDER EĞİTİM KURUMLARI
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Öne Çıkan Okullar
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Aktif teknoloji atölyeleri, yüksek proje üretkenliği ve yenilikçi sınıf donanımlarına sahip okullarımız
          </p>
        </div>

        <button
          onClick={onViewAll}
          className="self-start sm:self-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition cursor-pointer"
        >
          <span>Tüm Okulları Keşfet ({schools.length})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {featuredSchools.map(school => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>
    </section>
  );
}
