import { useEffect, useState } from "react";
import SidebarOperador from "../components/Sidebar/SidebarOperador";
import { EQUIPES } from "../data/equipes";

import {
  FormRequisicao,
  ResumoRequisicao,
  HistoricoRequisicoes,
} from "../components/Dashboard";

import "../styles/DashboardOperador.css";

function DashboardOperador() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [navio, setNavio] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [data, setData] = useState("");
  const [faina, setFaina] = useState("");
  const [equipes, setEquipes] = useState([{ equipe: "", funcoes: {} }]);
  const [resumo, setResumo] = useState(null);
  const [chamadasSalvas, setChamadasSalvas] = useState([]);

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
      data,
      equipes: equipesFormatadas,
    });
  };

  const confirmarRequisicao = () => {
    const chamadasExistentes =
      JSON.parse(localStorage.getItem("chamadasPorto")) || [];
    const novasChamadas = [...chamadasExistentes, resumo];
    localStorage.setItem("chamadasPorto", JSON.stringify(novasChamadas));

    alert("Requisição salva com sucesso!");
    setResumo(null);
    setNavio("");
    setPeriodo("");
    setFaina("");
    setData("");
    setEquipes([{ equipe: "", funcoes: {} }]);
    setChamadasSalvas(novasChamadas);
  };

  useEffect(() => {
    const chamadasArmazenadas =
      JSON.parse(localStorage.getItem("chamadasPorto")) || [];
    setChamadasSalvas(chamadasArmazenadas);
  }, []);

  // git NOVA FUNÇÃO — BUSCAR HABILITADOS
  function getHabilitadosPorChamada(chamadaIndex) {
    const habilitados = [];

    for (let i = 0; i < localStorage.length; i++) {
      const chave = localStorage.key(i);

      if (chave.startsWith("habilitacoes-")) {
        const lista = JSON.parse(localStorage.getItem(chave)) || [];

        lista.forEach((item) => {
          if (item.chamadaIndex === chamadaIndex) {
            habilitados.push({
              nome: chave.replace("habilitacoes-", ""),
              equipe: item.equipe,
            });
          }
        });
      }
    }

    return habilitados;
  }

  return (
    <div className="dashboard-container">
      <SidebarOperador />
      <main className="dashboard-main">
        <h1>Olá, {user?.name}</h1>
        <p>
          Você está logado como <strong>Operador</strong>.
        </p>

        <div className="painel-flex">
          <div className="formulario">
            <FormRequisicao
              navio={navio}
              setNavio={setNavio}
              periodo={periodo}
              setPeriodo={setPeriodo}
              data={data}
              setData={setData}
              faina={faina}
              setFaina={setFaina}
              equipes={equipes}
              adicionarEquipe={adicionarEquipe}
              atualizarEquipe={atualizarEquipe}
              removerEquipe={removerEquipe}
              handleSubmit={handleSubmit}
            />

            <ResumoRequisicao
              resumo={resumo}
              onConfirmar={confirmarRequisicao}
              onCancelar={() => setResumo(null)}
            />
          </div>

          {/*  HISTÓRICO COM HABILITADOS */}
          <div className="historico">
            <h2>Histórico de Requisições</h2>

            {chamadasSalvas.length === 0 ? (
              <p>Nenhuma requisição cadastrada.</p>
            ) : (
              chamadasSalvas.map((chamada, index) => {
                const habilitados = getHabilitadosPorChamada(index);

                return (
                  <div key={index} className="card-glass">
                    <p>
                      <strong>Navio:</strong> {chamada.navio}
                    </p>
                    <p>
                      <strong>Data:</strong> {chamada.data}
                    </p>
                    <p>
                      <strong>Período:</strong> {chamada.periodo}
                    </p>
                    <p>
                      <strong>Faina:</strong> {chamada.faina}
                    </p>

                    <div style={{ marginTop: "1rem" }}>
                      <strong>Habilitados:</strong>

                      {habilitados.length === 0 ? (
                        <p>Ninguém se habilitou ainda.</p>
                      ) : (
                        <ul>
                          {habilitados.map((h, i) => (
                            <li key={i}>
                              {h.nome} — {h.equipe}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardOperador;
