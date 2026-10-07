'use client';

import React, { useState } from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import { EducationalEvent } from '@/types/ecosystem';
import { CATEGORY_METADATA } from '@/data/ecosystemData';
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Users,
  Filter,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  School as SchoolIcon,
  Layers,
  CalendarDays,
  List,
  CalendarRange
} from 'lucide-react';

export default function EventCalendarView() {
  const { events, districts, schools, setSelectedSchool } = useEcosystem();

  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEventModal, setSelectedEventModal] = useState<EducationalEvent | null>(null);

  // Filter events
  const filteredEvents = events.filter(evt => {
    if (selectedDistrict !== 'all' && evt.districtId !== selectedDistrict) return false;
    if (selectedType !== 'all' && evt.type !== selectedType) return false;
    if (selectedCategory !== 'all' && evt.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6 animate-fade-in">
      {/* Title & Controls Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              GÜNCEL TAKVİM
            </span>
            <span className="text-xs text-slate-400">2026-2027 Eğitim Öğretim Yılı</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Malatya Eğitim Etkinlik Takvimi
          </h2>
          <p className="text-xs text-slate-500">
            GençTek şenlikleri, STEM sergileri, TÜBİTAK fuarları, TEKNOFEST hazırlıkları ve öğretmen akademileri
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl self-start md:self-center">
          <button
            onClick={() => setViewMode('month')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer ${
              viewMode === 'month' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Aylık</span>
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer ${
              viewMode === 'week' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarRange className="w-3.5 h-3.5" />
            <span>Haftalık</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer ${
              viewMode === 'list' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Liste</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-3">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider pl-2">
          <Filter className="w-3.5 h-3.5 text-blue-600" />
          <span>Filtrele:</span>
        </div>

        {/* District Filter */}
        <select
          value={selectedDistrict}
          onChange={e => setSelectedDistrict(e.target.value)}
          className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
        >
          <option value="all">Tüm İlçeler</option>
          {districts.map(d => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
        >
          <option value="all">Tüm Etkinlik Türleri</option>
          <option value="Atölye">Atölye</option>
          <option value="Festival">Festival</option>
          <option value="Sergi">Sergi</option>
          <option value="Öğretmen Eğitimi">Öğretmen Eğitimi</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Bilim Fuarı">Bilim Fuarı</option>
        </select>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
        >
          <option value="all">Tüm Alanlar</option>
          <option value="genctek">GençTek</option>
          <option value="stem">STEM</option>
          <option value="etwinning">eTwinning</option>
          <option value="teknofest">TEKNOFEST</option>
          <option value="ai">Yapay Zekâ</option>
        </select>

        <span className="text-xs text-slate-400 ml-auto pr-2">
          {filteredEvents.length} Etkinlik Bulundu
        </span>
      </div>

      {/* Main Events Display */}
      {viewMode === 'list' ? (
        <div className="space-y-3">
          {filteredEvents.map(evt => {
            const district = districts.find(d => d.id === evt.districtId);
            const school = schools.find(s => s.id === evt.schoolId);

            return (
              <div
                key={evt.id}
                onClick={() => setSelectedEventModal(evt)}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-50 border border-blue-100 text-blue-800 rounded-2xl text-center shrink-0 min-w-[70px]">
                    <span className="text-xs uppercase font-bold block">
                      {new Date(evt.date).toLocaleString('tr-TR', { month: 'short' })}
                    </span>
                    <span className="text-2xl font-black block">
                      {new Date(evt.date).getDate()}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {evt.type}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{evt.time || 'Tüm Gün'}</span>
                      </span>
                      <span className="text-xs text-slate-500 font-medium">📍 {district?.name}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition">
                      {evt.title}
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-1">
                      {school ? `🏫 ${school.name} • ` : ''}{evt.description}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition inline-block">
                    Detayları Gör
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Calendar Grid (Monthly / Weekly view) */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map(evt => {
              const district = districts.find(d => d.id === evt.districtId);
              const school = schools.find(s => s.id === evt.schoolId);

              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEventModal(evt)}
                  className="bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between space-y-3 cursor-pointer group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {evt.type}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {evt.date}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition">
                      {evt.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-xs text-slate-500 space-y-1">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold text-slate-700">{district?.name}</span>
                      {school && <span className="truncate">({school.name})</span>}
                    </div>
                    {evt.participantCount && (
                      <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                        <Users className="w-3.5 h-3.5" />
                        <span>Tahmini {evt.participantCount} Katılımcı</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  {selectedEventModal.type}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  {selectedEventModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEventModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedEventModal.description}
            </p>

            <div className="space-y-2 p-3.5 bg-slate-50 rounded-2xl text-xs text-slate-700">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                <span>Tarih: {selectedEventModal.date} ({selectedEventModal.time || 'Tüm Gün'})</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Mekân: {selectedEventModal.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Hedef Kitle: {selectedEventModal.targetAudience}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedEventModal(null)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition cursor-pointer"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
