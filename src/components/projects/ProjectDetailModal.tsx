'use client';

import React from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import { CATEGORY_METADATA } from '@/data/ecosystemData';
import {
  X,
  Calendar,
  MapPin,
  School as SchoolIcon,
  User,
  Users,
  Award,
  Globe,
  QrCode,
  Tag,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';

export default function ProjectDetailModal() {
  const {
    selectedProject,
    setSelectedProject,
    schools,
    districts,
    setSelectedSchool,
    openQrModal
  } = useEcosystem();

  if (!selectedProject) return null;

  const school = schools.find(s => s.id === selectedProject.schoolId);
  const district = districts.find(d => d.id === selectedProject.districtId);
  const meta = CATEGORY_METADATA[selectedProject.category] || CATEGORY_METADATA.stem;

  const handleOpenSchool = () => {
    if (school) {
      setSelectedSchool(school);
      setSelectedProject(null);
    }
  };

  const handleOpenQr = () => {
    openQrModal({
      title: selectedProject.title,
      subtitle: `${school?.name || ''} • ${meta.label} (${selectedProject.year})`,
      url: selectedProject.externalUrl || `https://malatya.meb.gov.tr/proje/${selectedProject.id}`,
      code: selectedProject.id.toUpperCase(),
      type: 'project'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className={`bg-gradient-to-r ${meta.color} text-white p-6 relative overflow-hidden shrink-0`}>
          <div className="flex items-start justify-between relative z-10 gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                  {meta.label}
                </span>
                <span className="text-xs bg-black/20 px-2.5 py-1 rounded-full flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedProject.year}</span>
                </span>
                <span className="text-xs bg-black/20 px-2.5 py-1 rounded-full flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{district?.name}</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
                {selectedProject.title}
              </h2>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={handleOpenQr}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/25 transition text-white"
                title="Proje Karekodu"
              >
                <QrCode className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/25 transition text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* School Banner inside header */}
          <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-3 text-xs text-white/90">
            <div
              onClick={handleOpenSchool}
              className="flex items-center space-x-2 cursor-pointer hover:underline"
            >
              <SchoolIcon className="w-4 h-4" />
              <span className="font-semibold">{school?.name}</span>
              <span className="opacity-75">({school?.neighborhood})</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5" />
                <span>{selectedProject.coordinatorTeacher}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Users className="w-3.5 h-3.5" />
                <span>{selectedProject.studentGroupDescription}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm">
          {/* STEM Specific Details Block */}
          {selectedProject.stemDetails && (
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>STEM Disiplin Entegrasyonu</span>
                </h4>
                <div className="flex gap-1.5">
                  {(['Science', 'Technology', 'Engineering', 'Mathematics'] as const).map(field => {
                    const active = selectedProject.stemDetails?.fields.includes(field);
                    return (
                      <span
                        key={field}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border ${
                          active
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-slate-400 border-slate-200'
                        }`}
                      >
                        {field}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-white p-3 rounded-xl border border-emerald-100">
                  <span className="font-bold text-emerald-800 block mb-1">Üretilen STEM Ürünü:</span>
                  <span className="text-slate-700">{selectedProject.stemDetails.product}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-emerald-100">
                  <span className="font-bold text-emerald-800 block mb-1">Uygulama Yöntemi:</span>
                  <span className="text-slate-700">{selectedProject.stemDetails.method}</span>
                </div>
              </div>
            </div>
          )}

          {/* eTwinning Specific Details Block */}
          {selectedProject.etwinningDetails && (
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
              <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                <Globe className="w-4 h-4 text-amber-600" />
                <span>eTwinning Uluslararası İş Birliği</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 font-medium block">Ortak Ülkeler:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedProject.etwinningDetails.partnerCountries.map(c => (
                      <span
                        key={c}
                        className="bg-amber-100/80 text-amber-900 font-semibold px-2 py-0.5 rounded-md"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Kullanılan Web 2.0 Araçları:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedProject.etwinningDetails.web2Tools.map(t => (
                      <span key={t} className="bg-white border border-amber-200 text-slate-700 px-2 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {selectedProject.etwinningDetails.twinSpaceUrl && (
                <a
                  href={selectedProject.etwinningDetails.twinSpaceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-amber-700 font-semibold hover:underline pt-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Resmî TwinSpace Proje Sayfasını Ziyaret Et</span>
                </a>
              )}
            </div>
          )}

          {/* Yenilikçi Sınıflar Specific Block */}
          {selectedProject.classroomDetails && (
            <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-3">
              <h4 className="font-bold text-purple-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-purple-600" />
                <span>Yenilikçi Sınıf Donanım ve Yaklaşımı</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-slate-700">Sınıf Adı:</span> {selectedProject.classroomDetails.roomName}
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Öğrenme Modeli:</span> {selectedProject.classroomDetails.learningApproach}
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Kullanılan Donanımlar:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedProject.classroomDetails.equipment.map(eq => (
                      <span key={eq} className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md font-medium">
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TEKNOFEST & TÜBİTAK Awards */}
          {(selectedProject.teknofestDetails || selectedProject.tubitakDetails) && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center justify-between gap-4">
              {selectedProject.teknofestDetails && (
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-red-100 text-red-700 rounded-xl">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">TEKNOFEST Takımı</span>
                    <h5 className="font-bold text-slate-900 text-sm">
                      {selectedProject.teknofestDetails.teamName} ({selectedProject.teknofestDetails.studentCount} Öğrenci)
                    </h5>
                    <p className="text-xs text-red-600 font-semibold">{selectedProject.teknofestDetails.award}</p>
                  </div>
                </div>
              )}

              {selectedProject.tubitakDetails && (
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-cyan-100 text-cyan-700 rounded-xl">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">TÜBİTAK Programı</span>
                    <h5 className="font-bold text-slate-900 text-sm">
                      {selectedProject.tubitakDetails.program}
                    </h5>
                    <p className="text-xs text-cyan-700 font-semibold">{selectedProject.tubitakDetails.awardStatus}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Problem Statement & Purpose */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {selectedProject.problemStatement && (
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1.5">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>Problem Durumu</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedProject.problemStatement}
                </p>
              </div>
            )}

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1.5">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Çalışmanın Amacı</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedProject.purpose}
              </p>
            </div>
          </div>

          {/* Implementation & Results */}
          <div className="space-y-4">
            {selectedProject.implementationProcess && (
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1.5">
                  Uygulama Süreci ve Yöntem
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-white p-3.5 border border-slate-100 rounded-xl">
                  {selectedProject.implementationProcess}
                </p>
              </div>
            )}

            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1.5">
                Elde Edilen Sonuç ve Çıktılar
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-blue-50/50 p-3.5 border border-blue-100 rounded-xl">
                {selectedProject.result}
              </p>
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Cpu className="w-4 h-4 text-indigo-600" />
              <span>Kullanılan Teknolojiler ve Araçlar</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologiesUsed.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-medium transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Tag className="w-4 h-4 text-slate-500" />
              <span>Etiketler</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedProject.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            * 6698 Sayılı KVKK Uyarınca öğrenci kişisel verileri maskelenmiş ve kurumsal onay ile yayımlanmıştır.
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleOpenSchool}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-xl transition cursor-pointer"
            >
              Okul Profilini Görüntüle
            </button>
            <button
              onClick={handleOpenQr}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-500/20 transition flex items-center space-x-1.5 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>Karekod Standı Al</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
