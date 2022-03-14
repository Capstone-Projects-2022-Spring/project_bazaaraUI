import React from 'react';
import './styles.css';
import { ShoppingList, ShoppingListCollection } from './ShoppingList'

export class ShoppingListSelection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
        this.handleInput = this.handleInput.bind(this);

    }

    state = {
        seen: false
        };
       togglePop = () => {
        this.setState({
         seen: !this.state.seen
        });
    };


    handleInput(event) {
            this.setState({value: event.target.value});
    }


    render() {
        return(

            <section className="">
                <h1>Shopping Lists</h1>
                <button onClick={this.togglePop}>+ Create New List</button>
                {this.state.seen ?    
                    <div className="modal">
                        <div className="modal_content">
                            <span className="close"></span>

                                    <input type="text" placeholder="New Shopping List Name" onChange={this.handleInput}/>
                                <br />
                                <button onClick={(e) => this.props.handleAddList(this.state.value, e)}>Add</button>

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
