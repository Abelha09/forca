const palavras = {
  facil: ["gato", "bola", "pato", "mala", "limao"],
  medio: ["janela", "garrafa", "computador", "escola", "abacaxi"],
  dificil: ["helicoptero", "programador", "psicologia", "transporte", "revolucionario"]
};

let palavraSelecionada = "";
let letrasCorretas = [];
let letrasErradas = [];
let tentativas = 6;

function escolherPalavra(nivel) {
  const lista = palavras[nivel];
  palavraSelecionada = lista[Math.floor(Math.random() * lista.length)].toUpperCase();
  letrasCorretas = [];
  letrasErradas = [];
  tentativas = 6;

  atualizarDisplay();
  desenharBoneco();
  document.getElementById("mensagem").textContent = "";
  document.getElementById("inputLetra").value = "";
  document.getElementById("inputLetra").focus();
}

function atualizarDisplay() {
  const displayPalavra = palavraSelecionada
    .split("")
    .map((letra) => (letrasCorretas.includes(letra) ? letra : "_"))
    .join(" ");

  document.getElementById("displayPalavra").textContent = displayPalavra;
  document.getElementById("tentativasRestantes").textContent = `❤️ Tentativas restantes: ${tentativas}`;
  document.getElementById("displayLetrasErradas").textContent = `❌ Letras erradas: ${letrasErradas.join(", ")}`;

  if (!displayPalavra.includes("_")) {
    document.getElementById("mensagem").textContent = "🎉 Parabéns! Você venceu!";
    soltarConfete();
  } else if (tentativas === 0) {
    document.getElementById("mensagem").textContent = `💀 Você perdeu! A palavra era: ${palavraSelecionada}`;
  }
}

document.getElementById("inputLetra").addEventListener("keyup", function (e) {
  if (e.key === "Enter" && this.value) {
    const letra = this.value.toUpperCase();
    this.value = "";

    if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) {
      document.getElementById("mensagem").textContent = "🔁 Letra já usada!";
      return;
    }

    if (palavraSelecionada.includes(letra)) {
      letrasCorretas.push(letra);
    } else {
      letrasErradas.push(letra);
      tentativas--;
    }

    atualizarDisplay();
    desenharBoneco();
  }
});

function desenharBoneco() {
  const canvas = document.getElementById("forcaCanvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#333";
  ctx.lineWidth = 4;

  // Base
  ctx.beginPath();
  ctx.moveTo(50, 180);
  ctx.lineTo(250, 180);
  ctx.stroke();

  // Poste vertical
  ctx.beginPath();
  ctx.moveTo(100, 180);
  ctx.lineTo(100, 20);
  ctx.stroke();

  // Poste horizontal
  ctx.beginPath();
  ctx.moveTo(100, 20);
  ctx.lineTo(200, 20);
  ctx.stroke();

  // Corda
  ctx.beginPath();
  ctx.moveTo(200, 20);
  ctx.lineTo(200, 40);
  ctx.stroke();

  // Boneco cartoon (parte a parte)
  if (tentativas <= 5) {
    // Cabeça
    ctx.beginPath();
    ctx.arc(200, 55, 15, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (tentativas <= 4) {
    // Corpo
    ctx.beginPath();
    ctx.moveTo(200, 70);
    ctx.lineTo(200, 110);
    ctx.stroke();
  }
  if (tentativas <= 3) {
    // Braço esquerdo
    ctx.beginPath();
    ctx.moveTo(200, 80);
    ctx.lineTo(180, 100);
    ctx.stroke();
  }
  if (tentativas <= 2) {
    // Braço direito
    ctx.beginPath();
    ctx.moveTo(200, 80);
    ctx.lineTo(220, 100);
    ctx.stroke();
  }
  if (tentativas <= 1) {
    // Perna esquerda
    ctx.beginPath();
    ctx.moveTo(200, 110);
    ctx.lineTo(180, 140);
    ctx.stroke();
  }
  if (tentativas <= 0) {
    // Perna direita
    ctx.beginPath();
    ctx.moveTo(200, 110);
    ctx.lineTo(220, 140);
    ctx.stroke();
  }
}

function soltarConfete() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

// Controle de telas
function escolherNivel(nivel) {
  document.getElementById("telaSelecao").style.display = "none";
  document.getElementById("telaJogo").style.display = "block";
  escolherPalavra(nivel);
}

function voltarParaSelecao() {
  document.getElementById("telaJogo").style.display = "none";
  document.getElementById("telaSelecao").style.display = "block";
}
