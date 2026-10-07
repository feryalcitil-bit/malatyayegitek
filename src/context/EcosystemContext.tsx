'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  District,
  School,
  Project,
  EducationalEvent,
  EducationNews,
  UserRole,
  ProjectStatus,
  FilterState
} from '@/types/ecosystem';
import {
  MALATYA_DISTRICTS,
  MALATYA_SCHOOLS,
  MALATYA_PROJECTS,
  MALATYA_EVENTS,
  MALATYA_NEWS
} from '@/data/ecosystemData';

interface QrModalState {
  isOpen: boolean;
  title: string;
  subtitle: string;
  url: string;
  code: string;
  type: 'school' | 'project';
}

interface EcosystemContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  districts: District[];
  schools: School[];
  projects: Project[];
  events: EducationalEvent[];
  news: EducationNews[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Modals & Active Selections
  selectedSchool: School | null;
  setSelectedSchool: (school: School | null) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  selectedDistrict: District | null;
  setSelectedDistrict: (district: District | null) => void;
  
  qrModal: QrModalState;
  openQrModal: (data: Omit<QrModalState, 'isOpen'>) => void;
  closeQrModal: () => void;

  aiSearchOpen: boolean;
  setAiSearchOpen: (open: boolean) => void;

  // Actions
  addSchool: (school: School) => void;
  addProject: (project: Project) => void;
  updateProjectStatus: (projectId: string, status: ProjectStatus) => void;
  toggleProjectFeatured: (projectId: string) => void;
  deleteProject: (projectId: string) => void;
  addEvent: (event: EducationalEvent) => void;
}

const initialFilters: FilterState = {
  searchQuery: '',
  districtId: 'all',
  category: 'all',
  year: 'all',
  level: 'all',
  technology: 'all',
  tag: 'all'
};

const EcosystemContext = createContext<EcosystemContextType | undefined>(undefined);

export function EcosystemProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>('visitor');
  const [districts] = useState<District[]>(MALATYA_DISTRICTS);
  const [schools, setSchools] = useState<School[]>(MALATYA_SCHOOLS);
  const [projects, setProjects] = useState<Project[]>(MALATYA_PROJECTS);
  const [events, setEvents] = useState<EducationalEvent[]>(MALATYA_EVENTS);
  const [news] = useState<EducationNews[]>(MALATYA_NEWS);
  
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

  const [qrModal, setQrModal] = useState<QrModalState>({
    isOpen: false,
    title: '',
    subtitle: '',
    url: '',
    code: '',
    type: 'school'
  });

  const [aiSearchOpen, setAiSearchOpen] = useState(false);

  // Load any persisted user custom items from localStorage if available
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem('malatya_custom_projects');
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        setProjects(prev => [...parsed, ...prev]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const openQrModal = (data: Omit<QrModalState, 'isOpen'>) => {
    setQrModal({ ...data, isOpen: true });
  };

  const closeQrModal = () => {
    setQrModal(prev => ({ ...prev, isOpen: false }));
  };

  const addSchool = (newSchool: School) => {
    setSchools(prev => [newSchool, ...prev]);
  };

  const addProject = (newProject: Project) => {
    setProjects(prev => {
      const updated = [newProject, ...prev];
      try {
        const userProjects = updated.filter(p => p.id.startsWith('usr-'));
        localStorage.setItem('malatya_custom_projects', JSON.stringify(userProjects));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateProjectStatus = (projectId: string, status: ProjectStatus) => {
    setProjects(prev =>
      prev.map(p => (p.id === projectId ? { ...p, status } : p))
    );
  };

  const toggleProjectFeatured = (projectId: string) => {
    setProjects(prev =>
      prev.map(p => (p.id === projectId ? { ...p, featured: !p.featured } : p))
    );
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const addEvent = (newEvent: EducationalEvent) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  return (
    <EcosystemContext.Provider
      value={{
        userRole,
        setUserRole,
        districts,
        schools,
        projects,
        events,
        news,
        filters,
        setFilters,
        resetFilters,
        selectedSchool,
        setSelectedSchool,
        selectedProject,
        setSelectedProject,
        selectedDistrict,
        setSelectedDistrict,
        qrModal,
        openQrModal,
        closeQrModal,
        aiSearchOpen,
        setAiSearchOpen,
        addSchool,
        addProject,
        updateProjectStatus,
        toggleProjectFeatured,
        deleteProject,
        addEvent
      }}
    >
      {children}
    </EcosystemContext.Provider>
  );
}

export function useEcosystem() {
  const context = useContext(EcosystemContext);
  if (!context) {
    throw new Error('useEcosystem must be used within an EcosystemProvider');
  }
  return context;
}
