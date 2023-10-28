import { capitalizarPrimeraLetra } from "./utils.js";
//import { COLUMNAS2 } from "./constantes.js";

const generarTabla = (elementTable, data = [], array = [], boolOpciones = true) => {
    const arrayColumnas = array;
    const opciones = boolOpciones;
    const colOpciones = 'opciones';

    let tabla = elementTable;

    
    if (!tabla || tabla.tagName !== 'TABLE') {
        throw new Error('Elemento invalido, debe ingresar una tabla');
    }

        
    const crearCelda = (texto, atributo, element = 'td') => {
        if (element !== 'td' && element !== 'th') {
            throw new Error('Elemento invalido para crear celda');
        }
        const celda = document.createElement(element);
        const textNode = document.createTextNode(texto || texto === 0 ? texto : '');
        celda.appendChild(textNode);
        celda.setAttribute('columna', atributo);
        celda.style.display = 'table-cell';
        return celda;
    };
    const crearBotonOpcion = (atributo, claseBoton = [], claseIcono = []) => {
        const boton = document.createElement('buttom');
        const icono = document.createElement('i');
        claseBoton && boton.classList.add(...claseBoton);
        claseIcono && icono.classList.add(...claseIcono);
        boton.appendChild(icono);
        boton.setAttribute('id-row', atributo);

        return boton;
    }

    const crearRowData = (persona) => {
        const row = document.createElement('tr');
        row.classList.add('fila');
        arrayColumnas.forEach((columna) => {
            row.appendChild( crearCelda(persona[columna.atributo], columna.atributo) );
        });

        if (opciones) {

            const celdaOpciones = crearCelda(null, colOpciones);
            celdaOpciones.appendChild(crearBotonOpcion(persona.id, 'btn-modificar btn btn-opcion btn-azul'.split(' '), ['bx', 'bx-edit']));
            celdaOpciones.appendChild(crearBotonOpcion(persona.id, 'btn-eliminar btn btn-opcion btn-rojo'.split(' '), ['bx', 'bx-trash']));
            row.appendChild(celdaOpciones);
        }
        
        return row;
    }
    const generarEncabezadoTabla = () => {
        //const arrColumnas = Object.values(COLUMNAS);
        const fragment = new DocumentFragment();
        let celda = null;
        arrayColumnas.forEach((columna) => {
            celda = crearCelda(capitalizarPrimeraLetra(columna.titulo), columna.atributo, 'th');
            celda.appendChild(document.createElement('i'));
            fragment.appendChild( celda );
        });
        if (opciones) {
            fragment.appendChild( crearCelda(capitalizarPrimeraLetra(colOpciones), colOpciones, 'th') );    
        }

        tabla.querySelector('thead').querySelector('tr').appendChild(fragment);
    }
    const limpiarTabla = () => {
        const tbody = tabla.querySelector('tbody');
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }
    const igualarVisibilidadColumnas = () => {
        
        let display = 'table-cell';
        let atributoTh = null;
        const rowsHeader = tabla.querySelector('thead').querySelectorAll(`th`);
        const rowsBody = tabla.querySelector('tbody').querySelectorAll(`td`);

        for (const celdaTh of rowsHeader) {
            display = celdaTh.style.display;
            atributoTh = celdaTh.getAttribute('columna');
            if(atributoTh && atributoTh !== '' && display === 'none') {

                for (const celdaTd of rowsBody) {
                    if (atributoTh === celdaTd.getAttribute('columna')) {
                        celdaTd.style.display = 'none';
                    }
                }

            }
        }
    }

    const cargarTabla = async (data) => {
        
        try {
            limpiarTabla();

            const fragment = new DocumentFragment();
            let row;

            for (const u of data) {
                row = crearRowData(u);
                row.setAttribute('id-row', u.id);
                fragment.appendChild(row);
            }
            
            tabla.querySelector('tbody').appendChild(fragment);
            igualarVisibilidadColumnas();


        } catch (err) {
            alert('Error al cargar la  tabla: ' + err.message)
        }
    }

    const agregarRow = (persona) => {
        const row = crearRowData(persona);
        row.setAttribute('id-row', persona.id);
        tabla.querySelector('tbody').appendChild(row);
    }

    const setVisibilidadColumna = (columna, esVisible) => {
        
        const display = esVisible ? 'table-cell' : 'none';
        const rowsHeader = tabla.querySelector('thead').querySelectorAll(`th[columna="${columna}"]`);
        const rowsBody = tabla.querySelector('tbody').querySelectorAll(`td[columna="${columna}"]`);
        
        rowsHeader.forEach(celda => celda.style.display = display);
        rowsBody.forEach(celda => celda.style.display = display);
        
    }
    
    const setColumnaOrdenada = (columna, esAsc = true) => {
        const rowsHeader = tabla.querySelector('thead').querySelectorAll(`th`);
        let atributo = null;
        let icon = null;
        let claseCssAdd = esAsc ? 'bxs-down-arrow' : 'bxs-up-arrow';
        let claseCssRemove = esAsc ? 'bxs-up-arrow' : 'bxs-down-arrow';
        
        for (const th of rowsHeader) {
            atributo = th.getAttribute('columna');
            icon = th.querySelector('i');
            if (atributo === columna) {
                th.classList.add('columna-selecionada');
                icon && icon.classList.add('bx');
                icon && icon.classList.add(claseCssAdd);
                icon && icon.classList.remove(claseCssRemove);//cuando usaba spread borraba bx, pasar de una clase

            } else {
                th.classList.remove('columna-selecionada');
                icon && icon.classList.remove('bx', 'bxs-down-arrow', 'bxs-up-arrow');

            }
        }
    
        
    }

    const setTabla = (elementTable) => {
        if (!tabla || tabla.tagName !== 'TABLE') {
            tabla = elementTable;
            generarEncabezadoTabla();
        }
    }
    const generarCheckboxColumnas = () => {
        const fragment = new DocumentFragment();
        let chbx = null;
        let label = null;
        let div = null;
    
        arrayColumnas.forEach((columna) => {
            chbx = document.createElement('input');
            label = document.createElement('label');
            div = document.createElement('div');
            chbx.type = 'checkbox';
            chbx.value = columna.atributo;
            chbx.checked = true;
            chbx.classList.add('checkbox-columna');
            label.appendChild( document.createTextNode(capitalizarPrimeraLetra(columna.titulo)) );
            div.classList.add('container-checkbox-label');
            div.appendChild(chbx);
            div.appendChild(label);
            fragment.appendChild(div);
    
        });

        if (opciones) {
            chbx = document.createElement('input');
            label = document.createElement('label');
            div = document.createElement('div');
            chbx.type = 'checkbox';
            chbx.value = colOpciones;
            chbx.checked = true;
            chbx.classList.add('checkbox-columna');
            label.appendChild( document.createTextNode(capitalizarPrimeraLetra(colOpciones)) );
            div.classList.add('container-checkbox-label');
            div.appendChild(chbx);
            div.appendChild(label);
            fragment.appendChild(div);
        }

        return fragment;
    }
    

    if (tabla?.tagName === 'TABLE') {
        tabla = elementTable;
        generarEncabezadoTabla();
        cargarTabla(data);
    }

    return {
        cargarTabla,
        agregarRow,
        setVisibilidadColumna,
        generarCheckboxColumnas,
        setColumnaOrdenada
    };
}

export default generarTabla;
