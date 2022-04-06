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

export class ShoppingListView extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            value: "", // user input
            listIndex: 0,
            lists: ShoppingListCollection.collection,
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
    }

    changeListHandler(newIndex) {
        //alert('new list index: ' + newIndex);
        this.setState({
                listIndex: newIndex,
                //currentList: ShoppingListCollection.collection[newIndex].productCollection,
        })
    }

    handleInput(event) {
        this.setState({value: event.target.value});
    }

    handleRenameInput(event) {
        this.setState({renamedValue: event.target.renamedValue});
    }

    handleAddList = (name) => {
        //alert('new list name: ' + name);
        //alert('current lists: ' + this.state.lists.toString())

        //this.state.lists.add(this.state.value, []);
       //this.state.lists.add(name, []);
       
        //this.setState({lists: temp})
        let isDuplicate = false;

        this.togglePop();

        for (let i = 0; i < this.state.lists.length; i++) {
            if (this.state.lists[i].name === name) {
                isDuplicate = true;
            }
        }

        if (name.trim().length === 0) {
            alert('invalid shopping name list: no empty string');
        } else if (isDuplicate) {
            alert('invalid shopping name list: no duplicate names');
        } else {
            var temp = [...this.state.lists];
            temp.push(new ShoppingList(name, []));
            //alert('size of collection ' + temp.length);
    
            //this.setState({ lists: temp });

            this.setState(() => {
                return {
                    value: "",
                    lists: temp,
                }
            });
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

    handleRemoveList = () => {
        //alert('attempting to remove list at index:' + this.state.listIndex);
        var prevIndex = this.state.listIndex;
        var temp = [...this.state.lists];
        
        temp.splice(prevIndex, 1);
        //alert('temp contents: ' + temp.toString());

        if (this.state.lists.length === 1){
            this.setState({deleteListMessage: "Could not delete list! You must have at least one shopping list."});
            setTimeout(() => this.setState({deleteListMessage: ""}), 3000);
        } else if (prevIndex === this.state.lists.length-1) {
            this.setState({deleteListMessage: "Successfully deleted shopping list!"});
            setTimeout(() => this.setState({deleteListMessage: ""}), 3000);

            this.setState(() => {
                return {
                    listIndex: prevIndex-1,
                    lists: temp,
                }
            })
        } else {
            this.setState({deleteListMessage: "Successfully deleted shopping list!"});
            setTimeout(() => this.setState({deleteListMessage: ""}), 3000);

            this.setState(() => {
                return {
                    lists: temp,
                }
            })
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
       let temp = 0;

        this.state.lists[this.state.listIndex].productCollection.map((product) => (
                temp += product.price
        ))
        
        return temp.toFixed(2);
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
                                    <ShoppingListDisplay displayIndex={this.state.listIndex} lists={this.state.lists} currentList={this.state.currentList} removeProduct={this.handleRemoveProduct} productIndex={this.state.productIndex} hideButton={this.state.hideButton} handleInput={this.handleInput} renameList={this.renameList} value={this.state.value} hideRenameView={this.state.hideRenameView} calculateTotalListPrice={this.calculateTotalListPrice} totalCost={this.calculateTotalListPrice()}/>
                                
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
