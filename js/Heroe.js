import Persona from "./Persona.js";

class Heroe extends Persona {

    constructor({id, nombre, apellido, edad, alterego, ciudad, publicado}) {
        super(id, nombre, apellido, edad);
        this.alterego = alterego;
        this.ciudad = ciudad;
        this.publicado = parseInt(publicado);

        this.#controlarParametros();
    }

    #controlarParametros() {
        if (this.publicado <= 1940) {
            throw new Error('La publicacion debe ser mayor 1940');
        }

        if (!this.alterego || !this.ciudad || !this.publicado) {
            throw new Error('Debe ingresar alter ego, ciudad y el año de publicacion');
        }

    }
    static esHeroe(persona) {
        return !!persona && persona.hasOwnProperty('alterego') && persona.hasOwnProperty('ciudad') && persona.hasOwnProperty('publicado');
    }
}

export default Heroe;