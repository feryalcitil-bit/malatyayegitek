export type ProjectCategory =
  | 'genctek'
  | 'stem'
  | 'etwinning'
  | 'innovative_classroom'
  | 'tubitak'
  | 'teknofest'
  | 'ai'
  | 'robotics_coding'
  | 'innovative_practice';

export type ProjectStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'revision_requested'
  | 'published'
  | 'archived';

export type UserRole =
  | 'super_admin'
  | 'il_mem_admin'
  | 'ilce_mem_admin'
  | 'school_admin'
  | 'teacher'
  | 'visitor';

export type EducationLevel = 'İlkokul' | 'Ortaokul' | 'Lise' | 'BİLSEM' | 'Halk Eğitimi' | 'Özel Eğitim';

export type SchoolType =
  | 'Fen Lisesi'
  | 'Anadolu Lisesi'
  | 'Mesleki ve Teknik Anadolu Lisesi'
  | 'İmam Hatip Lisesi'
  | 'Sosyal Bilimler Lisesi'
  | 'Bilim ve Sanat Merkezi (BİLSEM)'
  | 'Ortaokul'
  | 'İlkokul'
  | 'Halk Eğitimi Merkezi';

export interface District {
  id: string;
  name: string;
  slug: string;
  memManager: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  totalSchools: number;
  totalStudents: number;
  totalTeachers: number;
  coordinates: [number, number]; // [lat, lng]
  description: string;
}

export interface School {
  id: string;
  name: string;
  code: string; // Kurum kodu
  districtId: string;
  neighborhood: string;
  address: string;
  phone: string;
  email: string;
  type: SchoolType;
  level: EducationLevel;
  website: string;
  coordinates: [number, number]; // [lat, lng]
  logo?: string;
  image?: string;
  description: string;
  featured?: boolean;
}

export interface StemDetails {
  fields: ('Science' | 'Technology' | 'Engineering' | 'Mathematics')[];
  problem: string;
  purpose: string;
  method: string;
  product: string;
  result: string;
}

export interface ETwinningDetails {
  partnerCountries: string[];
  twinSpaceUrl?: string;
  web2Tools: string[];
  theme: string;
  ageGroup: string;
}

export interface InnovativeClassroomDetails {
  roomName: string;
  roomType: string;
  technologies: string[];
  equipment: string[];
  learningApproach: string;
}

export interface TubitakDetails {
  program: 'TÜBİTAK 4006' | 'TÜBİTAK 2204-A' | 'TÜBİTAK 2204-B' | 'TÜBİTAK 4004' | 'TÜBİTAK 4005' | 'Diğer';
  awardStatus?: string;
}

export interface TeknofestDetails {
  teamName: string;
  competitionCategory: string;
  studentCount: number;
  award?: string;
}

export interface AiDetails {
  aiSubcategory: 'Yapay Zekâ Eğitimi' | 'Üretken Yapay Zekâ' | 'Eğitimde Yapay Zekâ' | 'AI Destekli Materyaller' | 'Bilgisayarlı Görü' | 'Makine Öğrenmesi' | 'AI Etiği';
  aiToolsUsed: string[];
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  schoolId: string;
  districtId: string;
  year: number;
  coordinatorTeacher: string;
  studentGroupDescription: string; // KVKK safe representation, e.g. "11. Sınıf Bilişim Kulübü (5 Öğrenci)"
  problemStatement?: string;
  purpose: string;
  method?: string;
  implementationProcess?: string;
  result: string;
  outcomes?: string;
  technologiesUsed: string[];
  tags: string[];
  images: string[];
  videoUrl?: string;
  fileUrl?: string;
  externalUrl?: string;
  status: ProjectStatus;
  featured?: boolean;
  views: number;
  createdAt: string;

  // Category specific sub-details
  stemDetails?: StemDetails;
  etwinningDetails?: ETwinningDetails;
  classroomDetails?: InnovativeClassroomDetails;
  tubitakDetails?: TubitakDetails;
  teknofestDetails?: TeknofestDetails;
  aiDetails?: AiDetails;
}

export interface EducationalEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  districtId: string;
  schoolId?: string;
  category: ProjectCategory | 'genel' | 'egitim';
  type: 'Atölye' | 'Bilim Fuarı' | 'Yarışma' | 'Öğretmen Eğitimi' | 'Sergi' | 'Seminer' | 'Hackathon' | 'Festival';
  targetAudience: string;
  participantCount?: number;
  description: string;
  location: string;
  registrationLink?: string;
}

export interface EducationNews {
  id: string;
  title: string;
  date: string;
  districtId?: string;
  schoolId?: string;
  category: string;
  summary: string;
  content: string;
  imageUrl: string;
  videoUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
}

export interface FilterState {
  searchQuery: string;
  districtId: string;
  category: string;
  year: string;
  level: string;
  technology: string;
  tag: string;
}
