import './Login.css';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        localStorage.setItem('token', dados.token);
        localStorage.setItem('user', JSON.stringify(dados.user));
        setMensagem('Login realizado com sucesso!');

        if (dados.user.role === 'operador') {
          window.location.href = '/dashboard-operador';
        } else {
          window.location.href = '/dashboard-trabalhador';
        }
      } else {
        setMensagem(dados.error || 'Erro ao fazer login');
      }
    } catch (erro) {
      console.error(erro);
      setMensagem('Erro ao conectar com o servidor');
    }
  };

  return (
    <div className="login-background">
      <div className="glass-form">
        <h1 className="welcome-title">Bem-vindo à <span>Waves</span></h1>
        <p className="subtitle">Sistema de chamadas eficaz para trabalhadores portuários.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Entrar</button>
        </form>

        {mensagem && (
          <p style={{ marginTop: '1rem', color: mensagem.includes('sucesso') ? '#4ade80' : '#f87171' }}>
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
