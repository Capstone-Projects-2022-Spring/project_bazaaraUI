import React, { Component } from "react";
import { shoppingList, ListObject } from './mockdata'


export default class PopUp extends Component {
  handleClick = () => {
   this.props.toggle();
  };

  handleChange = (newName) => {
      //shoppingList.push(2, newName, '', []);
  }
render() {
  return (
   <div className="modal">
     <div className="modal_content">
     <span className="close" onClick={this.handleClick}>&times;    </span>
     <form>
         <input type="text" placeholder="New Shopping List Name" onChange={this.handleChange(this.state)} />

     <br />
     <input type="submit"/>

     </form>
    </div>
   </div>
  );
 }
}