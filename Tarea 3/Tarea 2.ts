interface IMembresia {
    puedeTomarPrestado(cantidadLibros: number): boolean;
}

class MembresiaBasica implements IMembresia {
    puedeTomarPrestado(cantidadLibros: number): boolean {
        return cantidadLibros <= 2;
    }
}

class MembresiaPremium implements IMembresia {
    puedeTomarPrestado(cantidadLibros: number): boolean {
        return cantidadLibros <= 5;
    }
}

class MembresiaPlatinum implements IMembresia {
    puedeTomarPrestado(cantidadLibros: number): boolean {
        return true;
    }
}

enum CategoriaLibro {
    Ficcion = "Ficción",
    NoFiccion = "No Ficción",
    Referencia = "Referencia",
}

class Libro {
    constructor(
        public titulo: string,
        public autor: string,
        public estaCargado: boolean = false,
        public estaDisponible: string,
        public fechaPrestamo?: Date,
        public categoria: CategoriaLibro
    ) {}
}

class Usuario {
    static IDUsuario: any;
    constructor(public IDUsuario: string, public nombre: string, public membresia: IMembresia) {}
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

class HistorialPrestamos {
    private historial: { libro: Libro; usuario: Usuario }[] = [];

    agregarPrestamo(libro: Libro, usuario: Usuario) {
        this.historial.push({ libro, usuario });
    }

    obtenerHistorialParaUsuario(usuario: Usuario): { libro: Libro; usuario: Usuario }[] {
        return this.historial.filter((entrada) => entrada.usuario === usuario);
    }
}

class Biblioteca implements ICargador {
    private libros: Libro[] = [];
    private librosCargados: Map<string, Usuario> = new Map();
    private gestorMulta: IMulta;
    private historialPrestamos: HistorialPrestamos = new HistorialPrestamos();

    constructor(private registrador: IRegistrador, gestorMulta: IMulta) {
        this.gestorMulta = gestorMulta;
    }

    cargarLibro(libro: Libro, usuario: Usuario): void {
        if (libro.estaCargado) {
            this.registrador.registrar('Libro cargado');
            return;
        }
        if (libro.categoria === CategoriaLibro.Referencia) {
            this.registrador.registrar('Los libros de referencia no se pueden prestar');
            return;
        }
        if (!usuario.membresia.puedeTomarPrestado(this.librosCargados.size)) {
            this.registrador.registrar('El usuario ha alcanzado su límite de préstamos');
            return;
        }
        libro.fechaPrestamo = new Date();
        this.librosCargados.set(libro.estaDisponible, usuario);
        libro.estaCargado = true;
        this.registrador.registrar(`Información del usuario que toma prestado el libro:
        IDUsuario: ${usuario.IDUsuario}
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
            IDUsuario: ${usuario.IDUsuario}
            Nombre: ${usuario.nombre}`);
            const multa = this.gestorMulta.calcularMulta(libro);
            if (multa > 0) {
                this.registrador.registrar(`Multa generada: $${multa}`);
            }
            this.historialPrestamos.agregarPrestamo(libro, usuario);
        } else {
            this.registrador.registrar('No se encontró al usuario que está devolviendo el libro');
        }
    }

    agregarLibro(libro: Libro) {
        this.registrador.registrar('Inicio de operación');
        this.libros.push(libro);
        this.registrador.registrar('Fin de operación');
    }

    validarTituloLibro(libro: Libro, tituloL: string) {
        if (libro.titulo !== tituloL) {
            this.registrador.registrar('El libro no tiene el título correcto');
        } else {
            this.registrador.registrar('El libro tiene el título correcto');
        }
    }

    buscarLibroPorTitulo(titulo: string): Libro | undefined {
        this.registrador.registrar('Inicio de operación');
        const libro = this.libros.find(libro => libro.titulo === titulo);
        if (!libro) {
            this.registrador.registrar('No se encontró el libro');
        }
        return libro;
    }
}
