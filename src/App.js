import React, { Component } from 'react';
import Dropdown from './components/Dropdown';
import Options from './components/Options';
import Buttons from './components/Buttons';
import Triplist from './components/Triplist';
import data from './dataproviders/fares.json';
import {algo ,graph} from './services/tripsorter.js';

const divStyle = {
  margin: '40px',
  
};
class App extends Component {


	constructor(props){
    super(props)
    this.state = {
        fromlist : [ { name : 'London', value :'London'}, { name : 'Paris', value :'Paris'}, { name : 'Moscow', value :'Moscow'}, { name : 'Mandrid', value :'Mandrid'}, { name : 'Berlin', value :'Berlin'}],
        tolist : [ { name : 'London', value :'London'}, { name : 'Paris', value :'Paris'}, { name : 'Moscow', value :'Moscow'}, { name : 'Mandrid', value :'Mandrid'},{ name : 'Berlin', value :'Berlin'}],
        buttonlist:[ { name : 'Search', type :'Search' ,'class' : 'success'}, { name : 'Reset', value :'Reset', 'class' : 'primary'}],
        fromselected: '',
        toselected: '',
        value:1,
        isSubmitted:null,
        hasReset:null,
        title:'Lets Travel',
        tripsortedlist:''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this); 
    this.handleOptionChange = this.handleOptionChange.bind(this); 
    this.handleReset = this.handleReset.bind(this); 
     console.log(algo);
  }

handleChange(event) {
    this.setState({[ event.target.name+"selected"]: event.target.value});    
    
  }

  handleOptionChange(value, event) {
    this.setState({ value }); 
    
  }

handleSubmit(event){
     console.log("clicked ME");
     this.setState({isSubmitted: true});
     this.setState({hasReset: null});
     this.setState({title: 'Trip lists'});
     console.log(this.state);
     console.log(this.state.value);
     this.setState({tripsortedlist: algo.run(graph,this.state.fromselected, this.state.toselected,(this.state.value ==1)?'': 'duration', true)});
     console.log(this.state.fromselected);


    event.preventDefault();
  }
 handleReset(value, event) {
    this.setState({hasReset: true});
    this.setState({title: 'Lets Travel'});
    
  }
	render() {	 
       
       return (
           <section id="contact" className="wow fadeInUp" >
           <div className="container" >
           <div className=" text-center">
           <h2>{this.state.title} </h2>       
           </div>
          </div>
          <div className="container">
          { (!this.state.isSubmitted || this.state.hasReset) ? 
          <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8"><div className="form">            
           	   <form action="" method="post" role="form" className="contactForm" onSubmit={this.handleSubmit}>
               <Dropdown list={this.state.fromlist} name="from" onChange={this.handleChange}  title='FROM'/>
               <Dropdown list={this.state.tolist}  name="to" onChange={this.handleChange} title='TO' />
                <Options onChange={this.handleOptionChange}/>
                <Buttons  list={this.state.buttonlist[0]} />                
               </form> 
              
               </div></div>    

      
         </div>
          :
                <div> <Triplist  tripsortedlist={this.state.tripsortedlist} /> <Buttons  list={this.state.buttonlist[1]} onClick={this.handleReset}/></div>
            }

        </div>

        </section>
         

       	) ;
	  }

}

export default App;


