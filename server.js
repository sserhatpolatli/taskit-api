const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const reportRoutes = require('./routes/reportRoutes');
const loggerMiddleware = require('./middlewares/loggerMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.status(200).json({
        sistem: "TASK IT Görev ve Proje Yönetim API",
        durum: "Aktif ve sorunsuz çalışıyor",
        mesaj: "API uç noktalarını test etmek için Postman kullanabilirsiniz.",
        anaUcNoktalar: [
            "/tasks",
            "/reports/summary"
        ]
    });
});

app.use('/tasks', taskRoutes);
app.use('/reports', reportRoutes);

app.use((req, res) => {
    res.status(404).json({
        hata: "404 - Uç nokta bulunamadı",
        mesaj: "Lütfen geçerli bir API adresi (örneğin: /tasks) girdiğinizden emin olun."
    });
});

app.listen(PORT, () => {
    console.log(` TASK IT API ${PORT} portunda sorunsuz bir şekilde çalışıyor...`);
    console.log(` Tarayıcınızda kontrol etmek için: http://localhost:${PORT}`);
});