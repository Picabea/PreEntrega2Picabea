//src de las flechas
const flechaAbajo = "../images/flechaAbajo.png"
const flechaArriba = "../images/flechaArriba.png"
const trofeo = "../images/trofeo.png"

//Elementos del HTML
const inputNumeros = document.querySelector("#inputNumeros")
const botonNumeros = document.querySelector("#botonNumeros")
const output = document.querySelector("output")
const selectDificultad = document.querySelector("select")
const buttonNewGame = document.querySelector("#buttonNewGame")
const section = document.querySelector(`#sectionIntentos`)
//Creamos el objeto del session storage que guarda el num de intentos
let numeroIngresado = null
let intentos = 0
let dificultad = 10
let game_status = sessionStorage.getItem("game_status")
let id = null

//Creacion de cada objeto representativo de una partida con sus ctas.
function Partida(resultado, id){
    this.intentos = sessionStorage.getItem("intentos")
    this.resultado = resultado
    this.dificultad = sessionStorage.getItem("dificultad")
    this.numerosIngresados = JSON.parse(sessionStorage.getItem("numerosIngresados"))
    this.id = id
}

//Eventos del DOM para ejecutar el codigo
inputNumeros.addEventListener("change", comprobarNumero)//Cuando se ingresa un numero ejecuta la comprobacion y carga el div

selectDificultad.addEventListener("change", (evento) => {
    dificultad = evento.target.value
    sessionStorage.setItem("dificultad", dificultad)
})//Cuando cambia almacena la dificultad en el session storage

buttonNewGame.addEventListener("click", iniciarJuego)//Sirve para reiniciar el juego, utiliza la misma funcion que establece todos los valores iniciales apenas carga la pagina

document.addEventListener("DOMContentLoaded", iniciarJuego)//Cuando carga la pagina reinicia todas las variables y setea el juego

function generarNumeroAleatorio(min, max){//Devuelve un numero aleatorio
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function comprobarNumero(evento){
    selectDificultad.disabled = true //Desactiva la posiiblidad de cambiar la dificultad una vez iniciado el juego

    if(sessionStorage.getItem("game_status")){ //Comprobar que el juego siga activo
        if(Number(sessionStorage.getItem("intentos")) < Number(sessionStorage.getItem("dificultad"))){ //comprobar que sigan habiendo intentos disponibles

            //actualizar los intentos
            sessionStorage.setItem("intentos", Number(sessionStorage.getItem("intentos")) + 1)

            //cargar la lista de numeros ingresados para cargar en el historial
            numeroIngresado = Number(evento.target.value)
            numerosIngresados = JSON.parse(sessionStorage.getItem("numerosIngresados"))
            numerosIngresados.push(numeroIngresado)
            sessionStorage.setItem("numerosIngresados", JSON.stringify(numerosIngresados))

            //Agarrar del session storage el numero aleatorio
            numero = sessionStorage.getItem("numero")

            //Comprobar si el numero es igual, mayor o menor
            if (numeroIngresado == numero){
                cargarInformacionDiv(trofeo, numeroIngresado)
                terminarJuego("ganado")
            } else if(numeroIngresado > numero){
                cargarInformacionDiv(flechaAbajo, numeroIngresado)
            } else{
                cargarInformacionDiv(flechaArriba, numeroIngresado)
            }
        } else{ //En caso de que no hayan mas intentos
            console.log("No hay mas intentos")
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
    numero = sessionStorage.setItem("numero", generarNumeroAleatorio(1, 100)) //Generar un nuevo numero aleatorio

    //Eliminar los div del juego anterior
    section.innerHTML = ""



    console.log(sessionStorage.getItem("numero"))
}


