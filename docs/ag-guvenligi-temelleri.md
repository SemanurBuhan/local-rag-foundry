# Ağ Güvenliği Temelleri

Ağ güvenliği, bir bilgisayar ağını ve içindeki verileri yetkisiz erişim, kötüye
kullanım ve saldırılara karşı korumayı amaçlayan uygulama ve teknolojiler bütünüdür.

## Temel Güvenlik İlkeleri (CIA Üçlüsü)

Ağ güvenliği üç temel ilke üzerine kuruludur:

- **Gizlilik (Confidentiality):** Verilerin yalnızca yetkili kişiler tarafından
  erişilebilmesi. Şifreleme ile sağlanır.
- **Bütünlük (Integrity):** Verilerin izinsiz değiştirilmemesi. Hash fonksiyonları ve
  dijital imzalarla sağlanır.
- **Erişilebilirlik (Availability):** Verilere ve servislere ihtiyaç duyulduğunda
  erişilebilmesi. Yedekleme ve DDoS koruması ile sağlanır.

## Güvenlik Duvarı (Firewall)

Güvenlik duvarı, gelen ve giden ağ trafiğini önceden belirlenmiş kurallara göre izleyen
ve filtreleyen bir güvenlik sistemidir. İç ağ ile dış ağ (internet) arasında bir bariyer
görevi görür.

- **Paket filtreleme:** Paketleri IP adresi ve port numarasına göre denetler.
- **Durum denetimli (stateful) firewall:** Bağlantının durumunu takip eder.
- **Uygulama katmanı firewall:** Uygulama düzeyindeki trafiği inceler.

## Şifreleme (Encryption)

Şifreleme, verinin yetkisiz kişilerce okunamaması için anlaşılmaz hale getirilmesidir.

- **Simetrik şifreleme:** Aynı anahtar hem şifreleme hem çözme için kullanılır (örn. AES).
  Hızlıdır ama anahtar paylaşımı risklidir.
- **Asimetrik şifreleme:** Açık ve gizli anahtar çifti kullanılır (örn. RSA). Anahtar
  paylaşım sorununu çözer ama daha yavaştır.

## VPN (Sanal Özel Ağ)

VPN, iki nokta arasında şifreli bir tünel oluşturarak güvenli iletişim sağlar. Özellikle
halka açık ağlarda (kafe, otel Wi-Fi) verilerin korunması için kullanılır. Uzaktan
çalışanların kurum ağına güvenli erişimini de sağlar.

## Yaygın Ağ Saldırıları

- **DDoS (Dağıtık Hizmet Reddi):** Bir sunucuyu aşırı trafikle boğarak hizmet dışı bırakma.
- **Man-in-the-Middle (Ortadaki Adam):** Saldırganın iki taraf arasındaki iletişime
  gizlice girmesi. TLS/HTTPS kullanımı bunu önler.
- **Port Tarama:** Açık portları bulup zafiyet arama. Firewall ile sınırlanır.
- **ARP Spoofing:** Yerel ağda trafik yönlendirmesini manipüle etme.

## Ağ Segmentasyonu

Ağı daha küçük ve izole bölümlere ayırmaktır. Bir bölümdeki güvenlik ihlalinin diğer
bölümlere yayılmasını engeller. Örneğin, misafir Wi-Fi'sini kurumsal ağdan ayırmak.

## Sıfır Güven (Zero Trust) Yaklaşımı

"Asla güvenme, her zaman doğrula" ilkesine dayanır. Ağ içinde olsun ya da olmasın, her
erişim isteği doğrulanır. Geleneksel "içerideki güvenlidir" yaklaşımının aksine, hiçbir
kullanıcıya veya cihaza otomatik güven verilmez.

## İzleme ve Log Yönetimi

Ağ trafiğinin sürekli izlenmesi, anormal aktivitelerin erken tespit edilmesini sağlar.
IDS (Saldırı Tespit Sistemi) ve IPS (Saldırı Önleme Sistemi) bu amaçla kullanılır.
Loglar düzenli incelenmeli ve güvenli bir şekilde saklanmalıdır.
