const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const palavraSpan = document.getElementById('palavra');
const letrasErradasSpan = document.getElementById('letrasErradas');
const mensagemDiv = document.getElementById('mensagem');
const letraInput = document.getElementById('letraInput');
const btnAdivinhar = document.getElementById('btnAdivinhar');
const btnReiniciar = document.getElementById('btnReiniciar');
const dificuldadeSelect = document.getElementById('dificuldade');

const somAcerto = new Audio('assets/acerto.mp3');
const somErro = new Audio('assets/erro.mp3');
const somVitoria = new Audio('assets/vitoria.mp3');
const somDerrota = new Audio('assets/derrota.mp3');

let palavra = '';
let palavraOculta = [];
let letrasErradas = [];
let tentativas = 0;
let pontos = 0;

// Dicionário de palavras por dificuldade
const palavras = {
  facil: ['casa', 'bola', 'uva', 'gato', 'sol'],
  medio: ['carro', 'janela', 'livro', 'cidade', 'cachorro'],
  dificil: ['computador', 'astronauta', 'marcenaria', 'filosofia', 'democracia']
};

function escolherPalavra() {
  const nivel = dificuldadeSelect.value;
  const lista = palavras[nivel];
  palavra = lista[Math.floor(Math.random() * lista.length)].toUpperCase();
  palavraOculta = Array(palavra.length).fill('_');
  letrasErradas = [];
  tentativas = 0;
  atualizarTela();
  desenharForca(0);
}

function atualizarTela() {
  palavraSpan.textContent = palavraOculta.join(' ');
  letrasErradasSpan.textContent = letrasErradas.join(', ');
  mensagemDiv.textContent = '';
  letraInput.value = '';
  letraInput.focus();
}

function verificarLetra() {
  const letra = letraInput.value.toUpperCase();
  if (!letra.match(/[A-ZÀ-Ú]/) || letra.length !== 1) return;

  if (palavra.includes(letra)) {
    let acertou = false;
    palavra.split('').forEach((l, i) => {
      if (l === letra) {
        palavraOculta[i] = letra;
        acertou = true;
      }
    });
    if (acertou) somAcerto.play();
  } else if (!letrasErradas.includes(letra)) {
    letrasErradas.push(letra);
    tentativas++;
    desenharForca(tentativas);
    somErro.play();
  }

  atualizarTela();
  verificarFim();
}

function verificarFim() {
  if (!palavraOculta.includes('_')) {
    mensagemDiv.textContent = '🎉 Você venceu!';
    somVitoria.play();
    pontos += 10;
    btnAdivinhar.disabled = true;
    letraInput.disabled = true;
  } else if (tentativas >= 6) {
    mensagemDiv.textContent = `😵 Você perdeu! A palavra era: ${palavra}`;
    somDerrota.play();
    btnAdivinhar.disabled = true;
    letraInput.disabled = true;
  }
}

function reiniciarJogo() {
  btnAdivinhar.disabled = false;
  letraInput.disabled = false;
  escolherPalavra();
}

// Desenha a forca e boneco
function desenharForca(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;

  // Estrutura
  ctx.beginPath(); ctx.moveTo(10, 190); ctx.lineTo(190, 190); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(50, 190); ctx.lineTo(50, 10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(50, 10); ctx.lineTo(150, 10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(150, 10); ctx.lineTo(150, 30); ctx.stroke();

  // Boneco
  if (t > 0) { ctx.beginPath(); ctx.arc(150, 50, 20, 0, Math.PI * 2); ctx.stroke(); }
  if (t > 1) { ctx.beginPath(); ctx.moveTo(150, 70); ctx.lineTo(150, 120); ctx.stroke(); }
  if (t > 2) { ctx.beginPath(); ctx.moveTo(150, 80); ctx.lineTo(120, 100); ctx.stroke(); }
  if (t > 3) { ctx.beginPath(); ctx.moveTo(150, 80); ctx.lineTo(180, 100); ctx.stroke(); }
  if (t > 4) { ctx.beginPath(); ctx.moveTo(150, 120); ctx.lineTo(120, 150); ctx.stroke(); }
  if (t > 5) { ctx.beginPath(); ctx.moveTo(150, 120); ctx.lineTo(180, 150); ctx.stroke(); }
}

// Eventos
btnAdivinhar.addEventListener('click', verificarLetra);
btnReiniciar.addEventListener('click', reiniciarJogo);
letraInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') verificarLetra();
});
dificuldadeSelect.addEventListener('change', reiniciarJogo);

// Inicial
reiniciarJogo();
