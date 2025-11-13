import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
export default class Cl_vTorneo extends Cl_vGeneral {
    constructor() {
        super({ formName: "torneo" });
        this.btAgregarEquipo = this.crearHTMLButtonElement("btAgregarEquipo", {
            onclick: () => this.agregarEquipo(),
        });
        this.divEquiposRegistrados = this.crearHTMLElement("divEquiposRegistrados", {
            type: tHTMLElement.CONTAINER,
            refresh: () => this.mostrarEquiposRegistrados(),
        });
        //Inicializacion de nuevos elementos HTML
        this.inNombreEquipo = this.crearHTMLInputElement("inpNombreEquipo");
        this.inLicencia1 = this.crearHTMLInputElement("inpLicencia1");
        this.inLicencia2 = this.crearHTMLInputElement("inpLicencia2");
        this.inLicencia3 = this.crearHTMLInputElement("inpLicencia3");
        this.inLicencia4 = this.crearHTMLInputElement("inpLicencia4");
        this.inLicencia5 = this.crearHTMLInputElement("inpLicencia5");
    }
    mostrarEquiposRegistrados() {
        var _a;
        this.divEquiposRegistrados.innerHTML = "";
        let equipos = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.equiposRegistrados();
        if (!equipos)
            return;
        equipos.forEach((equipo) => {
            this.divEquiposRegistrados.innerHTML += `<tr>
            <td>${equipo.nombreEquipo}</td>
            <td>${equipo.licencia1}</td>
            <td>${equipo.licencia2}</td>
            <td>${equipo.licencia3}</td>
            <td>${equipo.licencia4 ? equipo.licencia4 : ""}</td>
            <td>${equipo.licencia5 ? equipo.licencia5 : ""}</td>
        </tr>`;
        });
    }
    agregarEquipo() {
        let nombreEquipo = this.inNombreEquipo.value;
        if (!nombreEquipo) { // Si es null o cadena vacía
            alert("Nombre de equipo no puede estar vacío.");
            return;
        }
        let licencia1 = this.inLicencia1.value;
        if (!licencia1) {
            alert("Licencia 1 no puede estar vacía.");
            return;
        }
        let licencia2 = this.inLicencia2.value;
        if (!licencia2) {
            alert("Licencia 2 no puede estar vacía.");
            return;
        }
        let licencia3 = this.inLicencia3.value;
        if (!licencia3) {
            alert("Licencia 3 no puede estar vacía.");
            return;
        }
        const licencia4 = this.inLicencia4 ? this.inLicencia4.value : "";
        const licencia5 = this.inLicencia5 ? this.inLicencia5.value : "";
        this.controlador.agregarEquipo({
            cargaData: {
                nombreEquipo: nombreEquipo,
                licencia1: licencia1,
                licencia2: licencia2,
                licencia3: licencia3,
                licencia4: licencia4 ? licencia4 : null,
                licencia5: licencia5 ? licencia5 : null,
            },
            callback: (error) => {
                if (error)
                    alert(error);
                else
                    this.limpiarImputs();
                this.refresh();
            },
        });
    }
    limpiarImputs() {
        this.inNombreEquipo.value = "";
        this.inLicencia1.value = "";
        this.inLicencia2.value = "";
        this.inLicencia3.value = "";
        if (this.inLicencia4)
            this.inLicencia4.value = "";
        if (this.inLicencia5)
            this.inLicencia5.value = "";
    }
}
