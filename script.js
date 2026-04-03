let dados = null;

fetch("data.json")
  .then((r) => r.json())
  .then((data) => {
    dados = data;
    document.getElementById("resumo").innerText =
      dados.biografia_resumida.texto;
  });

function mostrarBiografiaCompleta() {
  if (!dados) return;

  const el = document.getElementById("resumo");

  if (el.innerText === dados.biografia_completa.texto) {
    el.innerText = dados.biografia_resumida.texto;
  } else {
    el.innerText = dados.biografia_completa.texto;
  }
}
