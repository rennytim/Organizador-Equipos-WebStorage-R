export default class Cl_mEquipo {
    constructor({ nombreEquipo = "", licencia1 = "", licencia2 = "", licencia3 = "", licencia4 = null, licencia5 = null, }) {
        this._nombreEquipo = "";
        this._licencia1 = "";
        this._licencia2 = "";
        this._licencia3 = "";
        this._licencia4 = "";
        this._licencia5 = "";
        this.nombreEquipo = nombreEquipo;
        this.licencia1 = licencia1;
        this.licencia2 = licencia2;
        this.licencia3 = licencia3;
        this.licencia4 = licencia4;
        this.licencia5 = licencia5;
    }
    get nombreEquipo() {
        return this._nombreEquipo;
    }
    set nombreEquipo(nombreEquipo) {
        this._nombreEquipo = nombreEquipo.trim().toUpperCase();
    }
    set licencia1(licencia1) {
        this._licencia1 = licencia1.trim().toUpperCase();
    }
    get licencia1() {
        return this._licencia1;
    }
    set licencia2(licencia2) {
        this._licencia2 = licencia2.trim().toUpperCase();
    }
    get licencia2() {
        return this._licencia2;
    }
    set licencia3(licencia3) {
        this._licencia3 = licencia3.trim().toUpperCase();
    }
    get licencia3() {
        return this._licencia3;
    }
    set licencia4(licencia4) {
        this._licencia4 = licencia4 ? licencia4.trim().toUpperCase() : null;
    }
    get licencia4() {
        return this._licencia4;
    }
    set licencia5(licencia5) {
        this._licencia5 = licencia5 ? licencia5.trim().toUpperCase() : null;
    }
    get licencia5() {
        return this._licencia5;
    }
    error() {
        if (this.licencia1 === "" || this.licencia2 === "" || this.licencia3 === "")
            return "Deben registrarse al menos 3 jugadores con licencia.";
        if (this.licencia1 === this.licencia2 ||
            this.licencia1 === this.licencia3 ||
            this.licencia2 === this.licencia3)
            return "No pueden haber dos jugadores con la misma licencia.";
        return false;
    }
    existeJugador(jugador) {
        if (jugador === null)
            return false;
        if (jugador === this.licencia1 || jugador === this.licencia2 || jugador === this.licencia3 || jugador === this.licencia4 || jugador === this.licencia5)
            return true;
        return false;
    }
    toJSON() {
        return {
            nombreEquipo: this.nombreEquipo,
            licencia1: this.licencia1,
            licencia2: this.licencia2,
            licencia3: this.licencia3,
            licencia4: this.licencia4,
            licencia5: this.licencia5,
        };
    }
}
