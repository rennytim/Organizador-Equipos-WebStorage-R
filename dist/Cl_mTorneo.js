// importación de Web Storage y Cl_dcytDb
import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251110-2150";
import Cl_mEquipo from "./Cl_mEquipo.js";
export default class Cl_mTorneo {
    constructor() {
        this.equipos = [];
        this.tbEquipos = "Equipos";
        this.db = new Cl_dcytDb({ aliasCuenta: "BUG BUSTERS" });
    }
    agregarEquipo({ equipo, callback, }) {
        // Verificar si el equipo ya existe en el arreglo
        let existe = this.equipos.find((e) => e.nombreEquipo.toLowerCase() === equipo.nombreEquipo.toLowerCase());
        if (existe) {
            callback(`El equipo ${equipo.nombreEquipo} ya existe en el torneo.`);
            return;
        }
        // Realizar validaciones del equipo
        if (equipo.error()) {
            callback(equipo.error());
            return;
        }
        // Verificar si algun objeto es repetido
        for (const s of this.equipos) {
            if (s.existeJugador(equipo.licencia1) ||
                s.existeJugador(equipo.licencia2) ||
                s.existeJugador(equipo.licencia3) ||
                s.existeJugador(equipo.licencia4) ||
                s.existeJugador(equipo.licencia5)) {
                callback(`El equipo ${s.nombreEquipo} tiene jugadores repetidos.`);
                return;
            }
        }
        this.db.addRecord({
            tabla: this.tbEquipos,
            object: equipo.toJSON(),
            callback: ({ id, objects, error }) => {
                if (!error)
                    this.llenarEquipos(objects);
                callback === null || callback === void 0 ? void 0 : callback(error);
            },
        });
        // Agregar el equipo al arreglo
        //this.equipos.push(equipo);
        //callback(false);
    }
    cargar(callback) {
        // Obtener los contactos desde la Web Storage
        this.db.listRecords({
            tabla: this.tbEquipos,
            callback: ({ objects, error }) => {
                if (!error)
                    this.llenarEquipos(objects || []);
                callback(false);
            },
        });
    }
    llenarEquipos(equipos) {
        this.equipos = [];
        equipos.map((equipo) => this.equipos.push(new Cl_mEquipo(equipo)));
    }
    listar() {
        let equipos = [];
        this.equipos.forEach((e) => equipos.push(e.toJSON()));
        return equipos;
    }
}
