# Malatya Eğitim Ekosistemi Portalı

> **T.C. Millî Eğitim Bakanlığı • Malatya İl Millî Eğitim Müdürlüğü • Yeğitek İnovasyon Ağı**  
> *Okullar • Projeler • GençTek • STEM • eTwinning • Yenilikçi Sınıflar • Eğitim Teknolojileri*

---

## 📌 Proje Hakkında

**Malatya Eğitim Ekosistemi**, Malatya ilindeki 13 ilçeyi, tüm resmî eğitim kurumlarını ve okullarda gerçekleştirilen:
* 💻 **GençTek** çalışmaları ve akran atölyeleri
* 🔬 **STEM** laboratuvar ve disiplinlerarası modelleri (Science, Technology, Engineering, Mathematics)
* 🌍 **eTwinning** uluslararası ortaklıkları & TwinSpace portföyü
* 🚀 **Yenilikçi Sınıflar** (Geleceğin Öğrenme Laboratuvarı - FCL, VR & 3D atölyeleri)
* 🧪 **TÜBİTAK** projeleri (4006, 2204-A, 4004)
* 🔥 **TEKNOFEST** yarışma takımları ve İHA çalışmaları
* 🤖 **Yapay Zekâ** eğitimleri ve üretken AI uygulamaları
* 💡 **Yenilikçi Eğitim Uygulamaları** ve kültürel miras entegrasyonu

gibi çalışmaları tek bir merkezi dijital platformda kayıt altına alan, arşivleyen, harita üzerinde görselleştiren ve kurumlar arasında bağlantı kuran dijital eğitim ekosistemidir.

---

## 🏗️ 4 Katmanlı Sistem Mimarisi

1. **Katman 1 - Malatya Eğitim Kurumları:** İl Millî Eğitim Müdürlüğü merkezi koordinasyonu ve veri tabanı
2. **Katman 2 - İlçe Millî Eğitim Müdürlükleri:** 13 ilçe (*Battalgazi, Yeşilyurt, Akçadağ, Arapgir, Arguvan, Darende, Doğanşehir, Doğanyol, Hekimhan, Kale, Kuluncak, Pütürge, Yazıhan*) eğitim profilleri ve istatistikleri
3. **Katman 3 - Okullar:** MEB kurum kodu, iletişim, harita koordinatları, kurumsal profiller ve dinamik QR kodları
4. **Katman 4 - Okulların Projeleri ve Çalışmaları:** Ayrıntılı amaç, problem durumu, yöntem, sonuç, kullanılan teknolojiler ve onay süreçleri

---

## 🚀 Temel Özellikler

* **Büyük Arama Motoru:** Anlık metin araması ve hızlı arama etiketleri (*"Battalgazi liseler"*, *"STEM"*, *"GençTek"*, *"eTwinning"*, vb.)
* **Hızlı Erişim Kartları:** 10 ana modüle doğrudan yönlendiren görsel kartlar
* **İnteraktif Eğitim Haritası (Leaflet + OSM):** Katman açıp kapatabilme özelliği (Sadece STEM okulları, sadece GençTek okulları vb.)
* **Karekod (QR Kod) Sistemi:** Her okul ve her proje için standlarda ve panolarda kullanılabilir taranabilir ve indirilebilir QR profilleri
* **Etkinlik Takvimi:** Aylık, haftalık ve liste görünümleriyle tüm eğitim etkinlikleri
* **Dijital Eğitim Hafızası:** Yıllara göre (2024, 2025, 2026, 2027...) geçmiş çalışmalar arşivi
* **İçerik Onay Sistemi:** Taslak ➜ İnceleme Bekliyor ➜ Revizyon İstendi ➜ Onaylandı ➜ Yayınlandı akışı
* **Rol Bazlı Yetkilendirme Simülasyonu:** Super Admin, İl MEM, İlçe MEM, Okul Yöneticisi, Öğretmen, Ziyaretçi rolleri
* **Resmî Raporlama & CSV/Excel Aktarımı:** İstenen yıl ve alana göre anında döküm ve dışa aktarım
* **AI Destekli Semantik Arama:** Doğal dilde yazılan sorguları otomatik anlayan yapay zekâ asistanı
* **KVKK Uyumluluğu:** Öğrenci kişisel verileri maskelenmiş, kurumsal odaklı güvenli yapı

---

## 🛠️ Teknolojiler

* **Frontend:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack), [React 19](https://react.dev/)
* **Stil:** [Tailwind CSS 4](https://tailwindcss.com/)
* **Harita:** [Leaflet](https://leafletjs.com/) & OpenStreetMap
* **İkonlar:** [Lucide React](https://lucide.dev/)
* **Karekod:** [qrcode.react](https://www.npmjs.com/package/qrcode.react)
* **Dil:** TypeScript

---

## 💻 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# veya üretim derlemesi oluşturun
npm run build
npm start
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı kullanabilirsiniz.

---

## 📄 Lisans & Telif Hakkı

© 2026 T.C. Millî Eğitim Bakanlığı Malatya İl Millî Eğitim Müdürlüğü. Tüm hakları saklıdır.
