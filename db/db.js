'use strinct';
let storage = [];

function addToStorage(item) {
    return new Promise((resolve, reject) => {
        storage.push(item);
        resolve(item);
    });
}

function getItems() {
    return storage;
}

module.exports = {
    addToStorage, getItems
};