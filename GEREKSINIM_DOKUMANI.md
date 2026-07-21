# Gereksinim Dokümanı — Yerel RAG Uygulaması (Foundry Local)

**Proje:** Foundry Local ile Tamamen Yerel (Offline) RAG Destek Asistanı
**Program:** Microsoft AI Innovators Summer Internship
**Hazırlayan:** Sema
**Tarih:** 2026

> Bu doküman, "Yazılım Mühendisliği Temelleri" (Doç. Dr. Özal Yıldırım) kitabındaki
> Gereksinim Mühendisliği Süreci'ne (Ünite 2) uygun olarak hazırlanmıştır.

---

## 1. Projenin Tanımı

İnternet bağlantısının olmadığı ortamlarda (uzak saha, fabrika, yeraltı tesisi vb.)
laptop üzerinde tamamen çevrimdışı çalışan, alana özgü dokümanlar üzerinden soru-cevap
yapabilen bir yapay zeka destek asistanı. Uygulama, **RAG (Retrieval-Augmented
Generation)** desenini kullanarak modelin uydurmasını önler; cevapları yüklenen
dokümanlardan üretir. Hiçbir dış ağ çağrısı, API anahtarı veya bulut bağımlılığı yoktur.

---

## 2. Fizibilite Çalışması

| Fizibilite Türü | Değerlendirme |
|---|---|
| **Teknik** | Node.js kurulu; makine Foundry Local + Phi-3.5 Mini modelini (CPU/NPU) çalıştırabiliyor; yeterli RAM ve disk mevcut. |
| **Ekonomik** | Ek maliyet yok — tüm bileşenler açık kaynak ve ücretsiz; bulut/token ücreti yok. |
| **Operasyonel** | Kullanıcı tarayıcıdan basit bir sohbet arayüzü ile etkileşime girer; özel eğitim gerekmez. |
| **Hukuki** | Veriler cihazda kalır (KVKK/GDPR açısından avantaj); kullanılan kütüphaneler açık kaynak lisanslıdır. |
| **Zaman** | Kasıtlı olarak basit tutulan mimari (3-4 npm paketi) staj süresine uygundur. |

**Sonuç:** Proje teknik, ekonomik, operasyonel, hukuki ve zaman açısından uygulanabilir.

---

## 3. İşlevsel Gereksinimler

Aşağıdaki gereksinimler; tamlık, netlik, ölçülebilirlik ve gerçekçilik kriterlerine
göre yazılmıştır.

| ID | Gereksinim |
|---|---|
| İG-01 | Sistem, `docs/` klasöründeki `.md` dosyalarını okuyup parçalara (chunk) ayırabilmelidir. |
| İG-02 | Sistem, her doküman parçası için TF-IDF vektörü oluşturup SQLite veritabanında saklayabilmelidir. |
| İG-03 | Kullanıcı, tarayıcıdaki sohbet arayüzünden serbest metin şeklinde soru sorabilmelidir. |
| İG-04 | Sistem, sorulan soruya en ilgili doküman parçalarını getirip (retrieval) modele bağlam olarak vermelidir. |
| İG-05 | Sistem, yerel Phi-3.5 Mini modelini kullanarak cevabı üretmelidir (generation). |
| İG-06 | Sistem, model yükleme/hazır olma durumunu kullanıcıya (SSE ile) bildirmelidir. |
| İG-07 | Arayüzde hızlı erişim (quick-action) butonları bulunmalıdır. |

---

## 4. İşlevsel Olmayan Gereksinimler

| ID | Gereksinim |
|---|---|
| İOG-01 | **Gizlilik:** Sistem hiçbir dış ağ çağrısı yapmadan, tamamen çevrimdışı çalışmalıdır. |
| İOG-02 | **Taşınabilirlik:** Uygulama tek makinede, Docker veya karmaşık kurulum olmadan çalışabilmelidir. |
| İOG-03 | **Kullanılabilirlik:** Arayüz mobil uyumlu (responsive) olmalıdır. |
| İOG-04 | **Performans:** İlk çalıştırmadan sonra model önbelleğe alınmalı, sonraki açılışlar hızlı olmalıdır. |
| İOG-05 | **Sürdürülebilirlik:** Kod Clean Code / SOLID prensiplerine uygun, modüler yapıda yazılmalıdır. |

---

## 5. Kullanıcı Hikayeleri (User Stories)

- **US-01:** Bir *saha teknisyeni* olarak, *internet olmadan teknik dokümanlara soru sorabilmek* istiyorum; çünkü *çalıştığım sahada bağlantı yok.*
- **US-02:** Bir *kullanıcı* olarak, *cevabın hangi dokümandan geldiğini görebilmek* istiyorum; çünkü *cevaba güvenmek istiyorum.*
- **US-03:** Bir *kullanıcı* olarak, *sık sorulan konulara tek tıkla erişebilmek* istiyorum; çünkü *her seferinde yazmak istemiyorum.*
- **US-04:** Bir *yönetici* olarak, *verilerin cihaz dışına çıkmadığından emin olmak* istiyorum; çünkü *veri gizliliği yasal bir zorunluluk.*
- **US-05:** Bir *geliştirici* olarak, *yeni doküman ekleyip yeniden indeksleyebilmek* istiyorum; çünkü *bilgi tabanı zamanla büyüyecek.*

---

## 6. Doğrulama ve Onaylama (Verification & Validation)

- **Doğrulama:** Her işlevsel gereksinim için manuel test yapılır (örn. örnek soru sorulup ilgili doküman parçasının getirilip getirilmediği kontrol edilir).
- **Onaylama:** Gerçek kullanım senaryolarıyla (örnek sorularla) sistemin beklenen cevapları ürettiği doğrulanır.
- **Kabul Kriteri:** Sistem internet kapalıyken çalışıyor, sorulara doküman tabanlı cevap veriyor ve arayüz mobilde düzgün görünüyorsa proje kabul edilir.
