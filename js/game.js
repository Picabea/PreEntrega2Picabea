//src de las flechas
const flechaAbajo = "../images/flechaAbajo.png"
const flechaArriba = "../images/flechaArriba.png"
const trofeo = "../images/trofeo.png"
const libro = "../images/bookIcon.png"
//Elementos del HTML
const inputNumeros = document.querySelector("#inputNumeros")
const botonNumeros = document.querySelector("#botonNumeros")
const output = document.querySelector("output")
const selectDificultad = document.querySelector("select")
const buttonNewGame = document.querySelector("#buttonNewGame")
const section = document.querySelector(`#sectionIntentos`)
const submitButton = document.querySelector("body div div button")
const helpImg = document.querySelector("#helpButton")

//Creamos el objeto del session storage que guarda el num de intentos
let data = []
let numeroIngresado = null
let intentos = 0
let dificultad = 10
let game_status = sessionStorage.getItem("game_status")
let id = null
let numero = null
let numeroInput = null

//Creacion de cada objeto representativo de una partida con sus ctas.
function Partida(resultado, id){
    this.intentos = sessionStorage.getItem("intentos")
    this.resultado = resultado
    this.dificultad = sessionStorage.getItem("dificultad")
    this.numerosIngresados = JSON.parse(sessionStorage.getItem("numerosIngresados"))
    this.id = id
}

//Eventos del DOM para ejecutar el codigo
//inputNumeros.addEventListener("change", comprobarNumero)//Cuando se ingresa un numero ejecuta la comprobacion y carga el div
submitButton.addEventListener("click", recuperarNumero)

selectDificultad.addEventListener("change", (evento) => {
    dificultad = evento.target.value
    sessionStorage.setItem("dificultad", dificultad)
})//Cuando cambia almacena la dificultad en el session storage

buttonNewGame.addEventListener("click", iniciarJuego)//Sirve para reiniciar el juego, utiliza la misma funcion que establece todos los valores iniciales apenas carga la pagina

helpImg.addEventListener("click", helpAlert)

document.addEventListener("DOMContentLoaded", iniciarJuego)//Cuando carga la pagina reinicia todas las variables y setea el juego




function helpAlert(evento){
    Swal.fire({
        imageUrl: libro,
        imageHeight: 100,
        imageWidth: 100,
        html: "<h3>Reglas</h3>Tienes que ingresar un número entre <b>1</b> y <b>100</b>. El sistema te dirá si el número ingresado es <b>mayor</b> o <b>menor</b>. El objetivo es adivinar el número escogido aleatoriamente. <h3>Dificultad</h3>Se puede elegir entre 3 dificultades <b>fácil</b> (10 intentos), <b>media</b> (5 intentos) y <b>difícil</b> (3 intentos)"
      });
}

async function generarNumeroAleatorio(){//Devuelve un numero aleatorio
    let data = []

    fetch("../randomNumberParameters.json")
        .then((res) => {return res.json()})
        .then((contenidoJson) => {return fetch(`${contenidoJson.url}?num=1&min=${contenidoJson.min}&max=${contenidoJson.max}&col=${contenidoJson.col}&base=${contenidoJson.base}&format=${contenidoJson.format}&rnd=${contenidoJson.rnd}&apiKey=${contenidoJson.key}`)})
        .then((resNumero) => {return resNumero.text()})
        .then((numeroaleatorio) => {
            sessionStorage.setItem("numero", Number(numeroaleatorio))
        })
        .catch((error) => {console.log(error)})
}


function recuperarNumero(evt){
    numeroInput = document.querySelector("#inputNumeros").value
    document.querySelector("#inputNumeros").value = ""
    numeroInput <= 100 & numeroInput >= 1 
    ?actualizarVariables(numeroInput) 
    :Swal.fire({
        icon: "error",
        title: "Error",
        text: "El numero ingresado debe ser entre 1 y 100 inclusive",
      });
}

function actualizarVariables(numeroIngresado){
    selectDificultad.disabled = true //Desactiva la posiblidad de cambiar la dificultad una vez iniciado el juego
    game_status = sessionStorage.getItem("game_status")
    intentos = Number(sessionStorage.getItem("intentos"))
    intentosActualizados = intentos + 1
    dificultad = Number(sessionStorage.getItem("dificultad"))
    if(game_status){
        if(intentos < dificultad){
        //actualizar los intentos
        sessionStorage.setItem("intentos", intentosActualizados)
        
        //cargar la lista de numeros ingresados para cargar en el historial
        numeroIngresado = numeroIngresado
        numerosIngresados = JSON.parse(sessionStorage.getItem("numerosIngresados"))
        numerosIngresados.push(numeroIngresado)
        sessionStorage.setItem("numerosIngresados", JSON.stringify(numerosIngresados))
        comprobarNumero(numeroIngresado, intentosActualizados, dificultad)
        }
    }
}


function comprobarNumero(numeroIngresado, intentos, dificultad){
     //Agarrar del session storage el numero aleatorio
     numero = sessionStorage.getItem("numero")
     console.log(numero)

     //Comprobar si el numero es igual, mayor o menor
     numeroIngresado = numeroIngresado
     if (numeroIngresado == numero){//Si se adivina el numero 
        //Actualizar DOM
        cargarInformacionDiv(trofeo, numeroIngresado)

        //Enviar alerta
         Swal.fire({
             imageUrl: trofeo,
             imageHeight: 238,
             imageWidth: 202,
             title: "Felicitaciones!",
             text: `Has ganado, el numero era ${numero}`
         })

         terminarJuego("ganado")
     }else{
        //Si el numero no es adivinado actualiza el DOM
        if(numeroIngresado > numero){
         cargarInformacionDiv(flechaAbajo, numeroIngresado)
         } else{
         cargarInformacionDiv(flechaArriba, numeroIngresado)
        }
        console.log(intentos + " " + dificultad)
        if(intentos === dificultad){//Si ese fue el ultimo intento termina la partida
            console.log("Termino")
            Swal.fire({
                imageUrl: "../images/sadFaceIcon.png",
                imageHeight: 200,
                imageWidth: 200,
                title: "Perdiste!",
                text: `Pero no pierdas el animo, intenta de nuevo!`
            })
            terminarJuego("perdido")
        }
        
    }
        


}

function cargarInformacionDiv(imagen, numeroIngresado){

    //Crea el div y carga la informacion del intento
    intentos = sessionStorage.getItem("intentos")
    
    section.innerHTML = section.innerHTML + `<div id="intento{intentos}" class="divIntento">
    <h3>Intento número ${intentos}:</h3>
    <div>
    <p>${numeroIngresado}</p>
    <img src="${imagen}" class="imgIntento">
    </div>
    </div>`
}

function terminarJuego(resultado){
    
    //Desactivar la posibilidad de que se sigan cargando numeros
    game_status = false 
    inputNumeros.disabled = true
    submitButton.disabled = true
    id = Number(localStorage.getItem("id"))

    historial = JSON.parse(localStorage.getItem("historial"))//Agarrar del local storage el historial para cargarle un nuevo objeto
    historial.push(new Partida(resultado, id))//Se carga el objeto nuevo
    localStorage.setItem("historial", JSON.stringify(historial))
    localStorage.setItem("id", id + 1)
}

function iniciarJuego(){
    //Posibilitar que se carguen numeros nuevamente
    selectDificultad.disabled = false
    inputNumeros.disabled = false
    submitButton.disabled = false

    //En caso de que nunca se haya creado el objeto historial crearlo
    if (!localStorage.getItem("historial")){
        localStorage.setItem("historial", JSON.stringify([]))
    }
    
    if (!localStorage.getItem("id")){
        localStorage.setItem("id", 1)
    }

    //Reiniciar variables
    sessionStorage.setItem("intentos", 0)
    sessionStorage.setItem("dificultad", 10)
    sessionStorage.setItem("numerosIngresados", JSON.stringify([]))
    sessionStorage.setItem("game_status", true)
    generarNumeroAleatorio() //Generar un nuevo numero aleatorio

    //Eliminar los div del juego anterior
    section.innerHTML = ""
}


