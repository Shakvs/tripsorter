import React, { Component } from 'react';
import Dropdown from './components/Dropdown';
import Options from './components/Options';
import Buttons from './components/Buttons';
import Checkbox from './components/Checkbox';
import Triplist from './components/Triplist';
import {algo ,graph ,departureList ,arrivalList} from './services/tripsorter.js';

const divStyle = {
  margin: '40px',
  
};


class App extends Component {


	constructor(props){
    super(props)
    this.state = {
        fromlist : departureList,
        tolist : arrivalList,
        buttonlist:[ { name : 'Search', type :'Search' ,'class' : 'success'}, { name : 'Reset', value :'Reset', 'class' : 'primary'}],
        fromselected: '',
        toselected: '',
        value:1,
        checked:true,
        isSubmitted:null,
        hasReset:null,
        title:'Lets Travel',
        tripsortedlist:'',
        
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this); 
    this.handleOptionChange = this.handleOptionChange.bind(this); 
    this.handleReset = this.handleReset.bind(this); 
    this.handleCheck = this.handleCheck.bind(this); 
     //console.log(algo);
  }

handleChange(event) {
    this.setState({[ event.target.name+"selected"]: event.target.value});    
    
  }

  handleOptionChange(value, event) {
    this.setState({ value }); 

    
  }
handleCheck() {
    this.setState({checked: !this.state.checked});
   
    
  }
 

handleSubmit(event){     
     this.setState({isSubmitted: true});
     this.setState({hasReset: null});
     this.setState({title: 'Trip lists'});
     //console.log(this.state);     
     this.setState({tripsortedlist: algo.run(graph,this.state.fromselected, this.state.toselected,(this.state.value ==1)?'': 'duration', this.state.checked)});
     


    event.preventDefault();
  }
 handleReset(value, event) {
    this.setState({hasReset: true});
    this.setState({title: 'Lets Travel'});
    this.setState({toselected: ''});
    this.setState({fromselected: ''});
    this.setState({value: 1});
    
    
  }
	render() {	 
       const isEnabled =this.state.fromselected && this.state.toselected;
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
               <Dropdown list={this.state.fromlist} name="from" onChange={this.handleChange}  title='FROM' optiondisable={this.state.toselected}/>
               <Dropdown list={this.state.tolist}  name="to" onChange={this.handleChange} title='TO' optiondisable={this.state.fromselected} />
                <Options onChange={this.handleOptionChange}/>
                <Checkbox onChange={this.handleCheck} default={this.state.checked}/>
                <Buttons  list={this.state.buttonlist[0]}  disabled={!isEnabled}/>                
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


