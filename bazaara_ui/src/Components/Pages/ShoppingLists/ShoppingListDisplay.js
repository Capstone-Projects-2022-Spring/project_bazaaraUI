import React from 'react';
import './styles.css';
import { ShoppingList, ShoppingListCollection } from './ShoppingList';

export class ShoppingListDisplay extends React.Component {
    render() {
        return (
            <p>
                {this.props.lists[this.props.displayIndex].name}
            </p>
        );
    }
}

export default ShoppingListDisplay;