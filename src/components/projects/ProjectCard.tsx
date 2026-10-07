'use client';

import React from 'react';
import { Project } from '@/types/ecosystem';
import { useEcosystem } from '@/context/EcosystemContext';
import { CATEGORY_METADATA } from '@/data/ecosystemData';
import {
  ExternalLink,
  QrCode,
  Calendar,
  MapPin,
  School as SchoolIcon,
  Eye,
  Award,
  Tag
} from 'lucide-react';

export default function ProjectCard({ project }: { project: Project }) {
  const { schools, districts, setSelectedProject, setSelectedSchool, openQrModal } = useEcosystem();

  const school = schools.find(s => s.id === project.schoolId);
  const district = districts.find(d => d.id === project.districtId);
  const meta = CATEGORY_METADATA[project.category] || CATEGORY_METADATA.stem;

  const handleQrClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQrModal({
      title: project.title,
      subtitle: `${school?.name || ''} • ${meta.label} (${project.year})`,
      url: project.externalUrl || `https://malatya.meb.gov.tr/proje/${project.id}`,
      code: project.id.toUpperCase(),
      type: 'project'
    });
  };

  return (
    <div
      onClick={() => setSelectedProject(project)}
      className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
    >
      {/* Top Banner / Color Accent */}
      <div className={`h-2.5 w-full bg-gradient-to-r ${meta.color}`} />

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Header Metadata */}
          <div className="flex items-center justify-between gap-2">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-xl flex items-center space-x-1.5 ${meta.bgLight}`}
            >
              <span>{meta.label}</span>
            </span>

            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{project.year}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{project.views}</span>
              </span>
            </div>
          </div>

          {/* Project Title */}
          <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition leading-snug line-clamp-2">
            {project.title}
          </h3>

          {/* Purpose / Summary excerpt */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {project.purpose}
          </p>

          {/* Special highlights if STEM, eTwinning or TEKNOFEST */}
          {project.stemDetails && (
            <div className="flex items-center gap-1.5 pt-0.5">
              {project.stemDetails.fields.map(f => (
                <span
                  key={f}
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100/70 text-emerald-800"
                >
                  {f[0]}
                </span>
              ))}
              <span className="text-[11px] text-emerald-700 font-medium ml-1 truncate">
                {project.stemDetails.product}
              </span>
            </div>
          )}

          {project.teknofestDetails?.award && (
            <div className="flex items-center space-x-1 text-xs text-red-600 font-semibold bg-red-50 p-1.5 rounded-lg">
              <Award className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="truncate">{project.teknofestDetails.award}</span>
            </div>
          )}

          {project.tubitakDetails?.awardStatus && (
            <div className="flex items-center space-x-1 text-xs text-cyan-700 font-semibold bg-cyan-50 p-1.5 rounded-lg">
              <Award className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
              <span className="truncate">{project.tubitakDetails.awardStatus}</span>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[10px] text-slate-400 self-center">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: School & District info */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div
            onClick={e => {
              e.stopPropagation();
              if (school) setSelectedSchool(school);
            }}
            className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition truncate max-w-[70%]"
          >
            <SchoolIcon className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate font-medium">{school?.name || 'Okul'}</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-[11px]">{district?.name}</span>
            <button
              onClick={handleQrClick}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              title="Karekod Görüntüle"
            >
              <QrCode className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
