import React from 'react';

class ShoppingList {


    constructor(name, products) {
        this.name = name;
        this.products = products;
    }

}

class ShoppingListCollection {
    static collection = [];

    static add(name, products) {
        this.collection.push(new ShoppingList(name, products));
    }
}

ShoppingListCollection.add('Breakfast', []);
ShoppingListCollection.add('Dinner', []);


export {ShoppingList, ShoppingListCollection};