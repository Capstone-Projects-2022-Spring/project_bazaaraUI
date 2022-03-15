import React from 'react';
import './styles.css';
import { ShoppingList, ShoppingListCollection } from './ShoppingList';

export class ShoppingListDisplay extends React.Component {
    render() {
        return (
            <p>
                <h1>{this.props.lists[this.props.displayIndex].name}</h1>

                {
                    this.props.lists[this.props.displayIndex].products.map((productName) => (
                        <p>{productName}</p>
                    ))

                }
            </p>
        );
    }
}

export default ShoppingListDisplay;