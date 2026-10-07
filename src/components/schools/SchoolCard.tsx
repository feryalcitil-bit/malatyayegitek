'use client';

import React from 'react';
import { School } from '@/types/ecosystem';
import { useEcosystem } from '@/context/EcosystemContext';
import {
  GraduationCap,
  MapPin,
  ExternalLink,
  QrCode,
  Layers,
  Phone,
  Globe,
  Building2,
  ChevronRight
} from 'lucide-react';

export default function SchoolCard({ school }: { school: School }) {
  const { districts, projects, setSelectedSchool, openQrModal } = useEcosystem();

  const district = districts.find(d => d.id === school.districtId);
  const schoolProjects = projects.filter(p => p.schoolId === school.id);

  const handleQrClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQrModal({
      title: school.name,
      subtitle: `${school.neighborhood} • Kurum Kodu: ${school.code}`,
      url: school.website,
      code: school.code,
      type: 'school'
    });
  };

  return (
    <div
      onClick={() => setSelectedSchool(school)}
      className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
    >
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Top badges */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700">
              {school.type}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Kod: {school.code}
            </span>
          </div>

          {/* School Name */}
          <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition leading-snug mt-2 line-clamp-2">
            {school.name}
          </h3>

          {/* Location info */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-700">{district?.name}</span>
            <span>•</span>
            <span className="truncate">{school.neighborhood}</span>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-500 mt-2.5 line-clamp-2 leading-relaxed">
            {school.description}
          </p>
        </div>

        {/* Project Statistics Badges */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700 flex items-center space-x-1">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Aktif Projeler</span>
            </span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              {schoolProjects.length} Çalışma
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
            <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
              <span className="text-slate-400 block">STEM</span>
              <span className="font-bold text-emerald-700">
                {schoolProjects.filter(p => p.category === 'stem').length}
              </span>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
              <span className="text-slate-400 block">GençTek</span>
              <span className="font-bold text-blue-700">
                {schoolProjects.filter(p => p.category === 'genctek').length}
              </span>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
              <span className="text-slate-400 block">Diğer</span>
              <span className="font-bold text-indigo-700">
                {schoolProjects.filter(p => !['stem', 'genctek'].includes(p.category)).length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
        <a
          href={school.website}
          target="_blank"
          rel="noreferrer"
          onClick={e => e.stopPropagation()}
          className="text-slate-500 hover:text-blue-600 flex items-center space-x-1 transition"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="text-[11px]">Resmî Web Sitesi</span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </a>

        <div className="flex items-center space-x-1">
          <button
            onClick={handleQrClick}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/50 transition cursor-pointer"
            title="Okul Karekodu"
          >
            <QrCode className="w-4 h-4" />
          </button>
          <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition flex items-center">
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
