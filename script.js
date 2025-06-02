const palavras = ["python", "forca", "codigo", "javascript", "github"];
let palavra = palavras[Math.floor(Math.random() * palavras.length)];
let letrasCertas = Array(palavra.length).fill("_");
let letrasErradas = [];
let erros = 0;
const maxErros = 6;

const canvas = document.getElementById("forcaCanvas");
const ctx = canvas.getContext("2d");

const palavraEl = document.getElementById("palavra");
const letrasErradasEl = document.getElementById("letrasErradas");
const mensagemEl = document.getElementById("mensagem");
const inputLetra = document.getElementById("inputLetra");
const btnTentar = document.getElementById("btnTentar");

function desenharForca() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#00adb5";
  ctx.lineWidth = 3;
  ctx.shadowColor = "#00adb5cc";
  ctx.shadowBlur = 6;

  if (erros >= 1) {
    ctx.beginPath();
    ctx.moveTo(20, 230);
    ctx.lineTo(230, 230);
    ctx.stroke();
  }
  if (erros >= 2) {
    ctx.beginPath();
    ctx.moveTo(50, 230);
    ctx.lineTo(50, 20);
    ctx.stroke();
  }
  if (erros >= 3) {
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.lineTo(180, 20);
    ctx.stroke();
  }
  if (erros >= 4) {
    ctx.beginPath();
    ctx.moveTo(180, 20);
    ctx.lineTo(180, 50);
    ctx.stroke();
  }
  if (erros >= 5) {
    ctx.beginPath();
    ctx.arc(180, 70, 20, 0, 2 * Math.PI);
    ctx.stroke();
  }
  if (erros >= 6) {
    ctx.beginPath();
    ctx.moveTo(180, 90);
    ctx.lineTo(180, 150);
    ctx.stroke();
  }
  ctx.shadowBlur = 0; // Reset shadow after drawing
}

function atualizarTela() {
  palavraEl.textContent = letrasCertas.join(" ");
  letrasErradasEl.textContent = letrasErradas.join(", ");
  desenharForca();
}

function mostrarMensagem(texto, tipo = "normal") {
  mensagemEl.textContent = texto;
  mensagemEl.className = ""; // Remove classes

  if (tipo === "erro") {
    mensagemEl.classList.add("erro");
  } else if (tipo === "sucesso") {
    mensagemEl.classList.add("sucesso");
  }

  // Reinicia animação para poder disparar novamente
  mensagemEl.style.animation = "none";
  mensagemEl.offsetHeight; // trigger reflow
  mensagemEl.style.animation = null;
}

function tentarLetra() {
  let letra = inputLetra.value.toLowerCase();
  inputLetra.value = "";
  mostrarMensagem("", "normal");

  if (!letra.match(/^[a-z]$/)) {
    mostrarMensagem("Digite uma letra válida!", "erro");
    return;
  }

  if (letrasCertas.includes(letra) || letrasErradas.includes(letra)) {
    mostrarMensagem(`Você já tentou a letra "${letra}".`, "erro");
    return;
  }

  if (palavra.includes(letra)) {
    for (let i = 0; i < palavra.length; i++) {
      if (palavra[i] === letra) {
        letrasCertas[i] = letra;
      }
    }
    mostrarMensagem("Letra correta!", "sucesso");
  } else {
    letrasErradas.push(letra);
    erros++;
    mostrarMensagem("Letra errada!", "erro");
  }

  atualizarTela();

  if (!letrasCertas.includes("_")) {
    mostrarMensagem(`Parabéns! Você venceu! Palavra: ${palavra.toUpperCase()}`, "sucesso");
    btnTentar.disabled = true;
    inputLetra.disabled = true;
  } else if (erros >= maxErros) {
    mostrarMensagem(`Você perdeu! A palavra era: ${palavra.toUpperCase()}`, "erro");
    btnTentar.disabled = true;
    inputLetra.disabled = true;
  }
}

btnTentar.addEventListener("click", tentarLetra);

inputLetra.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    tentarLetra();
  }
});

// Inicializa a tela
atualizarTela();
