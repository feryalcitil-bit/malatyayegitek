'use client';

import React, { useState } from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import { CATEGORY_METADATA } from '@/data/ecosystemData';
import { ProjectCategory } from '@/types/ecosystem';
import ProjectCard from '@/components/projects/ProjectCard';
import {
  X,
  MapPin,
  Phone,
  Mail,
  Globe,
  ExternalLink,
  QrCode,
  Layers,
  GraduationCap,
  Sparkles,
  Building2,
  Calendar,
  Share2
} from 'lucide-react';

export default function SchoolDetailModal() {
  const {
    selectedSchool,
    setSelectedSchool,
    districts,
    projects,
    openQrModal
  } = useEcosystem();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  if (!selectedSchool) return null;

  const district = districts.find(d => d.id === selectedSchool.districtId);
  const schoolProjects = projects.filter(p => p.schoolId === selectedSchool.id);

  // Filtered projects for the active tab
  const displayedProjects = activeCategoryFilter === 'all'
    ? schoolProjects
    : schoolProjects.filter(p => p.category === activeCategoryFilter);

  // Category statistics breakdown
  const statsCounts = {
    total: schoolProjects.length,
    genctek: schoolProjects.filter(p => p.category === 'genctek').length,
    stem: schoolProjects.filter(p => p.category === 'stem').length,
    etwinning: schoolProjects.filter(p => p.category === 'etwinning').length,
    classroom: schoolProjects.filter(p => p.category === 'innovative_classroom').length,
    tubitak: schoolProjects.filter(p => p.category === 'tubitak').length,
    teknofest: schoolProjects.filter(p => p.category === 'teknofest').length,
    ai: schoolProjects.filter(p => p.category === 'ai').length,
  };

  const handleOpenQr = () => {
    openQrModal({
      title: selectedSchool.name,
      subtitle: `${selectedSchool.neighborhood} • Kurum Kodu: ${selectedSchool.code}`,
      url: selectedSchool.website,
      code: selectedSchool.code,
      type: 'school'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
        {/* Header Profile Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 relative shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-600 text-white">
                  {selectedSchool.type}
                </span>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-blue-200">
                  Kademe: {selectedSchool.level}
                </span>
                <span className="text-xs font-mono bg-white/10 text-white px-2.5 py-0.5 rounded-full">
                  Kurum Kodu: {selectedSchool.code}
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                {selectedSchool.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {selectedSchool.description}
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={handleOpenQr}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
                title="Okul Karekodu"
              >
                <QrCode className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedSchool(null)}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Institutional Contact Bar */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-blue-200">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{selectedSchool.address}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>{selectedSchool.phone}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{selectedSchool.email}</span>
              </span>
            </div>

            <a
              href={selectedSchool.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 py-1.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Resmî Web Sitesi</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Institutional Stats Cards (As requested in Section 17) */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-3 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Çalışma ve Proje İstatistikleri</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              <div className="bg-blue-50/70 border border-blue-200 p-3 rounded-2xl text-center">
                <span className="text-[10px] uppercase font-bold text-blue-700 block">Toplam</span>
                <span className="text-xl font-extrabold text-blue-900">{statsCounts.total}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">GençTek</span>
                <span className="text-xl font-extrabold text-blue-700">{statsCounts.genctek}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">STEM</span>
                <span className="text-xl font-extrabold text-emerald-700">{statsCounts.stem}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">eTwinning</span>
                <span className="text-xl font-extrabold text-amber-700">{statsCounts.etwinning}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Yenilikçi Sınıf</span>
                <span className="text-xl font-extrabold text-purple-700">{statsCounts.classroom}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">TÜBİTAK</span>
                <span className="text-xl font-extrabold text-cyan-700">{statsCounts.tubitak}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">TEKNOFEST</span>
                <span className="text-xl font-extrabold text-red-700">{statsCounts.teknofest}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Yapay Zekâ</span>
                <span className="text-xl font-extrabold text-violet-700">{statsCounts.ai}</span>
              </div>
            </div>
          </div>

          {/* Tabbed: Bu Okulun Çalışmaları */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Bu Okulun Çalışmaları</h3>
                <p className="text-xs text-slate-500">
                  {selectedSchool.name} bünyesinde hayata geçirilen dijital ve teknolojik projeler
                </p>
              </div>

              {/* Sub-filter tabs */}
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'all', label: 'Tümü' },
                  { id: 'stem', label: 'STEM' },
                  { id: 'genctek', label: 'GençTek' },
                  { id: 'etwinning', label: 'eTwinning' },
                  { id: 'innovative_classroom', label: 'Yenilikçi Sınıf' },
                  { id: 'tubitak', label: 'TÜBİTAK' },
                  { id: 'teknofest', label: 'TEKNOFEST' },
                  { id: 'ai', label: 'Yapay Zekâ' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategoryFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      activeCategoryFilter === tab.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Project List / Empty state */}
            <div className="mt-5">
              {displayedProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayedProjects.map(proj => (
                    <ProjectCard key={proj.id} project={proj} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-sm font-semibold text-slate-700">Bu kategoride henüz kayıtlı çalışma bulunmuyor.</p>
                  <p className="text-xs text-slate-500 mt-1">Okul koordinatörü yeni bir proje girişi yaptığında burada listelenecektir.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Konum: {selectedSchool.coordinates.join(', ')}</span>
          <button
            onClick={handleOpenQr}
            className="flex items-center space-x-1.5 text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Okul Profil Karekodu Al</span>
          </button>
        </div>
      </div>
    </div>
  );
}
