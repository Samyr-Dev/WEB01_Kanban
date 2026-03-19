let contador = 0

function novocard() {
    let input = document.getElementById("inBox")
    let texto = input.value

    if (!texto.trim()) return

    let card = document.createElement('div')
    card.className = "card"
    card.draggable = true

    card.id = 'card' + contador++
    card.innerText = texto

    card.ondragstart = function (event) {
        event.dataTransfer.setData("text", card.id)
    }

    card.ondblclick = function () {
        let novoTexto = prompt("Editar tarefa:", card.innerText)
        if (novoTexto && novoTexto.trim() !== "") {
            card.innerText = novoTexto
        }
    }

    document.getElementById("col01").appendChild(card)

    input.value = ""
}

function allowDrop(event) {
    event.preventDefault()
}

function drop(event) {
    event.preventDefault()

    let id = event.dataTransfer.getData("text")
    let card = document.getElementById(id)

    event.currentTarget.appendChild(card)
}