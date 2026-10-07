'use client';

import React, { useState } from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import { CATEGORY_METADATA } from '@/data/ecosystemData';
import { ProjectCategory } from '@/types/ecosystem';
import ProjectCard from '@/components/projects/ProjectCard';
import {
  Search,
  Filter,
  RotateCcw,
  Layers,
  Sparkles,
  Tag,
  Grid,
  List,
  SlidersHorizontal
} from 'lucide-react';

export default function ProjectsView({ initialCategory }: { initialCategory?: string }) {
  const {
    projects,
    districts,
    schools,
    filters,
    setFilters,
    resetFilters,
    setAiSearchOpen
  } = useEcosystem();

  const [activeCategoryTab, setActiveCategoryTab] = useState<string>(initialCategory || filters.category || 'all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Collect all unique tags
  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));

  // Filter projects
  const filteredProjects = projects.filter(p => {
    // 1. Search Query
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const school = schools.find(s => s.id === p.schoolId);
      const district = districts.find(d => d.id === p.districtId);
      const matchesText =
        p.title.toLowerCase().includes(q) ||
        p.purpose.toLowerCase().includes(q) ||
        p.coordinatorTeacher.toLowerCase().includes(q) ||
        p.technologiesUsed.some(t => t.toLowerCase().includes(q)) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        (school && school.name.toLowerCase().includes(q)) ||
        (district && district.name.toLowerCase().includes(q));

      if (!matchesText) return false;
    }

    // 2. Category Tab / Filter
    if (activeCategoryTab !== 'all' && p.category !== activeCategoryTab) {
      return false;
    }

    // 3. District Filter
    if (filters.districtId !== 'all' && p.districtId !== filters.districtId) {
      return false;
    }

    // 4. Year Filter
    if (filters.year !== 'all' && p.year.toString() !== filters.year) {
      return false;
    }

    // 5. Tag Filter
    if (selectedTag !== 'all' && !p.tags.includes(selectedTag)) {
      return false;
    }

    return true;
  });

  const handleCategoryTab = (catKey: string) => {
    setActiveCategoryTab(catKey);
    setFilters(prev => ({ ...prev, category: catKey }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-400/30">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
              MERKEZİ ÇALIŞMA KATALOĞU
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Eğitim Projeleri ve Yenilikçi Çalışmalar
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            GençTek bilişim kulüpleri, STEM laboratuvarları, eTwinning ortaklıkları, TEKNOFEST takımları ve yapay zekâ projelerinin tamamını tek ekranda filtreleyin.
          </p>
        </div>

        <button
          onClick={() => setAiSearchOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/25 flex items-center space-x-2 transition cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
          <span>AI Akıllı Arama</span>
        </button>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => handleCategoryTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeCategoryTab === 'all'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Tüm Çalışmalar ({projects.length})
        </button>

        {(Object.keys(CATEGORY_METADATA) as ProjectCategory[]).map(catKey => {
          const meta = CATEGORY_METADATA[catKey];
          const count = projects.filter(p => p.category === catKey).length;
          const isSelected = activeCategoryTab === catKey;

          return (
            <button
              key={catKey}
              onClick={() => handleCategoryTab(catKey)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center space-x-1.5 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{meta.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Multi-faceted Search & Filter Bar (Section 15 & 16) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Keyword Search */}
          <div className="md:col-span-2 relative">
            <input
              type="text"
              value={filters.searchQuery}
              onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="Proje adı, konu, öğretmen veya teknoloji ara..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>

          {/* District Select */}
          <div>
            <select
              value={filters.districtId}
              onChange={e => setFilters(prev => ({ ...prev, districtId: e.target.value }))}
              className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="all">Tüm İlçeler (13 İlçe)</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year Select */}
          <div>
            <select
              value={filters.year}
              onChange={e => setFilters(prev => ({ ...prev, year: e.target.value }))}
              className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="all">Tüm Yıllar</option>
              <option value="2027">2027</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>

        {/* Tag Pills (Section 26) */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center space-x-1.5 shrink-0 text-slate-400 text-xs font-semibold">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span>Etiketler:</span>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setSelectedTag('all')}
              className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                selectedTag === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tüm Etiketler
            </button>
            {allTags.slice(0, 10).map((t, i) => (
              <button
                key={i}
                onClick={() => setSelectedTag(t)}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedTag === t
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              resetFilters();
              setSelectedTag('all');
              setActiveCategoryTab('all');
            }}
            className="text-xs text-slate-400 hover:text-red-600 font-medium flex items-center space-x-1 transition cursor-pointer shrink-0 ml-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* Projects Results Count & Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
          <span>Toplam {filteredProjects.length} çalışma listeleniyor</span>
          <span>Malatya Eğitim Ekosistemi Arşivi</span>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map(proj => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <Layers className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-700 text-base">Aradığınız kriterlere uygun proje bulunamadı</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Filtreleri sıfırlayarak veya arama terimini değiştirerek tekrar deneyebilirsiniz.
            </p>
            <button
              onClick={() => {
                resetFilters();
                setSelectedTag('all');
                setActiveCategoryTab('all');
              }}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
