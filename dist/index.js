/**Se requiere una micro-APP que permita registrar la información de
 * equipos deportivos para distintos torneos locales.
 * Cada equipo admite hasta 5 jugadores, mínimo 3, de los que se
 * conoce su número de licencia federativa. Cada equipo también tiene un nombre.
 *
 * Se requiere que la micro-APP valide las siguientes restricciones:
 * - Los nombres de equipos no pueden repetirse.
 * - Los números de licencia de los jugadores tampoco pueden repetirse.
 *
 * Se requiere que la micro-APP permita:
 * - Crear equipos.
 * - Listar equipos.
 **/
import Cl_Controlador from "./Cl_Controlador.js";
import Cl_mTorneo from "./Cl_mTorneo.js";
import Cl_vTorneo from "./Cl_vTorneo.js";
export default class Cl_index {
    //public modelo: Cl_mTorneo;
    //public vista: Cl_vTorneo;
    constructor() {
        let modelo = new Cl_mTorneo();
        modelo.cargar((error) => {
            if (error) {
                alert("Error al cargar los equipos: " + error);
            }
            ;
            if (error)
                throw new Error(error);
            let vista = new Cl_vTorneo();
            let controlador = new Cl_Controlador(modelo, vista);
            vista.controlador = controlador;
            vista.refresh();
        });
    }
}
