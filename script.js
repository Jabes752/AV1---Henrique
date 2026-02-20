const formulario = document.querySelector('#formulario');
const inputTarefa = document.querySelector('#inputTarefa');
const listaTarefas = document.querySelector('#listaTarefas');
const mensagemErro = document.querySelector('#mensagemErro');
const mensagemVazia = document.querySelector('#mensagemVazia');

// Array que guarda as tarefas
let tarefas = [];

// ====== EVENTOS ======
formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    const texto = inputTarefa.value;
    
    if (validarTarefa(texto)) {
        adicionarTarefa(texto);
        inputTarefa.value = '';
        inputTarefa.focus();
        limparMensagemErro();
    }
});

inputTarefa.addEventListener('input', function() {
    if (inputTarefa.value.trim() !== '') {
        limparMensagemErro();
    }
});

// ====== FUNÇÕES ======

/**
 * Valida se a tarefa está vazia
 * @param {string} texto - Texto da tarefa
 * @returns {boolean} - True se válida, false caso contrário
 */
function validarTarefa(texto) {
    if (texto.trim() === '') {
        exibirMensagemErro('Por favor, digite uma tarefa válida.');
        return false;
    }
    return true;
}

/**
 * Exibe mensagem de erro no DOM
 * @param {string} mensagem - Mensagem a exibir
 */
function exibirMensagemErro(mensagem) {
    mensagemErro.textContent = mensagem;
}

/**
 * Limpa a mensagem de erro
 */
function limparMensagemErro() {
    mensagemErro.textContent = '';
}

/**
 * Adiciona uma nova tarefa ao array e atualiza a interface
 * @param {string} texto - Texto da tarefa
 */
function adicionarTarefa(texto) {
    const tarefa = {
        id: Date.now(),
        texto: texto.trim(),
        concluida: false
    };
    
    tarefas.push(tarefa);
    renderizarTarefas();
}

/**
 * Remove uma tarefa do array
 * @param {number} id - ID da tarefa a remover
 */
function removerTarefa(id) {
    const indice = tarefas.findIndex(tarefa => tarefa.id === id);
    if (indice !== -1) {
        tarefas.splice(indice, 1);
        renderizarTarefas();
    }
}

/**
 * Alterna o estado de conclusão da tarefa
 * @param {number} id - ID da tarefa
 */
function alternarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        renderizarTarefas();
    }
}

/**
 * Renderiza (desenha) todas as tarefas na tela
 */
function renderizarTarefas() {
    listaTarefas.innerHTML = '';
    
    if (tarefas.length === 0) {
        mensagemVazia.classList.remove('oculta');
        return;
    }
    
    mensagemVazia.classList.add('oculta');
    
    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        
        if (tarefa.concluida) {
            li.classList.add('concluida');
        }
        
        const textoSpan = document.createElement('span');
        textoSpan.className = 'tarefa-texto';
        textoSpan.textContent = tarefa.texto;
        textoSpan.addEventListener('click', () => alternarTarefa(tarefa.id));
        
        const btnRemover = document.createElement('button');
        btnRemover.className = 'btn-remover';
        btnRemover.textContent = 'Remover';
        btnRemover.addEventListener('click', () => removerTarefa(tarefa.id));
        
        li.appendChild(textoSpan);
        li.appendChild(btnRemover);
        listaTarefas.appendChild(li);
    });
}