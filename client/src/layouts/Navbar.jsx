import React from 'react'
import styled from 'styled-components'
import {AiFillHome,AiOutlineCompass} from 'react-icons/ai'
import {FiSend} from 'react-icons/fi'
import {FaRegUserCircle} from 'react-icons/fa'


const Navbarall = styled.div`
width : 100%;
height : 53px;
background-color : #ffff;
border-bottom : solid 2px lightgray;
position : fixed  
`

const Navbarin = styled.div`
width : 80%;
height : 53px;
margin-left : 213px;
display : flex;
justify-content : space-between;
@media (max-width: 768px) {
    width : 100%;
    margin-left : 0
  }

`
const Instagramimg = styled.img`
height : 50px;
`
const Input = styled.input`
width : 213px;
height : 26px;
margin-top : 13px;
border: solid 1px lightgray;
@media (max-width: 768px) {
    display : none
  }

`

const Logosall = styled.div`
width : 250px;
height : 53px;
display  :flex;
justify-content : space-around;
font-size : 25px;
align-items : center;
margin-right : 100px;
@media (max-width: 768px) {
    margin-right : 20px;
    font-size : 20px;
    width : 150px ;
    justify-content : space-between
  }
`








function Navbar() {
  return (
    <div>
    <Navbarall>
    <Navbarin>
    <Instagramimg src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOY2v2MjxYgQMVOwuuJiYNiDZXqtzjlxMibW6rBNo9rjwyBGOz13dfhG3Q8JNEOUOoLJc&usqp=CAU0"/>
    <Input type = "text" placeholder = "Search"/>

    <Logosall>
    <AiFillHome style = {{cursor : "pointer"}}/>
    <FiSend style = {{cursor : "pointer"}}/>
    <AiOutlineCompass style = {{cursor : "pointer"}}/>
    <FaRegUserCircle style = {{cursor : "pointer"}}/>
    </Logosall>
    
    
    
    </Navbarin>
    </Navbarall>
    </div>
  )
}

export default Navbar
