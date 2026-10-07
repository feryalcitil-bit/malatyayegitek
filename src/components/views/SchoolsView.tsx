'use client';

import React, { useState } from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import SchoolCard from '@/components/schools/SchoolCard';
import { School, SchoolType } from '@/types/ecosystem';
import { Building2, Search, Filter, RotateCcw, MapPin } from 'lucide-react';

export default function SchoolsView() {
  const { schools, districts } = useEcosystem();

  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredSchools = schools.filter(s => {
    if (search) {
      const q = search.toLowerCase();
      const match =
        s.name.toLowerCase().includes(q) ||
        s.code.includes(q) ||
        s.neighborhood.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedDistrict !== 'all' && s.districtId !== selectedDistrict) {
      return false;
    }

    if (selectedType !== 'all' && s.type !== selectedType) {
      return false;
    }

    return true;
  });

  const schoolTypes: SchoolType[] = [
    'Fen Lisesi',
    'Anadolu Lisesi',
    'Mesleki ve Teknik Anadolu Lisesi',
    'İmam Hatip Lisesi',
    'Bilim ve Sanat Merkezi (BİLSEM)',
    'Ortaokul',
    'İlkokul',
    'Halk Eğitimi Merkezi'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-8 rounded-3xl shadow-xl space-y-2">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-400/30">
            <Building2 className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
            MERKEZİ OKUL VERİ TABANI
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Malatya Eğitim Kurumları Kataloğu
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Malatya ilindeki tüm resmî okulların iletişim bilgileri, web siteleri, harita konumları ve yürüttükleri inovasyon projeleri.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="flex-1 min-w-[220px] relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Okul adı veya MEB kurum kodunda ara..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        {/* District Select */}
        <select
          value={selectedDistrict}
          onChange={e => setSelectedDistrict(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
        >
          <option value="all">Tüm İlçeler (13 İlçe)</option>
          {districts.map(d => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* School Type Select */}
        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
        >
          <option value="all">Tüm Okul Türleri</option>
          {schoolTypes.map(t => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearch('');
            setSelectedDistrict('all');
            setSelectedType('all');
          }}
          className="text-xs text-slate-400 hover:text-red-600 font-medium flex items-center space-x-1 transition cursor-pointer px-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Sıfırla</span>
        </button>
      </div>

      {/* Results Count & Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
          <span>{filteredSchools.length} eğitim kurumu listeleniyor</span>
          <span>Malatya MEM</span>
        </div>

        {filteredSchools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSchools.map(sch => (
              <SchoolCard key={sch.id} school={sch} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-700 text-base">Eşleşen okul bulunamadı</h4>
            <p className="text-xs text-slate-400">Arama kriterlerinizi değiştirerek tekrar deneyebilirsiniz.</p>
          </div>
        )}
      </div>
    </div>
  );
}
