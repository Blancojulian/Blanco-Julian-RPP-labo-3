export const capitalizarPrimeraLetra = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const calcularPromedio = (lista = []) => {

    if (lista.length <= 0) {
        throw new Error('La lista debe contener personas');
    }
    console.log(lista);
    const suma = lista.reduce((acumulador, vehiculo) => {
        return acumulador + vehiculo.edad;
    }, 0);
    
    return (suma / lista.length).toFixed(2);
}
//no funciona con los input que tienen disabled
export const formDataToObject = (formData) => {
    const object = {};
    formData.forEach((value, key) =>object[key] = value);
    return object;
}

export const guardarEnLocalStorage = (data = []) => {
    try {
        if (typeof(Storage) === "undefined") {
            throw new Error('LocalStorage no soportado en este navegador');
        }
        localStorage.setItem('data', JSON.stringify(data));
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}

export const leerLocalStorage = () => {
    let data = null;
    try {
        if (typeof(Storage) === "undefined") {
            throw new Error('LocalStorage no soportado en este navegador');
        }
        data = localStorage.getItem('data');
    } catch (err) {
        console.log(err.message);
        throw err;
    }

    return data;
}