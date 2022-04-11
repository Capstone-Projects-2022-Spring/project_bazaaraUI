class Product {
    constructor(productName, weight, price, store) {
        this.productName = productName;
        this.weight = weight;
        this.price = price;
        this.store = store;
    }
}


class ShoppingList {
    constructor (name, productCollection) {
        this.name = name;
        this.productCollection = productCollection;
    }

    static addProduct(productName, weight, price, store) {
        this.productCollection.push(new Product(productName, weight, price, store));
    }

}


class ShoppingListCollection {
    static collection = [];

    static add(name, products) {
        this.collection.push(new ShoppingList(name, products));
    }
}


ShoppingListCollection.add('Dinner', [new Product("Sweet Baby Ray's Barbecue Sauce", 29.0, 2.99, "Walmart"), new Product("Bananas", 16, 0.49, "Walmart"), new Product("OREO Sandwich Cookies Chocolate", 25.5, 5.49, "Walmart")]);
ShoppingListCollection.add('snacks', [new Product("Cookies", 29.0, 4.29, "Walmart"), new Product("Strawberries", 16, 5.99, "Walmart"), new Product("OREO Sandwich Cookies Chocolate", 25.5, 5.49, "Target")]);

export {ShoppingList, ShoppingListCollection, Product };