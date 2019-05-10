import React, { Component } from 'react';
import {ToggleButtonGroup,ToggleButton} from 'react-bootstrap';
class Options extends Component {

constructor(props, context) {
    super(props, context);

  }



 render() {
    return (  
          <ToggleButtonGroup  type="radio" name="options" value={this.props.value}   onChange={this.props.onChange}  defaultValue={1} style={{marginBottom: '15px'}}>
           <ToggleButton value={1} defaultValue={1}  >Cheapest</ToggleButton>
           <ToggleButton value={2} >Fastest</ToggleButton>        
          </ToggleButtonGroup>      
  
);
    
  }

	}

export default Options;