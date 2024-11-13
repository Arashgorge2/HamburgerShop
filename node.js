// 1. ایمپورت کردن پکیج‌های مورد نیاز
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

// 2. ایجاد اپلیکیشن Express
const app = express();

// 3. استفاده از پکیج‌های میانی (Middleware)
// - `cors` برای اجازه دادن به درخواست‌ها از دامنه‌های مختلف.
// - `bodyParser.json()` برای پارس کردن داده‌های JSON در درخواست‌ها.
app.use(cors());
app.use(bodyParser.json());

// 4. تنظیمات اتصال به دیتابیس MySQL
const db = mysql.createConnection({
    host: 'localhost',         // آدرس سرور (معمولاً localhost)
    user: 'fastfood_user',     // نام کاربری دیتابیس
    password: 'password123',   // رمز عبور دیتابیس
    database: 'hamburgershop'  // نام دیتابیس
});

// 5. اتصال به دیتابیس MySQL
db.connect((error) => {
    if (error) {
        console.error('❌ Eror Connection ', error.message);
        return;
    }
    console.log('✅Connection Sucsess.');
});
app.get('/api/categories', (req, res) => {
    const query = 'SELECT * FROM categories';
    db.query(query, (error, results) => {
        if (error) {
            console.error('Fehler beim Abrufen der Kategorien:', error.message);
            return res.status(500).json({ error: 'Fehler beim Abrufen der Kategorien' });
        }
        res.json(results);
    });
});
app.delete('/api/hamburgers/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM hamburgers WHERE id = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        console.error('Fehler beim Löschen des Produkts:', error.message);
        return res.status(500).json({ error: 'Fehler beim Löschen des Produkts' });
      }
      res.json({ success: true, message: 'Produkt erfolgreich gelöscht.' });
    });
  });
// Endpunkt für Pizza
app.get('/api/pizzas', (req, res) => {
    const query = 'SELECT * FROM pizzas';
    db.query(query, (error, results) => {
      if (error) {
        console.error('Fehler beim Abrufen der Pizza-Daten:', error.message);
        return res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
      }
      res.json(results);
    });
  });
app.get('/api/hamburgers', (req, res) => {
    const query = 'SELECT * FROM hamburgers';
    db.query(query, (error, results) => {
      if (error) {
        console.error('Fehler beim Abrufen der Hamburger-Daten:', error.message);
        return res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
      }
      res.json(results);
    });
  });
app.get('/api/products', (req, res) => {
    const query = `
        SELECT products.id, products.name, products.description, products.price, products.imgUrl, categories.name AS category
        FROM products
        JOIN categories ON products.categoryId = categories.id
    `;
    db.query(query, (error, results) => {
        if (error) {
            console.error('❌ SQL-Abfragefehler beim Abrufen der Produkte:', error.message);
            return res.status(500).json({ error: `Datenbankfehler: ${error.message}` });
        }
        res.json(results);
    });
});
app.get('/api/getraenke', (req, res) => {
    const query = 'SELECT * FROM getraenke';
    db.query(query, (error, results) => {
      if (error) {
        console.error('Fehler beim Abrufen der Getränke-Daten:', error.message);
        return res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
      }
      res.json(results);
    });
  });

// 6. API برای لاگین
// - مسیر `/api/login` با متد POST
app.post("/api/login", (req, res) => {
    // 6.1 دریافت نام کاربری و رمز عبور از درخواست
    const { username, password } = req.body;

    // 6.2 کوئری SQL برای چک کردن نام کاربری و رمز عبور
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";

    // 6.3 اجرای کوئری به دیتابیس
    db.query(query, [username, password], (error, results) => {
        if (error) {
            // 6.4 اگر خطایی در دیتابیس وجود داشت
            return res.status(500).json({ error: 'Error Database' });
        }

        // 6.5 بررسی نتایج کوئری
        if (results.length > 0) {
            // اگر کاربر پیدا شد
            res.json({ success: true, message: 'Login Sucsess ', user: results[0] });
        } else {
            // اگر نام کاربری یا رمز عبور اشتباه بود
            res.json({ success: false, message: 'User Invalid'});
        }
    });
});

// 7. راه‌اندازی سرور
// - سرور به پورت 3000 گوش می‌دهد
app.listen(3000, () => {
    console.log("🚀 Server is Runing : http://localhost:3000");
});
