// Importowanie biblioteki Express
const express = require('express');

// Inicjalizacja aplikacji
const app = express();

// Ustawienie portu na 3000
const port = 3000;

// Definiowanie prostej trasy GET /hello
app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Serwis działa na porcie ${port}`);
});

