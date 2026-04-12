/* =====================================================
 * ESTADO GLOBAL
 * ===================================================== */
let dados = null; // var global pra armazenar os dados do JSON

/* =====================================================
 * CARREGAMENTO DE DADOS (FETCH)
 * ===================================================== */
fetch("data.json") // faz a requisição do arquivo data.json
  .then((r) => r.json()) // Converte resposta para JSON
  .then((data) => {
    dados = data; // Armazena data na var global

    /* --------- INJEÇÃO DE CONTEÚDO NO DOM --------- */
    document.getElementById("resumo").innerText =
      dados.biografia_resumida.texto;

    document.getElementById("sinopse-ursula").innerText =
      dados.sinopse_ursula.texto;

    document.getElementById("sinopse-escrava").innerText =
      dados.sinopse_escrava.texto;

    document.getElementById("sinopse-gupeva").innerText =
      dados.sinopse_gupeva.texto;

    document.getElementById("sinopse-cantos").innerText =
      dados.sinopse_cantos.texto;

    /* --------- CONTROLE DE UI --------- */
    // habilita o botão APENAS após dados estarem disponíveis
    document.getElementById("btn-saiba-mais").disabled = false;
  });

/* =====================================================
 * MODAL PRINCIPAL (BIOGRAFIA)
 * ===================================================== */
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

/* =====================================================
 * EVENTOS DO MODAL PRINCIPAL
 * ===================================================== */
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

/* =====================================================
 * MODAL DE LIVROS (DINÂMICO COM TEMPLATE)
 * ===================================================== */
function abrirModalLivro(templateid, targetid, livro_object) {
  const template = document.getElementById(templateid);

  if (!template) {
    console.warn("template nao encontrado:", templateid);
    return;
  }

  const clone = template.content.cloneNode(true);

  const livro = dados.livros[livro_object];

  if (!livro) {
    console.warn("livro nao encontrado:", livro_object);
    return;
  }

  /* --------- PREENCHIMENTO DO TEMPLATE --------- */
  clone.querySelector(".livro-titulo").textContent = livro.titulo;

  clone.querySelector(".livro-info").innerHTML = `
  <strong>Autor:</strong> ${livro.autor}<br>
  <strong>Ano:</strong> ${livro.ano}<br>
  <strong>Gênero:</strong> ${livro.genero}
`;

  // opcionais (não quebra se não existir no objeto)
  if (livro.capa) {
    clone.querySelector(".livro-capa").src = livro.capa;
  }

  if (livro.contexto) {
    clone.querySelector(".livro-contexto").textContent = livro.contexto;
  }

  if (livro.resumo) {
    clone.querySelector(".livro-resumo").textContent = livro.resumo;
  }

  if (livro.pdf) {
    clone.querySelector(".livro-download").href = livro.pdf;
  }

  /* --------- RENDERIZAÇÃO --------- */
  const target = document.getElementById(targetid);
  target.innerHTML = "";
  document.getElementById(targetid).appendChild(clone);

  const modal = target.querySelector(".modal-livro");

  setTimeout(() => {
    modal.classList.add("ativo");
  }, 0);

  /* --------- EVENTO DE FECHAMENTO --------- */

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("ativo");

      setTimeout(() => {
        target.innerHTML = "";
      }, 300);
    }
  });
}
