import React from 'react';
import './styles.css';
import { ShoppingList, ShoppingListCollection } from './ShoppingList';
import Product from './Product'
import ProductCard from './Product';


export class ShoppingListDisplay extends React.Component {

    render() {

    
        return (

            <p>
                <h1>{this.props.lists[this.props.displayIndex].name}</h1>
                
                {
                    this.props.lists[this.props.displayIndex].productCollection.map((product, index) => (
                        <p><ProductCard name={product.productName} weight={product.weight} price={product.price} removeProduct={this.props.removeProduct} clicked={index}/></p>
                        ))
                }
            </p>
        );
    }
}
//this.props.lists[this.props.displayIndex].productCollection
export default ShoppingListDisplay;