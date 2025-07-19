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

          <HistoricoRequisicoes chamadas={chamadasSalvas} />
        </div>
      </main>
    </div>
  );
}

export default DashboardOperador;
