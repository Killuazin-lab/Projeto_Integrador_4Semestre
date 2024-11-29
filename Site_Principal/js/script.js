// Função para acender a luz correspondente ao status do produto
function efeitoFarol(status) {
    const luzVerde = document.getElementById('luz-verde');
    const luzVermelha = document.getElementById('luz-vermelha');
    const luzAmarela = document.getElementById('luz-amarela');

    // Reseta todas as luzes para apagado
    luzVerde.style.backgroundColor = '#333';
    luzVermelha.style.backgroundColor = '#333';
    luzAmarela.style.backgroundColor = '#333';

    // Verifica o status e acende a luz correspondente
    if (status === 'guarana') {
        luzVerde.style.backgroundColor = 'green'; // Garrafa de Guaraná
    } else if (status === 'coca') {
        luzVermelha.style.backgroundColor = 'red'; // Garrafa de Coca
    } else {
        luzAmarela.style.backgroundColor = 'yellow'; // Nenhum status ou status inválido
    }
}

// Redireciona para a página "Sobre Nós"
function goToAboutPage() {
    window.location.href = '/sobre';
}

// Função para verificar o status atual do servidor e atualizar o farol
function atualizarFarol() {
    fetch('/obter_status') // Faz uma requisição GET para a API
        .then(response => response.json()) // Converte a resposta para JSON
        .then(data => {
            const status = data.status; // Obtém o status retornado pelo servidor
            efeitoFarol(status); // Atualiza o farol com o status retornado
        })
        .catch(error => {
            console.error("Erro ao obter status:", error); // Loga erros
            efeitoFarol(null); // Acende a luz amarela em caso de erro na requisição
        });
}

// Atualiza o farol a cada 1 segundo
setInterval(atualizarFarol, 1000);


// // apenas para exemplo, começa no verde, vai pro amarelo e dps pro vermelho
// efeitoFarol('guarana');
// setTimeout(() => { efeitoFarol('guarana'); }, 3000); //3 segundos
// setTimeout(() => { efeitoFarol('coca'); }, 6000); //6 segundos
