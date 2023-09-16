class Libro {
    constructor(public titulo: string, public autor: string, public estaCargado: boolean = false, public estaDisponible: string, public fechaPrestamo?: Date) { }
}

class Usuario {
    static UserID: any;
    constructor(public UserID: string, public nombre: string) { }
}

interface ICargador {
    cargarLibro(libro: Libro, usuario: Usuario): void;
    devolverLibro(libro: Libro): void;
}

interface IRegistrador {
    registrar(mensaje: string): void;
}

interface IMulta {
    calcularMulta(libro: Libro): number;
}

class GestorMulta implements IMulta {
    private periodoPrestamoEstandarEnDias: number = 7;
    private tasaMultaPorDia: number = 1;

    calcularMulta(libro: Libro): number {
        const fechaActual = new Date();
        const fechaDevolucion = new Date(libro.fechaPrestamo);
        fechaDevolucion.setDate(fechaDevolucion.getDate() + this.periodoPrestamoEstandarEnDias);

        if (fechaActual > fechaDevolucion) {
            const diasRetraso = Math.ceil((fechaActual - fechaDevolucion) / (1000 * 60 * 60 * 24));
            return diasRetraso * this.tasaMultaPorDia;
        }

        return 0;
    }
}

class RegistradorConsola implements IRegistrador {
    registrar(mensaje: string): void {
        console.log(mensaje);
    }
}

class Biblioteca implements ICargador {
    private libros: Libro[] = [];
    private librosCargados: Map<string, Usuario> = new Map();
    private gestorMulta: IMulta;

    constructor(private registrador: IRegistrador, gestorMulta: IMulta) {
        this.gestorMulta = gestorMulta;
    }

    cargarLibro(libro: Libro, usuario: Usuario): void {
        if (libro.estaCargado) {
            this.registrador.registrar('El libro está cargado');
            return;
        }
        libro.fechaPrestamo = new Date();
        this.librosCargados.set(libro.estaDisponible, usuario);
        libro.estaCargado = true;
        this.registrador.registrar(`Información del usuario que toma prestado el libro:
        UserID: ${usuario.UserID}
        Nombre: ${usuario.nombre}`);
    }

    devolverLibro(libro: Libro): void {
        if (!libro.estaCargado) {
            this.registrador.registrar('El libro no está cargado');
            return;
        }
        const usuario = this.librosCargados.get(libro.estaDisponible);
        if (usuario) {
            this.librosCargados.delete(libro.estaDisponible);
            libro.estaCargado = false;
            this.registrador.registrar(`Información del usuario que devuelve el libro:
            UserID: ${usuario.UserID}
            Nombre: ${usuario.nombre}`);
            const multa = this.gestorMulta.calcularMulta(libro);
            if (multa > 0) {
                this.registrador.registrar(`Multa generada: $${multa}`);
            }
        } else {
            this.registrador.registrar('No se encontró al usuario que devuelve el libro');
        }
    }

    agregarLibro(libro: Libro) {
        this.registrador.registrar('Inicio de la operación');
        this.libros.push(libro);
        this.registrador.registrar('Fin de la operación');
    }

    validarTituloLibro(libro: Libro, tituloL: string) {
        if (libro.titulo !== tituloL) {
            this.registrador.registrar('El libro no tiene el título correcto');
        } else {
            this.registrador.registrar('El libro tiene el título correcto');
        }
    }

    buscarLibroPorTitulo(titulo: string): Libro | undefined {
        this.registrador.registrar('Inicio de la operación');
        const libro = this.libros.find(libro => libro.titulo === titulo);
        if (!libro) {
            this.registrador.registrar('No se encontró el libro');
        }
        return libro;
    }
}
