import React from 'react';
import './styles.css';
import ProductCard from './Product'

import axios from 'axios';

export class ShoppingListDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listProducts: [],
        }
        //this.props.requestShoppingListData();
        //this.props.listIndex
        this.getProductsInList();
    }

    getProductsInList = async() => {
        let currentJWT = null;
        let currentUID = null;

        try {
            currentJWT = await this.props.auth.currentUser.getIdToken(true);
        } catch (err) {
            console.log(err.message);
        }
         
        //console.log(currentJWT)
        try {
            currentUID = await this.props.auth.currentUser.uid;
            try {
                await axios.get(`https://bazaara-342116.uk.r.appspot.com/lists/${currentUID}`, {
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
                    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
                    "Authorization": currentJWT,
                  }
                }).then((response) => {

                    let tempList = response.data.message[this.props.listIndex].products;
                    //alert(tempList[0].name);

                    this.setState({ listProducts: tempList });
                    //alert("staet "+this.state.list[0].name);
                });
              } catch (err) {
                  console.log(err.message);
                  return err.message;
              }
        } catch (err) {
            console.log(err.message);
        }
        

    }
    
    render() {


        return (
            <div>
                <p className='text-xl font-semibold'>{this.props.currentList.label}</p>
                <div className={this.props.hideRenameView? 'hideRenameMenu' : undefined}>
                    <input type="text" className='px-2 text-sm w-48 mr-0 py-1 rounded-full  bg-gray-100 border-2 border-2 border-purple-300' placeholder="Enter updated list name" onChange={(e) => this.props.handleInput(e)}/>
                    <button onClick={(e) => this.props.renameList(this.props.value, e)}>Update</button>
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