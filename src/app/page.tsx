'use client';

import React, { useState } from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import QrCodeModal from '@/components/common/QrCodeModal';
import AiSearchModal from '@/components/common/AiSearchModal';

// Home Page Sections
import HeroSection from '@/components/home/HeroSection';
import QuickAccessCards from '@/components/home/QuickAccessCards';
import PlatformStats from '@/components/home/PlatformStats';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import FeaturedSchools from '@/components/home/FeaturedSchools';
import RecentNews from '@/components/home/RecentNews';
import MalatyaMap from '@/components/map/MalatyaMap';

// Dedicated Views
import ProjectsView from '@/components/views/ProjectsView';
import SchoolsView from '@/components/views/SchoolsView';
import DistrictsView from '@/components/views/DistrictsView';
import EventCalendarView from '@/components/calendar/EventCalendarView';
import EducationMemoryView from '@/components/memory/EducationMemoryView';
import AdminDashboard from '@/components/admin/AdminDashboard';

// Modals
import SchoolDetailModal from '@/components/schools/SchoolDetailModal';
import ProjectDetailModal from '@/components/projects/ProjectDetailModal';
import DistrictProfileModal from '@/components/districts/DistrictProfileModal';

import { MapPin, ArrowRight } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [initialProjectCategory, setInitialProjectCategory] = useState<string | undefined>(undefined);
  const { setFilters } = useEcosystem();

  const handleNavigateWithCategory = (tab: string, category?: string) => {
    setActiveTab(tab);
    if (category) {
      setInitialProjectCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroSearch = (query: string) => {
    setActiveTab('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Global Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* 1. Hero Section with Grand Search */}
            <HeroSection onSearchSubmit={handleHeroSearch} />

            {/* 2. Platform Real-time Stats Counter Bar */}
            <PlatformStats />

            {/* 3. Quick Access Cards (10 Core Modules) */}
            <QuickAccessCards onNavigate={handleNavigateWithCategory} />

            {/* 4. Featured Projects */}
            <FeaturedProjects onViewAll={() => setActiveTab('projects')} />

            {/* 5. Interactive Education Map Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
                      HARİTADA KEŞFET
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                    Malatya İnteraktif Eğitim Haritası
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Katmanları açıp kapatarak STEM, GençTek, eTwinning veya Yenilikçi Sınıfı bulunan okulları harita üzerinde inceleyin.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('map')}
                  className="self-start sm:self-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition cursor-pointer"
                >
                  <span>Tam Ekran Harita</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Embedded Map Component */}
              <MalatyaMap />
            </section>

            {/* 6. Featured Leader Schools */}
            <FeaturedSchools onViewAll={() => setActiveTab('schools')} />

            {/* 7. Recent News & Announcements */}
            <RecentNews />
          </div>
        )}

        {/* Dedicated Tab: Okullar */}
        {activeTab === 'schools' && <SchoolsView />}

        {/* Dedicated Tab: İlçeler */}
        {activeTab === 'districts' && <DistrictsView />}

        {/* Dedicated Tab: Projeler & Çalışmalar */}
        {activeTab === 'projects' && (
          <ProjectsView initialCategory={initialProjectCategory} />
        )}

        {/* Dedicated Tab: Harita */}
        {activeTab === 'map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6 animate-fade-in">
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-8 rounded-3xl shadow-xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
                COĞRAFİ BİLGİ SİSTEMİ
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Malatya Eğitim Haritası & Katman Analizi
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                İlçelere ve okul türlerine göre dağılımı görselleştirin. Sol panelden ilgilendiğiniz katmanı (STEM, GençTek, VR, vb.) seçerek filtreleyin.
              </p>
            </div>
            <MalatyaMap />
          </div>
        )}

        {/* Dedicated Tab: Etkinlik Takvimi */}
        {activeTab === 'calendar' && <EventCalendarView />}

        {/* Dedicated Tab: Dijital Hafıza */}
        {activeTab === 'memory' && <EducationMemoryView />}

        {/* Dedicated Tab: Yönetici Paneli */}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

      {/* Global Interactive Modals */}
      <SchoolDetailModal />
      <ProjectDetailModal />
      <DistrictProfileModal />
      <QrCodeModal />
      <AiSearchModal />
    </div>
  );
}
