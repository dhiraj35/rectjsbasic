import './App.css';
import React from 'react';

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      name : "Dhiraj"
    }
    console.log("consnj");
  }
  componentDidMount(){
    console.log("component did mount ");
  }
  componentDidUpdate(previousProps,previousState){
    if(previousState.name==this.state.name){
      console.log("state update ");
    }
  }

  render(){
    console.log("render");
    return(
      <>
      <h1> Calling App functionality </h1>
      <h2> My name is {this.state.name}</h2>
      <button onClick={()=>this.setState({name:"Deepak"}) }>click to change</button>
      </>
    )
  }

}

export default App;
