class Journalist {
    name: string;
    articles: string[] = [];

    constructor(name: string) {
        this.name = name;
    }

    publishArticle(article: string) {
        this.articles.push(article);
        console.log(`El periodista ${this.name} ha publicado: ${article}`);
    }
}

class Reader {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    checkForNewArticles(journalist: Journalist) {
        const latestArticle = journalist.articles[journalist.articles.length - 1];
        console.log(`${this.name} ha leído el artículo: ${latestArticle}`);
    }
}

const journalistA = new Journalist('Pepe');
const readerB = new Reader('Natali');

journalistA.publishArticle("Los beneficios de la programación");
readerB.checkForNewArticles(journalistA);

