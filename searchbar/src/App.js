import React from 'react';
import Searchresults from './searchresults';

let data = [
    {name:'india'},
    {name:'srilanka'},
    {name:'usa'},
    {name:'russia'},
    {name:'spain'},
]

class App extends React.Component{

    state = {
        input:'',
        database:data,
    }

    handlechange = e =>{
        this.setState({
            input:e.target.value,
        })
        
    }

    makecall = () =>{
          //console.log('entered');
           const suggestions = this.state.database.filter(country =>{
               
               if(country.name.startsWith(this.state.input))
               {
                   
                   return country.name;
               }
            //    else
            //    {
            //         return 'no related searches'
            //    }
          })
         console.log(suggestions);
    }

    debounce = (fn,delay) =>{

        let callapi;
       return function(){ 
        clearTimeout(callapi);
        callapi = setTimeout(()=>{
         fn();
          
        },delay);
    } 
    }
    
    betterfunction = this.debounce(this.makecall,2000)

    render(){
        return(
    <div>
        <form >
            <input placeholder='search anything'
             value={this.state.input} 
             onChange={this.handlechange}
             onKeyUp={this.betterfunction}
             style={{margin:'50px 300px 0px 500px'}}
             />
        </form>
        <Searchresults item={this.state.input}/>
    </div>     
        )
    }

}

export default App;

