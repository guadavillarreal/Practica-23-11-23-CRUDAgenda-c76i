//para utilizar una clase(por ej) que esta en otro arch en este puedo utilizar MODULOS, tambien puedo instalar y configurar para poder realizarlo
/*MODULOS: Es utilizar codigo que esta declarado en un arch JS y utilizarlo en otro. Solo se puede con algunas restrinccione.A la ruta del arch JS que coloco en el index 
debo de agregarle un "atributo" -type ="module"-(es decir es un arch de js pero de tipo MODULO) y cuando declaro esto el arch en el cual quiero utilizar una"clase" de otro
arch se le habilita una opc-IMPORT- es decir q puedo importar algo de otro arch, para lo cual desde la clase desde donde exporto-saco lo que necesito-
tengo que agregarle el "atributo" -export- delante de lo que deseo exportar. Si deseo exportar varias cosas iria solo -export- ;si solo deso exportar 
una sola cosa(var xej) la palabra -export- tiene que ir acompañada de la palabra -default- es decir - export default-. Estas siempre se declaran delante de lo que
quiero exportar. Una vez que realizamos esto, en el arch receptor debo de escribir como primera linea de codigo - import Contacto from "./classContacto.js";-
Seria: import loqImporto from "./rutaDelArch.js"; - siempre verifico que tenga el ".js" sino dara error.
*/
import Contacto from "./classContacto.js";
//para verificar que esta correctamente la ruta desde el index a app
console.log('Prueba desde app.js');
//pruebo que este funcionando el import
const contacto = new Contacto (1,'Juan', 'Perez', 'juan.perez@email.com', '156-564-7888');
//muestro el nuevo contacto para verificar
console.log(contacto);
