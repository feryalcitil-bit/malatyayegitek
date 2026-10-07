'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useEcosystem } from '@/context/EcosystemContext';
import { X, Download, Share2, ExternalLink, QrCode } from 'lucide-react';

export default function QrCodeModal() {
  const { qrModal, closeQrModal } = useEcosystem();

  if (!qrModal.isOpen) return null;

  const handleDownload = () => {
    const svg = document.getElementById('ecosystem-qr-code-svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `${qrModal.code || 'qr-kod'}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <QrCode className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="font-bold text-base">Dijital Karekod Profili</h3>
              <p className="text-xs text-blue-200">Malatya Eğitim Ekosistemi</p>
            </div>
          </div>
          <button
            onClick={closeQrModal}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-center">
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-2xl inline-block mx-auto shadow-inner mb-4">
            <QRCodeSVG
              id="ecosystem-qr-code-svg"
              value={qrModal.url || 'https://malatya.meb.gov.tr'}
              size={200}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/National_Emblem_of_Turkey.svg/120px-National_Emblem_of_Turkey.svg.png",
                x: undefined,
                y: undefined,
                height: 36,
                width: 36,
                excavate: true,
              }}
            />
          </div>

          <h4 className="font-bold text-slate-900 text-lg line-clamp-1">{qrModal.title}</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">{qrModal.subtitle}</p>

          <div className="mt-4 p-2.5 bg-blue-50 rounded-xl text-blue-900 text-xs flex items-center justify-between font-mono">
            <span className="truncate pr-2">Kod: {qrModal.code}</span>
            <span className="text-[11px] font-sans font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
              Doğrulanmış Kayıt
            </span>
          </div>

          <p className="text-[11px] text-slate-400 mt-3">
            * Okul panosunda, proje standında veya bilim fuarı afişinde doğrudan kullanıma uygundur.
          </p>

          {/* Action buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm shadow-md shadow-blue-500/20 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Görseli İndir</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(qrModal.url);
                alert('Bağlantı panoya kopyalandı: ' + qrModal.url);
              }}
              className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium text-sm transition cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Bağlantıyı Kopyala</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
