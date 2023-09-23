// class Cinema {
//     movies: any[] = [];
//     snacks: any[] = [];
//     tickets: any[] = [];
//     employees: any[] = [];

//     // Métodos relacionados con películas
//     addMovie(movie: any) {
//         this.movies.push(movie);
//     }

//     // Métodos relacionados con snacks
//     buySnack(snack: any) {
//         this.snacks.push(snack);
//     }

//     // Métodos relacionados con entradas
//     buyTicket(ticket: any) {
//         this.tickets.push(ticket);
//     }

//     // Métodos relacionados con empleados
//     hireEmployee(employee: any) {
//         this.employees.push(employee);
//     }
// }
class Movie {
    constructor(private movies: any[] = []) {}
    addMovie(movie: any) {
        this.movies.push(movie);
    }
}
class Shop {
    constructor(private snacks: any[] = [], private tickets: any[] = []) {}
    buySnack(snack: any) {
        this.snacks.push(snack);
    }
    buyTicket(ticket: any) {
        this.tickets.push(ticket);
    }
}

class Employee {
    constructor(private employees: any[] = []) {}
    hireEmployee(employee: any) {
        this.employees.push(employee);
    }
}
class Cinema {
    movies: Movie;
    shop: Shop;
    employees: Employee;
    constructor() {
        this.movies = new Movie();
        this.shop = new Shop();
        this.employees = new Employee();
    }
}
