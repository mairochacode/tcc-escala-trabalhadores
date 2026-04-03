import { useEffect, useState } from "react";
import SidebarOperador from "../components/Sidebar/SidebarOperador"; // usamos a mesma sidebar por enquanto
import "../styles/DashboardTrabalhador.css";

function DashboardTrabalhador() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [chamadas, setChamadas] = useState([]);
  const [atualizarTela, setAtualizarTela] = useState(false);

  useEffect(() => {
    const chamadasSalvas =
      JSON.parse(localStorage.getItem("chamadasPorto")) || [];
    setChamadas(chamadasSalvas);
  }, [atualizarTela]);

  const PERIODOS = {
    "07:00 às 13:00": { start: "07:00", end: "13:00", overnight: false },
    "13:00 às 19:00": { start: "13:00", end: "19:00", overnight: false },
    "19:00 às 01:00": { start: "19:00", end: "01:00", overnight: true },
    "01:00 às 07:00": { start: "01:00", end: "07:00", overnight: false },
  };

  function criarDataHora(data, hora) {
    return new Date(`${data}T${hora}:00`);
  }

  function obterInicioEFim(data, periodo) {
    const info = PERIODOS[periodo];
    if (!info) return null;

    const inicio = criarDataHora(data, info.start);
    const fim = criarDataHora(data, info.end);

    if (info.overnight) {
      fim.setDate(fim.getDate() + 1);
    }

    return { inicio, fim };
  }

  function diferencaEmHoras(data1, data2) {
    const diffMs = data2.getTime() - data1.getTime();
    return diffMs / (1000 * 60 * 60);
  }

  function violaRegra612(habilitacoesExistentes, novaData, novoPeriodo) {
    const novoTurno = obterInicioEFim(novaData, novoPeriodo);
    if (!novoTurno) return false;

    for (const habilitacao of habilitacoesExistentes) {
      const turnoExistente = obterInicioEFim(
        habilitacao.data,
        habilitacao.periodo,
      );
      if (!turnoExistente) continue;

      const { inicio: novoInicio, fim: novoFim } = novoTurno;
      const { inicio: existenteInicio, fim: existenteFim } = turnoExistente;

      const sobrepoe = novoInicio < existenteFim && novoFim > existenteInicio;

      if (sobrepoe) {
        return true;
      }

      const horasDeDescansoAposTurnoExistente = diferencaEmHoras(
        existenteFim,
        novoInicio,
      );
      const horasDeDescansoAntesDoTurnoExistente = diferencaEmHoras(
        novoFim,
        existenteInicio,
      );

      if (
        (horasDeDescansoAposTurnoExistente >= 0 &&
          horasDeDescansoAposTurnoExistente < 12) ||
        (horasDeDescansoAntesDoTurnoExistente >= 0 &&
          horasDeDescansoAntesDoTurnoExistente < 12)
      ) {
        return true;
      }
    }

    return false;
  }

  const habilitarTrabalhador = (
    chamadaIndex,
    equipe,
    funcao,
    data,
    periodo,
  ) => {
    const userId = user?.id || "anonimo";
    const chave = `habilitacoes-${userId}`;
    const habilitacoesAtuais = JSON.parse(localStorage.getItem(chave)) || [];

    const jaExiste = habilitacoesAtuais.some(
      (item) =>
        item.chamadaIndex === chamadaIndex &&
        item.equipe === equipe &&
        item.funcao === funcao,
    );

    if (jaExiste) {
      alert("Você já se habilitou para essa função.");
      return;
    }

    const quebraRegra612 = violaRegra612(habilitacoesAtuais, data, periodo);

    if (quebraRegra612) {
      alert(
        "Você não pode se habilitar nesta chamada porque a regra 6/12 exige 12 horas de descanso.",
      );
      return;
    }

    const novaHabilitacao = {
      chamadaIndex,
      equipe,
      funcao,
      data,
      periodo,
    };

    const atualizadas = [...habilitacoesAtuais, novaHabilitacao];
    localStorage.setItem(chave, JSON.stringify(atualizadas));

    alert(`Você se habilitou para ${equipe} - ${funcao}`);

    setAtualizarTela((prev) => !prev);
  };

  const removerHabilitacao = (chamadaIndex, equipe) => {
    const userId = user?.id || "anonimo";
    const chave = `habilitacoes-${userId}`;
    const habilitacoesAtuais = JSON.parse(localStorage.getItem(chave)) || [];

    const atualizadas = habilitacoesAtuais.filter(
      (item) => !(item.chamadaIndex === chamadaIndex && item.equipe === equipe),
    );

    localStorage.setItem(chave, JSON.stringify(atualizadas));

    alert("Habilitação removida!");

    setAtualizarTela((prev) => !prev);
  };

  return (
    <div className="dashboard-container">
      <SidebarOperador />
      <main className="dashboard-main">
        <h1>Bem-vindo, {user?.name}</h1>

        <section className="card-glass">
          <h3>Chamadas Disponíveis</h3>
          {chamadas.length === 0 ? (
            <p>Nenhuma requisição disponível no momento.</p>
          ) : (
            chamadas.map((chamada, index) => (
              <div key={index} className="card-glass mt-2">
                <h4>
                  {chamada.navio} — {chamada.data} — {chamada.periodo}
                </h4>

                {chamada.equipes.map((eq, i) => {
                  const userId = user?.id || "anonimo";
                  const chave = `habilitacoes-${userId}`;
                  const habilitacoesAtuais =
                    JSON.parse(localStorage.getItem(chave)) || [];

                  const jaHabilitado = habilitacoesAtuais.some(
                    (item) =>
                      item.chamadaIndex === index && item.equipe === eq.equipe,
                  );

                  return (
                    <div key={i} style={{ marginTop: "1rem" }}>
                      <strong>{eq.equipe}</strong>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: "1rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        <ul
                          style={{ margin: 0, paddingLeft: "1.2rem", flex: 1 }}
                        >
                          {Object.entries(eq.subfuncoes).map(
                            ([codigo, qtd]) => (
                              <li key={codigo} style={{ margin: "0.5rem 0" }}>
                                {codigo} — {qtd} vaga(s)
                              </li>
                            ),
                          )}
                        </ul>

                        {jaHabilitado ? (
                          <button
                            className="btn-glass"
                            style={{
                              backgroundColor: "#ff4d4d",
                              color: "#fff",
                            }}
                            onClick={() => removerHabilitacao(index, eq.equipe)}
                          >
                            Remover habilitação
                          </button>
                        ) : (
                          <button
                            className="btn-glass"
                            onClick={() =>
                              habilitarTrabalhador(
                                index,
                                eq.equipe,
                                "equipe-completa",
                                chamada.data,
                                chamada.periodo,
                              )
                            }
                          >
                            Habilitar-se
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default DashboardTrabalhador;
