let dados = null;

fetch("data.json")
  .then((r) => r.json())
  .then((data) => {
    dados = data;
    document.getElementById("resumo").innerText =
      dados.biografia_resumida.texto;
  });

function abrirModal() {
  if (!dados) return;

  const modal = document.getElementById("modal");
  const texto = document.getElementById("texto-completo");

  texto.innerText = dados.biografia_completa.texto;
  modal.style.display = "block";
}
