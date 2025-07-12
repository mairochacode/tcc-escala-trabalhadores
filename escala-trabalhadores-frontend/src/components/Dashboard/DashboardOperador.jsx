import { useState } from "react";
import BlocoEquipe from "../Equipes/BlocoEquipe";
import SidebarOperador from "../Sidebar/SidebarOperador";
import { EQUIPES } from "../../data/equipes";

import "./DashboardOperador.css";

function DashboardOperador() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [navio, setNavio] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [faina, setFaina] = useState("");
  const [equipes, setEquipes] = useState([{ equipe: "", funcoes: {} }]);
  const [resumo, setResumo] = useState(null);

  const adicionarEquipe = () => {
    setEquipes([...equipes, { equipe: "", funcoes: {} }]);
  };

  const removerEquipe = (index) => {
    const copia = [...equipes];
    copia.splice(index, 1);
    setEquipes(copia);
  };

  const atualizarEquipe = (index, novoValor) => {
    const copia = [...equipes];
    copia[index] = novoValor;
    setEquipes(copia);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const equipesFormatadas = equipes.map(({ equipe, funcoes }) => {
      const subfuncoes = Object.entries(funcoes)
        .filter(([, val]) => val.ativo)
        .reduce((acc, [codigo, val]) => {
          acc[codigo] = val.quantidade;
          return acc;
        }, {});
      return { equipe, subfuncoes };
    });

    setResumo({
      navio,
      periodo,
      faina,
      equipes: equipesFormatadas,
    });
  };

  const confirmarRequisicao = () => {
    console.log("Requisição confirmada:", resumo);
    alert("Requisição salva com sucesso!");
    setResumo(null);
    setNavio("");
    setPeriodo("");
    setFaina("");
    setEquipes([{ equipe: "", funcoes: {} }]);
  };

  return (
    <div className="dashboard-container">
      <SidebarOperador />

      <main className="dashboard-main">
        <h1>Olá, {user?.name}</h1>
        <p>
          Você está logado como <strong>Operador</strong>.
        </p>

        <section className="form-glass-panel">
          <h2 className="form-section-title">Nova Requisição</h2>

          <form className="form-content" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="label-glass">Nome do Navio</label>
                <input
                  type="text"
                  className="form-glass-input"
                  value={navio}
                  onChange={(e) => setNavio(e.target.value)}
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
                  <option value="">Selecione o período</option>
                  <option value="01:00 às 07:00">01:00 às 07:00</option>
                  <option value="07:00 às 13:00">07:00 às 13:00</option>
                  <option value="13:00 às 19:00">13:00 às 19:00</option>
                  <option value="19:00 às 01:00">19:00 às 01:00</option>
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
                  <option value="">Selecione a faina</option>
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
              {equipes.map((eq, idx) => (
                <BlocoEquipe
                  key={idx}
                  onChange={(val) => atualizarEquipe(idx, val)}
                  onRemove={() => removerEquipe(idx)}
                />
              ))}
              <div className="button-row">
                <button
                  type="button"
                  className="btn-glass"
                  onClick={adicionarEquipe}
                >
                  + Adicionar Equipe
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary">
              Salvar
            </button>
          </form>

          {resumo && (
            <div className="card-glass resumo">
              <h3>Resumo da Requisição</h3>

              <p>
                <strong>Navio:</strong> {resumo.navio}
              </p>
              <p>
                <strong>Período:</strong> {resumo.periodo}
              </p>
              <p>
                <strong>Faina:</strong> {resumo.faina}
              </p>

              {resumo.equipes.map((equipe, index) => (
                <div key={index} className="equipe-bloco">
                  <strong>Equipe: {equipe.equipe}</strong>
                  <ul>
                    {Object.entries(equipe.subfuncoes).map(([codigo, qtd]) => {
                      const nomeSubfuncao =
                        EQUIPES[equipe.equipe].find((f) => f.codigo === codigo)
                          ?.nome || codigo;

                      return (
                        <li key={codigo}>
                          <span>{nomeSubfuncao}</span>
                          <span>{qtd} pessoa(s)</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              <div className="button-row">
                <button className="btn-primary" onClick={confirmarRequisicao}>
                  Confirmar e Salvar
                </button>
                <button className="btn-glass" onClick={() => setResumo(null)}>
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default DashboardOperador;
