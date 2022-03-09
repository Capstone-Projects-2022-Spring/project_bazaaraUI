import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import GetMockData from './GetMockData'
import { shoppingList, ListObject } from './mockdata'

/*const select = [
    {index: 0, name: 'Breakfast', food: 'bread', products: ['bread', 'eggs', 'milk']},
    {index: 1, name: 'Dinner', food: 'eggs', products: ['steak', 'ketchup', 'fries']},
    {index: 2, name: 'Snacks', food: 'chips', products: ['chips', 'grapes', 'cookies']},
    {index: 3, name: 'Drinks', food: 'pepsi', products: ['Pepsi', 'Coke', 'orange juice']},
]
*/



export class ShoppingList extends React.Component{
    render() {
 
        return(
            <section className="listoflists">
                            <p>
                                <GetMockData
                                    key={shoppingList[this.props.selectedList].name}
                                    name={shoppingList[this.props.selectedList].name}
                                    food={shoppingList[this.props.selectedList].food}
                                    products={shoppingList[this.props.selectedList].products}
                                />
                            </p>


                </section>
        );
    }

}
export default ShoppingList;
