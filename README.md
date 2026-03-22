# Quadro Kanban

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Samyr-Dev/WEB01_Kanban/blob/main/LICENSE)

Este é um projeto de faculdade que consiste em uma aplicação de gerenciamento de tarefas baseada na metodologia Kanban. A ferramenta funciona de forma semelhante ao Jira, apresentando quadros que permitem a organização e movimentação de atividades em diferentes estágios de progresso.

A aplicação está publicada e disponível para acesso em: [https://web-01-kanban-qllwlir71-samyrtertuliano4-8289s-projects.vercel.app](https://web-01-kanban-qllwlir71-samyrtertuliano4-8289s-projects.vercel.app)

## 🚀 Tecnologias

O projeto foi desenvolvido utilizando as seguintes tecnologias:
- HTML
- CSS
- JavaScript

## 📋 Funcionalidades

- **Criação de Tarefas:** Adição de novos cards na coluna inicial através de campo de texto.
- **Movimentação Kanban:** Sistema de arrastar e soltar (Drag and Drop) entre as colunas "A Realizar" e "Realizando".
- **Persistência de Dados (Local Storage):** As tarefas e o estado do contador são salvos automaticamente no cache do navegador, permitindo que os dados permaneçam salvos mesmo após atualizar a página.
- **Edição:** Alteração do texto do card através de um clique duplo (funcionalidade bloqueada para tarefas já concluídas).
- **Conclusão:** Botão específico para mover a tarefa para a coluna "Realizado", aplicando estilo visual de tarefa finalizada.
- **Exclusão:** Remoção definitiva de cards, permitida apenas para tarefas que estejam na coluna de concluídas.
- **Restrições de Fluxo:** Bloqueios lógicos que impedem movimentos inválidos, como mover tarefas concluídas de volta para outras colunas ou pular etapas do processo.

## 🔧 Instalação e Execução

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
bash
git clone https://github.com/Samyr-Dev/WEB01_Kanban


2. Abra a pasta do projeto no **VS Code**.
3. Utilize a extensão **Open Live Server** para visualizar a aplicação no navegador.

## 🕹️ Como Usar

1. Digite a atividade no campo de entrada e clique em "Adicionar" ou pressione a tecla Enter.
2. Clique em um card para selecioná-lo (ele mudará de cor para indicar a seleção).
3. Arraste os cards entre as colunas "A Realizar" e "Realizando".
4. Para editar o conteúdo, dê um duplo clique no card desejado.
5. Para finalizar uma tarefa, selecione-a na coluna "Realizando" e clique no botão "Concluída".
6. Para remover uma tarefa, selecione um card que esteja na coluna "Realizado" e clique em "Excluir".

## 🤝 Contribuições

Contribuições não são recomendadas para este projeto, visto que se trata de um trabalho acadêmico específico.

## ✒️ Autores

* **Kleber Freitas** - [GitHub](https://github.com/Kleber-Freitas14)
* **Allysson Roque** - [GitHub](https://github.com/AllyssonHRP)
* **Samyr Tertuliano** - [GitHub](https://github.com/Samyr-Dev) | [LinkedIn](https://www.linkedin.com/in/samyrtertuliano)
