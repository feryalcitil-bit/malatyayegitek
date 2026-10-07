'use client';

import React, { useState } from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import { ProjectStatus, ProjectCategory, UserRole } from '@/types/ecosystem';
import { CATEGORY_METADATA } from '@/data/ecosystemData';
import NewProjectModal from '@/components/admin/NewProjectModal';
import NewSchoolModal from '@/components/admin/NewSchoolModal';
import {
  ShieldCheck,
  Building2,
  Layers,
  FileSpreadsheet,
  PlusCircle,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Trash2,
  Star,
  Download,
  Filter,
  Search,
  ExternalLink,
  Calendar,
  FileText
} from 'lucide-react';

const STATUS_CONFIG: Record<ProjectStatus, { label: string; badge: string; icon: any }> = {
  published: { label: 'Yayınlandı', badge: 'bg-emerald-100 text-emerald-800', icon: CheckCircle2 },
  approved: { label: 'Onaylandı', badge: 'bg-blue-100 text-blue-800', icon: CheckCircle2 },
  pending_review: { label: 'İnceleme Bekliyor', badge: 'bg-amber-100 text-amber-800', icon: Clock },
  revision_requested: { label: 'Revizyon İstendi', badge: 'bg-purple-100 text-purple-800', icon: RotateCcw },
  draft: { label: 'Taslak', badge: 'bg-slate-100 text-slate-700', icon: FileText },
  archived: { label: 'Arşivlendi', badge: 'bg-rose-100 text-rose-800', icon: AlertTriangle }
};

export default function AdminDashboard() {
  const {
    userRole,
    schools,
    districts,
    projects,
    updateProjectStatus,
    toggleProjectFeatured,
    deleteProject,
    setSelectedProject,
    setSelectedSchool
  } = useEcosystem();

  const [activeTab, setActiveTab] = useState<'projects' | 'schools' | 'reports'>('projects');
  const [projectFilterStatus, setProjectFilterStatus] = useState<string>('all');
  const [projectSearch, setProjectSearch] = useState('');
  const [schoolSearch, setSchoolSearch] = useState('');

  // Modals
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isNewSchoolOpen, setIsNewSchoolOpen] = useState(false);

  // Reporting State
  const [reportYear, setReportYear] = useState('2026');
  const [reportCategory, setReportCategory] = useState('stem');
  const [reportDistrict, setReportDistrict] = useState('all');

  // Filtered Projects for Management Table
  const filteredProjects = projects.filter(p => {
    if (projectFilterStatus !== 'all' && p.status !== projectFilterStatus) return false;
    if (projectSearch && !p.title.toLowerCase().includes(projectSearch.toLowerCase())) return false;
    return true;
  });

  // Filtered Schools for Management Table
  const filteredSchools = schools.filter(s => {
    if (schoolSearch && !s.name.toLowerCase().includes(schoolSearch.toLowerCase()) && !s.code.includes(schoolSearch)) return false;
    return true;
  });

  // Report Generator Output
  const generatedReportProjects = projects.filter(p => {
    if (reportYear !== 'all' && p.year.toString() !== reportYear) return false;
    if (reportCategory !== 'all' && p.category !== reportCategory) return false;
    if (reportDistrict !== 'all' && p.districtId !== reportDistrict) return false;
    return true;
  });

  // CSV Exporter for Projects
  const exportProjectsToCsv = () => {
    const headers = ['ID', 'Proje Başlığı', 'Kategori', 'Kurum', 'İlçe', 'Yıl', 'Danışman Öğretmen', 'Durum'];
    const rows = filteredProjects.map(p => {
      const sch = schools.find(s => s.id === p.schoolId)?.name || '';
      const dist = districts.find(d => d.id === p.districtId)?.name || '';
      return [
        `"${p.id}"`,
        `"${p.title.replace(/"/g, '""')}"`,
        `"${p.category}"`,
        `"${sch.replace(/"/g, '""')}"`,
        `"${dist}"`,
        p.year,
        `"${p.coordinatorTeacher}"`,
        `"${p.status}"`
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `malatya_egitim_projeleri_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV Exporter for Schools
  const exportSchoolsToCsv = () => {
    const headers = ['Kurum Kodu', 'Okul Adı', 'İlçe', 'Okul Türü', 'Kademe', 'Telefon', 'E-Posta', 'Web'];
    const rows = filteredSchools.map(s => {
      const dist = districts.find(d => d.id === s.districtId)?.name || '';
      return [
        `"${s.code}"`,
        `"${s.name.replace(/"/g, '""')}"`,
        `"${dist}"`,
        `"${s.type}"`,
        `"${s.level}"`,
        `"${s.phone}"`,
        `"${s.email}"`,
        `"${s.website}"`
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `malatya_okullar_listesi_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fade-in">
      {/* Role Alert / Simulation Status Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
            <ShieldCheck className="w-8 h-8 text-blue-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold">Malatya Eğitim Ekosistemi Yönetim Paneli</h2>
              <span className="text-xs bg-blue-500/30 text-blue-200 border border-blue-400/30 px-2.5 py-0.5 rounded-full font-semibold">
                Aktif Rol: {userRole.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-blue-200 mt-1 max-w-xl">
              İl/İlçe MEM yöneticileri ve yetkili okul koordinatörleri için proje onaylama, okul veri yönetimi, Excel aktarımları ve resmî raporlama modülü.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setIsNewProjectOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md flex items-center space-x-1.5 transition cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Yeni Proje Girişi</span>
          </button>
          <button
            onClick={() => setIsNewSchoolOpen(true)}
            className="px-4 py-2.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold shadow-md flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Building2 className="w-4 h-4" />
            <span>Yeni Okul Ekle</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-2 ${
            activeTab === 'projects'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Proje Onay ve Yönetimi ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('schools')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-2 ${
            activeTab === 'schools'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Okul Veri Tabanı Yönetimi ({schools.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-2 ${
            activeTab === 'reports'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Resmî Raporlama & Veri Dışa Aktar</span>
        </button>
      </div>

      {/* Tab 1: Proje Yönetimi ve Onay Sistemi */}
      {activeTab === 'projects' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
          {/* Controls: Search, Status Filter, Export */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="relative min-w-[240px]">
                <input
                  type="text"
                  value={projectSearch}
                  onChange={e => setProjectSearch(e.target.value)}
                  placeholder="Proje adında ara..."
                  className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              </div>

              <select
                value={projectFilterStatus}
                onChange={e => setProjectFilterStatus(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="published">Yayınlandı</option>
                <option value="approved">Onaylandı</option>
                <option value="pending_review">İnceleme Bekliyor</option>
                <option value="revision_requested">Revizyon İstendi</option>
                <option value="draft">Taslak</option>
                <option value="archived">Arşivlendi</option>
              </select>
            </div>

            <button
              onClick={exportProjectsToCsv}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Excel/CSV Olarak İndir</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Proje Adı & Kategori</th>
                  <th className="py-3 px-4">Okul & İlçe</th>
                  <th className="py-3 px-4">Öğretmen</th>
                  <th className="py-3 px-4">Yıl</th>
                  <th className="py-3 px-4">Mevcut Durum</th>
                  <th className="py-3 px-4 text-right">Onay / Durum İşlemleri</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.map(proj => {
                  const school = schools.find(s => s.id === proj.schoolId);
                  const district = districts.find(d => d.id === proj.districtId);
                  const statusConf = STATUS_CONFIG[proj.status];
                  const meta = CATEGORY_METADATA[proj.category];

                  return (
                    <tr key={proj.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 max-w-xs">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleProjectFeatured(proj.id)}
                            title={proj.featured ? 'Öne Çıkarıldı' : 'Öne Çıkar'}
                            className={`p-1 rounded-lg transition ${
                              proj.featured ? 'text-amber-500' : 'text-slate-300 hover:text-amber-400'
                            }`}
                          >
                            <Star className="w-4 h-4 fill-current" />
                          </button>
                          <div>
                            <span
                              onClick={() => setSelectedProject(proj)}
                              className="font-bold text-slate-900 hover:text-blue-600 transition cursor-pointer block line-clamp-1"
                            >
                              {proj.title}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${meta?.bgLight}`}>
                              {meta?.label}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-900 block line-clamp-1">{school?.name}</span>
                        <span className="text-[11px] text-slate-400">{district?.name}</span>
                      </td>

                      <td className="py-3 px-4 text-slate-600">
                        {proj.coordinatorTeacher}
                      </td>

                      <td className="py-3 px-4 font-mono font-medium">
                        {proj.year}
                      </td>

                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full font-semibold text-[11px] inline-flex items-center space-x-1 ${statusConf?.badge}`}>
                          <span>{statusConf?.label}</span>
                        </span>
                      </td>

                      {/* Action Dropdown / Quick Buttons */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          {proj.status !== 'published' && (
                            <button
                              onClick={() => updateProjectStatus(proj.id, 'published')}
                              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-lg text-[11px] transition cursor-pointer"
                              title="Onayla ve Yayınla"
                            >
                              Yayınla
                            </button>
                          )}

                          {proj.status !== 'revision_requested' && (
                            <button
                              onClick={() => updateProjectStatus(proj.id, 'revision_requested')}
                              className="px-2 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold rounded-lg text-[11px] transition cursor-pointer"
                              title="Revizyon İste"
                            >
                              Revizyon
                            </button>
                          )}

                          {proj.status !== 'archived' && (
                            <button
                              onClick={() => updateProjectStatus(proj.id, 'archived')}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] transition cursor-pointer"
                              title="Arşive Kaldır"
                            >
                              Arşivle
                            </button>
                          )}

                          <button
                            onClick={() => {
                              if (confirm('Bu projeyi kalıcı olarak silmek istediğinizden emin misiniz?')) {
                                deleteProject(proj.id);
                              }
                            }}
                            className="p-1 text-slate-300 hover:text-red-600 transition cursor-pointer rounded-lg hover:bg-red-50"
                            title="Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Okul Yönetimi */}
      {activeTab === 'schools' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative min-w-[280px]">
              <input
                type="text"
                value={schoolSearch}
                onChange={e => setSchoolSearch(e.target.value)}
                placeholder="Okul adı veya kurum kodunda ara..."
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>

            <button
              onClick={exportSchoolsToCsv}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Okul Listesini CSV/Excel Olarak İndir</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Kurum Kodu</th>
                  <th className="py-3 px-4">Okul Adı</th>
                  <th className="py-3 px-4">İlçe</th>
                  <th className="py-3 px-4">Okul Türü</th>
                  <th className="py-3 px-4">Telefon</th>
                  <th className="py-3 px-4">Projeler</th>
                  <th className="py-3 px-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSchools.map(sch => {
                  const district = districts.find(d => d.id === sch.districtId);
                  const schoolProjectCount = projects.filter(p => p.schoolId === sch.id).length;

                  return (
                    <tr key={sch.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {sch.code}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 max-w-xs">
                        <span
                          onClick={() => setSelectedSchool(sch)}
                          className="hover:text-blue-600 transition cursor-pointer block line-clamp-1"
                        >
                          {sch.name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-normal">{sch.neighborhood}</span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {district?.name}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {sch.type}
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                        {sch.phone}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px]">
                          {schoolProjectCount} Proje
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedSchool(sch)}
                          className="text-xs text-blue-600 font-semibold hover:underline"
                        >
                          Profil Aç
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Resmî Raporlama Modülü (Section 42) */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-600" />
              <span>Yönetici Resmî Rapor Üretim Merkezi</span>
            </h3>
            <p className="text-xs text-slate-500">
              Örnek: &quot;2026 yılında Malatya’daki STEM çalışmaları&quot; filtreleriyle resmî döküm oluşturun ve PDF / Excel olarak çıktısını alın.
            </p>
          </div>

          {/* Report Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Rapor Yılı</label>
              <select
                value={reportYear}
                onChange={e => setReportYear(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
              >
                <option value="all">Tüm Yıllar</option>
                <option value="2027">2027</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Proje / Çalışma Alanı</label>
              <select
                value={reportCategory}
                onChange={e => setReportCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
              >
                <option value="all">Tüm Alanlar</option>
                <option value="stem">STEM Projeleri</option>
                <option value="genctek">GençTek Çalışmaları</option>
                <option value="etwinning">eTwinning</option>
                <option value="innovative_classroom">Yenilikçi Sınıflar</option>
                <option value="tubitak">TÜBİTAK Projeleri</option>
                <option value="teknofest">TEKNOFEST Takımları</option>
                <option value="ai">Yapay Zekâ Çalışmaları</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">İlçe</label>
              <select
                value={reportDistrict}
                onChange={e => setReportDistrict(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
              >
                <option value="all">Tüm İlçeler (13 İlçe)</option>
                {districts.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-md transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Raporu Yazdır / PDF Al</span>
              </button>
            </div>
          </div>

          {/* Generated Report View Sheet */}
          <div className="p-6 bg-slate-50/50 border border-slate-200 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  T.C. Malatya İl MEM • {reportYear === 'all' ? 'Tüm Yıllar' : `${reportYear} Yılı`} {reportCategory.toUpperCase()} Rapor Dökümü
                </h4>
                <p className="text-[11px] text-slate-500">
                  Toplam Eşleşen Kayıt: {generatedReportProjects.length}
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Tarih: {new Date().toLocaleDateString('tr-TR')}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">İlçe</th>
                    <th className="py-2.5 px-3">Okul Adı</th>
                    <th className="py-2.5 px-3">Proje Adı</th>
                    <th className="py-2.5 px-3">Alan</th>
                    <th className="py-2.5 px-3">Danışman Öğretmen</th>
                    <th className="py-2.5 px-3">Sonuç / Başarı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {generatedReportProjects.map(item => {
                    const sch = schools.find(s => s.id === item.schoolId);
                    const dist = districts.find(d => d.id === item.districtId);

                    return (
                      <tr key={item.id} className="hover:bg-white transition">
                        <td className="py-2.5 px-3 font-semibold">{dist?.name}</td>
                        <td className="py-2.5 px-3">{sch?.name}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">{item.title}</td>
                        <td className="py-2.5 px-3">
                          <span className="font-semibold text-blue-700">{item.category.toUpperCase()}</span>
                        </td>
                        <td className="py-2.5 px-3">{item.coordinatorTeacher}</td>
                        <td className="py-2.5 px-3 max-w-xs truncate text-slate-500">{item.result}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <NewProjectModal isOpen={isNewProjectOpen} onClose={() => setIsNewProjectOpen(false)} />
      <NewSchoolModal isOpen={isNewSchoolOpen} onClose={() => setIsNewSchoolOpen(false)} />
    </div>
  );
}
