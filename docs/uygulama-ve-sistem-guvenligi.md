# Uygulama ve Sistem Güvenliği

Bu doküman, modern uygulama mimarilerinde (API, bulut, container, mobil) karşılaşılan
güvenlik risklerini ve korunma yöntemlerini açıklar.

## API Güvenliği

API'ler (Uygulama Programlama Arayüzleri) sistemler arası iletişimi sağlar ve saldırılar
için yaygın bir hedeftir.

**Yaygın API riskleri:**
- **Broken Object Level Authorization:** Bir kullanıcının başka kullanıcının nesnesine
  erişebilmesi (IDOR).
- **Aşırı veri açığa çıkarma:** API'nin gereğinden fazla veri döndürmesi.
- **Kimlik doğrulama eksikliği:** Yetkisiz erişime açık uç noktalar.
- **Rate limiting eksikliği:** Kötüye kullanım ve DDoS'a açıklık.

**Önlemler:** Her uç noktada kimlik doğrulama ve yetkilendirme uygula; sadece gerekli
veriyi döndür; rate limiting kullan; API anahtarlarını güvenli sakla; girdiyi doğrula;
HTTPS zorunlu kıl.

## Bulut Güvenliği (Cloud Security)

Bulut ortamlarında (AWS, Azure, Google Cloud) güvenlik, paylaşılan sorumluluk modeline
dayanır: sağlayıcı altyapıyı, müşteri ise verilerini ve yapılandırmasını korur.

**Yaygın bulut riskleri:**
- Yanlış yapılandırılmış depolama (herkese açık S3 bucket'ları).
- Aşırı geniş erişim izinleri (IAM politikaları).
- Şifrelenmemiş veriler.
- Yetersiz izleme ve loglama.

**Önlemler:** En az yetki ilkesi (IAM); verileri şifrele (at rest ve in transit);
depolama erişimini kısıtla; yapılandırmaları düzenli denetle; bulut güvenlik duruş
yönetimi (CSPM) araçları kullan; MFA etkinleştir.

## Container ve Docker Güvenliği

Container'lar (Docker gibi) uygulamaları izole ortamlarda çalıştırır ama kendi güvenlik
zorlukları vardır.

**Riskler:**
- Güvenilmeyen veya güncel olmayan imajlar.
- Container'ın aşırı yetkiyle (root) çalışması.
- İmaj içine gömülü gizli bilgiler (secrets).
- İzolasyon zafiyetleri.

**Önlemler:** Resmi/güvenilir imajlar kullan; imajları güvenlik açıkları için tara
(Trivy, Clair); container'ları root olmayan kullanıcıyla çalıştır; gizli bilgileri imaja
gömme (secret yönetimi kullan); imajları güncel tut; gereksiz bileşenleri çıkar (minimal imaj).

## Mobil Uygulama Güvenliği

Mobil uygulamalar hem cihazda hem sunucuda güvenlik gerektirir.

**Riskler:**
- Cihazda güvensiz veri saklama (şifresiz).
- Zayıf iletişim güvenliği.
- Ters mühendislik (reverse engineering) ile kod analizi.
- Yetersiz kimlik doğrulama.

**Önlemler:** Hassas veriyi cihazda şifreli sakla; tüm iletişimi TLS ile yap; sertifika
sabitleme (certificate pinning); kodu karmaşıklaştır (obfuscation); sunucu tarafında da
doğrulama yap; güvenli anahtar saklama (Keychain/Keystore).

## İşletim Sistemi ve Sunucu Güvenliği (Hardening)

Sistem sıkılaştırma (hardening), bir sistemin saldırı yüzeyini azaltma sürecidir.

**Uygulamalar:**
- Gereksiz servisleri ve portları kapat.
- Varsayılan hesapları ve parolaları değiştir.
- Güncellemeleri düzenli uygula.
- En az yetki ilkesini uygula.
- Güçlü erişim kontrolleri ve loglama kur.
- Güvenlik duvarı yapılandır.

## Güvenli Yazılım Geliştirme Yaşam Döngüsü (SSDLC)

Güvenliği geliştirme sürecinin her aşamasına entegre etme yaklaşımıdır:
- **Tasarım:** Tehdit modellemesi.
- **Geliştirme:** Güvenli kod yazma, kod incelemesi.
- **Test:** Statik (SAST) ve dinamik (DAST) güvenlik testleri.
- **Dağıtım:** Güvenli yapılandırma, secret yönetimi.
- **Bakım:** Yama yönetimi, izleme.

## DevSecOps

DevSecOps, güvenliği DevOps sürecine entegre eder — "güvenlik herkesin sorumluluğu"
ilkesine dayanır. Güvenlik testleri CI/CD pipeline'ına otomatik olarak dahil edilir,
böylece açıklar erken ve hızlı tespit edilir.

## Sıfır Güven Mimarisi (Zero Trust)

"Asla güvenme, her zaman doğrula" ilkesine dayanır. Ağ içinde veya dışında olsun, her
erişim isteği doğrulanır ve yetkilendirilir. Mikro-segmentasyon, sürekli doğrulama ve
en az yetki bu mimarinin temelidir.
