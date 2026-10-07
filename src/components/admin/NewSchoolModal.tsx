'use client';

import React, { useState } from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import { School, SchoolType, EducationLevel } from '@/types/ecosystem';
import { X, Building2, CheckCircle } from 'lucide-react';

export default function NewSchoolModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { districts, addSchool } = useEcosystem();

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [districtId, setDistrictId] = useState(districts[0]?.id || 'battalgazi');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState<SchoolType>('Anadolu Lisesi');
  const [level, setLevel] = useState<EducationLevel>('Lise');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code || !districtId) {
      alert('Lütfen zorunlu alanları (Okul Adı, Kurum Kodu, İlçe) doldurunuz.');
      return;
    }

    const selectedDistrict = districts.find(d => d.id === districtId);

    const newSchool: School = {
      id: `sch-${Date.now()}`,
      name,
      code,
      districtId,
      neighborhood: neighborhood || 'Merkez Mahallesi',
      address: address || `${neighborhood} ${selectedDistrict?.name || ''} / Malatya`,
      phone: phone || '0422 000 00 00',
      email: email || `${code}@meb.k12.tr`,
      type,
      level,
      website: website || 'https://malatya.meb.gov.tr',
      coordinates: selectedDistrict?.coordinates || [38.3552, 38.3168],
      description: description || 'Malatya İl Millî Eğitim Müdürlüğü bünyesinde faaliyet gösteren eğitim kurumu.',
      featured: false
    };

    addSchool(newSchool);
    alert('Yeni okul kurumu veri tabanına başarıyla eklendi!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 to-indigo-900 text-white p-6 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-bold text-lg flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              <span>Yeni Okul / Kurum Ekle</span>
            </h3>
            <p className="text-xs text-blue-200 mt-1">
              Malatya Eğitim Kurumları Veri Tabanı
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/70 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs text-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">
                Okul / Kurum Adı <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Örn: Battalgazi Fen Lisesi"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">
                MEB Kurum Kodu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="Örn: 978412"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold block mb-1">
                İlçe <span className="text-red-500">*</span>
              </label>
              <select
                value={districtId}
                onChange={e => setDistrictId(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {districts.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1">Okul Türü</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as SchoolType)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Fen Lisesi">Fen Lisesi</option>
                <option value="Anadolu Lisesi">Anadolu Lisesi</option>
                <option value="Mesleki ve Teknik Anadolu Lisesi">Mesleki ve Teknik Anadolu Lisesi</option>
                <option value="İmam Hatip Lisesi">İmam Hatip Lisesi</option>
                <option value="Bilim ve Sanat Merkezi (BİLSEM)">Bilim ve Sanat Merkezi (BİLSEM)</option>
                <option value="Ortaokul">Ortaokul</option>
                <option value="İlkokul">İlkokul</option>
                <option value="Halk Eğitimi Merkezi">Halk Eğitimi Merkezi</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1">Eğitim Kademesi</label>
              <select
                value={level}
                onChange={e => setLevel(e.target.value as EducationLevel)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Lise">Lise</option>
                <option value="Ortaokul">Ortaokul</option>
                <option value="İlkokul">İlkokul</option>
                <option value="BİLSEM">BİLSEM</option>
                <option value="Halk Eğitimi">Halk Eğitimi</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Mahalle</label>
              <input
                type="text"
                value={neighborhood}
                onChange={e => setNeighborhood(e.target.value)}
                placeholder="Örn: Özalper Mahallesi"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Telefon</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="0422 212 00 00"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">E-Posta</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="okul@meb.k12.tr"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Resmî Web Sitesi</label>
              <input
                type="url"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                placeholder="https://okuladi.meb.k12.tr"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1">Açık Adres</label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Mahalle, cadde, numara..."
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Kurum Açıklaması</label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Okulun kısa tanıtımı ve öne çıkan özellikleri..."
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition cursor-pointer"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 transition flex items-center space-x-1.5 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Okulu Kaydet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
