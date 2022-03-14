import React from 'react';
import './styles.css';
import { ShoppingList, ShoppingListCollection } from './ShoppingList'

export class ShoppingListSelection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            //lists: ShoppingListCollection.collection,
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleAddList = this.handleAddList.bind(this);
    }

    state = {
        seen: false
        };
       togglePop = () => {
        this.setState({
         seen: !this.state.seen
        });
    };

    handleAddList() {
        alert('new list name: ' + this.state.value);
        

        //this.state.lists.add(this.state.value, []);
       ShoppingListCollection.add(this.state.value, []);
       
        //this.setState({lists: temp})
        alert('size of collection ' + ShoppingListCollection.collection.length);

        this.forceUpdate();
        this.preventDefault();
    }

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
                            <span className="close">&times;    </span>
                                <form onSubmit={this.handleAddList}>
                                    <input type="text" placeholder="New Shopping List Name" onChange={this.handleInput}/>
                                <br />
                                <input type="submit" value="Add" />
                                </form>
                        </div>
                     </div> : null}

                {
      
                    ShoppingListCollection.collection.map((listName, index) => (

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