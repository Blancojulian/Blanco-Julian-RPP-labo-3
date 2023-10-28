class Persona{
    
    constructor(id, nombre, apellido, edad) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = parseInt(edad);

        this.#controlarParametros();
    }

    toString() {

    }

    #controlarParametros() {
        if (typeof this.id !== 'number') {
            throw new Error('Id debe ser un numero');
            
        }
        if (typeof this.edad !== 'number') {
            throw new Error('Edad debe ser un numero');
            
        }
        if (this.edad <= 0) {
            throw new Error('La edad debe ser mayor a cero');
        }
        
        if (!this.id || !this.nombre || !this.apellido || !this.edad) {
            throw new Error('Debe ingresar un id, nombre, apellido y edad');
        }
        
        
    }


}

export default Persona;