import Persona from "./Persona.js";

class Villano extends Persona {

    constructor({id, nombre, apellido, edad, enemigo,robos,asesinatos}) {
        super(id, nombre, apellido, edad);
        this.enemigo = enemigo;
        this.robos = parseInt(robos);
        this.asesinatos = parseInt(asesinatos);

        this.#controlarParametros();
    }

    #controlarParametros() {
        if (this.robos <= 0) {
            throw new Error('La cantidad de robos debe ser mayor a cero');
        }
        if (this.asesinatos <= 0) {
            throw new Error('La cantidad de asesinatos debe ser mayor a cero');
        }

        if (!this.enemigo || !this.robos || !this.asesinatos) {
            throw new Error('Debe ingresar enemigo, cantidad de robos y cantidad de asesinatos');
        }

    }
    static esVillano(persona) {
        return !!persona && persona.hasOwnProperty('enemigo') && persona.hasOwnProperty('robos') && persona.hasOwnProperty('asesinatos');
    }
}

export default Villano;