/* allow to render componets if they enable */

import './App.css';
import React from 'react';

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      count :0
    }
  }

  //count is update upto 9 times 
  shouldComponentUpdate(){
    if(this.state.count < 10){
      return true
    }
  }
 
  render(){
    return(
      <>
      <h1> Calling App functionality </h1>
      <h2> counter  is {this.state.count}</h2>
      <button onClick={()=>this.setState({count:this.state.count+1}) }>click to change</button>
      </>
    )
  }

}

export default App;
