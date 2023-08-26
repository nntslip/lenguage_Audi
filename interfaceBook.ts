interface Book {
    mostrarDescripcion(): string;
}

class BookTexto implements Book {
    title: string;
    show: string;
    content: string;

    constructor(title: string, author: string, content: string) {
        this.title = title;
        this.author = author;
        this.content = content;
    }
    mostrarcontent(): string {
        throw new Error("Method not implemented.");
    }

    mostrarDescripcion() {
        return `Book de texto titulado "${this.title}" escrito por ${this.author}`;
    }
}

class Atlas implements Book {
    title: string;
    author: string;
    content: string;

    constructor(title: string, author: string, content: string) {
        this.title = title;
        this.author = author;
        this.content = content;
    }
    mostrarcontent(): string {
        throw new Error("Method not implemented.");
    }

    mostrarDescripcion() {
        return `Book de comic titulado "${this.title}" dibujado por ${this.author}`;
    }
}

class CreaBooks {
    static crearBook(tipo: string, title: string, author: string, content: string): Book {
        if (tipo === 'texto') {
            return new BookTexto(title, author, content);
        } else if (tipo === 'comic') {
            return new Atlas(title, author, content);
        } else {
            throw new Error('Tipo de Book no válido');
        }
    }
}

class Book3 {
    private Book: Book;

    constructor(tipo: string, title: string, author: string, content: string) {
        this.Book = CreaBooks.crearBook(tipo, title, author, content);
    }

    mostrarDescripcion(): string {
        return this.Book.mostrarDescripcion();
    }
}