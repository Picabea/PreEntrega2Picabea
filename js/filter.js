//Variables
const historial = JSON.parse(localStorage.getItem("historial"))
let filtroResultado = null
let filtroDificultad = null
let historialFiltrado = []

//Elementos del HTML
const sectionHistorial = document.querySelector("#sectionHistorial") 
const selectFiltroDificultad = document.querySelector("#selectFiltroDificultad")
const selectFiltroResultado = document.querySelector("#selectFiltroResultado")

//Eventos
document.addEventListener("DOMContentLoaded", mostrarJuegos)
selectFiltroResultado.addEventListener("change", actualizarFiltroResultado)
selectFiltroDificultad.addEventListener("change", actualizarFiltroDificultad)

function actualizarFiltroDificultad(evento){
    if (evento.target.value){//Si el evento contiene un valor
        evento.target.value === "todos"//Comprobar que sea "todos" para limpiar el filtro
            ?filtroDificultad = null
            :filtroDificultad = evento.target.value//Si no es "todos" guardar el valor en el filtro
        }
    limpiarHistorialMostrado()//Eliminar los div mostrados antes
    mostrarJuegos()//Actualizar el section para mostrar los juegos filtrados
}

function actualizarFiltroResultado(evento){
    if (evento.target.value){//Si el evento contiene un valor
        evento.target.value === "todos"//Comprobar que sea "todos" para limpiar el filtro
            ?filtroResultado = null
            :filtroResultado = evento.target.value//Si no es "todos" guardar el valor en el filtro
    }
    limpiarHistorialMostrado()//Eliminar los div mostrados antes
    mostrarJuegos()//Actualizar el section para mostrar los juegos filtrados
}

function mostrarJuegos(){
    historialFiltrado = historial.filter(filtrarResultado).filter(filtrarDificultad)
    console.log(historialFiltrado)

    for (juego of historialFiltrado){
        sectionHistorial.innerHTML = sectionHistorial.innerHTML + `
        <h3>Partida con el id ${juego.id}</h3>
        <p>El juego fue ${juego.resultado} en ${juego.intentos} intento(s) y la dificultad era ${juego.dificultad}</p>
        <p>Los numeros ingresados fueron: ${juego.numerosIngresados.join(" - ")} </p>
        `
    }
}

function filtrarResultado(partida){
    if (filtroResultado){
        return partida.resultado === filtroResultado;
    }
    return partida
}

function filtrarDificultad(partida){
    if (filtroDificultad){
        return partida.dificultad === filtroDificultad;
    }
    return partida
}

function limpiarHistorialMostrado(){
    console.log("Historial limpio")
    sectionHistorial.innerHTML = ""
}