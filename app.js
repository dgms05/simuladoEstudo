let indiceAtual = 0;

// Função para iniciar o simulado
function iniciarSimulado() {
    const startDiv = document.getElementById("start-simulado");
    const headerTitle = document.querySelector("h1");

    if (startDiv) {
        startDiv.style.display = "none"; // Esconde o título e o botão de start
    }

    if (headerTitle) {
        headerTitle.style.display = "none"; // Esconde o h1 quando o simulado começa
    }

    indiceAtual = 0;
    mostrarQuestao();
}

// Função para exibir a questão
function mostrarQuestao() {
    const section = document.getElementById("resultados-pesquisa");
    section.innerHTML = ""; 

    if (indiceAtual < dados.length) {
        const questao = dados[indiceAtual];

        // Exibe a pergunta
        section.innerHTML += `<p>${questao.titulo}</p>`;

        // Cria as opções de resposta de forma organizada
        questao.opcoes.forEach((opcao, idx) => {
            section.innerHTML += `
                <div class="opcao">
                    <input type="radio" name="resposta" id="opcao${idx}" value="${opcao}">
                    <label for="opcao${idx}">${opcao}</label>
                </div>
            `;
        });

        // Botão "Enviar Resposta"
        section.innerHTML += `<button onclick="verificarResposta()">Enviar Resposta</button>`;
    } else {
        finalizarSimulado();
    }
}

// Função para verificar a resposta
function verificarResposta() {
    const respostaSelecionada = document.querySelector('input[name="resposta"]:checked');
    const resultadoDiv = document.getElementById("resultados-pesquisa");

    if (respostaSelecionada) {
        const questaoAtual = dados[indiceAtual];
        const opcaoCorreta = questaoAtual.opcoes[questaoAtual.correta];
        const mensagem = (respostaSelecionada.value === opcaoCorreta) 
            ? "Você acertou!" 
            : `Você errou! A resposta correta é: ${opcaoCorreta}`;
        
        resultadoDiv.innerHTML = `<p>${mensagem}</p><button onclick="proximaQuestao()">Próxima Questão</button>`;
    } else {
        alert("Por favor, selecione uma resposta!");
    }
}

// Função para exibir a próxima questão
function proximaQuestao() {
    indiceAtual++;
    mostrarQuestao();
}

// Função para finalizar o simulado
function finalizarSimulado() {
    const section = document.getElementById("resultados-pesquisa");
    const headerTitle = document.querySelector("h1");
    section.innerHTML = "<p>Você completou o simulado!</p>";
    section.innerHTML += `<button onclick="iniciarSimulado()">Reiniciar Simulado</button>`;

    if (headerTitle) {
        headerTitle.style.display = "block"; // Mostra o h1 novamente ao finalizar
    }
}