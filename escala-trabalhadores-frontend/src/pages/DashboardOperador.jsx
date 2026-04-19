import { useEffect, useState } from "react";
import SidebarOperador from "../components/Sidebar/SidebarOperador";

import { FormRequisicao, ResumoRequisicao } from "../components/Dashboard";

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
  const [selecionados, setSelecionados] = useState({});
  const [atualizarTela, setAtualizarTela] = useState(false);

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
      status: "aberta",
      habilitados: [],
      escalados: [],
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
  }, [atualizarTela]);

  const toggleSelecionado = (chamadaIndex, habilitado) => {
    setSelecionados((prev) => {
      const atuais = prev[chamadaIndex] || [];

      const jaExiste = atuais.some(
        (item) =>
          item.userId === habilitado.userId &&
          item.equipe === habilitado.equipe,
      );

      const novos = jaExiste
        ? atuais.filter(
            (item) =>
              !(
                item.userId === habilitado.userId &&
                item.equipe === habilitado.equipe
              ),
          )
        : [...atuais, habilitado];

      return {
        ...prev,
        [chamadaIndex]: novos,
      };
    });
  };

  const lancarChamada = (chamadaIndex) => {
    const chamadas = JSON.parse(localStorage.getItem("chamadasPorto")) || [];
    const escolhidos = selecionados[chamadaIndex] || [];

    if (escolhidos.length === 0) {
      alert("Selecione pelo menos um trabalhador habilitado.");
      return;
    }

    chamadas[chamadaIndex].escalados = escolhidos;
    chamadas[chamadaIndex].status = "lançada";

    localStorage.setItem("chamadasPorto", JSON.stringify(chamadas));
    alert("Chamada lançada com sucesso!");

    setAtualizarTela((prev) => !prev);
  };

  const excluirRequisicao = (indexParaExcluir) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta requisição?",
    );

    if (!confirmar) return;

    const chamadas = JSON.parse(localStorage.getItem("chamadasPorto")) || [];

    const chamadasAtualizadas = chamadas.filter(
      (_, index) => index !== indexParaExcluir,
    );

    localStorage.setItem("chamadasPorto", JSON.stringify(chamadasAtualizadas));
    setChamadasSalvas(chamadasAtualizadas);
    setAtualizarTela((prev) => !prev);
  };

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

          <div className="historico">
            <h2>Histórico de Requisições</h2>

            {chamadasSalvas.length === 0 ? (
              <p>Nenhuma requisição cadastrada.</p>
            ) : (
              chamadasSalvas.map((chamada, index) => (
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
                  <p>
                    <strong>Status:</strong> {chamada.status || "aberta"}
                  </p>

                  <div style={{ marginTop: "1rem" }}>
                    <strong>Habilitados:</strong>

                    {!chamada.habilitados ||
                    chamada.habilitados.length === 0 ? (
                      <p>Ninguém se habilitou ainda.</p>
                    ) : (
                      <div>
                        {chamada.habilitados.map((h, i) => {
                          const marcado = (selecionados[index] || []).some(
                            (item) =>
                              item.userId === h.userId &&
                              item.equipe === h.equipe,
                          );

                          return (
                            <label
                              key={i}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                margin: "0.5rem 0",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={marcado}
                                onChange={() => toggleSelecionado(index, h)}
                              />
                              {h.nome} — {h.equipe}
                            </label>
                          );
                        })}

                        {chamada.status !== "lançada" ? (
                          <button
                            className="btn-primary"
                            style={{ marginTop: "1rem" }}
                            onClick={() => lancarChamada(index)}
                          >
                            Lançar chamada
                          </button>
                        ) : (
                          <div style={{ marginTop: "1rem" }}>
                            <strong>Escalados:</strong>
                            <ul>
                              {(chamada.escalados || []).map((e, i) => (
                                <li key={i}>
                                  {e.nome} — {e.equipe}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <button
                          className="btn-glass"
                          style={{
                            marginTop: "1rem",
                            backgroundColor: "#ff4d4d",
                            color: "#fff",
                          }}
                          onClick={() => excluirRequisicao(index)}
                        >
                          Excluir requisição
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardOperador;
