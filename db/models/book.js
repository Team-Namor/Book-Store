class Book{
    constructor(title, author, year, ownerId){
        this.title = title;
        this.author = author;
        this.year = year;
        this.ownerId = ownerId;
    }

    get title(){
        return this._title;
    }

    set title(value){
        this._title = value;
    }

    get author(){
        return this._author;
    }

    set author(value){
        this._author = value;
    }

    get year(){
        return this._year;
    }

    set year(value){
        this._author = year;
    }

    get ownerId(){
        return this._ownerId;
    }
    set ownerId(value){
        this._ownerId = value;
    }
}

module.export  = Book;