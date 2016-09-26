class Book{
    constructor(name, description, ownerId){
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
    }

    get name(){
        return this._name
    }

    set name(value){
        this._name = value;
    }

    get description(){
        return this._description
    }

    set description(value){
        this._description = value;
    }

    get ownerId(){
        return this._ownerId;
    }
    set ownerId(value){
        this._ownerId = value;
    }
}

module.export  = Book;