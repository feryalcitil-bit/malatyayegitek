'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useEcosystem } from '@/context/EcosystemContext';
import { UserRole } from '@/types/ecosystem';
import {
  Sparkles,
  Search,
  MapPin,
  Calendar,
  Layers,
  GraduationCap,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Building2,
  Archive,
  BookOpen
} from 'lucide-react';

const ROLE_LABELS: Record<UserRole, { label: string; badge: string }> = {
  visitor: { label: 'Ziyaretçi', badge: 'bg-slate-100 text-slate-700' },
  teacher: { label: 'Öğretmen / İçerik Üreticisi', badge: 'bg-emerald-100 text-emerald-800' },
  school_admin: { label: 'Okul Yöneticisi', badge: 'bg-blue-100 text-blue-800' },
  ilce_mem_admin: { label: 'İlçe MEM Yöneticisi', badge: 'bg-purple-100 text-purple-800' },
  il_mem_admin: { label: 'İl MEM Yöneticisi', badge: 'bg-amber-100 text-amber-800' },
  super_admin: { label: 'Sistem Yöneticisi (Super Admin)', badge: 'bg-rose-100 text-rose-800' }
};

export default function Header({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const { userRole, setUserRole, setAiSearchOpen, filters, setFilters } = useEcosystem();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Ministry & Official Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white text-xs py-1.5 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-medium tracking-wide">
              T.C. MİLLÎ EĞİTİM BAKANLIĞI • MALATYA İL MİLLÎ EĞİTİM MÜDÜRLÜĞÜ
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-1.5 py-0.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer text-[11px]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
                <span className="text-slate-300">Rol:</span>
                <span className="font-semibold text-white">{ROLE_LABELS[userRole].label}</span>
                <ChevronDown className="w-3 h-3 text-slate-300" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 text-slate-800 z-50 animate-fade-in text-xs">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                    Rol Simülasyonu Seçin
                  </div>
                  {(Object.keys(ROLE_LABELS) as UserRole[]).map(roleKey => (
                    <button
                      key={roleKey}
                      onClick={() => {
                        setUserRole(roleKey);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition ${
                        userRole === roleKey ? 'bg-blue-50/70 font-semibold text-blue-700' : 'text-slate-700'
                      }`}
                    >
                      <span>{ROLE_LABELS[roleKey].label}</span>
                      {userRole === roleKey && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="hidden md:inline text-blue-200/60">|</span>
            <span className="hidden md:inline text-[11px] text-blue-200">
              Malatya Yeğitek Bilişim ve İnovasyon Portalı
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none group-hover:text-blue-700 transition">
                Malatya Eğitim Ekosistemi
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white tracking-widest uppercase">
                PORTAL
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium tracking-tight mt-0.5 line-clamp-1">
              Okullar • Projeler • GençTek • STEM • eTwinning • Yenilikçi Sınıflar
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === 'home' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Ana Sayfa
          </button>
          <button
            onClick={() => handleNavClick('schools')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === 'schools' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Okullar
          </button>
          <button
            onClick={() => handleNavClick('districts')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === 'districts' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            İlçeler
          </button>
          <button
            onClick={() => handleNavClick('projects')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === 'projects' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Projeler & Çalışmalar
          </button>
          <button
            onClick={() => handleNavClick('map')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center space-x-1 ${
              activeTab === 'map' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Eğitim Haritası</span>
          </button>
          <button
            onClick={() => handleNavClick('calendar')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center space-x-1 ${
              activeTab === 'calendar' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Etkinlik Takvimi</span>
          </button>
          <button
            onClick={() => handleNavClick('memory')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center space-x-1 ${
              activeTab === 'memory' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Dijital Hafıza</span>
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center space-x-1 ${
              activeTab === 'admin'
                ? 'bg-indigo-900 text-white shadow-sm'
                : 'text-indigo-900 bg-indigo-50/70 hover:bg-indigo-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>Yönetici Paneli</span>
          </button>
        </nav>

        {/* Action Buttons: AI Search & Mobile Toggle */}
        <div className="flex items-center space-x-2">
          {/* AI Search Assistant Button */}
          <button
            onClick={() => setAiSearchOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-xs shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
            <span className="hidden sm:inline">AI Arama</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1 shadow-lg animate-fade-in">
          {[
            { id: 'home', label: 'Ana Sayfa' },
            { id: 'schools', label: 'Okullar' },
            { id: 'districts', label: 'İlçeler' },
            { id: 'projects', label: 'Projeler ve Çalışmalar' },
            { id: 'map', label: 'Eğitim Haritası' },
            { id: 'calendar', label: 'Etkinlik Takvimi' },
            { id: 'memory', label: 'Dijital Hafıza' },
            { id: 'admin', label: 'Yönetici Paneli' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold ${
                activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
