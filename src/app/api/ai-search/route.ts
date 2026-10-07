import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Geçersiz sorgu.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API anahtarı yapılandırılmamış.' },
        { status: 500 }
      );
    }

    const systemInstruction = `Sen "Malatya Eğitim Ekosistemi" portalının akıllı yapay zekâ asistanısın.
Malatya ilindeki 13 ilçe: battalgazi, yesilyurt, akcadag, arapgir, arguvan, darende, dogansehir, doganyol, hekimhan, kale, kuluncak, puturge, yazihan.
Kategoriler: genctek (GençTek), stem (STEM), etwinning (eTwinning), innovative_classroom (Yenilikçi Sınıflar), tubitak (TÜBİTAK), teknofest (TEKNOFEST), ai (Yapay Zekâ), robotics_coding (Robotik & Kodlama), innovative_practice (Yenilikçi Uygulamalar).

Kullanıcının sorgusunu analiz et ve YALNIZCA geçerli bir JSON döndür. Başka hiçbir markdown veya metin ekleme.
JSON Şeması:
{
  "aiSummary": "Kullanıcıya yönelik Türkçe 1-2 cümlelik profesyonel eğitim özeti ve önerisi",
  "year": "2026" veya null,
  "districtId": "battalgazi" veya null,
  "districtName": "Battalgazi" veya null,
  "category": "stem" veya null,
  "keywords": ["anahtar", "kelimeler"]
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${systemInstruction}\n\nKullanıcı Sorgusu: "${prompt}"`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API error:', errText);
      return NextResponse.json(
        { error: 'Gemini API yanıt vermedi.', details: errText },
        { status: 502 }
      );
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json(
        { error: 'Boş model yanıtı alındı.' },
        { status: 500 }
      );
    }

    const parsedJson = JSON.parse(rawText);
    return NextResponse.json({ success: true, result: parsedJson });
  } catch (error: any) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası', message: error.message },
      { status: 500 }
    );
  }
}
