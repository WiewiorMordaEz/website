const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

// Inicjalizacja bazy danych SQLite
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err.message);
    } else {
        console.log('Połączono z bazą danych SQLite');
    }
});

// Tworzenie tabeli użytkowników, jeśli nie istnieje
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    remember_me TEXT NOT NULL
)`);

app.use(bodyParser.json());
app.use(express.static('public')); // Serwuje pliki statyczne z folderu "public"

// Endpoint do rejestracji
app.post('/api/register', (req, res) => {
    const { username, password, rememberMe } = req.body;

    // Dodajemy "zapamiętano" jeśli checkbox jest zaznaczony
    const rememberStatus = rememberMe ? 'zapamiętano' : 'nie zapamiętano';

    // Zapisujemy dane użytkownika do bazy danych
    const query = `INSERT INTO users (username, password, remember_me) VALUES (?, ?, ?)`;
    db.run(query, [username, password, rememberStatus], function (err) {
        if (err) {
            console.error('Błąd zapisu do bazy danych:', err.message);
            res.status(500).json({ message: 'Błąd serwera.' });
        } else {
            res.status(201).json({ message: 'Użytkownik zapisany pomyślnie!' });
        }
    });
});

// Uruchom serwer
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
