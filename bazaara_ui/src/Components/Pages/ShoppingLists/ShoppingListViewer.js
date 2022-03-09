import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import GetMockData from './GetMockData'
import ShoppingList from './ShoppingList';

/* const select = [
    {index: 0, name: 'Breakfast', food: 'bread', products: ['bread', 'eggs', 'milk']},
    {index: 1, name: 'Dinner', food: 'eggs', products: ['steak', 'ketchup', 'fries']},
    {index: 2, name: 'Snacks', food: 'chips', products: ['chips', 'grapes', 'cookies']},
    {index: 3, name: 'Drinks', food: 'pepsi', products: ['Pepsi', 'Coke', 'orange juice']},
]*/

let chosenList = 0;
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

export class ShoppingListViewer extends React.Component {
    render() {
        const showList = (index) => {
            

            chosenList = index;
            //alert(`hello, ${chosenList}`);
            this.forceUpdate();
        }

        return(
            <section className='container'>
                <div className='viewer'>
       
                    <div className='listoflists'>
                        <h1>Shopping Lists</h1>
                            <button onClick="">+ Create New List</button>

                            {select.map(listName => (
                                    <p><button onClick={() => showList(listName.index)} >
                                        <GetMockData
                                            key={listName.name}
                                            name={listName.name}
                                            
                                            
                                        />
                                    </button></p>
                            ))}
                    </div>

                    <div className='listoflists'>

                        


                    <ShoppingList selectedList={chosenList}/>
                    </div>

                        


                
                </div>
            </section>
        );
    }

}



export default ShoppingListViewer;
