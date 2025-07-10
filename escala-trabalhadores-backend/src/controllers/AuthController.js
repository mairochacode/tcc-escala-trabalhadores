const { insertUser } = require('../models/UserModel');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
const { getUserByEmail } = require('../models/UserModel');


const register = async (req, res) => {
  const { name, email, password, role, registry_number } = req.body;

  // Validação básica
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
  }

  // Se for trabalhador, precisa do número de registro
  if (role === 'trabalhador' && !registry_number) {
    return res.status(400).json({ error: 'Número de registro é obrigatório para trabalhadores.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await insertUser({
      name,
      email,
      password: hashedPassword,
      role,
      registry_number: role === 'trabalhador' ? registry_number : null
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso!', id: result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: 'Email e senha obrigatórios.' });

  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    const senhaCorreta = await bcrypt.compare(password, user.password);
    if (!senhaCorreta) return res.status(401).json({ error: 'Senha incorreta.' });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login realizado com sucesso!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        registry_number: user.registry_number,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no login.' });
  }
};

module.exports = {
  register,
  login,
};
