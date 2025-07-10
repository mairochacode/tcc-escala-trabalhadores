import SidebarOperador from "../Sidebar/SidebarOperador";
import EquipeConferente from "../Equipes/EquipeConferente";
import './DashboardOperador.css';

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
  const [vigias, setVigias] = useState(0);
  const [conferentes, setConferentes] = useState(0);
  const [estivadores, setEstivadores] = useState(0);
  const [amarradores, setAmarradores] = useState(0);

  const [valoresConferente, setValoresConferente] = useState({
    balanca: 0,
    chefe: 0,
    porao: 0,
    chefeAltura: 0,
    planista: 0,
    planistaAltura: 0,
    poraoAltura: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaChamada = {
      navio,
      dataHora,
      periodo,
      faina,
      equipes: {
        vigias,
        estivadores,
        amarradores,
        conferentes: {
          "01 - Balança": valoresConferente.balanca,
          "02 - Chefe": valoresConferente.chefe,
          "03 - Porão": valoresConferente.porao,
          "04 - Chefe em Altura": valoresConferente.chefeAltura,
          "05 - Planista": valoresConferente.planista,
          "06 - Planista em Altura": valoresConferente.planistaAltura,
          "07 - Porão em Altura": valoresConferente.poraoAltura,
        },
      },
    };

    console.log("Chamada criada:", novaChamada);
    alert("Chamada criada com sucesso! (Veja no console)");
  };

  return (
    <div className="dashboard-container">
      <SidebarOperador />

      <main className="dashboard-main">
        <h1 style={{ color: "var(--color-accent)" }}>Olá, {user?.name}</h1>
        <p>
          Você está logado como <strong>Operador</strong>.
        </p>

        <div className="card-glass-pulse mt-3">
          <h2>Painel de Ações</h2>
          <p>Crie novas requisições, veja relatórios e acompanhe a operação.</p>
          <button
            className="btn-glass mt-2"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? "Cancelar" : "Nova requisição"}
          </button>

          {mostrarFormulario && (
            <div className="form-wrapper">
              <div className="card-glass-pulse card-form">
                <h3 className="label-glass">Nova requisição</h3>

                <form className="field-group" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Navio"
                    className="form-glass-input"
                    value={navio}
                    onChange={(e) => setNavio(e.target.value)}
                    required
                  />

                  <input
                    type="datetime-local"
                    className="form-glass-input"
                    value={dataHora}
                    onChange={(e) => setDataHora(e.target.value)}
                    required
                  />

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

                  <div className="field-group">
                    <label className="label-glass">Equipes:</label>

                    <input
                      type="number"
                      placeholder="Quantidade de Vigias"
                      className="form-glass-input"
                      min="0"
                      value={vigias}
                      onChange={(e) => setVigias(Number(e.target.value))}
                    />

                    <input
                      type="number"
                      placeholder="Quantidade de Conferentes"
                      className="form-glass-input"
                      min="0"
                      value={conferentes}
                      onChange={(e) => setConferentes(Number(e.target.value))}
                    />

                    <input
                      type="number"
                      placeholder="Quantidade de Estivadores"
                      className="form-glass-input"
                      min="0"
                      value={estivadores}
                      onChange={(e) => setEstivadores(Number(e.target.value))}
                    />

                    <input
                      type="number"
                      placeholder="Quantidade de Amarradores"
                      className="form-glass-input"
                      min="0"
                      value={amarradores}
                      onChange={(e) => setAmarradores(Number(e.target.value))}
                    />
                  </div>

                  <EquipeConferente
                    valores={valoresConferente}
                    setValores={setValoresConferente}
                  />

                  <button type="submit" className="btn-primary">
                    Salvar
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        <button onClick={logout} className="btn-glass mt-3">
          Sair
        </button>
      </main>
    </div>
  );
}

export default DashboardOperador;
