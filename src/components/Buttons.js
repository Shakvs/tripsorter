import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'

class Buttons extends Component {

constructor(props, context) {
    super(props, context);    
  }

  render() {
    return (  
           <div className="text-center" ><Button as="input" type="submit" value={this.props.list.name}  variant={this.props.list.class} size="lg" onClick={this.props.onClick} style={{marginTop: '15px'}}/>   </div>  
);
    
  }

	}

export default Buttons;