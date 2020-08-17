import React from 'react';

class App extends React.Component{

    state = {
        input:'',
    }

    handlechange = e =>{
        this.setState({
            input:e.target.value,
        })
    }

    makecall = () =>{
          console.log('entered');
    }

    debounce = (fn,delay) =>{

        let callapi;
        
        clearTimeout(callapi);
        callapi = setTimeout(()=>{
          fn();
         
        },delay);
        
    }


    render(){
        return(
        <form >
            <input placeholder='search anything'
             value={this.state.input} 
             onChange={this.handlechange}
             onKeyUp={()=>{this.debounce(this.makecall,2000)}}
             style={{margin:'200px 300px 300px 300px'}}
             />
        </form>     
        )
    }

}

export default App;

