class Col {
    constructor(atributo, titulo) {
        this.atributo = atributo;
        this.titulo = titulo;
    }
}
/*
export const COLUMNAS = {
    ID: new Col('id', 'id'),
    MODELO: new Col('modelo', 'modelo'),
    ANOFAB: new Col('anoFab', 'año fabricacion'),
    VELMAX: new Col('velMax', 'velocidad maxima'),
    ALTMAX: new Col('altMax', 'altura maxima'),
    AUTONOMIA: new Col('autonomia', 'autonomia'),
    CANTPUE: new Col('cantPue', 'cantidad puertas'),
    CANTRUE: new Col('cantRue', 'cantidad ruedas')
}

Object.freeze(COLUMNAS);
Object.seal(COLUMNAS);

export const FILTROS = {
    TODOS: 'todos',
    TERRESTRE: 'terrestre',
    AEREO: 'aereo'

}

Object.freeze(FILTROS);
Object.seal(FILTROS);*/

export const COLUMNAS = {
    ID: new Col('id', 'id'),
    NOMBRE: new Col('nombre', 'nombre'),
    APELLIDO: new Col('apellido', 'apellido'),
    EDAD: new Col('edad', 'edad'),
    //HEROE
    ALTER_EGO: new Col('alterego', 'alter ego'),
    CIUDAD: new Col('ciudad', 'ciudad'),
    PUBLICADO: new Col('publicado', 'año publicado'),
    //VILLANO
    ENEMIGO: new Col('enemigo', 'enemigo'),
    ROBOS: new Col('robos', 'cantidad robos'),
    ASESINATOS: new Col('asesinatos', 'cantidad asesinatos')
}

Object.freeze(COLUMNAS);
Object.seal(COLUMNAS);

export const FILTROS = {
    TODOS: 'todos',
    HEROE: 'heroe',
    VILLANO: 'villano'

}

Object.freeze(FILTROS);
Object.seal(FILTROS);

export const ESTADO = {
    ALTA: 'alta',
    MODIFICAR: 'modificar',
    ELIMINAR: 'eliminar'

}

Object.freeze(ESTADO);
Object.seal(ESTADO);
