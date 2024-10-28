// Função para acender a luz correspondente ao status do produto
function efeitoFarol(status) {
  const luzVerde = document.getElementById('luz-verde');
  const luzAmarela = document.getElementById('luz-amarela');
  const luzVermelha = document.getElementById('luz-vermelha');

  // Reseta todas as luzes para apagado
  luzVerde.style.backgroundColor = '#333';
  luzAmarela.style.backgroundColor = '#333';
  luzVermelha.style.backgroundColor = '#333';

  // Muda a cor de acordo com o status
  if (status === 'correto') {
      luzVerde.style.backgroundColor = 'green';
  } else if (status === 'defeito') {
      luzAmarela.style.backgroundColor = 'yellow';
  } else if (status === 'muitos defeitos') {
      luzVermelha.style.backgroundColor = 'red';
  }
}

// apenas para exemplo, começa no verde, vai pro amarelo e dps pro vermelho
efeitoFarol('correto');
setTimeout(() => { efeitoFarol('defeito'); }, 3000); //3 segundos
setTimeout(() => { efeitoFarol('muitos defeitos'); }, 6000); //6 segundos
