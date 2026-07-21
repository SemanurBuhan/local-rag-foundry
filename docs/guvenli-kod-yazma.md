# Güvenli Kod Yazma Pratikleri

Güvenli kod yazma, yazılımın en baştan güvenlik açıkları barındırmayacak şekilde
geliştirilmesidir. Güvenliği sonradan eklenen bir özellik olarak değil, geliştirme
sürecinin ayrılmaz bir parçası olarak ele almak gerekir.

## 1. Girdi Doğrulama (Input Validation)

Kullanıcıdan gelen hiçbir veriye güvenilmemelidir. Tüm girdiler doğrulanmalı ve
temizlenmelidir.

- Beklenen veri türünü, uzunluğunu ve formatını kontrol et.
- Beyaz liste (whitelist) yaklaşımını tercih et — izin verilenleri tanımla, yasakları değil.
- Doğrulamayı her zaman sunucu tarafında yap; istemci tarafı doğrulama sadece kullanıcı
  deneyimi içindir, güvenlik için yeterli değildir.

## 2. Enjeksiyon Saldırılarını Önleme

- **SQL Injection:** Parametreli sorgular (prepared statements) kullan. Kullanıcı girdisini
  asla doğrudan sorguya birleştirme.
- **Command Injection:** Sistem komutlarına kullanıcı girdisi ekleme; gerekiyorsa katı
  doğrulama uygula.
- **XSS (Cross-Site Scripting):** Kullanıcı girdisini HTML'e yazmadan önce escape et.
  Modern framework'lerin otomatik escape özelliklerini kullan.

## 3. Kimlik Doğrulama ve Oturum Yönetimi

- Parolaları asla düz metin (plaintext) saklama; bcrypt, scrypt veya Argon2 ile hash'le.
- Her parola için benzersiz bir "salt" değeri kullan.
- Oturum kimliklerini güvenli üret, giriş sonrası yenile ve makul sürede sona erdir.
- Çok faktörlü kimlik doğrulama (MFA) uygula.

## 4. Hata Yönetimi ve Loglama

- Hata mesajlarında sistem detayı (veritabanı yapısı, dosya yolları, yığın izi) gösterme.
  Bu bilgiler saldırgana yardımcı olur.
- Kullanıcıya genel bir hata mesajı göster, teknik detayı sadece güvenli loglara yaz.
- Hassas verileri (parola, token) loglara yazma.

## 5. En Az Yetki İlkesi (Principle of Least Privilege)

Her bileşen ve kullanıcı, yalnızca görevini yapmak için gereken minimum yetkiye sahip
olmalıdır. Örneğin, sadece okuma yapan bir servis yazma yetkisine sahip olmamalıdır.

## 6. Hassas Verilerin Korunması

- Hassas verileri hem saklarken (at rest) hem iletirken (in transit) şifrele.
- API anahtarlarını, parolaları ve gizli bilgileri kod içine gömme; ortam değişkenleri
  (environment variables) veya güvenli kasa (vault) kullan.
- `.env` dosyalarını versiyon kontrolüne (Git) ekleme; `.gitignore`'a dahil et.

## 7. Bağımlılık Güvenliği

- Üçüncü parti kütüphaneleri güncel tut.
- Bilinen açıkları düzenli tara (`npm audit`, `pip-audit` gibi araçlarla).
- Yalnızca güvenilir ve bakımı yapılan kütüphaneleri kullan.

## 8. Güvenli Varsayılanlar (Secure Defaults)

Sistem, varsayılan olarak en güvenli durumda olmalıdır. Kullanıcının güvenliği ayrıca
etkinleştirmesi gerekmemeli; tersine, gerekiyorsa bilinçli olarak gevşetmelidir.

## 9. Kod İncelemesi ve Test

- Güvenlik odaklı kod incelemeleri (code review) yap.
- Statik kod analizi araçları (SAST) kullan.
- Güvenlik testlerini CI/CD pipeline'ına dahil et.

## Özet

Güvenli kod yazmanın temeli, "kullanıcıya asla güvenme, her katmanda doğrula ve minimum
yetki ver" felsefesidir. Güvenlik, tek seferlik bir işlem değil, sürekli dikkat gerektiren
bir süreçtir.
