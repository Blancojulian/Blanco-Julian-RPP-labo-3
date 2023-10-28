import Vehiculo from "./Vehiculo.js";

class Aereo extends Vehiculo {

    constructor({id, modelo, anoFab, velMax, altMax, autonomia}) {
        super(id, modelo, anoFab, velMax);

        this.altMax = parseFloat(altMax);
        this.autonomia = parseFloat(autonomia);

        this.#controlarParametros();
    }

    #controlarParametros() {
        
        if (this.altMax <= 0) {
            throw new Error('La altura maxima debe ser mayor a cero');
        }
        if (this.autonomia <= 0) {
            throw new Error('La autonomia de ruedas debe ser mayor a cero');
        }
        if (!this.altMax || !this.autonomia) {
            throw new Error('Debe ingresar la altura maxima y la autonomia');
        }

    }

    static esVehiculoAereo(vehiculo) {
        return !!vehiculo && vehiculo.hasOwnProperty('altMax') && vehiculo.hasOwnProperty('autonomia');
    }
}

export default Aereo;