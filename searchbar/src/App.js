import React from 'react';
// import Searchresults from './searchresults';

let data = [
    {name:'india'},
    {name:'srilanka'},
    {name:'usa'},
    {name:'russia'},
    {name:'spain'},
    {name:'indonesia'},
    {name:'india'}
]

class App extends React.Component{

    state = {
        input:'',
        database:data,
        suggestions:[]
    }

    handlechange = e =>{
        this.setState({
            input:e.target.value,
        })
        
    }

    makecall = () =>{
          //console.log('entered');
           let suggestion = this.state.database.filter((country) =>{
               
               return country.name.startsWith(this.state.input) ;
            //    if(country.name.startsWith(this.state.input))
            //    {
                   
            //        return country.name;
            //    }
            //    else
            //    {
            //         //  'no related searches'
            //    }
          })
        this.setState({
           suggestions:suggestion,
        })
        console.log(this.state.suggestions);
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
    
    let itemstodisplay = this.state.suggestions.map(item => {
        if(this.state.suggestions.length!==0)
            return(
            
              <div>
                 {item.name}
               </div>
            
            )
        else 
        {
            return (
                <div>none</div>
            )
        }
        })
    
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
        <div style={{margin:'50px 300px 0px 500px'}}>
        {itemstodisplay}
        </div>
        {/* <Searchresults item={this.state.input}/> */}
    </div>     
        )
    }

}

export default App;

