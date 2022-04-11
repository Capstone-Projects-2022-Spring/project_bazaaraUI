import React from 'react';
import './styles.css';

export class ShoppingListSelection extends React.Component {
    render() {
        return(

            <section className="flex flex-col items-start space-y-2 bg-purple-200 justify-start">
                <h1>Shopping Lists</h1>
                <button onClick={(e) => this.props.togglePop(e)} className="px-2 py-1 text-sm rounded-full text-white bg-purple-600">+ Create New List</button>
                {this.props.seen ?    
                    <div className="modal">
                        <div className="modal_content">
                            <span className="close"></span>

                                    <input type="text" className='px-2 text-sm w-48 mr-0 py-1 rounded-full  bg-gray-100 border-2 border-2 border-purple-300' placeholder="New Shopping List Name" onChange={(e) => this.props.handleInput(e)}/>
                                <br />
                                <button onClick={(e) => this.props.handleAddList(this.props.value, e)}>Add</button>


                        </div>
                     </div> : null}

                { 

                    this.props.lists.map((listName, index) => (
                        <p><button onClick={this.props.changeListHandler.bind(this, index)}>
                                {listName.label}
                            </button></p>


                    ))



                }

            </section>
            
        );
    }
}

export default ShoppingListSelection;
