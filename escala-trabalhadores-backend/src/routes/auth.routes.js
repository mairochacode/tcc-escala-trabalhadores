const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/AuthController');

router.get('/login', (req, res) => {
  res.send('Rota de login funcionando!');
});

// Rota de cadastro
router.post('/register', register);
router.post('/login', login);

module.exports = router;
