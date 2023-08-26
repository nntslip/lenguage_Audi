class Book {

    title: string;
    author: string;
    content: string;
  
    constructor(title: string, author: string, content: string) {
      this.title = title;
      this.author = author;
      this.content = content;
    }
  
    showcontent() {
      return this.content;
    }
  }
  
  class DataBase {
    savebook(book: Book) {
      console.log(`Guardado el libro ${book.title} en base de datos`);
    }
  }
  

  const book1 = new Book('El principio', 'Antoine', 'Erase una vez');
  const db = new DataBase();
  db.savebook(book1);