let dados = null; // var global pra armazenar os dados do JSON

fetch("data.json") // faz a requisição do arquivo data.json
  .then((r) => r.json()) // Converte resposta para JSON
  .then((data) => {
    dados = data; // Armazena data na var global (sla por que, mas é necessário pra usar os dados em outras funções)

    document.getElementById("resumo").innerText =
      dados.biografia_resumida.texto; // linka o id "resumo" do html com o texto do json

    document.getElementById("sinopse-ursula").innerText =
      dados.sinopse_ursula.texto;

    document.getElementById("sinopse-escrava").innerText =
      dados.sinopse_escrava.texto;

    document.getElementById("sinopse-gupeva").innerText =
      dados.sinopse_gupeva.texto;

    document.getElementById("sinopse-cantos").innerText =
      dados.sinopse_cantos.texto;

    // habilita o botão APENAS após dados estarem disponíveis
    document.getElementById("btn-saiba-mais").disabled = false;
  });

function abrirModal() {
  if (!dados) {
    console.warn("dados nao carregados");
    return;
  }

  const modal = document.getElementById("modal");
  const texto = document.getElementById("texto-completo");

  texto.innerText = dados.biografia_completa.texto;

  modal.classList.add("ativo");
}

function fecharModal() {
  document.getElementById("modal").classList.remove("ativo");
}

const modal = document.getElementById("modal");

modal.addEventListener("click", (e) => {
  if (e.target === modal) fecharModal();
});

document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") fecharModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharModal();
});

async function abrirModalLivro(url, templateid, targetid) {
  const response = await fetch(url);
  const html = await response.text();
  const divtemp = document.createElement("div");
  divtemp.innerHTML = html;
  const template = divtemp.querySelector(`#${templateid}`);
  const clone = template.content.cloneNode(true);

  document.getElementById(targetid).appendChild(clone);
}

abrirModalLivro("Modal.html", targetid = "modal-livro", templateid = "main modal");

//05/04
