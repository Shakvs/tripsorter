import React, { Component } from 'react';

class Triplist extends Component {

constructor(props, context) {
    super(props, context);

  }

 


 render() {

   
   const totalcosts = this.props.tripsortedlist.map(function(item,index){        
        if(item.totalcost !=='undefined' && (item.totalcost !=='') && !isNaN(item.totalcost) && typeof(item.totalcost) !== 'undefined')
          return item.totalcost;
          else
            { item.totalcost =0;
              return item.totalcost;
            }
    });
    var maxtotalcost = totalcosts.reduce(function(a, b) {
    return Math.max(a, b).toString();
});
   

    return (
  <div className="list-group">
 { 
     this.props.tripsortedlist.map((item, index) => (
           (index < this.props.tripsortedlist.length - 1)?
              <div  className={(index == 0 )? 'list-group-item ' : 'list-group-item'} key={index} >
      <h4 className="list-group-item-heading">{item.node} > {item.nextnode}  <span style={{float: 'right'}}>  {item.travelcost} &euro; </span></h4>
      <p className="list-group-item-text"><span style={{ fontWeight: 'bold' }}> {item.route}</span>  {item.reference}  for <span style={{ fontWeight: 'bold' }}>{item.duration}</span> </p>
    </div>
    : null
            ))
 }  

 <div  className='list-group-item active'  >      
      <h4 className="list-group-item-heading">Total   <span style={{float: 'right'}}>  {maxtotalcost} &euro; </span></h4>
    </div>   
    
  </div>
  

           
  
);
    
  }

	}

export default Triplist;