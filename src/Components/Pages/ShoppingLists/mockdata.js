import React from 'react';

class ListObject {
    constructor(index, name, food, products) {
        this.index = index;
        this.name = name;
        this.food = food;
        this.products = products;
    }

}

let shoppingList = [];
shoppingList.push(new ListObject(0, 'Breakfast', 'bread', ['bread', 'eggs', 'milk']));
shoppingList.push(new ListObject(1, 'Dinner', 'steak', ['fries', 'ketchup', 'soda']));

export {ListObject, shoppingList};