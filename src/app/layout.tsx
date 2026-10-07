import type { Metadata } from 'next';
import './globals.css';
import { EcosystemProvider } from '@/context/EcosystemContext';

export const metadata: Metadata = {
  title: 'Malatya Eğitim Ekosistemi | Okullar • Projeler • GençTek • STEM • eTwinning',
  description:
    'Malatya ilindeki tüm eğitim kurumları, GençTek, STEM, eTwinning, Yenilikçi Sınıflar, TÜBİTAK, TEKNOFEST ve yapay zekâ projelerinin merkezi dijital platformu.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        <EcosystemProvider>{children}</EcosystemProvider>
      </body>
    </html>
  );
}
