import BlocoEquipe from "../Equipes/BlocoEquipe";

function FormRequisicao({
  navio,
  setNavio,
  periodo,
  setPeriodo,
  data,
  setData,
  faina,
  setFaina,
  equipes,
  adicionarEquipe,
  atualizarEquipe,
  removerEquipe,
  handleSubmit,
}) {
  return (
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
            <label className="label-glass">Data da Requisição</label>
            <input
              type="date"
              className="form-glass-input"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
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
    </section>
  );
}

export default FormRequisicao;
