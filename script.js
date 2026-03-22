let contador = 0;
let cardSelecionado = null;

// 1. CARREGAR DADOS AO ABRIR A PÁGINA
window.onload = function() {
    const dadosSalvos = localStorage.getItem("meuKanban_cards");
    const contadorSalvo = localStorage.getItem("meuKanban_contador");

    if (contadorSalvo) contador = parseInt(contadorSalvo);

    if (dadosSalvos) {
        const cards = JSON.parse(dadosSalvos);
        cards.forEach(dados => {
            reconstruirCard(dados.texto, dados.coluna, dados.concluido);
        });
    }
};

// 2. FUNÇÃO PARA SALVAR NO CACHE
function salvarNoCache() {
    const colunas = ["col01", "col02", "realizado"];
    let dadosParaSalvar = [];

    colunas.forEach(colId => {
        const colunaElemento = document.getElementById(colId);
        if (colunaElemento) {
            const cardsNaColuna = colunaElemento.querySelectorAll(".card");
            cardsNaColuna.forEach(card => {
                dadosParaSalvar.push({
                    texto: card.innerText,
                    coluna: colId,
                    concluido: card.classList.contains("concluido")
                });
            });
        }
    });

    localStorage.setItem("meuKanban_cards", JSON.stringify(dadosParaSalvar));
    localStorage.setItem("meuKanban_contador", contador);
}

// 3. FUNÇÃO PARA RECONSTRUIR CARDS SALVOS
function reconstruirCard(texto, colunaId, eConcluido) {
    let card = document.createElement('div');
    card.className = "card" + (eConcluido ? " concluido" : "");
    card.draggable = true;
    card.id = 'card' + contador++;
    card.innerText = texto;

    document.getElementById(colunaId).appendChild(card);
    atribuirEventos(card);
}

// 4. CENTRALIZADOR DE EVENTOS (Evita repetição de código)
function atribuirEventos(card) {
    card.onclick = function () {
        document.querySelectorAll(".card").forEach(c => c.classList.remove("selecionado"));
        card.classList.add("selecionado");
        cardSelecionado = card;
    };

    card.ondblclick = function () {
        editarCard(card);
    };

    card.ondragstart = function (event) {
        event.dataTransfer.setData("text", card.id);
    };
}

function novocard() {
    let input = document.getElementById("inBox");
    let texto = input.value;

    if (!texto.trim()) return;

    let card = document.createElement('div');
    card.className = "card";
    card.draggable = true;
    card.id = 'card' + contador++;
    card.innerText = texto;

    atribuirEventos(card);
    document.getElementById("col01").appendChild(card);
    
    input.value = "";
    salvarNoCache(); // Salva após criar
}

function editarCard(card) {
    if (card.classList.contains("concluido")) {
        alert("Tarefas concluídas não podem ser editadas!");
        return;
    }

    let textoAtual = card.innerText;
    let input = document.createElement("input");
    input.type = "text";
    input.value = textoAtual;
    input.className = "input-edicao";

    card.innerHTML = "";
    card.appendChild(input);
    input.focus();

    input.onblur = function () {
        salvarEdicao(card, input.value);
    };

    input.onkeydown = function (e) {
        if (e.key === "Enter") {
            salvarEdicao(card, input.value);
        }
    };
}

function salvarEdicao(card, novoTexto) {
    if (!novoTexto.trim()) {
        alert("O card não pode ficar vazio!");
        return;
    }
    card.innerText = novoTexto;
    atribuirEventos(card);
    salvarNoCache(); // Salva após editar
}

function okCard() {
    if (!cardSelecionado) {
        alert("Selecione um card primeiro!");
        return;
    }

    let colunaAtual = cardSelecionado.parentElement;
    if (colunaAtual.id !== "col02") {
        alert("A tarefa precisa estar em 'Realizando' para ser concluída!");
        return;
    }

    document.getElementById("realizado").appendChild(cardSelecionado);
    cardSelecionado.classList.add("concluido");
    salvarNoCache(); // Salva após concluir
}

function delCard() {
    if (!cardSelecionado) {
        alert("Selecione um card primeiro!");
        return;
    }

    if (cardSelecionado.parentElement.id === "realizado") {
        cardSelecionado.remove();
        cardSelecionado = null;
        salvarNoCache(); // Salva após excluir
    } else {
        alert("Só é possível excluir tarefas concluídas!");
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let id = event.dataTransfer.getData("text");
    let card = document.getElementById(id);
    let origem = card.parentElement.id;
    let destino = event.currentTarget.id;

    if (origem === "realizado") {
        alert("Tarefa já concluída não pode ser movida!");
        return;
    }

    if (destino === "realizado") {
        alert("Use o botão 'Concluída' para finalizar a tarefa!");
        return;
    }

    if ((origem === "col01" && destino === "col02") || (origem === "col02" && destino === "col01")) {
        event.currentTarget.appendChild(card);
        salvarNoCache(); // Salva após mover
    } else {
        alert("Movimento não permitido!");
    }
}

document.getElementById("inBox").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        novocard();
    }
});