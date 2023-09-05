abstract class Operador {
    abstract encender(): void;
    abstract apagar(): void;

}

class Luz extends Operador {
    encender() {
        console.log("Luz encendida");
    }

    apagar() {
        console.log("Luz apagada");
    }
}

class Interruptor {

    constructor(private Operador: Operador) { }

    operar() {
        this.Operador.encender();
    }

}
//////////////////////

abstract class DB {
    abstract guardar(configuracion: Configuracion): void;
    abstract obtener(): Configuracion;

}

class BaseDeDatos extends DB {
    guardar(configuracion: Configuracion) {
        console.log(`Guardando configuracion con valor ${configuracion.valor} en la base de datos`);
    }

    obtener(): Configuracion {
        return new Configuracion("valor");
    }
}

class GestorConfiguraciones {

    constructor(private db: DB) {
        this.db = new BaseDeDatos();
    }
    guardarConfiguracion(valor: string) {
        const configuracion = new Configuracion(valor);
        this.db.guardar(configuracion);
    }

    obtenerConfiguracion(): Configuracion {
        return this.db.obtener();
    }
}
