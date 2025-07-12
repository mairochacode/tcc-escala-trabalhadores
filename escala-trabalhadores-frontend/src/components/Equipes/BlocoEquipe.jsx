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

  const toggleFuncao = (codigo) => {
    const nova = {
      ...funcoesSelecionadas,
      [codigo]: {
        ativo: !funcoesSelecionadas[codigo]?.ativo,
        quantidade: funcoesSelecionadas[codigo]?.ativo ? undefined : "",
      },
    };
    setFuncoesSelecionadas(nova);
    onChange({ equipe: equipeSelecionada, funcoes: nova });
  };

  const handleQuantidadeChange = (codigo, value) => {
    const nova = {
      ...funcoesSelecionadas,
      [codigo]: {
        ...funcoesSelecionadas[codigo],
        quantidade: Number(value),
      },
    };
    setFuncoesSelecionadas(nova);
    onChange({ equipe: equipeSelecionada, funcoes: nova });
  };

  return (
    <div className="card-glass mt-2">
      {/* Linha com select da equipe e botão remover */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <select
          value={equipeSelecionada}
          onChange={handleEquipeChange}
          className="form-glass-select"
          style={{ flex: 1 }}
          required
        >
          <option value="">Selecione a equipe</option>
          {Object.keys(EQUIPES).map((nome) => (
            <option key={nome} value={nome}>
              {nome}
            </option>
          ))}
        </select>

        <button type="button" className="btn-glass" onClick={onRemove}>
          Remover
        </button>
      </div>

      {/* Subfunções */}
      {equipeSelecionada && (
        <div style={{ marginTop: "1rem" }}>
          {EQUIPES[equipeSelecionada].map(({ codigo, nome }) => {
            const checked = funcoesSelecionadas[codigo]?.ativo || false;
            const quantidade = funcoesSelecionadas[codigo]?.quantidade || "";

            return (
              <div
                key={codigo}
                className="inline-field"
                style={{
                  backgroundColor: "#181a1f",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <label
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleFuncao(codigo)}
                  />
                  {`${codigo} - ${nome}`}
                </label>
                {checked && (
                  <input
                    type="number"
                    min={0}
                    value={quantidade}
                    onChange={(e) =>
                      handleQuantidadeChange(codigo, e.target.value)
                    }
                    className="form-glass-input"
                    placeholder="Qtd"
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
