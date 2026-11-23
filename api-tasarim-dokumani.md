# API Tasarım Dokümanı (API Design Document)

Bu doküman, **Task It** REST API mimarisini, ara katman (middleware) yapısını, uç noktaları (endpoints) ve HTTP durum kodlarını detaylandırmaktadır.

## 1. Genel Mimari ve Standartlar
* **Mimari Yaklaşım:** Katmanlı RESTful API mimarisi (`Routes` -> `Middlewares` -> `Controllers` -> `Data`).
* **Temel URL (Base URL):** `http://localhost:5000`
* **Veri Formatı:** Tüm istek (Request) ve yanıt (Response) gövdeleri JSON formatındadır.

## 2. Ara Katmanlar (Middlewares)
1. **Logger Middleware (Zorunlu):** Sisteme gelen her HTTP isteğinin metodunu (`GET`, `POST`, `PUT`, `DELETE`), hedeflenen uç noktayı ve ISO formatındaki zaman damgasını konsola kaydeder.
2. **Validation Middleware (İsteğe Bağlı Pratik):** Yeni görev oluşturma isteklerinde `title`, `description`, `priority` ve `assignee` alanlarının varlığını denetler; eksik veri durumunda `400 Bad Request` döndürür.

## 3. Zorunlu CRUD Uç Noktaları (Görev Yönetimi)

| HTTP Metodu | Uç Nokta (Endpoint) | Açıklama | Başarılı Kod | Hata Kodları |
| :--- | :--- | :--- | :---: | :---: |
| `POST` | `/tasks` | Yeni bir görev oluşturur. | `201 Created` | `400 Bad Request` |
| `GET` | `/tasks` | Sistemdeki tüm görevleri listeler. | `200 OK` | - |
| `GET` | `/tasks/:id` | ID'si belirtilen tek bir görevin detayını getirir. | `200 OK` | `404 Not Found` |
| `PUT` | `/tasks/:id` | ID'si belirtilen görevin bilgilerini günceller. | `200 OK` | `404 Not Found` |
| `DELETE` | `/tasks/:id` | ID'si belirtilen görevi sistemden siler. | `200 OK` | `404 Not Found` |

### Örnek İstek ve Yanıtlar (CRUD)

**Yeni Görev Oluşturma (`POST /tasks`)**

*Request Body:*

    {
      "title": "Veritabanı Şeması",
      "description": "Veri modeli tasarım dokümanının hazırlanması",
      "priority": "medium",
      "assignee": "Süleyman"
    }

*Response (`201 Created`):*

    {
      "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      "title": "Veritabanı Şeması",
      "description": "Veri modeli tasarım dokümanının hazırlanması",
      "priority": "medium",
      "assignee": "Süleyman",
      "status": "pending",
      "createdAt": "2026-11-24T00:35:12.120Z"
    }

## 4. İsteğe Bağlı Gelişmiş Uç Noktalar

### Filtreleme, Arama ve Sayfalama
* `GET /tasks?status=completed` — Görev durumuna göre filtreler.
* `GET /tasks?priority=high` — Öncelik seviyesine göre filtreler.
* `GET /tasks?page=1&limit=10` — Sayfalama (pagination) uygular.
* `GET /tasks?sort=createdAt` — Oluşturulma tarihine göre sıralar.
* `GET /tasks/search?keyword=backend` — Başlık ve açıklamada anahtar kelime arar.
* `GET /tasks/assignee/:assignee` — Belirli bir çalışana atanan görevleri getirir.

### Raporlama Servisleri
* `GET /reports/completed` — Tamamlanan görev sayısını döndürür.
* `GET /reports/pending` — Bekleyen görev sayısını döndürür.
* `GET /reports/summary` — Toplam, tamamlanan ve bekleyen görev özetini döndürür.