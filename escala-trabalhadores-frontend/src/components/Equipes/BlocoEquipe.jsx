import React, { useState } from "react";
import { EQUIPES } from "../../data/equipes";

function BlocoEquipe({ onChange, onRemove }) {
  const [equipeSelecionada, setEquipeSelecionada] = useState("");
  const [funcoesSelecionadas, setFuncoesSelecionadas] = useState({});

  const handleEquipeChange = (e) => {
    const novaEquipe = e.target.value;
    setEquipeSelecionada(novaEquipe);
    setFuncoesSelecionadas({});
    onChange({ equipe: novaEquipe, funcoes: {} });
  };

  return (
    <div className="card-glass-pulse" style={{ marginBottom: "1.5rem" }}>
      {/* Seletor de equipe + botão remover */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <select
          value={equipeSelecionada}
          onChange={handleEquipeChange}
          required
          className="form-glass-select"
          style={{ flex: 1 }}
        >
          <option value="">Selecione uma equipe</option>
          {Object.keys(EQUIPES).map((equipe) => (
            <option key={equipe} value={equipe}>
              {equipe}
            </option>
          ))}
        </select>

        <button type="button" className="btn-glass" onClick={onRemove}>
          Remover
        </button>
      </div>

      {/* Subfunções da equipe */}
      {equipeSelecionada && (
        <div style={{ marginTop: "1rem" }}>
          {EQUIPES[equipeSelecionada].map((sub, index) => {
            const codigo = sub.codigo || `0${index + 1}`;
            const nome = sub.nome || sub;

            const checked = funcoesSelecionadas[codigo]?.ativo || false;
            const quantidade = funcoesSelecionadas[codigo]?.quantidade || "";

            const toggleFuncao = () => {
              const novoEstado = {
                ...funcoesSelecionadas,
                [codigo]: {
                  ativo: !checked,
                  quantidade: !checked ? "" : undefined,
                },
              };
              setFuncoesSelecionadas(novoEstado);
              onChange({ equipe: equipeSelecionada, funcoes: novoEstado });
            };

            const handleQuantidadeChange = (e) => {
              const novaQtd = Number(e.target.value);
              const novoEstado = {
                ...funcoesSelecionadas,
                [codigo]: {
                  ...funcoesSelecionadas[codigo],
                  quantidade: novaQtd,
                },
              };
              setFuncoesSelecionadas(novoEstado);
              onChange({ equipe: equipeSelecionada, funcoes: novoEstado });
            };

            return (
              <div
                key={codigo}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "0.7rem",
                  padding: "0.6rem 1rem",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "8px",
                  background: "#181a1f",
                }}
              >
                <label style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={toggleFuncao}
                    style={{ transform: "scale(1.2)" }}
                  />
                  {`${codigo} - ${nome}`}
                </label>
                {checked && (
                  <input
                    type="number"
                    min="0"
                    value={quantidade}
                    onChange={handleQuantidadeChange}
                    placeholder="Qtd"
                    className="form-glass-input"
                    style={{ maxWidth: "80px" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BlocoEquipe;
