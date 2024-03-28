import express from 'express';
import path from 'path';
import mysql from 'mysql';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());




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





// Маршрут для получения списка пользователей
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Ошибка при выполнении запроса к базе данных:', error);
            res.status(500).json({ message: 'Ошибка при получении списка пользователей' });
            return;
        }
        res.json(results);
    });
});

// Маршрут для получения информации о пользователе по его ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    connection.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
            console.error('Ошибка при выполнении запроса к базе данных:', error);
            res.status(500).json({ message: 'Ошибка при получении информации о пользователе' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Пользователь не найден' });
            return;
        }
        res.json(results[0]);
    });
});




// Маршрут для получения списка товаров
app.get('/products', (req, res) => {
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

app.post('/users', (req, res) => {
    // Получаем номер телефона из тела запроса
    const userPhoneNumber = req.body.phoneNumber;

    connection.query('SELECT * FROM users WHERE phoneNumber = ?', [userPhoneNumber], (error, results) => {
        if (error) {
            console.error('Ошибка при выполнении запроса к базе данных:', error);
            res.status(500).json({ message: 'Ошибка при получении пользователя' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ isValid: false, message: 'Вы с таким номером телефона не зарегистрированы' });
            return;
        }
        res.json({ isValid: true, message: 'Номер телефона найден в базе данных', user: results[0] });
    });
});


const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
