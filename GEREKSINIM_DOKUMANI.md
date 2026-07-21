# Gereksinim Dokümanı — Yerel Siber Güvenlik Destek Asistanı (Foundry Local)

**Proje:** Foundry Local ile Tamamen Yerel (Offline) Siber Güvenlik Destek Asistanı
**Program:** Microsoft AI Innovators Summer Internship
**Hazırlayan:** Sema
**Tarih:** 2026

> Bu doküman, "Yazılım Mühendisliği Temelleri" (Doç. Dr. Özal Yıldırım) kitabındaki
> Gereksinim Mühendisliği Süreci'ne (Ünite 2) uygun olarak hazırlanmıştır.

---

## 1. Projenin Tanımı

Güvenlik gereği izole (air-gapped) veya internet bağlantısı olmayan ortamlarda, laptop
üzerinde tamamen çevrimdışı çalışan bir siber güvenlik destek asistanı. Uygulama,
**RAG (Retrieval-Augmented Generation)** desenini kullanarak modelin uydurmasını önler;
cevapları yüklenen siber güvenlik dokümanlarından üretir. Hiçbir dış ağ çağrısı, API
anahtarı veya bulut bağımlılığı yoktur — bu sayede hassas veriler cihaz dışına çıkmaz.

---

## 2. Fizibilite Çalışması

| Fizibilite Türü | Değerlendirme |
|---|---|
| **Teknik** | Node.js kurulu; makine Foundry Local + Phi-3.5 Mini modelini (CPU/NPU/GPU) çalıştırabiliyor; yeterli RAM ve disk mevcut. |
| **Ekonomik** | Ek maliyet yok — tüm bileşenler açık kaynak ve ücretsiz; bulut/token ücreti yok. |
| **Operasyonel** | Güvenlik analisti tarayıcıdan basit bir sohbet arayüzü ile etkileşime girer; özel eğitim gerekmez. |
| **Hukuki** | Veriler cihazda kalır (KVKK/GDPR açısından avantaj); kullanılan kütüphaneler açık kaynak lisanslıdır. |
| **Zaman** | Kasıtlı olarak basit tutulan mimari (3-4 npm paketi) staj süresine uygundur. |

**Sonuç:** Proje teknik, ekonomik, operasyonel, hukuki ve zaman açısından uygulanabilir.

---

## 3. İşlevsel Gereksinimler

Aşağıdaki gereksinimler; tamlık, netlik, ölçülebilirlik ve gerçekçilik kriterlerine
göre yazılmıştır.

| ID | Gereksinim |
|---|---|
| İG-01 | Sistem, `docs/` klasöründeki siber güvenlik `.md` dosyalarını okuyup parçalara (chunk) ayırabilmelidir. |
| İG-02 | Sistem, her doküman parçası için TF-IDF vektörü oluşturup SQLite veritabanında saklayabilmelidir. |
| İG-03 | Kullanıcı, tarayıcıdaki sohbet arayüzünden serbest metin şeklinde güvenlik sorusu sorabilmelidir. |
| İG-04 | Sistem, sorulan soruya en ilgili doküman parçalarını getirip (retrieval) modele bağlam olarak vermelidir. |
| İG-05 | Sistem, yerel Phi-3.5 Mini modelini kullanarak cevabı üretmelidir (generation). |
| İG-06 | Sistem, model yükleme/hazır olma durumunu kullanıcıya (SSE ile) bildirmelidir. |
| İG-07 | Arayüzde sık sorulan güvenlik konuları için hızlı erişim (quick-action) butonları bulunmalıdır. |

---

## 4. İşlevsel Olmayan Gereksinimler

| ID | Gereksinim |
|---|---|
| İOG-01 | **Gizlilik:** Sistem hiçbir dış ağ çağrısı yapmadan, tamamen çevrimdışı çalışmalıdır (air-gapped uyumlu). |
| İOG-02 | **Taşınabilirlik:** Uygulama tek makinede, Docker veya karmaşık kurulum olmadan çalışabilmelidir. |
| İOG-03 | **Kullanılabilirlik:** Arayüz mobil uyumlu (responsive) olmalıdır. |
| İOG-04 | **Performans:** İlk çalıştırmadan sonra model önbelleğe alınmalı, sonraki açılışlar hızlı olmalıdır. |
| İOG-05 | **Sürdürülebilirlik:** Kod Clean Code / SOLID prensiplerine uygun, modüler yapıda yazılmalıdır. |
| İOG-06 | **Güvenilirlik:** Sistem, bilgi tabanında olmayan bir soru için uydurmamalı, bilgisinin olmadığını belirtmelidir. |

---

## 5. Kullanıcı Hikayeleri (User Stories)

- **US-01:** Bir *güvenlik analisti* olarak, *internet olmadan güvenlik dokümanlarına soru sorabilmek* istiyorum; çünkü *izole (air-gapped) bir ortamda çalışıyorum.*
- **US-02:** Bir *kullanıcı* olarak, *cevabın hangi dokümandan geldiğini görebilmek* istiyorum; çünkü *güvenlik önerisine güvenmek istiyorum.*
- **US-03:** Bir *analist* olarak, *OWASP Top 10 gibi sık konulara tek tıkla erişebilmek* istiyorum; çünkü *her seferinde yazmak istemiyorum.*
- **US-04:** Bir *güvenlik yöneticisi* olarak, *hassas verilerin cihaz dışına çıkmadığından emin olmak* istiyorum; çünkü *veri gizliliği kritik bir gereksinim.*
- **US-05:** Bir *geliştirici* olarak, *yeni güvenlik dokümanı ekleyip yeniden indeksleyebilmek* istiyorum; çünkü *bilgi tabanı zamanla büyüyecek.*

---

## 6. Doğrulama ve Onaylama (Verification & Validation)

- **Doğrulama:** Her işlevsel gereksinim için manuel test yapılır (örn. "SQL injection nasıl önlenir?" sorusu sorulup ilgili doküman parçasının getirilip getirilmediği kontrol edilir).
- **Onaylama:** Gerçek kullanım senaryolarıyla (örnek güvenlik sorularıyla) sistemin beklenen cevapları ürettiği doğrulanır.
- **Kabul Kriteri:** Sistem internet kapalıyken çalışıyor, güvenlik sorularına doküman tabanlı cevap veriyor ve arayüz mobilde düzgün görünüyorsa proje kabul edilir.
