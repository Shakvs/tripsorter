import React, { Component } from 'react';
class Checkbox extends Component {

constructor(props, context) {
    super(props, context);

  }



 render() {
    return (  
           <div>
           <input type="checkbox" onChange={this.props.onChange} defaultChecked={this.props.default}/>Discount
           </div>  
  
          );
    
  }

	}

export default Checkbox;