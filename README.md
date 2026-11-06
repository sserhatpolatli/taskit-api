# TASK IT - Görev ve Proje Yönetim Sistemi API

Bir yazılım şirketinin ekip içerisindeki görevleri, projeleri ve çalışanların sorumluluklarını takip etmesi amacıyla Node.js ve Express.js kullanılarak geliştirilmiş bir REST API sistemidir.

##  Projenin Amacı ve Senaryosu
Bu sistem, görevlerin oluşturulmasını, çalışanlara atanmasını, durumlarının takip edilmesini, önceliklendirilmesini ve temel raporlama süreçlerini desteklemektedir. Tamamen REST API mantığında tasarlanmıştır.

##  Özellikler
- **Temel CRUD Operasyonları:** Görev oluşturma, listeleme, detay görüntüleme, güncelleme ve silme.
- **Sistem Loglama:** Tüm API isteklerini konsola yazdıran temel Logger ara katmanı.
- **Gelişmiş Listeleme (İsteğe Bağlı):** Görevleri duruma ve önceliğe göre filtreleme, anahtar kelime ile arama ve sayfalama özellikleri.
- **Veri Doğrulama (İsteğe Bağlı):** Eksik veya hatalı veri girişlerini engelleyen (400 Bad Request) Validation ara katmanı.
- **Raporlama Servisleri (İsteğe Bağlı):** Tamamlanan, bekleyen görev sayılarını ve genel sistem özetini sunan istatistiksel uç noktalar.

##  Kurulum Notu (Nasıl Çalıştırılır?)
Projenin bilgisayarınızda çalıştırılabilmesi için aşağıdaki adımları izleyin:

1. **Projeyi Klonlayın:**
   ```bash
   git clone [https://github.com/sserhatpolatli/taskit-api.git](https://github.com/sserhatpolatli/taskit-api.git)
   cd taskit-api

```

2. **Bağımlılıkları Yükleyin:**
```bash
npm install

```


3. **Sunucuyu Başlatın:**
```bash
npm run dev

```


*Sunucu varsayılan olarak `http://localhost:5000` portunda çalışacaktır.*

## 📡 API Uç Noktaları (Endpoints)

API, geliştirme sürecinde Postman üzerinden test edilecek şekilde yapılandırılmıştır.

* `POST /tasks` - Yeni görev ekler
* `GET /tasks` - Tüm görevleri listeler
* `GET /tasks/:id` - Belirli bir görevi getirir
* `PUT /tasks/:id` - Görevi günceller
* `DELETE /tasks/:id` - Görevi siler
* `GET /reports/summary` - Genel sistem özetini getirir