require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const db = require('./config/database');


const app = express();
app.use(cors());
const PORT = 3333;

app.use(express.json());

// rota principal
app.get('/', (req, res) => {
  res.send('API rodando! 🚢');
});

// rotas de autenticação
app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});

// Criação da tabela users, se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('trabalhador', 'operador')) NOT NULL,
      registry_number TEXT
    )
  `);
});
