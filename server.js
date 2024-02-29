import express from 'express';
import path from 'path';
import mysql from 'mysql';

const app = express();

// Middleware для разрешения CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Подключение к базе данных MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '165962fylhtq',
    database: 'db_cruiz'
});

connection.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных MySQL:', err);
        return;
    }
    console.log('Подключение к базе данных MySQL успешно установлено');
});

// Подключаем статический middleware для обслуживания файла Swagger JSON
app.use('/swagger.json', express.static(path.resolve('swagger.json')));

// Маршрут для получения списка товаров
// Маршрут для получения списка товаров
app.get('/products', (req, res) => {
    // Выполните запрос к базе данных, чтобы получить список всех товаров
    connection.query('SELECT * FROM products', (error, results) => {
        if (error) {
            console.error('Ошибка при выполнении запроса к базе данных:', error);
            res.status(500).json({ message: 'Ошибка при получении списка товаров' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Продукты не найдены' });
            return;
        }
        res.json(results); // Отправьте список товаров в ответе на запрос
    });
});

// Обработчик для запроса информации о продукте по его ID
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    // Выполнение запроса к базе данных MySQL
    connection.query('SELECT * FROM products WHERE id = ?', [productId], (error, results) => {
        if (error) {
            console.error('Ошибка при выполнении запроса к базе данных:', error);
            res.status(500).json({ message: 'Ошибка при получении информации о продукте' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Продукт не найден' });
            return;
        }
        res.json(results[0]); // Отправка данных о продукте в формате JSON
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});


