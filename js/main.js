import generarLista from "./lista.js";
import generarTabla from "./tabla.js";
import { COLUMNAS, ESTADO, FILTROS } from "./constantes.js";
import { calcularPromedio, formDataToObject, leerLocalStorage,guardarEnLocalStorage, capitalizarPrimeraLetra } from "./utils.js";
import Terrestre from "./Terrestre.js";
import Aereo from "./Aereo.js";
import Modal from "./Modal.js";
import Heroe from "./Heroe.js";
import Villano from "./Villano.js";

const jsonPersonas = `[
    {
        "id": 1,
        "nombre": "Clark",
        "apellido": "Kent",
        "edad": 45,
        "alterego": "Superman",
        "ciudad": "Metropolis",
        "publicado": 2002
    },
    {
        "id": 2,
        "nombre": "Bruce",
        "apellido": "Wayne",
        "edad": 35,
        "alterego": "Batman",
        "ciudad": "Gotica",
        "publicado": 20012
    },
    {
        "id": 3,
        "nombre": "Bart",
        "apellido": "Alen",
        "edad": 30,
        "alterego": "Flash",
        "ciudad": "Central",
        "publicado": 2017
    },
    {
        "id": 4,
        "nombre": "Lex",
        "apellido": "Luthor",
        "edad": 18,
        "enemigo": "Superman",
        "robos": 500,
        "asesinatos": 7
    },
    {
        "id": 5,
        "nombre": "Harvey",
        "apellido": "Dent",
        "edad": 20,
        "enemigo": "Batman",
        "robos": 750,
        "asesinatos": 2
    },
    {
        "id": 666,
        "nombre": "Celina",
        "apellido": "kyle",
        "edad": 23,
        "enemigo": "Batman",
        "robos": 25,
        "asesinatos": 1
    }
]`;

function generarArrayVehiculos(json) {
    const array = JSON.parse(json);
    const newArray = [];
    let vehiculo = null;

    for (const v of array) {

        vehiculo = null;
        if (Heroe.esHeroe(v)) {
            vehiculo = new Heroe(v);
        } else if (Villano.esVillano(v)) {
            vehiculo = new Villano(v);
        }
        vehiculo && newArray.push(vehiculo);
    }
    return newArray;
}

window.addEventListener('DOMContentLoaded', () => {

    const modal = new Modal('modal');
    const tabla = document.getElementById('tabla-datos');
    const formAbm = document.getElementById('form-abm');
    const formDatos = document.getElementById('form-datos');
    const btnCalcular = document.getElementById('btn-calcular');
    const btnAgregar = document.getElementById('btn-agregar');
    const btnSeleccionar = document.getElementById('btn-seleccionar');
    const btnDeseleccionar = document.getElementById('btn-deseleccionar');
    const divCheckbox = formDatos?.querySelector('.container-checkbox');
    const inputTipo = formAbm.querySelector('.tipo');
    const inputFiltro = formDatos.querySelector('.filtro');
    const btnGuardar = document.getElementById('btn-guardar');
    const inputBtnAbm = document.getElementById('btn-abm');

    //estados
    let abmToggle = document.querySelector('.abm').style.display === 'none';
    let esModificar = false;
    let estado = null;
    const ordenColumna = {
        columna: null,
        ordenAsc: true
    }

    const listaGuardada = null//leerLocalStorage();
    const lista = generarLista( generarArrayVehiculos(listaGuardada || jsonPersonas));
    const {cargarTabla,
        agregarRow,
        setVisibilidadColumna,
        generarCheckboxColumnas,
        setColumnaOrdenada
    } = generarTabla(tabla, lista.getLista(), Object.values(COLUMNAS));

    try {
        divCheckbox.appendChild(generarCheckboxColumnas());
        cargarTabla(lista.getLista());

    } catch (err) {
        modal.mostrarMensaje('Error fatal', 'Fallo carga de datos\n' + err.message);
    }    

    const setDisabledInputsFormAbm = (isDisabled = false) => {
        const inputs = formAbm.querySelectorAll('input:not([name="id"]):not([type="submit"]):not([type="reset"])');
        console.log(inputs);
        for (const input of inputs) {
            input.disabled = isDisabled
        }
    }

    const switchAbm = () => {
        const divdatos = document.querySelector('.datos')
        const divAbm = document.querySelector('.abm');
        const containerId = formAbm.querySelector('input[name="id"]')?.parentElement;
        const opcionTipo = formAbm.querySelector('.opcion-tipo');
        const opcionesTerrestre = formAbm.querySelector('.opciones-terrestre');
        const opcionesAereo = formAbm.querySelector('.opciones-aereo');

        inputBtnAbm.value = estado !== null ? capitalizarPrimeraLetra(estado) : '';
        //primero hay que cargar el form
        if (estado === null) {
            //console.log(estado);
            //console.log(divAbm);
            divAbm.style.display = 'none';
            divdatos.style.display = 'block';
        } else {
            divAbm.style.display = 'block';
            divdatos.style.display = 'none';
        }
        
        if (estado === ESTADO.MODIFICAR || estado === ESTADO.ELIMINAR) {
            containerId.style.display = 'block';
            opcionTipo.style.display = 'none';
            
            if (inputTipo.value === FILTROS.HEROE) {
                opcionesTerrestre.style.display = 'block';
                opcionesAereo.style.display = 'none';

            } else if(inputTipo.value === FILTROS.VILLANO){
                opcionesTerrestre.style.display = 'none';
                opcionesAereo.style.display = 'block';
            }
            setDisabledInputsFormAbm(estado === ESTADO.ELIMINAR);

        } else {
            containerId.style.display = 'none';
            opcionTipo.style.display = 'block';
            opcionesTerrestre.style.display = 'none';
            opcionesAereo.style.display = 'none';
            setDisabledInputsFormAbm(false);
        }
        //abmToggle = !abmToggle;
        //estado = null;
    }

    const setOrden = (columna) => {
        
        if(ordenColumna.columna === columna) {
            ordenColumna.ordenAsc = !ordenColumna.ordenAsc;
        } else {
            ordenColumna.ordenAsc = true;
        }
    
        ordenColumna.columna = columna;

        lista.ordenarListaAscDes(columna, ordenColumna.ordenAsc);

    }

    const setCheckboxs = (isChecked) => {

        const querySelector = `input[type=checkbox]${isChecked ? ':not(:checked)' : ':checked'}`;
        const checkboxs = divCheckbox.querySelectorAll(querySelector);

        checkboxs.forEach((chbx) => {
            chbx.checked = isChecked;
            setVisibilidadColumna(chbx.value, isChecked);
        });
    }

    const cargarFormAbm = (vehiculo) => {
        console.log(vehiculo);
        try {
            formAbm.querySelector('input[name="id"]').value = vehiculo.id;
            formAbm.querySelector('input[name="nombre"]').value = vehiculo.nombre;
            formAbm.querySelector('input[name="apellido"]').value = vehiculo.apellido;
            formAbm.querySelector('input[name="edad"]').value = vehiculo.edad;

            if (vehiculo instanceof Heroe) {
                formAbm.querySelector('select[name="tipo"]').value = FILTROS.HEROE;

                formAbm.querySelector('input[name="alterego"]').value = vehiculo.alterego;
                formAbm.querySelector('input[name="ciudad"]').value = vehiculo.ciudad;
                formAbm.querySelector('input[name="publicado"]').value = vehiculo.publicado;

            } else if (vehiculo instanceof Villano) {
                formAbm.querySelector('select[name="tipo"]').value = FILTROS.VILLANO;

                formAbm.querySelector('input[name="enemigo"]').value = vehiculo.enemigo;
                formAbm.querySelector('input[name="robos"]').value = vehiculo.robos;
                formAbm.querySelector('input[name="asesinatos"]').value = vehiculo.asesinatos;

            }
            
        } catch (err) {
            modal.mostrarMensaje('Error fatal', 'Fallo carga de datos de la persona');
            
        }
    }


        
        
    btnAgregar.addEventListener('click', () => {
        estado = ESTADO.ALTA;
        switchAbm()
    });

    formAbm.addEventListener('reset', () => {
        //esModificar = false;
        cargarTabla(lista.filtarLista(inputFiltro.value));
        estado = null;
        switchAbm()
    });
    //se podra hacer un return para salir antes con el estado eliminar
    formAbm.addEventListener('submit', async function(event) {

        try {
            event.preventDefault();
            let persona = null;
            const formData = new FormData(this);
            const obj = formDataToObject(formData);
            let mensaje = '';
            obj.id = estado === ESTADO.MODIFICAR || estado === ESTADO.ELIMINAR ?
                (obj.id || this.querySelector('input[name="id"]').value) : lista.getLastId();
            
            if(estado === ESTADO.ELIMINAR) {
                const nombre = this.querySelector('input[name="nombre"]')?.value;
                const apellido = this.querySelector('input[name="apellido"]')?.value;
                mensaje += `${nombre} ${apellido} eliminado`;
                const res = await modal.pedirRespuesta('Eliminar', 'Desea eliminar persona?')
                if (res) {
                    lista.deleteItem(obj.id);
                } else {
                    mensaje ='Se cancelo la eliminacion';
                }

            } else {

                if (inputTipo.value === FILTROS.HEROE) {
                    persona = new Heroe(obj);
                } else if (inputTipo.value === FILTROS.VILLANO) {
                    persona = new Villano(obj);  
                } else {
                    throw new Error('Debe seleccionar un tipo de persona');
                }
                console.log(persona);
                mensaje = `${persona instanceof Heroe ? 'Heroe' : 'Villano'} ${persona.nombre} ${persona.apellido}`;
    
                if (estado === ESTADO.MODIFICAR) {
                    lista.updateItem(persona.id, persona);
                    cargarTabla(lista.filtarLista(inputFiltro.value));
                    mensaje += ' modificado';
                } else if(estado === ESTADO.ALTA) {
                    lista.addItem(persona);
                    agregarRow(persona);
                    mensaje += ' agregado';
    
                } 
            }

            modal.mostrarMensaje('Mensaje', mensaje);
            
            this.reset();
            
        } catch (err) {
            console.log(err.message);
            modal.mostrarMensaje('Error al '+estado, err.message);  
        }
    });
    //change no funciona bien, a veces haciendo click al label cambiaba eñ checkbox o deseleccionaba todos
    divCheckbox.addEventListener('click', (event) => {
        //cada checkbox y label estan en un div, asi que en caso de que sea label se podria 
        //acceder al input por el parentElement
        const target = event.target;
        const esLabel = target.tagName === 'LABEL' && target.tagName !== 'DIV';
        const inputChbk = esLabel ? target.parentElement.querySelector('input[type="checkbox"]') : target;
            
        if (esLabel) {
            inputChbk.checked = !inputChbk.checked;
        }

        if ((target.tagName === 'INPUT' || esLabel) && inputChbk.tagName === 'INPUT') {            
            setVisibilidadColumna(inputChbk.value, inputChbk.checked);
        }
    });

    btnSeleccionar.addEventListener('click', () => setCheckboxs(true));

    btnDeseleccionar.addEventListener('click', () => setCheckboxs(false));
    
    btnCalcular.addEventListener('click', function (event) {
        try {
            event.preventDefault();
            const promedio = calcularPromedio(lista.filtarLista(inputFiltro.value));
            const inputPromedio = this.parentElement.querySelector('input[name="promedio"]');
            inputPromedio.value = promedio;
        } catch (err) {
            modal.mostrarMensaje('Error', 'Fallo al calcular el promedio\n' + err.message);
        }
    });

    btnGuardar.addEventListener('click', () => {
        try {
            guardarEnLocalStorage(lista.getLista());
            modal.mostrarMensaje('Vehiculos', 'Se guardo lista de vehiculos'); 
            console.log(leerLocalStorage());
        } catch (err) {
            modal.mostrarMensaje('Error', err.message);
        }
    });

    inputTipo.addEventListener('change', (event) => {
        const option = event.currentTarget.value;
        const optionTerrestre = formAbm.querySelector('.opciones-terrestre');
        const optionAereo = formAbm.querySelector('.opciones-aereo');
        
        if (!esModificar && option === FILTROS.HEROE) {
            optionTerrestre.style.display = 'block';
            optionAereo.style.display = 'none';
        } else if (!esModificar && option === FILTROS.VILLANO) {
            optionTerrestre.style.display = 'none';
            optionAereo.style.display = 'block';
        } else {
            optionTerrestre.style.display = 'none';
            optionAereo.style.display = 'none';
        }
        

    });

    inputFiltro.addEventListener('change', (event) => {
        const opcion = event.currentTarget.value;
        cargarTabla(lista.filtarLista(opcion));
    });
//dblclick
    tabla.querySelector('tbody')?.addEventListener('dblclick', (event) => {
        const target = event.target.closest('TR');
        const id = target?.getAttribute('id-row');
        const boton = event.target.closest('BUTTOM.btn-opcion');
        
        if (target?.tagName === 'TR' && id && !boton) {
            //esModificar = true;
            console.log(id);
            console.log(lista.getItem(id));
            cargarFormAbm(lista.getItem(id));
            estado = ESTADO.MODIFICAR;
            switchAbm();
            
        }
    });

    tabla.querySelector('tbody')?.addEventListener('click', (event) => {

        try {
            const target = event.target.closest('BUTTOM.btn-opcion');
            const id = target?.getAttribute('id-row');
            const boolcheck = target?.tagName === 'BUTTOM' && id;
            if (boolcheck && target.classList.contains('btn-modificar')) {
                //esModificar = true;
                estado = ESTADO.MODIFICAR;
                cargarFormAbm(lista.getItem(id));
                switchAbm();
            } else if (boolcheck && target.classList.contains('btn-eliminar')) {
                estado = ESTADO.ELIMINAR;
                cargarFormAbm(lista.getItem(id));
                switchAbm();
            }
            
        } catch (err) {
            modal.mostrarMensaje('Error', 'Fallo al eliminar vehiculo\n' + err.message);
        }
    });

    tabla.querySelector('thead')?.addEventListener('click', (event) => {
        const target = event.target.closest('TH');
        //const id = target?.getAttribute('id-row');
        const atributo = target.getAttribute('columna');

        if (target.tagName === 'TH' && atributo !== 'opciones') {
            //console.log(target.getAttribute('columna'));
            //lista.ordenarLista(target.getAttribute('columna'));
            setOrden(atributo);
            setColumnaOrdenada(atributo, ordenColumna.ordenAsc);
            cargarTabla(lista.filtarLista(inputFiltro.value));
        }
    });

});
