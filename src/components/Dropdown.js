import React, { Component } from 'react';

class DropDown extends Component {


  constructor(props, context) {
    super(props, context);
    
     
  }




 render() {
    return (
        <div className="form-group">
          <select className="form-control" id="from" name={this.props.name}  onChange={this.props.onChange}  defaultValue= {this.props.title}>
          <option  value={this.props.title} disabled >{this.props.title}</option>
          {

            this.props.list.map((item, index) => (
              <option key={index} value={item} disabled={this.props.optiondisable == item}>{item}</option>
            ))
          }
          </select>
        </div>
    );
  }

	}

export default DropDown;