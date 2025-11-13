// importación de Web Storage y Cl_dcytDb
import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251110-2150";
import Cl_mEquipo, { iEquipo } from "./Cl_mEquipo.js";

interface iResultObjects {
  objects: [iEquipo] | null;
  error: string | false;
}

export default class Cl_mTorneo {
  private equipos: Cl_mEquipo[] = [];
  private db: Cl_dcytDb;
  readonly tbEquipos: string = "Equipos";
  
  constructor() {
    this.db = new Cl_dcytDb({ aliasCuenta: "BUG BUSTERS" });
  }

  agregarEquipo({
    equipo,
    callback,
  }: {
    equipo: Cl_mEquipo;
    callback: (error: string | false) => void;
  }): void {
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
      if (
        s.existeJugador(equipo.licencia1) ||
        s.existeJugador(equipo.licencia2) ||
        s.existeJugador(equipo.licencia3) ||
        s.existeJugador(equipo.licencia4) ||
        s.existeJugador(equipo.licencia5)
      ) {
        callback(`El equipo ${s.nombreEquipo} tiene jugadores repetidos.`);
        return;
      }
    }
    this.db.addRecord({
      tabla: this.tbEquipos,
      object: equipo.toJSON(),
      callback: ({ id, objects, error }) => {
        if (!error) this.llenarEquipos(objects);
        callback?.(error);
      },
    });
    
    // Agregar el equipo al arreglo
    //this.equipos.push(equipo);
    //callback(false);
  }

  cargar(callback: (error: string | false) => void): void {
    // Obtener los contactos desde la Web Storage
    this.db.listRecords({
      tabla: this.tbEquipos,
      callback: ({ objects, error }: iResultObjects) => {
        if (!error) this.llenarEquipos(objects || []);
        callback(false);
      },
    });
  }

  llenarEquipos(equipos: iEquipo[]) {
    this.equipos = [];
    equipos.map((equipo) => this.equipos.push(new Cl_mEquipo(equipo)));
  }

  listar(): iEquipo[] {
    let equipos: iEquipo[] = [];
    this.equipos.forEach((e) => equipos.push(e.toJSON()));
    return equipos;
  }
}
