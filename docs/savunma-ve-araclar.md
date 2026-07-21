# Savunma Yöntemleri ve Güvenlik Araçları

Bu doküman, siber güvenlikte kullanılan temel savunma stratejilerini, izleme sistemlerini
ve sızma testi (pentest) araçlarını açıklar.

## Katmanlı Güvenlik (Defense in Depth)

Tek bir güvenlik önlemine güvenmek yerine, birden fazla savunma katmanı kullanma
stratejisidir. Bir katman aşılsa bile diğerleri korumayı sürdürür. Örnek katmanlar:
firewall, IDS/IPS, şifreleme, erişim kontrolü, kullanıcı eğitimi.

## SIEM (Güvenlik Bilgi ve Olay Yönetimi)

SIEM, bir kurumdaki farklı kaynaklardan (sunucular, firewall'lar, uygulamalar) gelen
güvenlik loglarını merkezi olarak toplayan, ilişkilendiren ve analiz eden sistemdir.
Anormal davranışları tespit edip uyarı üretir.

**Yaygın SIEM araçları:** Splunk, IBM QRadar, Elastic Security (ELK), Microsoft Sentinel.

**Faydaları:** Gerçek zamanlı tehdit tespiti; olay müdahale desteği; uyumluluk raporlaması;
merkezi log yönetimi.

## IDS ve IPS

- **IDS (Saldırı Tespit Sistemi):** Ağ veya sistem trafiğini izler ve şüpheli aktivite
  tespit ettiğinde uyarı verir. Pasif bir sistemdir — sadece tespit eder, engellemez.
- **IPS (Saldırı Önleme Sistemi):** IDS'in yaptığına ek olarak, tespit ettiği tehdidi
  aktif olarak engeller. Trafiği durdurabilir.

**Tespit yöntemleri:**
- **İmza tabanlı:** Bilinen saldırı desenlerini arar. Bilinen tehditlerde etkilidir.
- **Anomali tabanlı:** Normal davranıştan sapmaları arar. Yeni/bilinmeyen tehditleri
  yakalayabilir ama yanlış alarm oranı yüksek olabilir.

**Yaygın araçlar:** Snort, Suricata, Zeek (Bro).

## Güvenlik Duvarı (Firewall) Türleri

- **Ağ firewall'u:** Ağ trafiğini IP ve port bazında filtreler.
- **Web Application Firewall (WAF):** Web uygulamalarına özel; SQL injection, XSS gibi
  uygulama katmanı saldırılarını engeller.
- **Next-Generation Firewall (NGFW):** Geleneksel firewall'a ek olarak uygulama farkındalığı,
  IPS ve tehdit istihbaratı sunar.

## Sızma Testi (Penetration Testing)

Sızma testi, bir sistemin güvenliğini gerçek bir saldırganın bakış açısıyla, kontrollü ve
yetkili bir şekilde test etme sürecidir. Amaç, açıkları kötü niyetli kişilerden önce bulmaktır.

**Aşamalar:**
1. **Keşif (Reconnaissance):** Hedef hakkında bilgi toplama.
2. **Tarama (Scanning):** Açık portları ve servisleri belirleme.
3. **Erişim Sağlama (Exploitation):** Bulunan açıkları kullanma.
4. **Erişimi Sürdürme:** Sistemde kalıcılık sağlama.
5. **Raporlama:** Bulguları ve önerileri belgeleme.

**Pentest türleri:** Black box (bilgi yok), white box (tam bilgi), gray box (kısmi bilgi).

## Yaygın Güvenlik Araçları

- **Nmap:** Ağ keşfi ve port tarama aracı. Açık portları ve çalışan servisleri belirler.
- **Wireshark:** Ağ trafiğini yakalayıp analiz eden paket analiz aracı.
- **Metasploit:** Açıkları test etmek için kullanılan sızma testi çerçevesi.
- **Burp Suite:** Web uygulama güvenlik testi için kullanılan proxy tabanlı araç.
- **OWASP ZAP:** Açık kaynak web uygulama güvenlik tarayıcısı.
- **Nessus / OpenVAS:** Zafiyet tarama araçları — sistemlerdeki bilinen açıkları tespit eder.
- **John the Ripper / Hashcat:** Parola kırma ve güç testi araçları.

## Antivirüs ve EDR

- **Antivirüs:** Bilinen zararlı yazılımları imza tabanlı tespit eder.
- **EDR (Endpoint Detection and Response):** Uç noktalarda (bilgisayar, sunucu) davranış
  tabanlı tehdit tespiti ve müdahale sağlar. Gelişmiş tehditlere karşı antivirüsten daha etkilidir.

## Yama Yönetimi (Patch Management)

Yazılım ve sistemlerdeki güvenlik açıklarını kapatmak için güncellemelerin düzenli ve
zamanında uygulanması sürecidir. Zero-day ve bilinen açıklara karşı en temel savunmalardan biridir.

## Yedekleme ve Kurtarma

Düzenli yedekleme, ransomware ve veri kaybına karşı en etkili savunmadır. 3-2-1 kuralı
önerilir: 3 kopya, 2 farklı ortam, 1 tanesi çevrimdışı/uzak konumda.
