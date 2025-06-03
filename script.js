const canvas = document.getElementById("forcaCanvas");
const ctx = canvas.getContext("2d");

const palavrasFacil = ["gato", "bola", "casa", "pato", "fada"];
const palavrasMedio = ["janela", "computador", "avião", "cachorro", "flor"];
const palavrasDificil = ["programacao", "desenvolvimento", "extraordinario", "hipopotamo", "transcendente"];

let palavra = "";
let letrasCorretas = [];
let letrasErradas = [];
let tentativas = 6;
let statusJogo = "aguardando";

const dificuldadeSelect = document.getElementById("dificuldade");
const btnNovoJogo = document.getElementById("btnNovoJogo");
const inputLetra = document.getElementById("inputLetra");
const displayPalavra = document.getElementById("displayPalavra");
const displayLetrasErradas = document.getElementById("displayLetrasErradas");
const mensagem = document.getElementById("mensagem");
const tentativasRestantes = document.getElementById("tentativasRestantes");
const jogoDiv = document.getElementById("jogo");

function escolherPalavra(nivel) {
  const lista = nivel === "facil" ? palavrasFacil :
                nivel === "medio" ? palavrasMedio :
                palavrasDificil;
  return lista[Math.floor(Math.random() * lista.length)];
}

function iniciarJogo() {
  letrasCorretas = [];
  letrasErradas = [];
  tentativas = 6;
  statusJogo = "jogando";
  palavra = escolherPalavra(dificuldadeSelect.value);
  mensagem.textContent = "";
  inputLetra.value = "";
  inputLetra.disabled = false;
  jogoDiv.style.display = "block";
  tentativasRestantes.textContent = `Tentativas restantes: ${tentativas}`;
  atualizarDisplay();
  desenharForca();
}

function atualizarDisplay() {
  let display = "";
  for (let letra of palavra) {
    display += letrasCorretas.includes(letra) ? letra + " " : "_ ";
  }
  displayPalavra.textContent = display.trim();
  displayLetrasErradas.textContent = "Letras erradas: " + letrasErradas.join(", ");
  tentativasRestantes.textContent = `Tentativas restantes: ${tentativas}`;
}

function verificarLetra() {
  if (statusJogo !== "jogando") return;

  const letra = inputLetra.value.toLowerCase();
  inputLetra.value = "";

  if (!letra.match(/^[a-záàâãéèêíïóôõöúçñ]$/i)) {
    mensagem.textContent = "Por favor, digite uma letra válida.";
    return;
  }

  if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) {
    mensagem.textContent = "Você já tentou essa letra.";
    return;
  }

  if (palavra.includes(letra)) {
    letrasCorretas.push(letra);
    mensagem.textContent = "Boa! Letra correta.";
  } else {
    letrasErradas.push(letra);
    tentativas--;
    mensagem.textContent = "Letra incorreta!";
  }

  atualizarDisplay();
  desenharForca();
  verificarFimJogo();
}

function verificarFimJogo() {
  if (tentativas <= 0) {
    statusJogo = "derrota";
    mensagem.textContent = `Você perdeu! A palavra era: ${palavra}`;
    inputLetra.disabled = true;
  } else if (palavra.split("").every(l => letrasCorretas.includes(l))) {
    statusJogo = "vitoria";
    mensagem.textContent = "Parabéns! Você venceu!";
    inputLetra.disabled = true;
  }
}

function desenharForca() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#eee";

  // base
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
btnNovoJogo.addEventListener("click", iniciarJogo);
inputLetra.addEventListener("keyup", function(e) {
  if (e.key === "Enter") verificarLetra();
});
