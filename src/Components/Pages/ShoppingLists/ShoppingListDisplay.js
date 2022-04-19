import React from 'react';
import './styles.css';
import ProductCard from './Product'

export class ShoppingListDisplay extends React.Component {
    
    render() {


        return (
            <div>
                <p className='text-xl font-semibold'>{this.props.currentList.label}</p>
                <div className={this.props.hideRenameView? 'hideRenameMenu' : undefined}>
                    <input type="text" className='px-2 text-sm w-48 mr-0 py-1 rounded-full  bg-gray-100 border-2 border-2 border-purple-300' placeholder="Enter updated list name" onChange={(e) => this.props.handleInput(e)}/>
                    <button className='bg-green-500 rounded-full w-28 h-8 text-sm'  onClick={(e) => this.props.renameList(this.props.value, e)}>Update</button>
                </div>
                <p>Total Cost: ${this.props.totalCost}</p>
                {        
               
                    this.props.currentList.products.map((product, index) => (
                        <ProductCard product={product} name={product.name} price={product.price} removeProduct={this.props.removeProduct} clicked={index} hideButton={this.props.hideButton}/>

            
                    ))


                    /* alert(this.state.currentList.products[0].name)
                    this.props.currentList.products.map((product, index) => (
                        <p><ProductCard name={product.name} price={product.price} store={product.store} removeProduct={this.props.removeProduct} clicked={index} hideButton={this.props.hideButton}/></p>
                        
                        ))*/
                }
            </div>
        );
    }
}
//this.props.lists[this.props.displayIndex].productCollection
export default ShoppingListDisplay;