'use client';

import React from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import {
  School,
  MapPin,
  Laptop,
  FlaskConical,
  Globe,
  Rocket,
  Cpu,
  Atom,
  Flame,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

interface QuickCard {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  badge: string;
  actionType: 'tab' | 'filter';
  targetTab?: string;
  categoryFilter?: string;
}

export default function QuickAccessCards({ onNavigate }: { onNavigate: (tab: string, category?: string) => void }) {
  const { setFilters, schools, districts, projects } = useEcosystem();

  const cards: QuickCard[] = [
    {
      id: 'schools',
      title: 'OKULLAR',
      subtitle: `${schools.length} Kurum Veri Tabanı`,
      icon: School,
      color: 'from-blue-600 to-indigo-700',
      badge: 'bg-blue-100 text-blue-800',
      actionType: 'tab',
      targetTab: 'schools'
    },
    {
      id: 'districts',
      title: 'İLÇELER',
      subtitle: '13 İlçe Eğitim Profili',
      icon: MapPin,
      color: 'from-slate-700 to-slate-900',
      badge: 'bg-slate-100 text-slate-800',
      actionType: 'tab',
      targetTab: 'districts'
    },
    {
      id: 'genctek',
      title: 'GENÇTEK',
      subtitle: 'Bilişim & Akran Öğrenmesi',
      icon: Laptop,
      color: 'from-blue-500 to-cyan-600',
      badge: 'bg-blue-100 text-blue-800',
      actionType: 'filter',
      categoryFilter: 'genctek'
    },
    {
      id: 'stem',
      title: 'STEM',
      subtitle: 'Fen, Teknoloji, Mühendislik',
      icon: FlaskConical,
      color: 'from-emerald-600 to-teal-700',
      badge: 'bg-emerald-100 text-emerald-800',
      actionType: 'filter',
      categoryFilter: 'stem'
    },
    {
      id: 'etwinning',
      title: 'eTWINNING',
      subtitle: 'Uluslararası İş Birlikleri',
      icon: Globe,
      color: 'from-amber-500 to-orange-600',
      badge: 'bg-amber-100 text-amber-800',
      actionType: 'filter',
      categoryFilter: 'etwinning'
    },
    {
      id: 'innovative_classroom',
      title: 'YENİLİKÇİ SINIFLAR',
      subtitle: 'FCL, VR & 3D Tasarım',
      icon: Rocket,
      color: 'from-purple-600 to-pink-600',
      badge: 'bg-purple-100 text-purple-800',
      actionType: 'filter',
      categoryFilter: 'innovative_classroom'
    },
    {
      id: 'ai',
      title: 'YAPAY ZEKÂ',
      subtitle: 'Üretken AI & Modeller',
      icon: Cpu,
      color: 'from-violet-600 to-purple-800',
      badge: 'bg-violet-100 text-violet-800',
      actionType: 'filter',
      categoryFilter: 'ai'
    },
    {
      id: 'tubitak',
      title: 'TÜBİTAK',
      subtitle: '4006 & 2204 Araştırmaları',
      icon: Atom,
      color: 'from-cyan-600 to-blue-700',
      badge: 'bg-cyan-100 text-cyan-800',
      actionType: 'filter',
      categoryFilter: 'tubitak'
    },
    {
      id: 'teknofest',
      title: 'TEKNOFEST',
      subtitle: 'İHA, Robotik & Takımlar',
      icon: Flame,
      color: 'from-red-600 to-orange-600',
      badge: 'bg-red-100 text-red-800',
      actionType: 'filter',
      categoryFilter: 'teknofest'
    },
    {
      id: 'innovative_practice',
      title: 'YENİLİKÇİ UYGULAMALAR',
      subtitle: 'Oyunlaştırma & İyi Örnekler',
      icon: Lightbulb,
      color: 'from-amber-600 to-yellow-600',
      badge: 'bg-amber-100 text-amber-900',
      actionType: 'filter',
      categoryFilter: 'innovative_practice'
    }
  ];

  const handleCardClick = (card: QuickCard) => {
    if (card.actionType === 'tab' && card.targetTab) {
      onNavigate(card.targetTab);
    } else if (card.actionType === 'filter' && card.categoryFilter) {
      setFilters(prev => ({
        ...prev,
        category: card.categoryFilter || 'all'
      }));
      onNavigate('projects', card.categoryFilter);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
            HIZLI ERİŞİM KARTLARI
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            Eğitim Ekosistemi Modülleri
          </h2>
        </div>
        <p className="text-xs text-slate-500 max-w-sm">
          İlgili çalışma alanını seçerek Malatya genelindeki tüm okul ve proje verilerine anında ulaşın.
        </p>
      </div>

      {/* Grid of 10 Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {cards.map(card => {
          const IconComp = card.icon;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-500 hover:shadow-xl p-4 sm:p-5 flex flex-col justify-between space-y-3 cursor-pointer group transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition`}
                >
                  <IconComp className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-sm tracking-tight group-hover:text-blue-600 transition">
                  {card.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                  {card.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
