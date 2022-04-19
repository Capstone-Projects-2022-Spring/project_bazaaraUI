import React from 'react';
import './styles.css';
import ShoppingListSelection from './ShoppingListSelection'
import ShoppingListDisplay from './ShoppingListDisplay'
import ListManagementDropdown from './ListManagementDropdown';
import Navbar from '../../NavBar/Navbar'
import Footer from '../../Footer/Footer'
import { ProductSearch } from '../ProductSearch/ProductSearch';
import ErrorPage from "../404Page/ErrorPage"
import { Link } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from '@mui/material';
import { SnackbarProvider } from 'notistack';

export class ShoppingListView extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            value: "", // user input
            listIndex: 0,
            currentListId: "",
            currentList: [],
            lists: [],
            productIndex: 0,
            deleteListMessage: "",
            hideButton: true, // remove items button view
            seen: false, // new list button view
            hideRenameView: true,
            listTotalCost: 0, // total price of current shopping list, currently unused?
            loaded: false,
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
                currentList: this.state.lists[newIndex]
                //currentList: ShoppingListCollection.collection[newIndex].productCollection,
        })
    }

    handleInput(event) {
        this.setState({value: event.target.value});
    }

    handleAddList = async(name) => {
        //alert('new list name: ' + name);
        //alert('current lists: ' + this.state.lists.toString())

        //this.state.lists.add(this.state.value, []);
       //this.state.lists.add(name, []);
       
        //this.setState({lists: temp})
        let isDuplicate = false;

        this.togglePop();

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
                //console.log(currentUID)
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

        }

    }

    renameList = async(input) => {
        //alert('trying to rename list ' + input)
        //alert('NAME OF CURRENT LIST' + this.state.lists[this.state.listIndex].name)
        let isDuplicate = false;

        this.toggleRenameMenu();

        for (let i = 0; i < this.state.lists.length; i++) {
            if (this.state.lists[i].label === input) {
                isDuplicate = true;
            }
        }

        let currentJWT = null;
            let currentUID = null;
    
            try {
                currentJWT = await this.props.auth.currentUser.getIdToken(true);
            } catch (err) {
                console.log(err.message);
            }
             
            try {
                currentUID = await this.props.auth.currentUser.uid;
                console.log(currentUID)
                try {
                    await axios.post(`https://bazaara-342116.uk.r.appspot.com/lists/update/${currentUID}/listIndex/${this.state.listIndex}/label`, 
                    { 
                        "label": `${input}`,
                    }, {
                      headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
                        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
                        "Authorization": currentJWT,
                      }
                    }).then((response) => {
                        console.log(response);
                        this.requestShoppingListData();
                    });
                  } catch (err) {
                      console.log(err.message);
                      return err.message;
                  }
            } catch (err) {
                console.log(err.message);
            }

    }

    handleRemoveList = async() => {
        if (this.state.lists.length === 1){ // users cannot have zero shopping lists
            this.setState({deleteListMessage: "Could not delete list! You must have at least one shopping list."});
            setTimeout(() => this.setState({deleteListMessage: ""}), 3000);
        } else if (this.state.listIndex === this.state.lists.length-1) { // user is deleting the last shopping list in array
            this.setState({deleteListMessage: "Successfully deleted shopping list!"});
            setTimeout(() => this.setState({deleteListMessage: ""}), 3000);

            let currentJWT = null;
            let currentUID = null;
    
            try {
                currentJWT = await this.props.auth.currentUser.getIdToken(true);
            } catch (err) {
                console.log(err.message);
            }
             
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
            this.setState({
                listIndex: this.state.listIndex-1,
            })
        } else { // regular handling of shopping list removal
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
    handleAddProduct = async(productId) => {

        // add dummy product for now with api
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
                await axios.post(`https://bazaara-342116.uk.r.appspot.com/lists/add/${currentUID}/product`,
                 {
                    productId: productId,
                    listIdx: this.state.listIndex,
                 },
                 {
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
                    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
                    "Authorization": currentJWT,
                  }
                }).then((response) => {
                    console.log(response);

                    this.requestShoppingListData();
                });
              } catch (err) {
                  console.log(err.message);
                  return err.message;
              }
        } catch (err) {
            console.log(err.message);
        }
    }

    handleRemoveProduct = async(clickedIndex) => {
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
                await axios.post(`https://bazaara-342116.uk.r.appspot.com/lists/delete/${currentUID}/product`,
                {
                    productId: this.state.lists[this.state.listIndex].products[clickedIndex]._id,
                    listIdx: this.state.listIndex,
                 },
                 {
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
                    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
                    "Authorization": currentJWT,
                    
                  },
                }).then((response) => {
                    console.log(response);

                    this.requestShoppingListData();
                });
              } catch (err) {
                  console.log(err.message);
                  return err.message;
              }
        } catch (err) {
            console.log(err.message);
        }
    }

    calculateTotalListPrice() {
       let temp = 0;

        (this.state.currentList.products).map((product) => (
                temp += product.price
        ))
        return temp.toFixed(2);
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

                    //console.log("Shopping List Data", response);

                    let tempLists = response.data.message;

                        this.setState(() => {
                            return {
                                lists: tempLists,
                                currentList: response.data.message[this.state.listIndex],
                            }
                        })
                        this.state.loaded = true;
                        this.forceUpdate();


                });
              } catch (err) {
                  console.log(err.message);
                  return err.message;
              }
        } catch (err) {
            console.log(err.message);
            window.location.replace('/');
        }

      }

    render() {
        let component = null;
        if (!this.state.loaded) {
            return <div><Navbar /><CircularProgress className="centered" color="secondary" /></div>;
        }

        switch(this.props.pageIndex) {
            case 0:
                component = <><div className='grid grid-rows-auto'>
                        <SnackbarProvider maxSnack={3}>
                            <ProductSearch 
                            loaded={this.state.loaded} 
                            addProduct={this.handleAddProduct}
                            lists={this.state.lists} 
                            currentList={this.state.currentList} 
                            listIndex={this.state.listIndex} 
                            changeList={this.changeListHandler}
                            auth={this.props.auth}/>
                        </SnackbarProvider>
                {/* <div className='sticky  bottom-0 left-0 w-full z-60'> */}

                <Footer/>
                {/* </div> */}
                </div> 

                </>;
                break;
            case 1:
                component = <>
                    <Navbar />
                    <section className="bg-purple-200 p-3 min-h-screen">
                    <section className='bg-purple-200  md:max-w-[1200px] md:m-auto md:flex md:space-x-4'>
                    <div className='px-4 max-w-[200px] w-full'>
                                <ShoppingListSelection changeListHandler={this.changeListHandler} handleAddList={this.handleAddList} lists={this.state.lists} handleInput={this.handleInput} value={this.state.value} togglePop={this.togglePop} seen={this.state.seen}/>
                            </div>
                            <div className='px-4 w-full justify-center items-start flex space-x-2 bg-purple-200'>
                                    <div className='flex flex-col space-y-2'>

                                    <Link to={`/search`} className="">
                                        <button className="px-2 py-1 text-sm rounded-full text-white bg-purple-600" >+ Add a Product</button>                                   </Link>
                                    {this.state.deleteListMessage}
                                    <ShoppingListDisplay 
                                    displayIndex={this.state.listIndex} lists={this.state.lists} currentList={this.state.currentList} removeProduct={this.handleRemoveProduct} productIndex={this.state.productIndex} hideButton={this.state.hideButton} handleInput={this.handleInput} renameList={this.renameList} value={this.state.value} hideRenameView={this.state.hideRenameView} calculateTotalListPrice={this.calculateTotalListPrice} totalCost={this.calculateTotalListPrice()}/>
                                    </div>
                                <div className='md:flex justify-start md:h-full items-start'>
                                <ListManagementDropdown
                                    handleRemoveList={this.handleRemoveList} 
                                    toggleRemoveItemButton={this.toggleRemoveItemButton} 
                                    toggleRenameMenu={this.toggleRenameMenu}
                                />
                                </div>
                            
                            </div>
                    </section>
                    </section>
                    <button onClick={this.handleAddProduct}>Add sample product</button>
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
