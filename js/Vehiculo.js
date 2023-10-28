class Vehiculo{
    
    constructor(id, modelo, anoFab, velMax) {
        this.id = parseInt(id);
        this.modelo = modelo;
        this.anoFab = parseFloat(anoFab);
        this.velMax = parseFloat(velMax);

        this.#controlarParametros();
    }

    toString() {

    }

    #controlarParametros() {
        if (typeof this.id !== 'number') {
            throw new Error('Id debe ser un numero');
            
        }
        if (this.anoFab <= 1885) {
            throw new Error('El año de fabricación debe ser mayor a 1885');
        }
        if (this.velMax <= 0) {
            throw new Error('La velocidad maxima debe ser mayor a cero');
        }
        
        if (!this.id || !this.modelo || !this.anoFab || !this.velMax) {
            throw new Error('Debe ingresar un id, modelo, año de fabricación y velocidad maxima');
        }
        
        
    }


}

export default Vehiculo;