const canvas = document.getElementById("forcaCanvas");
const ctx = canvas.getContext("2d");

const palavrasFacil = ["gato", "bola", "casa", "pato", "fada"];
const palavrasMedio = ["janela", "computador", "avião", "cachorro", "flor"];
const palavrasDificil = ["programacao", "desenvolvimento", "extraordinario", "hipopotamo", "transcendente"];

let palavra = "";
let letrasCorretas = [];
let letrasErradas = [];
let tentativas = 6;
let statusJogo = "jogando";

const btnFacil = document.getElementById("btnFacil");
const btnMedio = document.getElementById("btnMedio");
const btnDificil = document.getElementById("btnDificil");
const btnNovoJogo = document.getElementById("btnNovoJogo");
const inputLetra = document.getElementById("inputLetra");
const displayPalavra = document.getElementById("displayPalavra");
const displayLetrasErradas = document.getElementById("displayLetrasErradas");
const mensagem = document.getElementById("mensagem");
const tentativasRestantes = document.getElementById("tentativasRestantes");

function escolherPalavra(nivel) {
  letrasCorretas = [];
  letrasErradas = [];
  tentativas = 6;
  statusJogo = "jogando";
  mensagem.textContent = "";
  inputLetra.value = "";
  inputLetra.disabled = false;
  tentativasRestantes.textContent = `Tentativas restantes: ${tentativas}`;

  if (nivel === "facil") {
    palavra = palavrasFacil[Math.floor(Math.random() * palavrasFacil.length)];
  } else if (nivel === "medio") {
    palavra = palavrasMedio[Math.floor(Math.random() * palavrasMedio.length)];
  } else {
    palavra = palavrasDificil[Math.floor(Math.random() * palavrasDificil.length)];
  }
  desenharForca();
  atualizarDisplay();
}

function atualizarDisplay() {
  let display = "";
  for (let letra of palavra) {
    if (letrasCorretas.includes(letra)) {
      display += letra + " ";
    } else {
      display += "❓ ";
    }
  }
  displayPalavra.textContent = display.trim();
  displayLetrasErradas.textContent = "🚫 Letras erradas: " + letrasErradas.join(" ❌ ");
  tentativasRestantes.textContent = `❤️ Tentativas restantes: ${tentativas}`;
}

function verificarLetra() {
  if (statusJogo !== "jogando") return;

  let letra = inputLetra.value.toLowerCase();
  inputLetra.value = "";

  if (!letra.match(/^[a-záàâãéèêíïóôõöúçñ]$/i)) {
    mensagem.textContent = "⚠️ Digite uma letra válida!";
    return;
  }

  if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) {
    mensagem.textContent = "🔁 Você já tentou essa letra.";
    return;
  }

  if (palavra.includes(letra)) {
    letrasCorretas.push(letra);
    mensagem.textContent = "✅ Boa! Letra correta.";
  } else {
    letrasErradas.push(letra);
    tentativas--;
    mensagem.textContent = "❌ Letra incorreta!";
  }

  atualizarDisplay();
  desenharForca();
  verificarFimJogo();
}

function verificarFimJogo() {
  if (tentativas <= 0) {
    statusJogo = "derrota";
    mensagem.textContent = `💀 Você perdeu! A palavra era: ${palavra}`;
    inputLetra.disabled = true;
  } else if (palavra.split("").every(letra => letrasCorretas.includes(letra))) {
    statusJogo = "vitoria";
    mensagem.textContent = "🎉 Parabéns! Você venceu!";
    inputLetra.disabled = true;
    confetti(); // Ativa confete
  }
}

function desenharForca() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#333";

  ctx.beginPath();
  ctx.moveTo(20, 180);
  ctx.lineTo(180, 180);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(50, 180);
  ctx.lineTo(50, 20);
  ctx.lineTo(120, 20);
  ctx.lineTo(120, 40);
  ctx.stroke();

  let erros = 6 - tentativas;

  if (erros > 0) {
    ctx.beginPath();
    ctx.arc(120, 60, 20, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (erros > 1) {
    ctx.beginPath();
    ctx.moveTo(120, 80);
    ctx.lineTo(120, 130);
    ctx.stroke();
  }
  if (erros > 2) {
    ctx.beginPath();
    ctx.moveTo(120, 90);
    ctx.lineTo(90, 110);
    ctx.stroke();
  }
  if (erros > 3) {
    ctx.beginPath();
    ctx.moveTo(120, 90);
    ctx.lineTo(150, 110);
    ctx.stroke();
  }
  if (erros > 4) {
    ctx.beginPath();
    ctx.moveTo(120, 130);
    ctx.lineTo(90, 160);
    ctx.stroke();
  }
  if (erros > 5) {
    ctx.beginPath();
    ctx.moveTo(120, 130);
    ctx.lineTo(150, 160);
    ctx.stroke();
  }
}

// Eventos
btnFacil.addEventListener("click", () => escolherPalavra("facil"));
btnMedio.addEventListener("click", () => escolherPalavra("medio"));
btnDificil.addEventListener("click", () => escolherPalavra("dificil"));
btnNovoJogo.addEventListener("click", () => {
  escolherPalavra("facil");
  mensagem.textContent = "";
});
inputLetra.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    verificarLetra();
  }
});

// Inicia o jogo
escolherPalavra("facil");
