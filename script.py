import random
from js import document

palavras = ["python", "forca", "codigo", "pyscript", "github"]

palavra = random.choice(palavras)
letras_certas = ["_" for _ in palavra]
letras_erradas = []
erros = 0
max_erros = 6

canvas = document.getElementById("forcaCanvas")
ctx = canvas.getContext("2d")

def desenhar_forca():
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#00bcd4"
    ctx.lineWidth = 3
    if erros >= 1:
        ctx.beginPath()
        ctx.moveTo(20, 230)
        ctx.lineTo(230, 230)
        ctx.stroke()
    if erros >= 2:
        ctx.beginPath()
        ctx.moveTo(50, 230)
        ctx.lineTo(50, 20)
        ctx.stroke()
    if erros >= 3:
        ctx.beginPath()
        ctx.moveTo(50, 20)
        ctx.lineTo(180, 20)
        ctx.stroke()
    if erros >= 4:
        ctx.beginPath()
        ctx.moveTo(180, 20)
        ctx.lineTo(180, 50)
        ctx.stroke()
    if erros >= 5:
        ctx.beginPath()
        ctx.arc(180, 70, 20, 0, 6.28318)
        ctx.stroke()
    if erros >= 6:
        ctx.beginPath()
        ctx.moveTo(180, 90)
        ctx.lineTo(180, 150)
        ctx.stroke()

def atualizar_tela():
    document.getElementById("palavra").innerText = " ".join(letras_certas)
    document.getElementById("letrasErradas").innerText = ", ".join(letras_erradas)
    desenhar_forca()

def tentar_letra(*args):
    global erros
    input_letra = document.getElementById("inputLetra")
    letra = input_letra.value.lower()
    input_letra.value = ""
    msg = document.getElementById("mensagem")

    if len(letra) != 1 or not letra.isalpha():
        msg.innerText = "Digite uma única letra válida."
        return

    if letra in letras_certas or letra in letras_erradas:
        msg.innerText = f"Você já tentou a letra '{letra}'."
        return

    if letra in palavra:
        for idx, ch in enumerate(palavra):
            if ch == letra:
                letras_certas[idx] = letra
        msg.innerText = "Letra correta!"
    else:
        letras_erradas.append(letra)
        erros += 1
        msg.innerText = "Letra errada!"

    atualizar_tela()

    if "_" not in letras_certas:
        msg.innerText = f"Parabéns! Você venceu! Palavra: {palavra.upper()}"
        document.getElementById("btnTentar").disabled = True
        input_letra.disabled = True
    elif erros >= max_erros:
        msg.innerText = f"Você perdeu! A palavra era: {palavra.upper()}"
        document.getElementById("btnTentar").disabled = True
        input_letra.disabled = True

atualizar_tela()
