'use client';

import React from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import {
  MapPin,
  Building2,
  Users,
  GraduationCap,
  Layers,
  ChevronRight,
  ExternalLink,
  Phone,
  Globe
} from 'lucide-react';

export default function DistrictsView() {
  const { districts, schools, projects, setSelectedDistrict } = useEcosystem();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-8 rounded-3xl shadow-xl space-y-2">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-400/30">
            <MapPin className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
            MÜLKİ EĞİTİM BÖLGELERİ
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Malatya 13 İlçe Eğitim Profili
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Malatya ilimizin tüm ilçelerine ait eğitim göstergeleri, okul dağılımı, öğrenci/öğretmen kapasiteleri ve yenilikçi proje istatistikleri.
        </p>
      </div>

      {/* Grid of 13 Districts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {districts.map(district => {
          const districtSchools = schools.filter(s => s.districtId === district.id);
          const districtProjects = projects.filter(p => p.districtId === district.id);

          return (
            <div
              key={district.id}
              onClick={() => setSelectedDistrict(district)}
              className="bg-white rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between space-y-4 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-50 text-blue-700 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-blue-600 transition">
                        {district.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">İlçe Millî Eğitim Müdürlüğü</p>
                    </div>
                  </div>

                  <span className="text-xs text-blue-600 font-semibold group-hover:translate-x-1 transition flex items-center">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {district.description}
                </p>

                {/* Key Numbers */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-semibold">Okul</span>
                    <span className="font-extrabold text-slate-800 text-sm">{district.totalSchools}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-semibold">Öğrenci</span>
                    <span className="font-extrabold text-slate-800 text-sm">
                      {Math.round(district.totalStudents / 1000)}k
                    </span>
                  </div>
                  <div className="bg-blue-50/70 p-2 rounded-xl">
                    <span className="text-[10px] text-blue-600 block font-semibold">Proje</span>
                    <span className="font-extrabold text-blue-900 text-sm">{districtProjects.length}</span>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
                <span className="truncate max-w-[180px]">{district.phone}</span>
                <span className="text-blue-600 font-semibold group-hover:underline">
                  Profili İncele &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
