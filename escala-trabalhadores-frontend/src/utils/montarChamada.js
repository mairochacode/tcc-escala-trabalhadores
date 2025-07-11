export function montarChamada({
  navio,
  dataHora,
  periodo,
  faina,
  valoresVigia,
  valoresConferente,
  valoresEstivador,
  valoresAmarrador
}) {
  return {
    navio,
    dataHora,
    periodo,
    faina,
    equipes: {
      vigias: {
        "01 - Portão Principal": valoresVigia.portao,
        "02 - Pátio de Caminhões": valoresVigia.patio,
        "03 - Área Restrita": valoresVigia.restrita,
      },
      conferentes: {
        "01 - Balança": valoresConferente.balanca,
        "02 - Chefe": valoresConferente.chefe,
        "03 - Porão": valoresConferente.porao,
        "04 - Chefe em Altura": valoresConferente.chefeAltura,
        "05 - Planista": valoresConferente.planista,
        "06 - Planista em Altura": valoresConferente.planistaAltura,
        "07 - Porão em Altura": valoresConferente.poraoAltura,
      },

      estivadores: {
        "01 - Operador de Guindaste": valoresEstivador.guindaste,
        "02 - Carregador": valoresEstivador.carregador,
        "03 - Supervisor de Carga": valoresEstivador.supervisor,
      },

      amarradores: {
        "01 - Píer Frontal": valoresAmarrador.pier,
        "02 - Popa": valoresAmarrador.popa,
        "03 - Proa": valoresAmarrador.proa,
      },
    },
  };
}
