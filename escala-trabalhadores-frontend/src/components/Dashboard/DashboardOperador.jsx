import SidebarOperador from "../Sidebar/SidebarOperador";
import BlocoEquipe from "../Equipes/BlocoEquipe";
import "./DashboardOperador.css";
import { useState } from "react";

function DashboardOperador() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [navio, setNavio] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [faina, setFaina] = useState("");
  const [equipesSelecionadas, setEquipesSelecionadas] = useState([
    { equipe: "", funcoes: {} },
  ]);

  const adicionarEquipe = () => {
    setEquipesSelecionadas([
      ...equipesSelecionadas,
      { equipe: "", funcoes: {} },
    ]);
  };

  const removerEquipe = (index) => {
    const copia = [...equipesSelecionadas];
    copia.splice(index, 1);
    setEquipesSelecionadas(copia);
  };

  const atualizarEquipe = (index, novoValor) => {
    const copia = [...equipesSelecionadas];
    copia[index] = novoValor;
    setEquipesSelecionadas(copia);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaChamada = {
      navio,
      dataHora,
      periodo,
      faina,
      equipes: equipesSelecionadas,
    };

    console.log("Chamada criada:", novaChamada);
    alert("Chamada criada com sucesso!");
  };

  return (
    <div className="dashboard-container">
  <SidebarOperador />

  <main className="dashboard-main">
    <h1>Olá, {user?.name}</h1>
    <p>Você está logado como <strong>Operador</strong>.</p>

    <section className="form-glass-panel">
      <header className="form-header">
        <h2>Painel de Ações</h2>
        <p>Crie novas requisições, veja relatórios e acompanhe a operação.</p>
        {!mostrarFormulario && (
  <button
    className="btn-glass"
    onClick={() => setMostrarFormulario(true)}
  >
    Nova requisição
  </button>
)}

      </header>

      {mostrarFormulario && (
        <form className="form-content" onSubmit={handleSubmit}>
          <h3 className="form-section-title">Nova Requisição</h3>

          <div className="form-grid">
            <div className="form-group">
              <label className="label-glass">Navio</label>
              <input
                type="text"
                className="form-glass-input"
                placeholder="Nome do Navio"
                value={navio}
                onChange={(e) => setNavio(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="label-glass">Data/Hora</label>
              <input
                type="datetime-local"
                className="form-glass-input"
                value={dataHora}
                onChange={(e) => setDataHora(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="label-glass">Período</label>
              <select
                className="form-glass-select"
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                required
              >
                <option value="">Selecione o Período</option>
                <option value="07:00 às 13:00">07:00 às 13:00</option>
                <option value="13:00 às 19:00">13:00 às 19:00</option>
                <option value="19:00 às 01:00">19:00 às 01:00</option>
                <option value="01:00 às 07:00">01:00 às 07:00</option>
              </select>
            </div>

            <div className="form-group">
              <label className="label-glass">Faina</label>
              <select
                className="form-glass-select"
                value={faina}
                onChange={(e) => setFaina(e.target.value)}
                required
              >
                <option value="">Selecione a Faina</option>
                <option value="12 - BigBag">12 - BigBag</option>
                <option value="14 - Granel">14 - Granel</option>
                <option value="18 - Contêineres">18 - Contêineres</option>
                <option value="21 - Carga Viva">21 - Carga Viva</option>
                <option value="30 - Cimento">30 - Cimento</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="label-glass">Equipes</label>
            {equipesSelecionadas.map((equipe, index) => (
              <BlocoEquipe
                key={index}
                onChange={(novoValor) => atualizarEquipe(index, novoValor)}
                onRemove={() => removerEquipe(index)}
              />
            ))}
            <button type="button" className="btn-glass" onClick={adicionarEquipe}>
              + Adicionar Equipe
            </button>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <button type="submit" className="btn-primary">Salvar</button>
          </div>
        </form>
      )}
    </section>

    <button onClick={logout} className="btn-glass" style={{ marginTop: "2rem" }}>
      Sair
    </button>
  </main>
</div>

  );
}

export default DashboardOperador;
