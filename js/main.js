//Variables necesarias para el juego
let adivinanza = null
let intentos = 0
let game_status = true
let dificultades = ["3","5", "10"]
let dificultad = null

//Variables del menu
let accion = null

//Variables para la creacion y filtro de objetos
let id = 0
let numerosIngresados = []
const historial = []
let historialFiltrado = []
let numeros = ""
let filtroResultado = null
let filtroDificultad = null


//Creacion de cada objeto representativo de una partida con sus ctas.
function Partida(ganado){
    this.id = id
    this.intentos = intentos
    this.ganado = ganado
    this.dificultad = dificultad
    this.numerosIngresados = numerosIngresados
}

function generarNumeroAleatorio(min, max){//Devuelve un numero aleatorio
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let numero = 0

function menu(){
    accion = prompt("¿Que desea hacer? \n -Ingrese 'juego' para comenzar a jugar \n -Ingrese 'historial' para ver su historial de partidas \n -Ingrese 'reglas' para ver las reglas del juego \n -Ingrese 'salir' para salir")
    
    if (accion === 'juego'){
        juego()
    } else if(accion === 'reglas'){
        mostrarReglas()
    } else if(accion === 'historial'){
        mostrarHistorial()
    } else if(accion === 'salir'){
        stop
    } else{
        menu()
    }
}

function juego(){
    //Reiniciar y obtener variables necesarias para cada juego
    intentos = 0
    numero = generarNumeroAleatorio(1, 100)
    game_status = true
    id =+ 1
    numerosIngresados = []
    dificultad = prompt("Para elegir la dificultad del juego, ingrese si desea tener '3', '5' o '10' intentos")

    while (!dificultades.includes(dificultad)){//Comprobar que la dificultad ingresada sea valida
        dificultad = prompt("Para elegir la dificultad del juego, ingrese si desea tener '3', '5' o '10' intentos")
    }

    for(intentos = 1; intentos <= dificultad; intentos = intentos + 1){ //Bucle que ejecuta el juego
        if(game_status){
            preguntarAdivinanza()
        }
    }

    //Acciones en caso de perder
    console.log("Has perdido! Suerte en la proxima!")
    intentos =- 1 //Arreglo de los intentos
    historial.push(
        new Partida("perdido")
    )
    menu()
}

function preguntarAdivinanza(){
    console.log("---------------------------------")
    adivinanza = Number(prompt("Ingrese su adivinanza"))
    numerosIngresados.push(adivinanza) //Registrar numeros ingresados para guardarlos en el objeto de Partida
    comprobarNumero()
}

function comprobarNumero(){
    if(adivinanza === numero){ //Comprobar si es correcto
        //Acciones en caso de ganar
        console.log("Felicitaciones! El numero era " + numero + ". Adivinaste en " + intentos + " intentos");
        game_status = false //Detener el bucle
        historial.push( //Crear objeto Partida para el historial
            new Partida("ganado")
        )
        menu()
    }   
    else{
        //En caso de no ser iguales comprobar si el numero es menor y mayor
        if(adivinanza > numero){
            console.log("El numero es menor")
        }
        else{
            console.log("El numero es mayor")
        }
    }
}

function mostrarReglas(){
    console.log("Bienvenido a Adivina el Numero! Deberas ingresar un numero e intentar acertar el numero elegido aleatoriamente por el sistema. Tras ingresar un numero te dire si es mayor o menor que el que debes adivinar. Suerte!")
    menu()
}

function mostrarHistorial(){
    //aplicar filtros
    filtrarHistorial()

    historialFiltrado.forEach(function(partida){
        numeros = ""
        for(numero in partida.numerosIngresados){//Desglozar el array con los numeros ingresados para tenerlos en forma de string y separados
            numeros = numeros + " - " + partida.numerosIngresados[numero]
        }
        //Mostrar cada partida concatenada
    return console.log("La partida numero " + partida.id + " se gano " + partida.ganado +  " en una dificultad de " + partida.dificultad + " intentos. Se ingresaron " + partida.intentos + " intentos con los numeros " + numeros)
    })
    menu()
}

function filtrarHistorial(){
    filtroResultado = prompt("¿Desea filtrar por ganado o perdido? Ingrese 'ganado' o 'perdido'. Sino, ingrese 'no'")
    while(!["ganado", "perdido", "no"].includes(filtroResultado)){//Comprobar que la entrada sea valida
        filtroResultado = prompt("¿Desea filtrar por ganado o perdido? Ingrese 'ganado' o 'perdido'. Sino, ingrese 'no'")
    }
    if (filtroResultado === 'no'){//Vaciar el filtro
        filtroResultado = null
    }

    filtroDificultad = prompt("¿Desea filtrar por dificultad? Ingrese el nivel de dificultad que desee filtrar: '3', '5' o '10. Sino, ingrese 'no'")
    while(!["3", "5", "10", "no"].includes(filtroDificultad)){//Comprobar que la entrada sea valida
        filtroDificultad = prompt("¿Desea filtrar por dificultad? Ingrese el nivel de dificultad que desee filtrar: '3', '5' o '10'. Sino, ingrese 'no'")
    }
    if (filtroDificultad === 'no'){//Vaciar el filtro
        filtroDificultad = null
    }

    historialFiltrado = historial.filter(filtrarResultado).filter(filtrarDificultad)//filtrar
}

function filtrarResultado(partida){
    if (filtroResultado){
        return partida.ganado === filtroResultado;
    }
    return partida
}

function filtrarDificultad(partida){
    if (filtroDificultad){
        return partida.dificultad === filtroDificultad;
    }
    return partida
}

menu()