'use client';

import React from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import { District } from '@/types/ecosystem';
import ProjectCard from '@/components/projects/ProjectCard';
import SchoolCard from '@/components/schools/SchoolCard';
import {
  X,
  MapPin,
  Building2,
  Users,
  GraduationCap,
  Layers,
  Phone,
  Mail,
  Globe,
  ExternalLink,
  BarChart3,
  Award
} from 'lucide-react';

export default function DistrictProfileModal() {
  const {
    selectedDistrict,
    setSelectedDistrict,
    schools,
    projects,
    setSelectedSchool
  } = useEcosystem();

  if (!selectedDistrict) return null;

  const districtSchools = schools.filter(s => s.districtId === selectedDistrict.id);
  const districtProjects = projects.filter(p => p.districtId === selectedDistrict.id);

  const categoryBreakdown = [
    { label: 'STEM', count: districtProjects.filter(p => p.category === 'stem').length, color: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
    { label: 'GençTek', count: districtProjects.filter(p => p.category === 'genctek').length, color: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50' },
    { label: 'eTwinning', count: districtProjects.filter(p => p.category === 'etwinning').length, color: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' },
    { label: 'Yenilikçi Sınıf', count: districtProjects.filter(p => p.category === 'innovative_classroom').length, color: 'bg-purple-500', text: 'text-purple-700', bg: 'bg-purple-50' },
    { label: 'TÜBİTAK', count: districtProjects.filter(p => p.category === 'tubitak').length, color: 'bg-cyan-500', text: 'text-cyan-700', bg: 'bg-cyan-50' },
    { label: 'TEKNOFEST', count: districtProjects.filter(p => p.category === 'teknofest').length, color: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
    { label: 'Yapay Zekâ', count: districtProjects.filter(p => p.category === 'ai').length, color: 'bg-violet-500', text: 'text-violet-700', bg: 'bg-violet-50' },
  ];

  const maxVal = Math.max(...categoryBreakdown.map(c => c.count), 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
        {/* District Hero Header */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 relative shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500 text-white uppercase tracking-wider">
                  İlçe Millî Eğitim Müdürlüğü
                </span>
                <span className="text-xs text-blue-200">Malatya İli</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {selectedDistrict.name} Eğitim Profili
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {selectedDistrict.description}
              </p>
            </div>

            <button
              onClick={() => setSelectedDistrict(null)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* District Contacts & Management */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-blue-200">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <span className="flex items-center space-x-1.5 font-medium text-white">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{selectedDistrict.memManager}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>{selectedDistrict.phone}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{selectedDistrict.email}</span>
              </span>
            </div>

            <a
              href={selectedDistrict.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 py-1.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>İlçe MEM Resmî Sitesi</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 text-slate-800">
          {/* Key District Overview Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Toplam Okul Sayısı</span>
              </span>
              <span className="text-2xl font-black text-slate-900 mt-2 block">
                {selectedDistrict.totalSchools}
              </span>
              <span className="text-[11px] text-slate-400">Resmî ve Özel Kurumlar</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Toplam Öğrenci</span>
              </span>
              <span className="text-2xl font-black text-slate-900 mt-2 block">
                {selectedDistrict.totalStudents.toLocaleString('tr-TR')}
              </span>
              <span className="text-[11px] text-slate-400">Tüm Kademeler</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>Toplam Öğretmen</span>
              </span>
              <span className="text-2xl font-black text-slate-900 mt-2 block">
                {selectedDistrict.totalTeachers.toLocaleString('tr-TR')}
              </span>
              <span className="text-[11px] text-slate-400">Kadrolu & Sözleşmeli</span>
            </div>

            <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-2xl">
              <span className="text-xs font-semibold text-blue-700 flex items-center space-x-1">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Kayıtlı İnovasyon Projeleri</span>
              </span>
              <span className="text-2xl font-black text-blue-900 mt-2 block">
                {districtProjects.length}
              </span>
              <span className="text-[11px] text-blue-600">Portal Veri Tabanında</span>
            </div>
          </div>

          {/* Visual Distribution Chart (As requested in Section 18) */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span>İlçedeki Proje ve Çalışma Türleri Dağılımı</span>
              </h3>
              <span className="text-xs text-slate-400 font-medium">Grafiksel Dağılım</span>
            </div>

            <div className="space-y-3 pt-2">
              {categoryBreakdown.map((cat, i) => {
                const percentage = Math.round((cat.count / maxVal) * 100);

                return (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700">{cat.label}</span>
                      <span className={`${cat.text} font-bold`}>{cat.count} Çalışma</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                        style={{ width: `${Math.max(percentage, 5)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* District's Registered Schools */}
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-3">
              {selectedDistrict.name} İlçesindeki Okullarımız ({districtSchools.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {districtSchools.map(sch => (
                <SchoolCard key={sch.id} school={sch} />
              ))}
            </div>
          </div>

          {/* District's Projects */}
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-3">
              {selectedDistrict.name} İlçesindeki Yenilikçi Projeler ({districtProjects.length})
            </h3>
            {districtProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {districtProjects.map(proj => (
                  <ProjectCard key={proj.id} project={proj} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-500">
                Bu ilçede henüz detaylı proje kaydı yapılmamış. Yönetici panelinden eklenebilir.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
