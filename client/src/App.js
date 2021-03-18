
import './App.css';
import {useState,useEffect}  from 'react'
import {Context} from './Context'
import Navbar from './layouts/Navbar'
import Postcontent from './layouts/Postcontent'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'
import styled from 'styled-components'
import Clientcontent from './layouts/Clientcontent'
import Pusher from 'pusher-js'
axios.defaults.withCredentials = true


const Div1 = styled.div`

height : 100vh;
border : solid 1px lightgray;
overflow-y : scroll;
@media (max-width: 768px) {
height : 100vh
  }
`



const Div2 = styled.div`

height : 100vh;
border : solid 1px lightgray;
@media (max-width: 768px) {
  height : 100px;
  margin-top : 100%;
  position : fixed;
  bottom  : 0
  }
`


const pusher = new Pusher('4314359379c41a8851b3', {
  cluster: 'eu'
});


function App() {
  
  const [loggedIn,setloggedIn] = useState(true)
  const [username,setusername] = useState("")
  const [allpost,setallpost] = useState([])

  const getusername =() => {
    
       axios.get("http://localhost:8100/user/").then(res => {
        setusername(res.data)
      })
   
   
  }



  const getallpost = () => {
    axios.get("http://localhost:8100/post/allpost").then(res => {
      setallpost(res.data)
    }).catch(err => {
      console.log(err)
    })
  }


  useEffect(() => {
    axios.get("http://localhost:8100/user/loggedIn").then(res => {
    setloggedIn(res.data)
    })
  },[])

  useEffect(() => {
    getusername()
  })

  useEffect(() => {
    var channel = pusher.subscribe('newposts');
    channel.bind('newnewpost',(data) => {
      getallpost()
    });
    getallpost()
  },[allpost])


  return (
    <div className="App">
    <Router>
    <Context.Provider value = {{loggedIn,username,allpost}}>
     <Navbar/>
     

      <div className = "container-fluid">
        <div className = "row padding">
          <Div1 className = "col-md-8">
            <Postcontent/>
          </Div1>
 
          <Div2 className = "col-md-4">
            <Clientcontent/>
          </Div2>
        </div>
      </div>



    </Context.Provider>
    </Router>
  </div>
  );
}

export default App;
