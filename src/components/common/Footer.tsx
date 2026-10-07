'use client';

import React from 'react';
import { GraduationCap, ShieldCheck, Mail, Phone, MapPin, ExternalLink, Globe } from 'lucide-react';

export default function Footer({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Malatya Eğitim Ekosistemi</h4>
                <p className="text-xs text-blue-400">Dijital Hafıza ve İnovasyon Portalı</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Malatya ilindeki 13 ilçede yer alan tüm eğitim kurumlarının, yenilikçi sınıflarının, GençTek, STEM, eTwinning, TÜBİTAK ve TEKNOFEST çalışmalarının sergilendiği, arşivlendiği ve paylaşıldığı merkezi dijital platformdur.
            </p>
            <div className="flex items-center space-x-3 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px]">6698 Sayılı KVKK Uyumlu • Kişisel Veri Koruma Standartları</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h5 className="font-semibold text-white text-sm">Hızlı Erişim</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('schools')} className="hover:text-white transition">
                  Malatya Okulları
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('districts')} className="hover:text-white transition">
                  13 İlçe Eğitim Profili
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition">
                  Tüm Eğitim Projeleri
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-white transition">
                  İnteraktif Eğitim Haritası
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calendar')} className="hover:text-white transition">
                  Etkinlik Takvimi
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('memory')} className="hover:text-white transition">
                  Dijital Eğitim Hafızası
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Modules */}
          <div className="space-y-3">
            <h5 className="font-semibold text-white text-sm">Özel Modüller</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-blue-400 transition">
                  💻 GençTek Malatya
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-emerald-400 transition">
                  🔬 Malatya STEM
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-amber-400 transition">
                  🌍 eTwinning Portföyü
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-purple-400 transition">
                  🚀 Yenilikçi Sınıflar (FCL)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-cyan-400 transition">
                  🧪 TÜBİTAK 4006 / 2204
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-red-400 transition">
                  🔥 TEKNOFEST & İHA
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Official links */}
          <div className="space-y-3">
            <h5 className="font-semibold text-white text-sm">Resmî İletişim</h5>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-blue-400 shrink-0" />
                <span>İnönü Cad. Valilik Binası Malatya İl MEM</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>0 (422) 280 44 00</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>malatyamem@meb.gov.tr</span>
              </p>
              <a
                href="https://malatya.meb.gov.tr"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 pt-1"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>malatya.meb.gov.tr</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Malatya İl Millî Eğitim Müdürlüğü • Yeğitek & AR-GE Bilişim Ekosistemi. Tüm hakları saklıdır.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Kullanım Şartları</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">KVKK Aydınlatma Metni</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Açık Veri Standartları</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
