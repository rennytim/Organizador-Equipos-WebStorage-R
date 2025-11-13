import Cl_mTorneo from "./Cl_mTorneo.js";
import Cl_vTorneo from "./Cl_vTorneo.js";
import Cl_mEquipo, { iEquipo } from "./Cl_mEquipo.js";

export default class Cl_Controlador {
  private modelo: Cl_mTorneo;
  private vista: Cl_vTorneo;
  constructor(modelo: Cl_mTorneo, vista: Cl_vTorneo) {
      this.modelo = modelo;
      this.vista = vista;
  }

    agregarEquipo({
        cargaData,
        callback
    }: {
        cargaData: iEquipo;
        callback: Function;
    }): void {
        this.modelo.agregarEquipo({
            equipo: new Cl_mEquipo(cargaData),
            callback: (error: string | false) => {
                callback(error);
            },
        });
    }
    equiposRegistrados(): iEquipo[] {
        return this.modelo.listar();
    }


}