import React from 'react';
// import Searchresults from './searchresults';

let data = [
    {name:'india'},
    {name:'srilanka'},
    {name:'usa'},
    {name:'russia'},
    {name:'spain'},
    {name:'indonesia'},
    // {name:'india'}
]

class App extends React.Component{

    state = {
        input:'',
        database:data,
        suggestions:[],
        searchdata:[]
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

    handleclick = e =>{
        // console.log(e.target.innerHTML);
        this.setState({
            input:e.target.innerHTML,
        })
    }

    handlesubmit = e =>{
        e.preventDefault();
        fetch(`https://api.unsplash.com/search/photos/?client_id=x00KRDCTU-TSnOwMefUykvB47JTFRXXnQoZN6wSjH9Q&query=${this.state.input}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            this.setState({
                searchdata:data.results,
            })
            console.log(this.state.searchdata);
        })
        // console.log(this.state.searchdata);
    }

    render(){
    
    let itemstodisplay = this.state.suggestions.map(item => {
        if(this.state.suggestions.length!==0)
            return(
            
              <div onClick={this.handleclick}>
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

        let displaysearchdata = this.state.searchdata.map(item =>{
            return(
                <div>
                    <img src={item.urls.small} alt=""></img>
                </div>
            )
        })
    
     return( 
    <div>
        <form onSubmit={this.handlesubmit}>
            <input placeholder='search anything'
             value={this.state.input} 
             onChange={this.handlechange}
             onKeyUp={this.betterfunction}
             style={{margin:'50px 300px 0px 500px'}}
             />
        </form>
        <div style={{margin:'0px 300px 0px 500px'}}>
        {itemstodisplay}
        </div>
        <div>
            {displaysearchdata}
        </div>
        {/* <Searchresults item={this.state.input}/> */}
    </div>     
        )
    }

}

export default App;

