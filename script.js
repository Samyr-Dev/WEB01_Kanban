let contador = 0
let cardSelecionado = null

function novocard() {
    let input = document.getElementById("inBox")
    let texto = input.value

    if (!texto.trim()) return

    let card = document.createElement('div')
    card.className = "card"
    card.draggable = true

    card.id = 'card' + contador++
    card.innerText = texto

    // Selecionar card
    card.onclick = function () {
        document.querySelectorAll(".card").forEach(c => c.classList.remove("selecionado"))
        card.classList.add("selecionado")
        
        cardSelecionado = card
    }
    
    // EDITAR COM DUPLO CLIQUE
    card.ondblclick = function () {
        editarCard(card)
    }

    // Arrastar
    card.ondragstart = function (event) {
        event.dataTransfer.setData("text", card.id)
    }


    document.getElementById("col01").appendChild(card)

    input.value = ""
}


// Edição Card
function editarCard(card) {

    // Não permite editar se estiver concluído
    if (card.classList.contains("concluido")) {
        alert("Tarefas concluídas não podem ser editadas!")
        return
    }

    let textoAtual = card.innerText

    let input = document.createElement("input")
    input.type = "text"
    input.value = textoAtual
    input.className = "input-edicao"

    card.innerHTML = ""
    card.appendChild(input)

    input.focus()

    // Salvar ao Sair
    input.onblur = function () {
        salvarEdicao(card, input.value)
    }

    // Salvar com Enter
    input.one = function (e) {
        if (e.key === "Enter") {
            salvarEdicao(card, input.value)
        }
    }


}


// Salvar a Edição
function salvarEdicao(card, novoTexto) {

    if (!novoTexto.trim()) {
        alert("O card não pode ficar vazio!")
        return
    }

    card.innerText = novoTexto

    // RECRIAR EVENTOS (IMPORTANTE)
    card.onclick = function () {
        document.querySelectorAll(".card").forEach(c => c.classList.remove("selecionado"))
        card.classList.add("selecionado")
        cardSelecionado = card
    }

    card.ondblclick = function () {
        editarCard(card)
    }

    card.ondragstart = function (event) {
        event.dataTransfer.setData("text", card.id)
    }
}


// Botão Concluido
function okCard() {
    if (!cardSelecionado) {
        alert("Selecione um card primeiro!")
        return
    }

    let colunaAtual = cardSelecionado.parentElement

    // Só pode concluir se estiver em REALIZANDO
    if (colunaAtual.id !== "col02") {
        alert("A tarefa precisa estar em 'Realizando' para ser concluída!")
        return
    }

    // Move para realizado
    let realizado = document.getElementById("realizado")
    realizado.appendChild(cardSelecionado)

    // Marca como concluída
    cardSelecionado.classList.add("concluido")
}


// Botão Excluir
function delCard() {
    if (!cardSelecionado) {
        alert("Selecione um card primeiro!")
        return
    }

    let colunaAtual = cardSelecionado.parentElement

    if (colunaAtual.id === "realizado") {
        cardSelecionado.remove()
        cardSelecionado = null
    } else {
        alert("Só é possível excluir tarefas concluídas!")
    }
}

// Drag and Drop Controlado
function allowDrop(event) {
    event.preventDefault()
}

function drop(event) {
    event.preventDefault()

    let id = event.dataTransfer.getData("text")
    let card = document.getElementById(id)

    let origem = card.parentElement.id
    let destino = event.currentTarget.id

    // Se já estiver concluído, não pode mover
    if (origem === "realizado") {
        alert("Tarefa já concluída não pode ser movida!")
        return
    }

    // Bloquear ir direto para realizado
    if (destino === "realizado") {
        alert("Use o botão 'Concluída' para finalizar a tarefa!")
        return
    }

    function salvarEdicao(card, novoTexto) {

        if (!novoTexto.trim()) {
            alert("O card não pode ficar vazio!")
            return
        }

        card.innerText = novoTexto

        // reativa eventos IMPORTANTES
        card.onclick = function () {
            document.querySelectorAll(".card").forEach(c => c.classList.remove("selecionado"))
            card.classList.add("selecionado")
            cardSelecionado = card
        }

        card.ondblclick = function () {
            editarCard(card)
        }

        card.ondragstart = function (event) {
            event.dataTransfer.setData("text", card.id)
        }
    }

    // Permite apenas entre col01 e col02
    if (
        (origem === "col01" && destino === "col02") ||
        (origem === "col02" && destino === "col01")
    ) {
        event.currentTarget.appendChild(card)
    } else {
        alert("Movimento não permitido!")
    }
}
// Salva o novo card quando der enter
document.getElementById("inBox").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        novocard();
    }
});