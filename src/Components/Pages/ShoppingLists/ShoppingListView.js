import React from 'react';
import './styles.css';
import ShoppingListSelection from './ShoppingListSelection'
import ShoppingListDisplay from './ShoppingListDisplay'
import { ShoppingList, ShoppingListCollection, Product } from './ShoppingList'
import ListManagementDropdown from './ListManagementDropdown';
import Navbar from '../../NavBar/Navbar'
import Footer from '../../Footer/Footer'
import { ProductSearch } from '../ProductSearch/ProductSearch';
import ErrorPage from "../404Page/ErrorPage"
import { Link } from "react-router-dom";
import axios from "axios";

export class ShoppingListView extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            value: "", // user input
            listIndex: 0,
            currentListId: "6250b88ccff1e6172447d0ad",
            lists: [],
            productIndex: 0,
            deleteListMessage: "",
            hideButton: true, // remove items button view
            seen: false, // new list button view
            hideRenameView: true,
            listTotalCost: 0, // total price of current shopping list, currently unused?
        }
        this.changeListHandler = this.changeListHandler.bind(this);
        this.handleAddList = this.handleAddList.bind(this);
        this.handleRemoveList = this.handleRemoveList.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.togglePop = this.togglePop.bind(this);
        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
        this.toggleRemoveItemButton = this.toggleRemoveItemButton.bind(this);
        this.renameList = this.renameList.bind(this);
        this.handleRenameInput = this.handleRenameInput.bind(this);
        this.toggleRenameMenu = this.toggleRenameMenu.bind(this);
        this.calculateTotalListPrice = this.calculateTotalListPrice.bind(this);
        this.requestShoppingListData = this.requestShoppingListData.bind(this);

        // render current user's lists
        this.requestShoppingListData();
    }

    changeListHandler(newIndex) {
        //alert('new list index: ' + newIndex);
        this.setState({
                listIndex: newIndex,
                currentListId: this.state.lists[newIndex].id,
                //currentList: ShoppingListCollection.collection[newIndex].productCollection,
        })
    }

    handleInput(event) {
        this.setState({value: event.target.value});
    }

    handleRenameInput(event) {
        this.setState({renamedValue: event.target.renamedValue});
    }

    handleAddList = async(name) => {
        //alert('new list name: ' + name);
        //alert('current lists: ' + this.state.lists.toString())

        //this.state.lists.add(this.state.value, []);
       //this.state.lists.add(name, []);
       
        //this.setState({lists: temp})
        let isDuplicate = false;

        this.togglePop();

        // duplicate checking does not work
        for (let i = 0; i < this.state.lists.length; i++) {
            if (this.state.lists[i].label === name) {
                isDuplicate = true;
            }
        }

        if (name.trim().length === 0) {
            alert('invalid shopping name list: no empty string');
        } else if (isDuplicate) {
            alert('invalid shopping name list: no duplicate names');
        } else {
            let currentJWT = null;
            let currentUID = null;
    
            try {
                currentJWT = await this.props.auth.currentUser.getIdToken(true);
                //console.log(currentJWT)
            } catch (err) {
                console.log(err.message);
            }
             
            //console.log(currentJWT)
            try {
                currentUID = await this.props.auth.currentUser.uid;
                console.log(currentUID)
                try {
                    await axios.post(`https://bazaara-342116.uk.r.appspot.com/lists/add/${currentUID}`, 
                    { 
                        label: `${name}`,
                        timestamp: 0,
                        savings: 0,
                        products: [],
                    }, {
                      headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
                        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
                        "Authorization": currentJWT,
                      }
                    }).then((response) => {
                        console.log(response);
                    });
                  } catch (err) {
                      console.log(err.message);
                      return err.message;
                  }
            } catch (err) {
                console.log(err.message);
            }
            
            this.requestShoppingListData();

            //alert('size of collection ' + temp.length);
    
            //this.setState({ lists: temp });

            /*this.setState(() => {
                return {
                    value: "",
                    lists: temp,
                }
            });*/
        }

    }

    renameList = (input) => {
        //alert('trying to rename list ' + input)
        //alert('NAME OF CURRENT LIST' + this.state.lists[this.state.listIndex].name)
        let isDuplicate = false;

        this.toggleRenameMenu();

        for (let i = 0; i < this.state.lists.length; i++) {
            if (this.state.lists[i].name === input) {
                isDuplicate = true;
            }
        }

        //alert('NAME OF CURRENT LIST' + temp[this.state.listIndex].name)
        if(input.trim().length === 0) {
            alert('invalid shopping name list: no empty string');
        } else if (isDuplicate) {
            alert('invalid shopping name list: no duplicate names');
        
        } else {
            var temp = [...this.state.lists];
            temp[this.state.listIndex].name = input;

            this.setState(() => {
                return {
                    lists: temp,
                }
            })
        }
    }

    handleRemoveList = async() => {
        //alert('attempting to remove list at index:' + this.state.listIndex);
        var prevIndex = this.state.listIndex;
        //var temp = [...this.state.lists];
        
        //temp.splice(prevIndex, 1);
        //alert('temp contents: ' + temp.toString());

        if (this.state.lists.length === 1){
            this.setState({deleteListMessage: "Could not delete list! You must have at least one shopping list."});
            setTimeout(() => this.setState({deleteListMessage: ""}), 3000);
        } else {
            this.setState({deleteListMessage: "Successfully deleted shopping list!"});
            setTimeout(() => this.setState({deleteListMessage: ""}), 3000);


            let currentJWT = null;
            let currentUID = null;
    
            try {
                currentJWT = await this.props.auth.currentUser.getIdToken(true);
                //console.log(currentJWT)
            } catch (err) {
                console.log(err.message);
            }
             
            //console.log(currentJWT)
            try {
                currentUID = await this.props.auth.currentUser.uid;
                console.log(currentUID)
                try {
                    await axios.delete(`https://bazaara-342116.uk.r.appspot.com/lists/delete/${currentUID}/list/${this.state.lists[this.state.listIndex].id}`, 
{
                      headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
                        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
                        "Authorization": currentJWT,
                      }
                    }).then((response) => {
                        console.log(response);
                    });
                  } catch (err) {
                      console.log(err.message);
                      return err.message;
                  }
            } catch (err) {
                console.log(err.message);
            }
            
            this.requestShoppingListData();

            // old
            /*this.setState(() => {
                return {
                    lists: temp,
                }
            })*/
        }


    }

    togglePop() {
        this.setState({
         seen: !this.state.seen
        });
    }

    toggleRemoveItemButton() {
        this.setState({
            hideButton: !this.state.hideButton,
        });
    }

    toggleRenameMenu() {
        this.setState({
            hideRenameView: !this.state.hideRenameView,
        });
    }

    // save state of the index of list you wanna add product to.
    // button redirects to product search page + the index of shopping list saved so default add to is selected list
    handleAddProduct = (name, weight, price, store) => {
        //name, weight, price, store
        var temp = [...this.state.lists];
        temp[this.state.listIndex].productCollection.push(new Product(name, weight, price, store));

        this.setState(() => {
            return {
                lists: temp,
            }
        });
    }

    handleRemoveProduct = (clickedIndex) => {
        //alert('called handleremoveproduct');
        //this.updateCurrentProductIndex(clickedIndex);

        //alert('clicked index: ' + clickedIndex);
       // var temp = [...this.state.currentList];
        var temp = [...this.state.lists];
        temp[this.state.listIndex].productCollection.splice(clickedIndex, 1);

        this.setState(() => {
            return {
                //currentList: temp,
                lists: temp,
            }
        });

        //alert('temp list:' + JSON.stringify(temp))
    }

    calculateTotalListPrice() {
      /* let temp = 0;

        this.state.lists[this.state.listIndex].productCollection.map((product) => (
                temp += product.price
        ))
        
        return temp.toFixed(2);*/
    }


    // populate lists state variable with user's lists stored in database
    requestShoppingListData = async() => {
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
                    console.log(response);

                    let tempLists = response.data.message;

                    this.setState(() => {
                        return {
                            lists: tempLists,
                        }
                    })
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
        let component = null;

        switch(this.props.pageIndex) {
            case 0:
                component = <ProductSearch addProduct={this.handleAddProduct} lists={this.state.lists} listIndex={this.state.listIndex} changeList={this.changeListHandler}/>;
                break;
            case 1:
                component = <>
                    <Navbar />
                    
                    <section className="bg-purple-200 p-3">
                    <section className='bg-purple-200 flex'>
                    <div className='listnamescolumn'>
                                <ShoppingListSelection changeListHandler={this.changeListHandler} handleAddList={this.handleAddList} lists={this.state.lists} handleInput={this.handleInput} value={this.state.value} togglePop={this.togglePop} seen={this.state.seen}/>
                            </div>
                            <div className='productlistcolumn bg-purple-200'>
                                    <Link to={`/search`} className="">
                                        <div className="px-2 py-1 text-sm rounded-full text-white bg-purple-600" >+ Add a Product</div>
                                    </Link>
                                    {this.state.deleteListMessage}
                                    {/*<ShoppingListDisplay requestShoppingListData={this.requestShoppingListData} listIndex={this.state.listIndex} lists={this.state.lists} currentList={this.state.currentList} removeProduct={this.handleRemoveProduct} productIndex={this.state.productIndex} hideButton={this.state.hideButton} handleInput={this.handleInput} renameList={this.renameList} value={this.state.value} hideRenameView={this.state.hideRenameView} calculateTotalListPrice={this.calculateTotalListPrice} totalCost={this.calculateTotalListPrice()}/>*/}
                                
                            </div>
                            <ListManagementDropdown handleRemoveList={this.handleRemoveList} toggleRemoveItemButton={this.toggleRemoveItemButton} toggleRenameMenu={this.toggleRenameMenu}/>
                    </section>
                    </section>
                    
                    <Footer />
                    </>;
                break;
            default:
                component = <ErrorPage />
        }
        return(
            <div>{component}</div>
        );
    }

}

export default ShoppingListView;
