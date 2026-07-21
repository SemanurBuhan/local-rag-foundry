# 🔐 Yerel Siber Güvenlik Destek Asistanı (Foundry Local)

> Tamamen **çevrimdışı** çalışan, siber güvenlik dokümanlarınıza soru sorabildiğiniz bir yapay zeka asistanı.
> Bulut yok, API anahtarı yok, dış ağ çağrısı yok — hassas veriler cihazdan hiç çıkmaz.

**Microsoft AI Innovators Summer Internship** kapsamında geliştirilmiştir.

---

## 📌 Proje Nedir?

Güvenlik ekipleri hassas verilerle çalışır; bir bulut yapay zekasına soru sormak veri
sızıntısı riski taşır. Bu proje, **tamamen yerel (offline)** çalışan bir siber güvenlik
destek asistanıdır. İnternet bağlantısı olmayan veya güvenlik gereği izole (air-gapped)
ortamlarda, bir güvenlik analistinin sorularını yüklenen dokümanlardan cevaplar.

**RAG (Retrieval-Augmented Generation)** deseni sayesinde model, cevaplarını uydurmak
yerine yüklenen güvenlik dokümanlarından üretir; böylece daha az halüsinasyon ve
izlenebilir cevaplar sağlar.

### Örnek Sorular
- "SQL injection saldırısı nasıl önlenir?"
- "OWASP Top 10'da Broken Access Control nedir?"
- "Güvenli parola saklama için ne yapmalıyım?"
- "XSS saldırısı türleri nelerdir?"

---

## 🏗️ Mimari

Sistem, tek makinede çalışan 5 katmandan oluşur:

```mermaid
flowchart TD
    A[İstemci Katmanı<br/>HTML + Sohbet Arayüzü] --> B[Sunucu Katmanı<br/>Express.js + SSE]
    B --> C[RAG Pipeline<br/>Chat Engine + Chunker + Prompts]
    C --> D[Veri Katmanı<br/>SQLite + TF-IDF Vektörleri]
    C --> E[AI Katmanı<br/>Foundry Local + Phi-3.5 Mini]
    D -.-> C
    E -.-> C
```

### Soru-Cevap Akışı

```mermaid
sequenceDiagram
    participant K as Güvenlik Analisti
    participant S as Sunucu
    participant R as RAG Pipeline
    participant V as SQLite (Vektörler)
    participant M as Phi-3.5 Mini

    K->>S: Güvenlik sorusu gönderir
    S->>R: Soruyu iletir
    R->>V: İlgili doküman parçalarını arar (retrieval)
    V-->>R: En ilgili parçalar
    R->>M: Soru + bağlam (prompt)
    M-->>R: Üretilen cevap (generation)
    R-->>S: Cevap
    S-->>K: Cevabı gösterir
```

---

## 🛠️ Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| İstemci | HTML / CSS / JavaScript |
| Sunucu | Node.js + Express.js |
| Veri | SQLite (better-sqlite3) |
| Yapay Zeka | Foundry Local + Phi-3.5 Mini |
| Erişim (Retrieval) | TF-IDF vektörleştirme |

**Bağımlılıklar:** `express`, `foundry-local-sdk`, `better-sqlite3` (framework yok, Docker yok, build adımı yok)

---

## 📂 Bilgi Tabanı

Asistanın uzmanlık alanı `docs/` klasöründeki siber güvenlik dokümanlarından oluşur:

- `owasp-top-10.md` — OWASP Top 10 web uygulama güvenlik riskleri
- `ag-guvenligi-temelleri.md` — Temel ağ güvenliği kavramları
- `guvenli-kod-yazma.md` — Güvenli kod yazma pratikleri
- `saldiri-turleri.md` — Yaygın saldırı türleri (XSS, CSRF, phishing, ransomware...)
- `savunma-ve-araclar.md` — Savunma yöntemleri ve araçlar (SIEM, IDS/IPS, pentest)
- `kriptografi-ve-kimlik.md` — Kriptografi, hashing, JWT, OAuth, MFA
- `uygulama-ve-sistem-guvenligi.md` — API, bulut, container ve mobil güvenliği

Yeni bir doküman eklemek için `docs/` klasörüne `.md` dosyası koyup `npm run ingest` komutunu tekrar çalıştırman yeterli.

---

## 🚀 Kurulum ve Çalıştırma

> **Ön koşul:** [Node.js](https://nodejs.org) ve [Foundry Local](https://learn.microsoft.com/azure/ai-foundry/foundry-local/get-started) kurulu olmalıdır.

```bash
# 1. Repoyu klonla
git clone https://github.com/SemanurBuhan/local-rag-foundry.git
cd local-rag-foundry

# 2. Bağımlılıkları yükle
npm install

# 3. Dokümanları indeksle (docs/ klasöründeki .md dosyaları)
npm run ingest

# 4. Sunucuyu başlat
npm start
```

Ardından tarayıcıdan aç: **http://127.0.0.1:3000**

---

## 🎥 Proje Tanıtım Videosu

> Projenin ne yaptığını, özelliklerini ve bu projeden neler öğrendiğimi anlattığım video:

**▶️ ....

---

## 📚 Bu Projeden Neler Öğrendim?

- RAG (Retrieval-Augmented Generation) mimarisinin nasıl kurulduğunu
- Yerel (offline) LLM çalıştırmayı — Foundry Local & Phi-3.5 Mini
- TF-IDF ile basit ama etkili bir vektör arama (retrieval) yapmayı
- Express.js ile SSE (Server-Sent Events) kullanarak durum bildirimi göndermeyi
- Veri gizliliğinin (air-gapped / offline AI) neden önemli olduğunu
- Clean Code / SOLID prensiplerini gerçek bir projede uygulamayı
- Git branch stratejisi ile düzenli bir commit geçmişi oluşturmayı

---

## 📄 Dokümantasyon

Gereksinim analizi ve mühendislik dokümanı için: [GEREKSINIM_DOKUMANI.md](./GEREKSINIM_DOKUMANI.md)

---

## 📝 Lisans

MIT
