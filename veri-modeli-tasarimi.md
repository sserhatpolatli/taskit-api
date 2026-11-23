# Veri Modeli Tasarımı (Data Model Design)

Bu doküman, **Task It** Görev ve Proje Yönetim Sistemi API'sinde kullanılan veri yapılarını, alan tiplerini, zorunluluk kurallarını ve doğrulama (validation) standartlarını tanımlamaktadır.

## 1. Veri Depolama Yaklaşımı
Sistem, çalışma zamanında hızlı veri okuma ve yazma işlemleri gerçekleştirmek amacıyla bellek içi (In-Memory) JSON dizisi (`data/taskData.js`) yapısını kullanmaktadır. Tüm veri alışverişi `application/json` formatında gerçekleşir.

## 2. Görev (Task) Veri Şeması

Sistemdeki her bir görev kaydı aşağıdaki veri modeline uygun olarak oluşturulur ve saklanır:

| Alan Adı | Veri Tipi | Zorunlu mu? | Varsayılan Değer | Açıklama ve Kısıtlamalar |
| :--- | :--- | :---: | :---: | :--- |
| `id` | `String (UUID v4)` | Otomatik | Sistem Üretir | Her görev için benzersiz kimlik numarası. |
| `title` | `String` | Evet | - | Görevin kısa başlığı. Boş bırakılamaz. |
| `description` | `String` | Evet | - | Görevin detaylı açıklaması. Boş bırakılamaz. |
| `assignee` | `String` | Evet | - | Görevin atandığı ekip üyesinin adı. |
| `priority` | `String (Enum)` | Evet | - | Öncelik seviyesi (`low`, `medium`, `high`). |
| `status` | `String (Enum)` | Hayır | `"pending"` | Görevin mevcut durumu (`pending`, `in-progress`, `completed`). |
| `createdAt` | `String (ISO 8601)` | Otomatik | Sistem Üretir | Görevin oluşturulma zaman damgası (`YYYY-MM-DDTHH:mm:ss.sssZ`). |

## 3. Örnek Görev (Task) JSON Nesnesi

    {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "title": "Backend API Geliştirme",
      "description": "Express.js kullanarak görev yönetim modülü CRUD endpointlerinin yazılması",
      "assignee": "Süleyman Serhat Polatlı",
      "priority": "high",
      "status": "in-progress",
      "createdAt": "2026-11-24T00:30:00.000Z"
    }

## 4. Raporlama Veri Modeli (Özet Çıktısı)
Raporlama servisleri (`GET /reports/summary`), mevcut görev dizisi üzerinde dinamik hesaplama yaparak aşağıdaki JSON yapısını döndürür:

    {
      "totalTasks": 12,
      "completedTasks": 5,
      "pendingTasks": 7
    }