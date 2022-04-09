import React from 'react';
import './styles.css';
import { ShoppingList, ShoppingListCollection } from './ShoppingList';
import Product from './Product'
import ProductCard from './Product';


export class ShoppingListDisplay extends React.Component {

    render() {
        //this.props.requestShoppingListData();
    
        return (
            
            <p>
                <p className='text-xl font-semibold'>{/*this.props.lists[this.props.displayIndex].label*/}</p>
                <div className={this.props.hideRenameView? 'hideRenameMenu' : undefined}>
                    <input type="text" className='px-2 text-sm w-48 mr-0 py-1 rounded-full  bg-gray-100 border-2 border-2 border-purple-300' placeholder="Enter updated list name" onChange={(e) => this.props.handleInput(e)}/>
                    <button onClick={(e) => this.props.renameList(this.props.value, e)}>Update</button>
                </div>
                <p>Total Cost: ${this.props.totalCost}</p>
                {
                    /*
                    this.props.lists[this.props.displayIndex].productCollection.map((product, index) => (
                        <p><ProductCard name={product.productName} weight={product.weight} price={product.price} store={product.store} removeProduct={this.props.removeProduct} clicked={index} hideButton={this.props.hideButton}/></p>
                        
                        ))*/
                }
            </p>
        );
    }
}
//this.props.lists[this.props.displayIndex].productCollection
export default ShoppingListDisplay;