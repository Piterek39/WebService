// Importowanie biblioteki Express
const express = require('express');
const mysql = require('mysql2/promise');
// Inicjalizacja aplikacji
const app = express();

// Ustawienie portu na 3000
const port = 3000;
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'db',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'example',
      database: process.env.DB_NAME || 'mydatabase',
    });

    console.log('Connected to MySQL database!');

    // Tworzenie tabeli, jeśli jeszcze nie istnieje
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        age INT
      )
    `);

    // Wstawianie danych, jeśli tabela jest pusta
    const [rows] = await connection.execute('SELECT COUNT(*) AS count FROM users');
    if (rows[0].count === 0) {
      await connection.execute('INSERT INTO users (name, age) VALUES (?, ?)', ['John Doe', 30]);
    }

    return connection;
  } catch (error) {
    console.error('Could not connect to MySQL:', error);
    throw error;
  }
}


// Definiowanie prostej trasy GET /hello
app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});
app.get('/users', async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const [results] = await connection.execute('SELECT * FROM users');
    res.json(results);  // Zwrócenie danych w formacie JSON
    connection.end();
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});
// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Serwis działa na porcie ${port}`);
});
//jakis kom
