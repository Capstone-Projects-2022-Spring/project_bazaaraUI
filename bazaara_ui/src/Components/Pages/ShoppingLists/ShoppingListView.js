import React from 'react';
import './styles.css';
import ShoppingListSelection from './ShoppingListSelection'
import ShoppingListDisplay from './ShoppingListDisplay'
import { ShoppingList, ShoppingListCollection } from './ShoppingList'

export class ShoppingListView extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            listIndex: 0
        }
        this.changeListHandler = this.changeListHandler.bind(this)
    }

    changeListHandler(newIndex) {
        this.setState({listIndex: newIndex})

      /*  this.setState((state) => {
            return {listIndex: newIndex}
        })*/
    
    }

    

    render() {

        return(
            <section className='container'>
               <section className='viewer'>
               <div className='column'>
                        <ShoppingListSelection changeListHandler={this.changeListHandler}/>
                    </div>
                        
                    <div className='column'>
                        <ShoppingListDisplay displayIndex={this.state.listIndex}/>
                    </div>
               </section>
            </section>
        );
    }

}



export default ShoppingListView;
