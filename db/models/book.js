export class Book {
    constructor(title, author, year, category, description, ownerId) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.category = category;
        this.description = description;
        this.ownerId = ownerId;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        this._author = value;
    }

    get year() {
        return this._year;
    }

    set year(value) {
        this._author = year;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get ownerId() {
        return this._ownerId;
    }
    set ownerId(value) {
        this._ownerId = value;
    }
}
