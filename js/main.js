let adivinado = false
let adivinanza = null
let intentos = 0
let game_status = true


function generarNumeroAleatorio(min, max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let numero = generarNumeroAleatorio(1, 100)
console.log(numero)

function iniciarJuego(){
    console.log("Bienvenido a Adivina el Numero! Deberas ingresar un numero e intentar acertar el numero elegido aleatoriamente por el sistema. Tras ingresar un numero te dire si es mayor o menor que el que debes adivinar. Suerte!")
    juego()
}

function juego(){
    for(intentos = 1; intentos < 10; intentos = intentos + 1){
        if(game_status){
            preguntarAdivinanza()            
        }
    }
}



function preguntarAdivinanza(){
    console.log("---------------------------------")
    adivinanza = Number(prompt("Ingrese su adivinanza"))
    comprobarNumero()
}

function comprobarNumero(){
    if(adivinanza === numero){
        console.log("Felicitaciones! El numero era " + numero + ". Adivinaste en " + intentos + " intentos");
        game_status = false
    }
    else{
        if(adivinanza > numero){
            console.log("El numero es menor")
        }
        else{
            console.log("El numero es mayor")
        }
    }
}

iniciarJuego()