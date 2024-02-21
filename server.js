// server.js
import express from 'express';
import path from 'path';


const app = express();

// Middleware для разрешения CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Подключаем статический middleware для обслуживания файла Swagger JSON
app.use('/swagger.json', express.static(path.resolve('swagger.json')));


const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});











