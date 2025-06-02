const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const palavraSecretaDiv = document.getElementById('palavra-secreta');
const tecladoDiv = document.getElementById('teclado');
const nivelSelect = document.getElementById('nivel');

const palavras = {
  facil: ["bola", "casa", "gato", "pato", "luz"],
  medio: ["janela", "bicicleta", "computador", "travesseiro"],
  dificil: ["paralelepipedo", "otorrinolaringologista", "inconstitucionalidade"]
};

let palavraAtual = "";
let letrasCorretas = [];
let letrasErradas = [];
let tentativasRestantes = 6;

function desenharForca() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 4;

  // Base
  ctx.beginPath();
  ctx.moveTo(50, 280);
  ctx.lineTo(250, 280);
  ctx.stroke();

  // Poste vertical
  ctx.beginPath();
  ctx.moveTo(100, 280);
  ctx.lineTo(100, 50);
  ctx.stroke();

  // Poste horizontal
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(200, 50);
  ctx.stroke();

  // Corda
  ctx.beginPath();
  ctx.moveTo(200, 50);
  ctx.lineTo(200, 80);
  ctx.stroke();

  const erros = 6 - tentativasRestantes;

  if (erros > 0) {
    // Cabeça
    ctx.beginPath();
    ctx.arc(200, 100, 20, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (erros > 1) {
    // Corpo
    ctx.beginPath();
    ctx.moveTo(200, 120);
    ctx.lineTo(200, 180);
    ctx.stroke();
  }
  if (erros > 2) {
    // Braço esquerdo
    ctx.beginPath();
    ctx.moveTo(200, 140);
    ctx.lineTo(170, 160);
    ctx.stroke();
  }
  if (erros > 3) {
    // Braço direito
    ctx.beginPath();
    ctx.moveTo(200, 140);
    ctx.lineTo(230, 160);
    ctx.stroke();
  }
  if (erros > 4) {
    // Perna esquerda
    ctx.beginPath();
    ctx.moveTo(200, 180);
    ctx.lineTo(170, 220);
    ctx.stroke();
  }
  if (erros > 5) {
    // Perna direita
    ctx.beginPath();
    ctx.moveTo(200, 180);
    ctx.lineTo(230, 220);
    ctx.stroke();
  }
}

function mostrarPalavra() {
  let exibicao = palavraAtual
    .split("")
    .map((letra) => (letrasCorretas.includes(letra) ? letra : "_"))
    .join(" ");
  palavraSecretaDiv.textContent = exibicao;
}

function criarTeclado() {
  tecladoDiv.innerHTML = "";
  const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  alfabeto.forEach((letra) => {
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.onclick = () => tentarLetra(letra.toLowerCase());
    tecladoDiv.appendChild(btn);
  });
}

function tentarLetra(letra) {
  if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) return;

  if (palavraAtual.includes(letra)) {
    letrasCorretas.push(letra);
  } else {
    letrasErradas.push(letra);
    tentativasRestantes--;
  }

  desenharForca();
  mostrarPalavra();
  verificarFimDeJogo();
}

function verificarFimDeJogo() {
  const ganhou = palavraAtual.split("").every((l) => letrasCorretas.includes(l));
  if (ganhou) {
    alert("🎉 Parabéns! Você venceu!");
    desabilitarTeclado();
  } else if (tentativasRestantes === 0) {
    alert(`💀 Você perdeu! A palavra era: ${palavraAtual}`);
    desabilitarTeclado();
  }
}

function desabilitarTeclado() {
  const botoes = tecladoDiv.querySelectorAll("button");
  botoes.forEach((btn) => btn.disabled = true);
}

function novoJogo() {
  const nivel = nivelSelect.value;
  const lista = palavras[nivel];
  palavraAtual = lista[Math.floor(Math.random() * lista.length)];
  letrasCorretas = [];
  letrasErradas = [];
  tentativasRestantes = 6;
  desenharForca();
  mostrarPalavra();
  criarTeclado();
}

// Iniciar
novoJogo();
