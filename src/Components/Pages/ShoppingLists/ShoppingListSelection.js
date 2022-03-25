import React from 'react';
import './styles.css';
import { ShoppingList, ShoppingListCollection } from './ShoppingList'

export class ShoppingListSelection extends React.Component {
   /* constructor(props) {
        super(props)
        this.state = {
            
        }
        //this.handleInput = this.handleInput.bind(this);

    }*/

   /* state = {
        seen: false
        };
       togglePop = () => {
        this.setState({
         seen: !this.state.seen
        });
    };
*/



    render() {
        return(

            <section className="">
                <h1>Shopping Lists</h1>
                <button onClick={(e) => this.props.togglePop(e)}>+ Create New List</button>
                {this.props.seen ?    
                    <div className="modal">
                        <div className="modal_content">
                            <span className="close"></span>

                                    <input type="text" placeholder="New Shopping List Name" onChange={(e) => this.props.handleInput(e)}/>
                                <br />
                                <button onClick={(e) => this.props.handleAddList(this.props.value, e)}>Add</button>


                        </div>
                     </div> : null}

                { 

                    this.props.lists.map((listName, index) => (
                        <p><button onClick={this.props.changeListHandler.bind(this, index)}>
                                {listName.name}
        
                            </button></p>


                    ))



                }

            </section>
            
        );
    }
}

export default ShoppingListSelection;
