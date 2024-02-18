//CRUD: CREATE - READ - UPDATE - DELETE . CRUD DE CONTACTOS
/*ESTRUCTURA DEL CODIGO! TODOS LOS IMPORT ARRIBA, VARIABLES GLOBALES , FUNCIONES, LOGICA EXTRAS! */

//para utilizar una clase(por ej) que esta en otro arch en este puedo utilizar MODULOS, tambien puedo instalar y configurar para poder realizarlo
/*MODULOS: Es utilizar codigo que esta declarado en un arch JS y utilizarlo en otro. Solo se puede con algunas restrinccione.A la ruta del arch JS que coloco en el index 
debo de agregarle un "atributo" -type ="module"-(es decir es un arch de js pero de tipo MODULO) y cuando declaro esto el arch en el cual quiero utilizar una"clase" de otro
arch se le habilita una opc-IMPORT- es decir q puedo importar algo de otro arch, para lo cual desde la clase desde donde exporto-saco lo que necesito-
tengo que agregarle el "atributo" -export- delante de lo que deseo exportar. Si deseo exportar varias cosas iria solo -export- ;si solo deso exportar 
una sola cosa(var xej) la palabra -export- tiene que ir acompañada de la palabra -default- es decir - export default-. Estas siempre se declaran delante de lo que
quiero exportar. Una vez que realizamos esto, en el arch receptor debo de escribir como primera linea de codigo - import Contacto from "./classContacto.js";-
Seria: import loqImporto from "./rutaDelArch.js"; - siempre verifico que tenga el ".js" sino dara error.
*/
/*IMPORT'S */
import Contacto from "./classContacto.js";
//para verificar que esta correctamente la ruta desde el index a app
// console.log('Prueba desde app.js');
// //pruebo que este funcionando el import
// const contacto = new Contacto (1,'Juan', 'Perez', 'juan.perez@email.com', '156-564-7888');
// //muestro el nuevo contacto para verificar
// console.log(contacto);

/*VARIABLES GLOBALES */

/*al borrar los -data-bs-toggle y data-bs-target- para llamar a la ventana modal desde JS elijo el metodo que deseo-
la cual al traer el maquetado de bootstrap lo tengo que seleccionar como prototipo de bootstrap y luego ya lo selecciono de la manera que vimos-elegimos*/
const modalAdminContacto = new bootstrap.Modal(document.getElementById('administrarContacto'));
/*tambien traigo el btnNuevoContacto,para que se abra la ventana una vez que el us haga click en el btn nuevo contacto */
const btnAgregarContacto = document.getElementById('btnNuevoContacto');
//verifico que este correcto
// console.log(btnAgregarContacto);
//traigo el form para asi poder crear el evento de submi al presionar el btn agragar
const formularioContacto = document.querySelector('form');
//console.log(formularioContacto);
//me traigo los input que necesito gurar para crear el nuevo contacto
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const email = document.getElementById('email');
const telefono = document.getElementById('telefono');
//otra forma de crear las variables podria ser, es decir sis ";" y solo "," lo que tomaria que las var q voy declarando seguido son del mismo tipo
/*const nombre = document.getElementById('nombre'),
apellido = document.getElementById('apellido'),*/
//declaro un array vacio para ir guardando mis contactos --const agenda = [];--
/*pero para trabajar con datos ya almacenados en el localStorage no debo de inicializar la agenda vacia cada que actualice-osea se inicializa con los datos que tengo,
xlo que tengo que traerlos datos con getItem con el identificador "key" qle asignamos(agendaKey) y me devuelve -si las encuentra- en formato JSON por loq 
lo tengo que convertirlo a loq era anteriormente- con parse-*/
//46: trae los datos y convertilos en lo que eran O si no tiene datos inicializalo vacio
const agenda = JSON.parse(localStorage.getItem('agendaKey')) || [ ] ;

/*FUNCIONES */

//funcion en flecha
const mostrarModal = ()=>{
    /*L:25-- modalAdminContacto.show();-- hace que se abra la ventana automaticamente al cargar la pag*/
    modalAdminContacto.show();
}
const crearContacto =(e)=>{
    /*agrego cmo param event-SIEMPRE SE USA CON EL FORM- para que no se refresque la pestaña y pueda recolectar los datos del form al realizar el evento submi */
    e.preventDefault();
    console.log('aqui debo crear el contacto nuevo');
    //verificar que los datos sean validos
    //creo un nuevo contacto
    const nuevoContacto = new Contacto (undefined, nombre.value, apellido.value, email.value, telefono.value);
    //console.log(nuevoContacto);
    //guardo el contacto creado en la sig posicion del array
    agenda.push(nuevoContacto);
    console.log(agenda);
    //resetear el formulario(es un metodo dele form)
    limpiarFormulario();
    //guarda el el localStorage
    guardarEneLocalstorage();
}
//en este ej se desea crear func pequeñas que hagan cada una una actividad,por lo que en otra func creamos la func para limpiar el form
//funcion 
function limpiarFormulario (){
    formularioContacto.reset();
}
/*WEB STORAGE: tiene dos obj localStrorage y sesionStorage, ambos tienen los mismos metodos:
-setItem: guarda
-getItem: cuando quiero obtener los datos guardados*/
//creo una func para borrar el localStrorage
function guardarEneLocalstorage() {
    //para trabajar con el local Storage tengo un obj llamado localStorage
    //setItem metodo para guardar; nos piede ima key-palabra clave-un string, con la cual queda guardada, y el dato que deseo guardar en formato JSON-notacion de obj de JS-
    //JSON.stringify, indica que todo lo que le pase lo convierte en form JSON
    localStorage.setItem('agendaKey',JSON.stringify(agenda) );
    /*si las prop de la clase, obj, etc; a la que estoy accediendo no me va a permitir verlas amenos que agrege una linea de codigo extra en el arch que xport
    linea 43 en arch classContacto.js */
}

/*LOGICA DEL CODIGO */

//agrergo el manejador de evento-que hara cuando lo precionen- con el evento que se tiene que realizar y la func que se v a aejecutar
btnAgregarContacto.addEventListener('click', mostrarModal);
formularioContacto.addEventListener('submit', crearContacto);