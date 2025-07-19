import { EQUIPES } from "../../data/equipes";

function ResumoRequisicao({ resumo, onConfirmar, onCancelar }) {
  if (!resumo) return null;

  return (
    <section className="card-glass resumo">
      <h3>Resumo da Requisição</h3>
      <p>
        <strong>Navio:</strong> {resumo.navio}
      </p>
      <p>
        <strong>Data:</strong> {resumo.data}
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
                EQUIPES[equipe.equipe]?.find((f) => f.codigo === codigo)
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
        <button className="btn-primary" onClick={onConfirmar}>
          Confirmar e Salvar
        </button>
        <button className="btn-glass" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </section>
  );
}

export default ResumoRequisicao;
