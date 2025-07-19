function HistoricoRequisicoes({ chamadas }) {
  if (!chamadas || chamadas.length === 0) return null;

  return (
    <div className="historico">
      <div className="card-glass">
        <h3>Histórico de Requisições</h3>
        <ul>
          {chamadas.map((item, index) => (
            <li key={index} style={{ marginBottom: "1rem" }}>
              <strong>{item.navio}</strong>
              <br />
              {item.data} — {item.periodo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HistoricoRequisicoes;
