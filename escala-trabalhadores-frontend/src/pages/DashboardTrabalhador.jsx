function DashboardTrabalhador() {
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1>Bem-vindo, {user?.name} 🧰</h1>
      <p>Você está logado como <strong>Trabalhador</strong>.</p>
      <button onClick={logout} style={{ marginTop: '1rem' }}>Sair</button>
    </div>
  );
}

export default DashboardTrabalhador;
