import React, { Component } from 'react';

class Triplist extends Component {

constructor(props, context) {
    super(props, context);

  }

 


 render() {
    return (
  <div className="list-group">
 {
     this.props.tripsortedlist.map((item, index) => (
           (index < this.props.tripsortedlist.length - 1)?
              <div  className={(index == 0 )? 'list-group-item active' : 'list-group-item'} key={index}>
      <h4 className="list-group-item-heading">{item.node} > {item.nextnode}  <span style={{float: 'right'}}>  {item.weight} &euro; </span></h4>
      <p className="list-group-item-text"> {item.route} AB123  for 2hrs 15 mnts</p>
    </div>
    : null
            ))
 }     
    
  </div>
  

           
  
);
    
  }

	}

export default Triplist;