import React from 'react'
import styled from 'styled-components'
import {FaRegUserCircle} from 'react-icons/fa'
import Modalauth from './Modalauth'
import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import {Context} from '../Context'
import {GrAdd} from 'react-icons/gr'
import {ImProfile} from 'react-icons/im'
import  Addpost from '../layouts/Addpost'


const Usersection = styled.div`
width : 100%;
height : 100px;
display : flex;
justify-content : flex-start;
align-items : center;
background-color : #FAFAFA;
margin-top : 50px;
border-bottom : solid 1px lightgray;


@media (max-width: 768px) {
  margin-top  : 0

  }


`

const Userspan = styled.span`
color : black;
font-size : 18px;
margin-left : 10px;
font-weight : 800;
font-family : sans-serif
`

const Lastpost = styled.div`
width : 100%;
height : auto;
@media (max-width: 768px) {
   display : none
  }

`


const Centerdiv = styled.div`
display : flex;
align-items : center;
justify-content : center;
margin-top : 400px;
margin-left : -200px;

@media (max-width : 768px) {
display : none

}

`


const Contentactions = styled.div`
display : flex;
justify-content : space-between;
align-items : center;
font-size : 30px;
display : inline-block;
`


function Clientcontent() {

  const [showLogin, setShowLogin] = useState(false);

const handleCloseLogin = () => setShowLogin(false);
const handleShowLogin = () => setShowLogin(true);




const [showSign, setShowSign] = useState(false);

const handleCloseSign = () => setShowSign(false);
const handleShowSign = () => setShowSign(true);

const {loggedIn} = useContext(Context)
const {username} = useContext(Context)


 
  
   
const [showAddpost, setShowAddpost] = useState(false);

const handleCloseAddpost = () => setShowAddpost(false);
const handleShowAddpost = () => setShowAddpost(true);
    
     
      
       
  return (
    <div>
    
    <Usersection>
    <FaRegUserCircle style ={{fontSize : "50px"}}/>
    <Userspan>{username ? username  : "null" }</Userspan>

    {
      loggedIn ? (

        <div>
        <button className = "btn btn-danger" onClick = {() => {
          axios.get("http://localhost:8100/user/logout").then(() => {
            window.location.reload()
          })
        }} style = {{marginLeft : "20px"}}>Logout</button>

        <Contentactions>
        <ImProfile style = {{marginLeft : "30px",marginRight : "30px",cursor : "pointer"}}/>
        <GrAdd style = {{cursor : "pointer"}}  onClick = {handleShowAddpost}/>
        </Contentactions>

        <Addpost showAddpost = {showAddpost} handleCloseAddpost = {handleCloseAddpost}/>



        </div>
      ) : (
        <div>

<div style = {{display : "flex",justifyContent : "space-between",marginLeft : "30px"}}>
<button className = "btn btn-primary" onClick = {handleShowLogin}>Login</button>
<button className = "btn btn-success" style = {{marginLeft : "10px"}} onClick = {handleShowSign}>Sign</button>
</div>

</div>
   
      )
    }


<Centerdiv>

<p style = {{color : "blue",cursor : "pointer",fontWeight : "800"}}>This is a test app</p>


</Centerdiv>
     

      
       
        
         


 



    
    
    
    
    </Usersection>








      <Modalauth handleCloseLogin ={handleCloseLogin} showLogin ={showLogin}  handleCloseSign ={handleCloseSign} showSign ={showSign}/>










    </div>
  )
}


export default Clientcontent