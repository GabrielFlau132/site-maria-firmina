let dados = null; 

fetch("data.json") 
  .then((r) => r.json())
  .then((data) => {
    dados = data; // var

    document.getElementById("resumo").textContent =
      dados.biografia_resumida.texto;

    document.getElementById("sinopse-ursula").textContent =
      dados.sinopse_ursula.texto;

    document.getElementById("sinopse-escrava").textContent =
      dados.sinopse_escrava.texto;

    document.getElementById("sinopse-gupeva").textContent =
      dados.sinopse_gupeva.texto;

    document.getElementById("sinopse-cantos").textContent =
      dados.sinopse_cantos.texto;

    // APENAS af dpnvs
    document.getElementById("btn-saiba-mais").disabled = false;
  });

function abrirModal() {
  if (!dados) {
    console.warn("dados nao carregados");
    return;
  }

  const modal = document.getElementById("modal");
  const texto = document.getElementById("texto-completo");

  texto.textContent = dados.biografia_completa.texto;

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

  clone.querySelector(".livro-titulo").textContent = livro.titulo;

  clone.querySelector(".livro-info").innerHTML = `
  <strong>Autor:</strong> ${livro.autor}<br>
  <strong>Ano:</strong> ${livro.ano}<br>
  <strong>Gênero:</strong> ${livro.genero}
`;

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

  const target = document.getElementById(targetid);
  target.innerHTML = "";
  document.getElementById(targetid).appendChild(clone);

  const modal = target.querySelector(".modal-livro");

  setTimeout(() => {
    modal.classList.add("ativo");
  }, 0);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("ativo");

      setTimeout(() => {
        target.innerHTML = "";
      }, 300);
    }
  });
}
