import React from 'react';
// import Searchresults from './searchresults';

let data = [
    {name:'india'},
    {name:'srilanka'},
    {name:'usa'},
    {name:'russia'},
    {name:'spain'},
    {name:'indonesia'},
    {name:'indiana'},
    {name:'india people'}
    // {name:'india'}
];

let itemstodisplay;


class App extends React.Component{

    state = {
        input:'',
        database:data,
        suggestions:[],
        searchdata:[],
        keydown:0,
    }

    handlechange = e =>{
        this.setState({
            input:e.target.value,
        })
        
    }

    makecall = () =>{
        //   console.log(event);
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
    
    betterfunction = this.debounce(this.makecall,800)

    handleclick = e =>{
         console.log(e.target);
        this.setState({
            input:e.target.innerHTML,
            
        })
        
    }

    handlesubmit = (e) =>{
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

    handlekeydown = e =>{
        // this.setState({
        //     input:e.target.innerHTML,
        // })
        
        if(e.keyCode ===40)
        {
            console.log(this.state.keydown);
            console.log(itemstodisplay);
            this.setState({
                input:itemstodisplay[this.state.keydown].props.children,
                keydown:this.state.keydown+1,
            })
        }
    }

    render(){
    
     itemstodisplay = this.state.suggestions.map(item => {
        if(this.state.suggestions.length!==0)
            return(
            
              <div onClick={this.handleclick} className="suggestions" >
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
                <div style={{padding:'7px',}}>
                    <img src={item.urls.small} alt="" width="300px" height="300px"></img>
                </div>
            )
        })
    
     return( 
    <div>
        <form onSubmit={this.handlesubmit}>
            <input placeholder='search anything'
             value={this.state.input} 
             onChange={this.handlechange}
             onKeyUp={(e)=>this.betterfunction(e)}
             onKeyDown={this.handlekeydown}
             style={{margin:'50px 300px 0px 500px'}}
             />
        </form>
        <div style={{margin:'0px 300px 0px 500px',}}>
        {itemstodisplay}
        </div>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
            {displaysearchdata}
        </div>
        {/* <Searchresults item={this.state.input}/> */}
    </div>     
        )
    }

}

export default App;

