import React from 'react';

class Product {
    constructor(productName, weight, price) {
        this.productName = productName;
        this.weight = weight;
        this.price = price;
    }
}


class ShoppingList {
    constructor (name, productCollection) {
        this.name = name;
        this.productCollection = productCollection;
    }

    static addProduct(productName, weight, price) {
        this.productCollection.push(new Product(productName, weight, price));
    }

}


class ShoppingListCollection {
    static collection = [];

    static add(name, products) {
        this.collection.push(new ShoppingList(name, products));
    }
}


/*
ShoppingListCollection.add('Breakfast', 
    [new Product("Sweet Baby Ray's Barbecue Sauce", 29.0, 2.99),
     new Product("Bananas", 16, 0.49),
     new Product("OREO Sandwich Cookies Chocolate", 25.5, 5.49)
    ]);*/

//ShoppingListCollection.add('Dinner', [ShoppingList.addProduct("Sweet Baby Ray's Barbecue Sauce", 29.0, 2.99)]);

ShoppingListCollection.add('Dinner', [new Product("Sweet Baby Ray's Barbecue Sauce", 29.0, 2.99), new Product("Bananas", 16, 0.49), new Product("OREO Sandwich Cookies Chocolate", 25.5, 5.49)]);
ShoppingListCollection.add('snacks', [new Product("sauce", 29.0, 2.99), new Product("fruit", 16, 0.49), new Product("OREO Sandwich Cookies Chocolate", 25.5, 5.49)]);


//alert('list:' + JSON.stringify(ShoppingListCollection.collection[0].productCollection));
//alert('product name???: ' + ShoppingList.productCollection[0].productName.toString());


export {ShoppingList, ShoppingListCollection, Product};