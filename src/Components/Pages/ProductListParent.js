import React from 'react';
import { ShoppingList, ShoppingListCollection, Product } from './ShoppingLists/ShoppingList.js'
import ShoppingListView from './ShoppingLists/ShoppingListView';
import { ProductSearch } from './ProductSearch/ProductSearch';
import ErrorPage from "./404Page/ErrorPage"
import './ShoppingLists/styles.css'

// NOT CURRENTLY USED

class ProductListParent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        shoppingList: ShoppingListCollection.collection,
      };
    }

    updateShoppingList(updatedList) {
      this.setState({shoppingList: updatedList})
    }
    


    render() {
        let component = null;

        switch(this.props.pageIndex) {
            case 0:
                component = <ProductSearch testList={this.state.shoppingList} updateShoppingList={this.updateShoppingList}/>;
                break;
            case 1:
                component = <ShoppingListView />;
                break;
            default:
                component = <ErrorPage />
        }

        return (
            <div>
                {component}
            </div>

        );
    }
  }



  export default ProductListParent;