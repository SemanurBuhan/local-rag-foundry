# Yaygın Siber Saldırı Türleri

Bu doküman, web ve sistem güvenliğinde en sık karşılaşılan saldırı türlerini, nasıl
çalıştıklarını ve nasıl önleneceklerini açıklar.

## Cross-Site Scripting (XSS)

XSS, saldırganın bir web sayfasına kötü amaçlı JavaScript kodu enjekte etmesidir. Bu kod,
sayfayı ziyaret eden diğer kullanıcıların tarayıcısında çalışır.

**Türleri:**
- **Stored (Kalıcı) XSS:** Zararlı kod sunucuda saklanır (örn. bir yorumda) ve her
  görüntüleyene bulaşır.
- **Reflected (Yansıyan) XSS:** Zararlı kod URL veya form üzerinden gönderilir, anında
  yansıtılır.
- **DOM-based XSS:** Zararlı kod tamamen istemci tarafında, DOM manipülasyonu ile çalışır.

**Önlemler:** Kullanıcı girdisini HTML'e yazmadan önce escape et; Content Security Policy
(CSP) uygula; modern framework'lerin otomatik escape özelliklerini kullan.

## Cross-Site Request Forgery (CSRF)

CSRF, giriş yapmış bir kullanıcının bilgisi olmadan, onun adına istenmeyen bir işlem
yaptırılmasıdır. Örneğin kullanıcı bir bankada oturumu açıkken, zararlı bir siteye
tıklaması sonucu para transferi tetiklenebilir.

**Önlemler:** CSRF token kullan; SameSite çerez özniteliğini ayarla; kritik işlemlerde
yeniden kimlik doğrulama iste.

## Brute-Force (Kaba Kuvvet) Saldırıları

Parola veya şifreleme anahtarını, tüm olasılıkları deneyerek kırma girişimidir.
Sözlük saldırısı (dictionary attack) bunun yaygın kullanılan parolaları deneyen bir türüdür.

**Önlemler:** Başarısız giriş denemelerini sınırla (rate limiting); hesap kilitleme
uygula; CAPTCHA kullan; MFA zorunlu kıl; güçlü parola politikaları belirle.

## Phishing (Oltalama)

Kullanıcıyı sahte bir siteye veya e-postaya inandırarak kimlik bilgilerini çalma
saldırısıdır. Sosyal mühendisliğin en yaygın biçimidir.

**Türleri:** Spear phishing (hedefli), whaling (üst düzey yöneticileri hedefleme),
smishing (SMS ile), vishing (sesli arama ile).

**Önlemler:** Kullanıcı farkındalık eğitimi; e-posta filtreleme; gönderen doğrulama
(SPF, DKIM, DMARC); şüpheli bağlantılara tıklamama.

## SQL Injection

Güvenilmeyen girdinin SQL sorgusuna dahil edilmesiyle veritabanına yetkisiz erişim
sağlanmasıdır. Kimlik doğrulama atlatma, veri sızdırma veya silme mümkün olabilir.

**Önlemler:** Parametreli sorgular (prepared statements); ORM kullanımı; girdi doğrulama;
en az yetki ilkesi.

## Man-in-the-Middle (MITM)

Saldırganın iki taraf arasındaki iletişime gizlice girip verileri dinlemesi veya
değiştirmesidir. Genellikle güvensiz Wi-Fi ağlarında görülür.

**Önlemler:** TLS/HTTPS kullanımı; sertifika doğrulama; VPN; güvensiz ağlardan kaçınma.

## DDoS (Dağıtık Hizmet Reddi)

Bir sistemi çok sayıda kaynaktan gelen aşırı trafikle boğarak hizmet dışı bırakma
saldırısıdır.

**Önlemler:** Trafik filtreleme; CDN ve DDoS koruma servisleri; rate limiting; ölçeklenebilir altyapı.

## Zero-Day Saldırıları

Henüz yamanmamış, üreticinin bile bilmediği bir güvenlik açığından yararlanan saldırılardır.
En tehlikeli saldırı türlerinden biridir çünkü savunması hazır değildir.

**Önlemler:** Katmanlı güvenlik (defense in depth); davranış tabanlı tespit; hızlı yama
yönetimi; en az yetki ilkesi.

## Ransomware (Fidye Yazılımı)

Kurbanın dosyalarını şifreleyip, çözme anahtarı için fidye talep eden zararlı yazılımdır.

**Önlemler:** Düzenli ve izole yedekleme; e-posta ve ek dosya filtreleme; güncel antivirüs;
kullanıcı eğitimi; en az yetki ilkesi.

## Sosyal Mühendislik

Teknik açık yerine insan psikolojisini hedefleyen saldırılardır. Kullanıcıyı kandırarak
bilgi veya erişim elde edilir. Phishing, pretexting (senaryo uydurma), baiting (yem atma)
gibi biçimleri vardır.

**Önlemler:** Farkındalık eğitimi; bilgi paylaşımı politikaları; kimlik doğrulama
prosedürleri; şüpheci yaklaşım kültürü.
