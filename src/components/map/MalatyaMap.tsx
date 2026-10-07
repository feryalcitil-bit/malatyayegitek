'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import { School, ProjectCategory } from '@/types/ecosystem';
import { CATEGORY_METADATA } from '@/data/ecosystemData';
import { Layers, MapPin, ExternalLink, QrCode, School as SchoolIcon, Filter } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon paths in React
const fixLeafletIcon = (L: any) => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
};

export default function MalatyaMap() {
  const { schools, projects, setSelectedSchool, openQrModal } = useEcosystem();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);

  const [activeLayer, setActiveLayer] = useState<string>('all');
  const [selectedPinSchool, setSelectedPinSchool] = useState<School | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;
      const L = (await import('leaflet')).default;
      fixLeafletIcon(L);

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Initialize Malatya center
      const map = L.map(mapContainerRef.current).setView([38.3552, 38.3168], 10);
      mapInstanceRef.current = map;

      // CartoDB Positron or OpenStreetMap
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      // Create a FeatureGroup for markers
      const markersLayer = L.featureGroup().addTo(map);
      markersLayerRef.current = markersLayer;

      updateMarkers(L, markersLayer, map);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when activeLayer or schools change
  useEffect(() => {
    async function refresh() {
      if (!mapInstanceRef.current || !markersLayerRef.current) return;
      const L = (await import('leaflet')).default;
      updateMarkers(L, markersLayerRef.current, mapInstanceRef.current);
    }
    refresh();
  }, [activeLayer, schools, projects]);

  const updateMarkers = (L: any, layer: any, map: any) => {
    layer.clearLayers();

    // Filter schools depending on active layer
    const filteredSchools = schools.filter(school => {
      if (activeLayer === 'all') return true;
      const schoolProjects = projects.filter(p => p.schoolId === school.id);
      return schoolProjects.some(p => p.category === activeLayer);
    });

    filteredSchools.forEach(school => {
      const schoolProjects = projects.filter(p => p.schoolId === school.id);

      // Custom HTML Pin icon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background: ${activeLayer !== 'all' ? '#2563eb' : '#1e3a8a'};
            color: white;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid white;
            font-weight: bold;
            font-size: 11px;
            cursor: pointer;
            transition: transform 0.2s;
          ">
            ${schoolProjects.length > 0 ? schoolProjects.length : '🏫'}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(school.coordinates, { icon: customIcon });

      marker.on('click', () => {
        setSelectedPinSchool(school);
      });

      marker.bindTooltip(`
        <div style="font-family: inherit; font-size: 12px; font-weight: 600; padding: 2px 4px;">
          ${school.name}
          <div style="font-size: 10px; color: #64748b; font-weight: normal;">
            ${schoolProjects.length} Kayıtlı Çalışma
          </div>
        </div>
      `, { direction: 'top', offset: [0, -10] });

      layer.addLayer(marker);
    });

    if (filteredSchools.length > 0 && layer.getBounds().isValid()) {
      map.fitBounds(layer.getBounds(), { padding: [50, 50], maxZoom: 14 });
    }
  };

  const layersList = [
    { id: 'all', label: 'Tüm Okullar', icon: '🏫', color: 'bg-slate-800' },
    { id: 'stem', label: 'STEM Okulları', icon: '🔬', color: 'bg-emerald-600' },
    { id: 'genctek', label: 'GençTek Okulları', icon: '💻', color: 'bg-blue-600' },
    { id: 'etwinning', label: 'eTwinning Okulları', icon: '🌍', color: 'bg-amber-600' },
    { id: 'innovative_classroom', label: 'Yenilikçi Sınıflar', icon: '🚀', color: 'bg-purple-600' },
    { id: 'tubitak', label: 'TÜBİTAK Projeleri', icon: '🧪', color: 'bg-cyan-600' },
    { id: 'teknofest', label: 'TEKNOFEST Takımları', icon: '🔥', color: 'bg-red-600' },
    { id: 'ai', label: 'Yapay Zekâ Çalışmaları', icon: '🤖', color: 'bg-violet-600' }
  ];

  return (
    <div className="relative w-full h-[650px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 flex flex-col md:flex-row">
      {/* Layer Toggle Bar (Left or Top) */}
      <div className="w-full md:w-80 bg-white/95 backdrop-blur-md border-b md:border-b-0 md:border-r border-slate-200 p-5 flex flex-col justify-between shrink-0 z-10 overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Harita Katmanları</h3>
              <p className="text-[11px] text-slate-500">Çalışma türüne göre filtreleyin</p>
            </div>
          </div>

          <div className="space-y-1.5">
            {layersList.map(layer => {
              const isActive = activeLayer === layer.id;
              // Count matching schools
              const matchCount = schools.filter(s => {
                if (layer.id === 'all') return true;
                return projects.some(p => p.schoolId === s.id && p.category === layer.id);
              }).length;

              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 border border-blue-200 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-base">{layer.icon}</span>
                    <span>{layer.label}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {matchCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected School Quick Card */}
        {selectedPinSchool && (
          <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl animate-fade-in space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  {selectedPinSchool.type}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5 line-clamp-1">
                  {selectedPinSchool.name}
                </h4>
                <p className="text-xs text-slate-500">{selectedPinSchool.neighborhood}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <button
                onClick={() => setSelectedSchool(selectedPinSchool)}
                className="flex-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl text-center transition cursor-pointer"
              >
                Okul Profiline Git
              </button>
              <button
                onClick={() =>
                  openQrModal({
                    title: selectedPinSchool.name,
                    subtitle: `${selectedPinSchool.neighborhood} • Kurum Kodu: ${selectedPinSchool.code}`,
                    url: selectedPinSchool.website,
                    code: selectedPinSchool.code,
                    type: 'school'
                  })
                }
                className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl transition cursor-pointer"
                title="Karekod Profili"
              >
                <QrCode className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Canvas */}
      <div className="flex-1 h-full w-full relative">
        <div ref={mapContainerRef} className="w-full h-full min-h-[400px]" />

        {/* Watermark badge on map */}
        <div className="absolute bottom-4 right-4 z-[400] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-[11px] font-medium text-slate-700 shadow-md pointer-events-none">
          📍 Malatya İli Eğitim Koordinat Sistemi
        </div>
      </div>
    </div>
  );
}
