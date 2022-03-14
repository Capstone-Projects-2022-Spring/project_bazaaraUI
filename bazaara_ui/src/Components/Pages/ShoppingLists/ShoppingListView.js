import React from 'react';
import './styles.css';
import ShoppingListSelection from './ShoppingListSelection'
import ShoppingListDisplay from './ShoppingListDisplay'
import { ShoppingList, ShoppingListCollection } from './ShoppingList'

export class ShoppingListView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listIndex: 0,
            lists: ShoppingListCollection.collection,
        }
        this.changeListHandler = this.changeListHandler.bind(this);
        this.handleAddList = this.handleAddList.bind(this);
        this.handleRemoveList = this.handleRemoveList.bind(this);
    }

    changeListHandler(newIndex) {
        this.setState({listIndex: newIndex})
    
    }

    handleAddList = (name) => {
        //alert('new list name: ' + name);
        //alert('current lists: ' + this.state.lists.toString())

        //this.state.lists.add(this.state.value, []);
       //this.state.lists.add(name, []);
       
        //this.setState({lists: temp})
        let isDuplicate = false;
        

        for (let i = 0; i < this.state.lists.length; i++) {
            if (this.state.lists[i].name == name) {
                isDuplicate = true;
            }
        }

        if (name.trim().length == 0) {
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
                    lists: temp
                }
            });
        }

    }

    handleRemoveList = () => {
        alert('attempting to remove list at index:' + this.state.listIndex);
        var prevIndex = this.state.listIndex;
        var temp = [...this.state.lists];
        
        temp.splice(prevIndex, 1);
        alert('temp contents: ' + temp.toString());


        if (prevIndex == this.state.lists.length-1) {
            this.setState(() => {
                return {
                    listIndex: prevIndex-1,
                    lists: temp,
                }
            })
        } else {
            this.setState(() => {
                return {
                    lists: temp,
                }
            })
        }


    }
    

    render() {

        return(
            <section className='container'>
               <section className='viewer'>
               <div className='column'>
                        <ShoppingListSelection changeListHandler={this.changeListHandler} handleAddList={this.handleAddList} lists={this.state.lists}/>
                    </div>
                        
                    <div className='column'>
                        <ShoppingListDisplay displayIndex={this.state.listIndex} lists={this.state.lists}/>
                        
                    </div>
                    <button className="smallButton" onClick={this.handleRemoveList}>X</button>

               </section>
            </section>
        );
    }

}



export default ShoppingListView;
