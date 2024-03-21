//export default: indica que solo exporto esto del arch
export default class Contacto{
    #id;
    #nombre;
    #apellido;
    #email;
    #celular;
    /*ol obj id lo inicializo en 1 para que si no lo pasan por param tengo un valor para asignarle 
    modifico el id=1 por -crypto.randomUUID()- es de una libreria nativa de JS que genera id alfanumericos unicos para cada obj*/
    constructor(id= crypto.randomUUID(), nombre, apellido, email, celular){
        this.#id=id;
        this.#nombre= nombre;
        this.#apellido = apellido;
        this.#email = email;
        this.#celular = celular;
    }
    get id(){
        return this.#id;
    }
    get nombre(){
        return this.#nombre;
    }
    set nombre(nuevoNombre){
        this.#nombre = nuevoNombre;
    }
    get apellido(){
        return this.#apellido;
    }
    set apellido(nuevoApellido){
        this.#apellido= nuevoApellido;
    }
    get email(){
        return this.#email ;
    }
    set email(nuevoEmail){
        this.#email = nuevoEmail;
    }
    get celular(){
        return this.#celular;
    }
    set celular(nuevoCelular){
        this.#celular = nuevoCelular;
    }
    //este metodo sirve para el objeto JSON.stringify-para poder acceder a las prop privados
    toJSON(){
        return{
            //id sin el # es el get de la prop
            id: this.id,
            nombre: this.nombre,
            apellido: this.apellido,
            email: this.email,
            celular: this.celular,
        }
    }

}