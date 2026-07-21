# OWASP Top 10 — Web Uygulama Güvenlik Riskleri

OWASP Top 10, web uygulamalarındaki en kritik güvenlik risklerini listeleyen ve
düzenli olarak güncellenen bir farkındalık dokümanıdır. Aşağıda her risk kategorisi,
ne olduğu ve nasıl önleneceği ile birlikte açıklanmıştır.

## A01: Broken Access Control (Bozuk Erişim Kontrolü)

Erişim kontrolü, kullanıcıların yalnızca yetkili oldukları kaynaklara erişmesini sağlar.
Bu kontrolün bozuk olması, bir kullanıcının başka kullanıcıların verilerine erişmesine
veya yetkisi olmayan işlemleri yapmasına yol açar.

**Örnek:** Bir kullanıcının URL'deki kimlik numarasını değiştirerek başka bir kullanıcının
hesabına erişmesi (IDOR - Insecure Direct Object Reference).

**Önlemler:**
- Erişim kontrolünü sunucu tarafında zorunlu kıl, istemciye güvenme.
- Varsayılan olarak her şeyi reddet (deny by default), sadece açıkça izin verilenlere izin ver.
- Kullanıcı kimliğini oturumdan al, istekten değil.

## A02: Cryptographic Failures (Kriptografik Hatalar)

Hassas verilerin şifrelenmeden saklanması veya iletilmesi bu kategoriye girer.

**Önlemler:**
- Hassas verileri (parola, kredi kartı) her zaman şifrele.
- İletişimde TLS (HTTPS) kullan.
- Parolaları bcrypt, scrypt veya Argon2 gibi güçlü algoritmalarla hash'le.
- Eski ve zayıf algoritmalardan (MD5, SHA1) kaçın.

## A03: Injection (Enjeksiyon)

Güvenilmeyen kullanıcı girdisinin bir komuta veya sorguya dahil edilmesiyle oluşur.
SQL injection en yaygın türüdür.

**SQL Injection örneği:** Kullanıcı girdisi doğrudan SQL sorgusuna eklenirse, saldırgan
`' OR '1'='1` gibi bir girdiyle kimlik doğrulamayı atlayabilir.

**Önlemler:**
- Parametreli sorgular (prepared statements) kullan.
- ORM kütüphaneleri tercih et.
- Kullanıcı girdisini asla doğrudan sorguya ekleme.
- Girdiyi doğrula ve temizle (input validation).

## A04: Insecure Design (Güvensiz Tasarım)

Güvenliğin en baştan tasarıma dahil edilmemesinden kaynaklanır. Kod düzeyinde değil,
mimari düzeyinde bir eksikliktir.

**Önlemler:**
- Tehdit modellemesi (threat modeling) yap.
- Güvenli tasarım desenleri kullan.
- Güvenliği geliştirme yaşam döngüsünün başından itibaren düşün.

## A05: Security Misconfiguration (Güvenlik Yanlış Yapılandırması)

Varsayılan hesapların açık bırakılması, gereksiz servislerin çalışması veya hata
mesajlarının fazla bilgi sızdırması gibi durumlardır.

**Önlemler:**
- Gereksiz özellikleri, portları ve hesapları kapat.
- Varsayılan parolaları değiştir.
- Hata mesajlarında sistem detayı gösterme.

## A06: Vulnerable and Outdated Components (Güncel Olmayan Bileşenler)

Bilinen güvenlik açıkları olan eski kütüphane ve bağımlılıkların kullanılmasıdır.

**Önlemler:**
- Bağımlılıkları düzenli güncelle.
- `npm audit` gibi araçlarla açıkları tara.
- Kullanılmayan bağımlılıkları kaldır.

## A07: Identification and Authentication Failures (Kimlik Doğrulama Hataları)

Zayıf parola politikaları, oturum yönetimi hataları veya brute-force korumasının
olmaması bu kategoriye girer.

**Önlemler:**
- Çok faktörlü kimlik doğrulama (MFA) uygula.
- Güçlü parola politikaları belirle.
- Başarısız giriş denemelerini sınırla.
- Oturum kimliklerini giriş sonrası yenile.

## A08: Software and Data Integrity Failures (Bütünlük Hataları)

Doğrulanmamış kaynaklardan gelen kod veya verinin güvenilmesiyle oluşur.

**Önlemler:**
- Dijital imzalarla bütünlüğü doğrula.
- Güvenilir kaynaklardan bileşen kullan.
- CI/CD pipeline'ının güvenliğini sağla.

## A09: Security Logging and Monitoring Failures (Loglama ve İzleme Hataları)

Saldırıların tespit edilememesine yol açan yetersiz loglama ve izlemedir.

**Önlemler:**
- Giriş denemelerini ve kritik işlemleri logla.
- Logları merkezi olarak topla ve izle.
- Şüpheli aktiviteler için uyarı mekanizmaları kur.

## A10: Server-Side Request Forgery (SSRF)

Uygulamanın, saldırganın kontrol ettiği bir URL'ye istek yapmaya zorlanmasıdır.

**Önlemler:**
- Kullanıcının sağladığı URL'leri doğrula ve beyaz listeye al.
- İç ağ kaynaklarına erişimi kısıtla.
- Gereksiz yönlendirmeleri engelle.
