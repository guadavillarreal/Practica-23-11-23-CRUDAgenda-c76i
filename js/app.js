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
const modalAdminContacto = new bootstrap.Modal(
  document.getElementById("administrarContacto")
);
/*tambien traigo el btnNuevoContacto,para que se abra la ventana una vez que el us haga click en el btn nuevo contacto */
const btnAgregarContacto = document.getElementById("btnNuevoContacto");
//verifico que este correcto
// console.log(btnAgregarContacto);
//traigo el form para asi poder crear el evento de submi al presionar el btn agragar
const formularioContacto = document.querySelector("form");
//console.log(formularioContacto);
//me traigo los input que necesito gurar para crear el nuevo contacto
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
//otra forma de crear las variables podria ser, es decir sis ";" y solo "," lo que tomaria que las var q voy declarando seguido son del mismo tipo
/*const nombre = document.getElementById('nombre'),
apellido = document.getElementById('apellido'),*/
//declaro un array vacio para ir guardando mis contactos --const agenda = [];--
/*pero para trabajar con datos ya almacenados en el localStorage no debo de inicializar la agenda vacia cada que actualice-osea se inicializa con los datos que tengo,
xlo que tengo que traerlos datos con getItem con el identificador "key" qle asignamos(agendaKey) y me devuelve -si las encuentra- en formato JSON por loq 
lo tengo que convertirlo a loq era anteriormente- con parse-*/
//46: trae los datos y convertilos en lo que eran O si no tiene datos inicializalo vacio
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];

/*----------------------FUNCIONES----------------------------*/

//funcion en flecha
const mostrarModal = () => {
  /*L:25-- modalAdminContacto.show();-- hace que se abra la ventana automaticamente al cargar la pag*/
  modalAdminContacto.show();
};
const crearContacto = (e) => {
  /*agrego cmo param event-SIEMPRE SE USA CON EL FORM- para que no se refresque la pestaña y pueda recolectar los datos del form al realizar el evento submi */
  e.preventDefault();
  console.log("aqui debo crear el contacto nuevo");
  //verificar que los datos sean validos
  //creo un nuevo contacto
  const nuevoContacto = new Contacto(
    undefined,
    nombre.value,
    apellido.value,
    email.value,
    telefono.value
  );
  //console.log(nuevoContacto);
  //guardo el contacto creado en la sig posicion del array
  agenda.push(nuevoContacto);
  console.log(agenda);
  //resetear el formulario(es un metodo dele form)
  limpiarFormulario();
  //guarda el el localStorage
  guardarEneLocalstorage();
  //Dibujar una fila nueva cuando presiono el boton agregar nuevo contacto
  //llama a la func crear fila para que la dibuje , solo le envio los param que estoy ingresando
  //nuevoContacto: param q estoy ingresando,agenda.length: la posicion con la que ingresara que es del largo del array de la agenda
  crearFila(nuevoContacto, agenda.length);
  //para que se cierre cuando preciono el boton del modal-guardar-
  modalAdminContacto.hide();
  //mostrar un msj al us que cargo todo correctamente--es un metodo creado para el cartel
  //modal sacado de sweetalert solo lo parametrizo ppara mi ejemplo
  Swal.fire({
    title: "Contacto creado",
    text: `El contacto ${nuevoContacto.nombre} fue creado correctamente`,
    icon: "success",
  });
};
//en este ej se desea crear func pequeñas que hagan cada una una actividad,por lo que en otra func creamos la func para limpiar el form
//funcion
function limpiarFormulario() {
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
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
  /*si las prop de la clase, obj, etc; a la que estoy accediendo no me va a permitir verlas amenos que agrege una linea de codigo extra en el arch que xport
    linea 43 en arch classContacto.js */
}
//creo una func(declarativa xej) para cargar los datos guardados en la agenda en la tabla del HTML
//solo sabe crear una fila
//paso como param -contacto- para poder completarla con los param del obj pero tambien lo tengo que pasar x param en la func que realiza la carga inicial en la func que dibuja la tabla
//fila, creo un param para poder darle un valor consecutivo al id de c/fila
function crearFila(contacto, fila) {
  const tablaContactos = document.querySelector("tbody");
  /*utilizo el innerHTML para evitar muchas lineas de codigo-q generaria el document.createHTML
    y uso el += para concatenar lo que ya tiene mas loq ingreso */
  tablaContactos.innerHTML += `<tr>
    <th scope="row">${fila}</th>
    <td>${contacto.nombre}</td>
    <td>${contacto.apellido}</td>
    <td>${contacto.email}</td>
    <td>${contacto.celular}</td>
    <td>
      <button class="btn btn-warning">Editar</button>
      <button class="btn btn-danger" onclick="borrarContacto('${contacto.id}')">Borrar</button>
    </td>
  </tr>`;
  /*-onclick="borrarContacto('${contacto.id}')"-se le agrega la func onclick para que desde el HTML llame la cuncion, pero al ser ahora un arch 
  type="module" hay que llamarlo desde un un obj de orden mayor como es el obj "window"
  <button class="btn btn-danger" onclick="borrarContacto('${contacto.id}')">Borrar</button>
  (idContacto): el param que recibo del obj contacto-parte del obj que recibi
  Func con obj de orden superior: -window.borrarContacto = (idContacto) =>{..}-
  */
}
//creo una func para dibujar la tabla solo cuando hay datos
//mapea mi agenda y si hay elem en la agenda llama a crearFila
function cargaInicial() {
  //si la agenda tiene datos-es decir es mayor a cero- dibujo la agenda
  if (agenda.length > 0) {
    //map representa xpantalla algo con cada elem del array-
    //se pasa como param -contacto- pq cargue loq crea el el us al completar el fomr-L100 func crearFila
    //map solo suele utilizar un solo param,porq el segundo representa la posicion del elem en el array, lo que utilizo para el id de la fila, y como el array empieza en 0 debo agregarle un +1 para que empice en 1
    //recorre el array y va creando los item en la agenda-seria lo mismo que recorrerlo con un for
    //elijo map por no realizar un for
    agenda.map((itemcontacto, posicion) =>
      crearFila(itemcontacto, posicion + 1)
    );
    /*         //ejemplo de hacer lo mismo de map con for
        //donde envez de trabajar con el obj se trabaja con el array en cada posicion
        const tablaContactos = document.querySelector("tbody");
        for (let i = 0; i < agenda.length; i++) {
          tablaContactos.innerHTML += `</tr>
          <th scope="row">${i}</th>
          <td>${agenda[i].nombre}</td>
          <td>${agenda[i].apellido}</td>
          <td>${agenda[i].email}</td>
          <td>${agenda[i].celular}</td>
          <td>
            <button class="btn btn-warning">Editar</button>
            <button class="btn btn-danger" onclick="borrarContacto('${contacto.id}')">Borrar</button>
          </td>
        </tr>`
        } */
  }
  //agregar cartel info p el us:-no existen datos xej
}
//se crea la una func con un obj de orden superior para asi poder llamarla desde el HTML siendo la jS MODULE
//idContacto param que recibo de la llamada , solo un valor no el obj completo por eso no esta como contacto.id
//siempre para que func correctamente se debe de crear un id-unico para que se pueda identificar especificamente el elem q quiero modificar- puedo utilizar el elem -crypto.randomUUID()-
window.borrarContacto = (idContacto) => {
  console.log("desde la func borrarContacto");
  console.log(idContacto);
  //buscar en el array el obj que tiene este idContacto con array.findIndex en el array de contacto
  /*Creo una const p guardar loq devuelve la func findIndex 
  agenda es el array ----------------- itemContacto es cada elem del array
  agenda.findIndex: llamo al obj-array donde lo voy a buscar,y va siempre con una func anonima
  itemcontacto: param q utilizo para la busqueda,loq representa cada obj del array
   */
  const posicionContactoBuscado = agenda.findIndex(
    (itemContacto) => itemContacto.id === idContacto
  );
  //si me sale -1 quiere decir que tiene un error
  console.log(posicionContactoBuscado);

  //borrar el obj del array usando splice(posicion del obj, cuantos borro)-- borra el elem de la posicion que le paso y la canidad que le paso
  agenda.splice(posicionContactoBuscado,1);

  //llama a la func
  //actualizar el localStorage-pq cuando borre algo se actualice mi localStorage porq asi no queda guardado algo q no tengo en la agenda-obj
  guardarEneLocalstorage();

  //borrar una fila de la tabla utilizadon dele DOM, visualizamos quien es el padre para borrar el hijo- en este caso
  /*Creo una var p almacenar-obtener- el obj buscado que esta dentro del obj padre */
  const tablaContactos = document.querySelector('tbody');
  //de la var q cree invoco a la func "childrem" para que se posicione enel item que busque -posicionContactoBuscado-
  //sintaxis - objeto.propiedad[posicionarray]
  console.log(tablaContactos.children[posicionContactoBuscado]);
  //con la prop de removeChild borro el nodo hijo-item que quiero eliminar-
  tablaContactos.removeChild(tablaContactos.children[posicionContactoBuscado]);
};

/*LOGICA DEL CODIGO */

//agrergo el manejador de evento-que hara cuando lo precionen- con el evento que se tiene que realizar y la func que se v a aejecutar
btnAgregarContacto.addEventListener("click", mostrarModal);
formularioContacto.addEventListener("submit", crearContacto);

cargaInicial();
