let dados = null; // var global pra armazenar os dados do JSON

fetch("data.json") // faz a requisição do arquivo data.json
  .then((r) => r.json()) // Converte resposta para JSON
  .then((data) => {
    dados = data; // Armazena data na var global (sla por que, mas é necessário pra usar os dados em outras funções)

    document.getElementById("resumo").innerText =
      dados.biografia_resumida.texto; // linka o id "resumo" do html com o texto do json

    document.getElementById("sinopse-ursula").innerText =
      dados.sinopse_ursula.texto;

    // habilita o botão APENAS após dados estarem disponíveis
    document.getElementById("btn-saiba-mais").disabled = false;
  });

function abrirModal() {
  // redundancia pra evitar executar antes do fetch terminar/rodar (async)
  if (!dados) {
    console.warn("dados nao carregados");
    return;
  }

  const modal = document.getElementById("modal"); // linka o id "modal" do html com a variavel modal do js
  const texto = document.getElementById("texto-completo"); // linka o id "texto-completo" do html com o texto do json

  // injeta o texto vindo do JSON no modal
  texto.innerText = dados.biografia_completa.texto;

  modal.style.display = "block"; // muda o style do modal para "block" (visível)
}

function fecharModal() {
  document.getElementById("modal").style.display = "none"; // muda o style do modal para "none" (invisível)
}
