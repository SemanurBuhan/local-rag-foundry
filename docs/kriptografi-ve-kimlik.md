# Kriptografi ve Kimlik Doğrulama

Bu doküman, verilerin korunmasında kullanılan kriptografik yöntemleri ve modern kimlik
doğrulama/yetkilendirme mekanizmalarını açıklar.

## Hashing (Özetleme)

Hashing, bir veriyi geri döndürülemez şekilde sabit uzunlukta bir değere dönüştürmedir.
Şifrelemenin aksine hashing tek yönlüdür — hash'ten orijinal veriye dönülemez.

**Parola saklamada kullanımı:** Parolalar asla düz metin saklanmaz; hash'lenerek saklanır.
Giriş sırasında girilen parolanın hash'i, kayıtlı hash ile karşılaştırılır.

**Güçlü hash algoritmaları:** bcrypt, scrypt, Argon2 (parola için önerilir — kasıtlı yavaştır).
**Zayıf/eski algoritmalar:** MD5, SHA1 (parola için kullanılmamalı, kırılabilir).

**Salt:** Her parolaya eklenen benzersiz rastgele değerdir. Aynı parolaların aynı hash'e
sahip olmasını önler ve rainbow table saldırılarını engeller.

## Şifreleme (Encryption)

Şifreleme, veriyi bir anahtar kullanarak okunamaz hale getirir ve doğru anahtarla geri
çözülebilir. Hashing'den farkı, çift yönlü olmasıdır.

- **Simetrik şifreleme:** Aynı anahtar hem şifreleme hem çözme için kullanılır.
  Örnek: AES. Hızlıdır, büyük veri için idealdir; ama anahtar paylaşımı risklidir.
- **Asimetrik şifreleme:** Açık anahtar (public key) ile şifrelenir, gizli anahtar
  (private key) ile çözülür. Örnek: RSA, ECC. Anahtar paylaşım sorununu çözer, daha yavaştır.

**Hibrit yaklaşım:** TLS gibi protokoller, anahtar değişimi için asimetrik, veri aktarımı
için simetrik şifreleme kullanır — ikisinin avantajını birleştirir.

## Dijital İmza

Dijital imza, bir mesajın bütünlüğünü ve göndericinin kimliğini doğrular. Gönderici
mesajı gizli anahtarıyla imzalar, alıcı göndericinin açık anahtarıyla doğrular.

## TLS/SSL

TLS (Transport Layer Security), istemci ve sunucu arasındaki iletişimi şifreleyen
protokoldür. HTTPS'in temelini oluşturur. MITM saldırılarını önler ve veri gizliliğini sağlar.

## Kimlik Doğrulama (Authentication) ve Yetkilendirme (Authorization)

- **Authentication (Kimlik Doğrulama):** "Sen kimsin?" sorusuna cevap verir. Kullanıcının
  iddia ettiği kişi olduğunu doğrular.
- **Authorization (Yetkilendirme):** "Neye erişebilirsin?" sorusuna cevap verir. Doğrulanmış
  kullanıcının hangi kaynaklara erişebileceğini belirler.

## Çok Faktörlü Kimlik Doğrulama (MFA)

MFA, kimlik doğrulamada birden fazla kanıt türü kullanır:
- **Bildiğin bir şey:** Parola, PIN.
- **Sahip olduğun bir şey:** Telefon, güvenlik anahtarı, OTP uygulaması.
- **Olduğun bir şey:** Parmak izi, yüz tanıma (biyometrik).

MFA, parola çalınsa bile hesabı korur; en etkili güvenlik önlemlerinden biridir.

## JWT (JSON Web Token)

JWT, taraflar arasında güvenli bilgi aktarımı için kullanılan, imzalı bir token formatıdır.
Üç bölümden oluşur: Header (başlık), Payload (veri), Signature (imza).

**Kullanım:** Kullanıcı giriş yaptıktan sonra sunucu bir JWT üretir; kullanıcı sonraki
isteklerde bu token'ı gönderir, sunucu imzayı doğrulayarak kimliği teyit eder.

**Güvenlik notları:** Token'ları HTTPS üzerinden ilet; hassas veriyi payload'a koyma
(payload sadece base64'tür, şifreli değildir); makul son kullanma süresi (expiry) belirle;
güçlü bir imzalama anahtarı kullan.

## OAuth 2.0 ve OpenID Connect

- **OAuth 2.0:** Bir uygulamanın, kullanıcının parolasını görmeden başka bir servisteki
  kaynaklarına sınırlı erişim almasını sağlayan yetkilendirme çerçevesidir. Örnek:
  "Google ile giriş yap" butonu.
- **OpenID Connect (OIDC):** OAuth 2.0 üzerine kurulu, kimlik doğrulama katmanı ekleyen
  protokoldür. Kullanıcının kim olduğunu doğrular.

## Oturum Yönetimi (Session Management)

- Oturum kimliklerini (session ID) güvenli ve rastgele üret.
- Giriş sonrası oturum kimliğini yenile (session fixation'ı önlemek için).
- Çerezlerde `HttpOnly`, `Secure` ve `SameSite` özniteliklerini kullan.
- Oturumları makul bir süre sonra sonlandır (timeout).

## En İyi Uygulamalar

- Parolaları güçlü algoritmalarla ve salt ile hash'le.
- Mümkün olan her yerde MFA uygula.
- İletişimi her zaman TLS ile şifrele.
- Anahtarları ve gizli bilgileri güvenli sakla (kasa/vault), koda gömme.
- Kimlik doğrulama ile yetkilendirmeyi ayrı ele al.
