import "../../styles/Login.css";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");

  const users = [
    {
      id: 1,
      name: "Operador",
      email: "operador@porto.com",
      password: "123456",
      role: "operador",
    },
    {
      id: 2,
      name: "Rafael",
      email: "rafael@porto.com",
      password: "123456",
      role: "trabalhador",
    },
    {
      id: 3,
      name: "Jonas",
      email: "jonas@porto.com",
      password: "123456",
      role: "trabalhador",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const userEncontrado = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!userEncontrado) {
      setMensagem("E-mail ou senha inválidos.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(userEncontrado));
    setMensagem("Login realizado com sucesso!");

    if (userEncontrado.role === "operador") {
      window.location.href = "/dashboard-operador";
    } else {
      window.location.href = "/dashboard-trabalhador";
    }
  };

  return (
    <div className="login-background">
      <div className="glass-form">
        <h1 className="welcome-title">
          Bem-vindo à <span>Waves</span>
        </h1>

        <p className="subtitle">
          Sistema de chamadas eficaz para trabalhadores portuários.
        </p>

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
          <p
            style={{
              marginTop: "1rem",
              color: mensagem.includes("sucesso") ? "#4ade80" : "#f87171",
            }}
          >
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
