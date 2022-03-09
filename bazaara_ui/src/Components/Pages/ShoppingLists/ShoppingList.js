import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import GetMockData from './GetMockData'

/*const select = [
    {index: 0, name: 'Breakfast', food: 'bread', products: ['bread', 'eggs', 'milk']},
    {index: 1, name: 'Dinner', food: 'eggs', products: ['steak', 'ketchup', 'fries']},
    {index: 2, name: 'Snacks', food: 'chips', products: ['chips', 'grapes', 'cookies']},
    {index: 3, name: 'Drinks', food: 'pepsi', products: ['Pepsi', 'Coke', 'orange juice']},
]
*/

class ListObject {
    constructor(index, name, food, products) {
        this.index = index;
        this.name = name;
        this.food = food;
        this.products = products;
    }

}

let select = [];
select.push(new ListObject(0, 'Breakfast', 'bread', ['bread', 'eggs', 'milk']));
select.push(new ListObject(1, 'Dinner', 'steak', ['fries', 'ketchup', 'soda']));

export class ShoppingList extends React.Component{
    render() {
 
        return(
            <section className="listoflists">
                            <p>
                                <GetMockData
                                    key={select[this.props.selectedList].name}
                                    name={select[this.props.selectedList].name}
                                    food={select[this.props.selectedList].food}
                                    products={select[this.props.selectedList].products}
                                />
                            </p>


                </section>
        );
    }

}
export default ShoppingList;
