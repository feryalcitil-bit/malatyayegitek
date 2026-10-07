'use client';

import React, { useState } from 'react';
import { useEcosystem } from '@/context/EcosystemContext';
import { Project, ProjectCategory, ProjectStatus } from '@/types/ecosystem';
import { CATEGORY_METADATA } from '@/data/ecosystemData';
import { X, PlusCircle, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';

export default function NewProjectModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { schools, districts, addProject, userRole } = useEcosystem();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('stem');
  const [schoolId, setSchoolId] = useState(schools[0]?.id || '');
  const [year, setYear] = useState('2026');
  const [coordinatorTeacher, setCoordinatorTeacher] = useState('');
  const [studentGroupDescription, setStudentGroupDescription] = useState('');
  const [purpose, setPurpose] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [method, setMethod] = useState('');
  const [implementationProcess, setImplementationProcess] = useState('');
  const [result, setResult] = useState('');
  const [technologiesUsed, setTechnologiesUsed] = useState('');
  const [tags, setTags] = useState('');
  const [externalUrl, setExternalUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !schoolId || !coordinatorTeacher || !purpose || !result) {
      alert('Lütfen zorunlu alanları (Başlık, Okul, Danışman Öğretmen, Amaç, Sonuç) doldurunuz.');
      return;
    }

    const selectedSchool = schools.find(s => s.id === schoolId);
    const districtId = selectedSchool?.districtId || districts[0].id;

    // Determine initial status based on role
    let initialStatus: ProjectStatus = 'published';
    if (userRole === 'teacher' || userRole === 'visitor') {
      initialStatus = 'pending_review';
    }

    const newProject: Project = {
      id: `usr-${Date.now()}`,
      title,
      category,
      schoolId,
      districtId,
      year: parseInt(year, 10),
      coordinatorTeacher,
      studentGroupDescription: studentGroupDescription || 'Okul Proje Kulübü',
      problemStatement,
      purpose,
      method,
      implementationProcess,
      result,
      technologiesUsed: technologiesUsed.split(',').map(t => t.trim()).filter(Boolean),
      tags: tags.split(' ').map(t => (t.startsWith('#') ? t : `#${t}`)).filter(t => t.length > 1),
      images: ['/projects/default.jpg'],
      externalUrl: externalUrl || undefined,
      status: initialStatus,
      featured: false,
      views: 1,
      createdAt: new Date().toISOString().split('T')[0]
    };

    addProject(newProject);
    alert(
      initialStatus === 'pending_review'
        ? 'Projeniz başarıyla gönderildi! İçerik onay sisteminde İl/İlçe MEM yöneticisi onayına sunulmuştur.'
        : 'Proje başarıyla eklendi ve ekosistemde yayınlandı!'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-bold text-lg flex items-center space-x-2">
              <PlusCircle className="w-5 h-5 text-blue-400" />
              <span>Yeni Eğitim Projesi & Çalışması Kaydı</span>
            </h3>
            <p className="text-xs text-blue-200 mt-1">
              Malatya Eğitim Ekosistemi Merkezi Veri Tabanı
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/70 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* KVKK Notice */}
        <div className="bg-amber-50 px-6 py-2.5 border-b border-amber-200 flex items-center space-x-2 text-xs text-amber-800">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>KVKK Uyarısı:</strong> Öğrenci TC, telefon, ev adresi vb. kişisel veriler girilemez. Öğrenci grubu açıklaması (örn: &quot;10. Sınıf Kodlama Takımı (4 Öğrenci)&quot;) şeklinde olmalıdır.
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs text-slate-700">
          {/* Title */}
          <div>
            <label className="font-semibold block mb-1">
              Proje / Çalışma Adı <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Örn: Arslantepe Dijital STEM ve Çevre Koruma Projesi"
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>

          {/* Category & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">
                Çalışma Türü / Kategori <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ProjectCategory)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {(Object.keys(CATEGORY_METADATA) as ProjectCategory[]).map(catKey => (
                  <option key={catKey} value={catKey}>
                    {CATEGORY_METADATA[catKey].label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1">Yıl</label>
              <select
                value={year}
                onChange={e => setYear(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="2027">2027</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
          </div>

          {/* School Selection */}
          <div>
            <label className="font-semibold block mb-1">
              Kurum / Okul <span className="text-red-500">*</span>
            </label>
            <select
              value={schoolId}
              onChange={e => setSchoolId(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {schools.map(sch => (
                <option key={sch.id} value={sch.id}>
                  {sch.name} ({sch.type} - {sch.neighborhood})
                </option>
              ))}
            </select>
          </div>

          {/* Coordinator & Team */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">
                Danışman Öğretmen <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={coordinatorTeacher}
                onChange={e => setCoordinatorTeacher(e.target.value)}
                placeholder="Örn: Mehmet Özdemir (Bilişim Öğretmeni)"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">
                Öğrenci Grubu / Takım Bilgisi (KVKK Güvenli)
              </label>
              <input
                type="text"
                value={studentGroupDescription}
                onChange={e => setStudentGroupDescription(e.target.value)}
                placeholder="Örn: 11. Sınıf Robotik Kulübü (5 Öğrenci)"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Problem & Purpose */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Problem Durumu</label>
              <textarea
                rows={3}
                value={problemStatement}
                onChange={e => setProblemStatement(e.target.value)}
                placeholder="Projenin çözmeyi hedeflediği problem..."
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">
                Çalışmanın Amacı <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={purpose}
                onChange={e => setPurpose(e.target.value)}
                placeholder="Projenin temel hedefi ve amacı..."
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Method & Result */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Uygulama Süreci ve Yöntem</label>
              <textarea
                rows={3}
                value={implementationProcess}
                onChange={e => setImplementationProcess(e.target.value)}
                placeholder="Atölye çalışmaları, saha incelemeleri, tasarım aşamaları..."
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">
                Elde Edilen Sonuç ve Çıktılar <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={result}
                onChange={e => setResult(e.target.value)}
                placeholder="Elde edilen somut ürün, başarı veya kazanım..."
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Technologies & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Kullanılan Teknolojiler (Virgülle ayırın)</label>
              <input
                type="text"
                value={technologiesUsed}
                onChange={e => setTechnologiesUsed(e.target.value)}
                placeholder="Arduino, Python, 3D Yazıcı, ESP32"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Etiketler (Boşlukla ayırın)</label>
              <input
                type="text"
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="#STEM #Robotik #YapayZekâ"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* External Link */}
          <div>
            <label className="font-semibold block mb-1">Harici Bağlantı (Web / TwinSpace / Rapor Linki)</label>
            <input
              type="url"
              value={externalUrl}
              onChange={e => setExternalUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit button inside form */}
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
              <span>Kaydı Tamamla</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
