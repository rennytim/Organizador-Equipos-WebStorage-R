import Cl_mEquipo from "./Cl_mEquipo.js";
export default class Cl_Controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }
    agregarEquipo({ cargaData, callback }) {
        this.modelo.agregarEquipo({
            equipo: new Cl_mEquipo(cargaData),
            callback: (error) => {
                callback(error);
            },
        });
    }
    equiposRegistrados() {
        return this.modelo.listar();
    }
}
