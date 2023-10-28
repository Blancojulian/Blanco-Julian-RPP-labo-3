import Vehiculo from "./Vehiculo.js";

class Terrestre extends Vehiculo {

    constructor({id, modelo, anoFab, velMax, cantPue, cantRue}) {
        super(id, modelo, anoFab, velMax);

        this.cantPue = parseFloat(cantPue);
        this.cantRue = parseFloat(cantRue);

        this.#controlarParametros();
    }

    #controlarParametros() {
        if (this.cantPue <= -1) {
            throw new Error('La cantidad de puertas debe ser cero o mayor');
        }
        if (this.cantRue <= 0) {
            throw new Error('La cantidad de ruedas debe ser mayor a cero');
        }
        if ((!this.cantPue && this.cantPue !== 0) || !this.cantRue) {
            throw new Error('Debe ingresar la cantidad de puertas y la cantidad de ruedas');
        }

    }
    static esVehiculoTerrestre(vehiculo) {
        return !!vehiculo && vehiculo.hasOwnProperty('cantPue') && vehiculo.hasOwnProperty('cantRue') 
    }
}

export default Terrestre;