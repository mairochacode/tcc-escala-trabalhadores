import React from "react";

function EquipeConferente({ valores, setValores }) {
  const handleChange = (campo, valor) => {
    setValores({ ...valores, [campo]: Number(valor) });
  };

  return (
    <div>
      <label style={{ fontWeight: "bold", color: "var(--color-accent)" }}>
        Conferentes:
      </label>
      <div className="subfuncoes">
        <input
          type="number"
          placeholder="01 - Balança"
          value={valores.balanca}
          onChange={(e) => handleChange("balanca", e.target.value)}
        />
        <input
          type="number"
          placeholder="02 - Chefe"
          value={valores.chefe}
          onChange={(e) => handleChange("chefe", e.target.value)}
        />
        <input
          type="number"
          placeholder="03 - Porão"
          value={valores.porao}
          onChange={(e) => handleChange("porao", e.target.value)}
        />
        <input
          type="number"
          placeholder="04 - Chefe em Altura"
          value={valores.chefeAltura}
          onChange={(e) => handleChange("chefeAltura", e.target.value)}
        />
        <input
          type="number"
          placeholder="05 - Planista"
          value={valores.planista}
          onChange={(e) => handleChange("planista", e.target.value)}
        />
        <input
          type="number"
          placeholder="06 - Planista em Altura"
          value={valores.planistaAltura}
          onChange={(e) => handleChange("planistaAltura", e.target.value)}
        />
        <input
          type="number"
          placeholder="07 - Porão em Altura"
          value={valores.poraoAltura}
          onChange={(e) => handleChange("poraoAltura", e.target.value)}
        />
      </div>
    </div>
  );
}

export default EquipeConferente;
