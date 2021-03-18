import React,{useContext,useState} from 'react'
import styled from 'styled-components' 
 import {RiContrastDropLine, RiShieldUserFill} from 'react-icons/ri'
  import {FiMoreHorizontal} from 'react-icons/fi'
 import {AiOutlineLike} from "react-icons/ai"
 import {FaRegComment} from "react-icons/fa"
 import {Context} from '../Context'
import { useEffect } from 'react'
import axios from 'axios'
import CommentsModal from './Commentsmodal'

 const Alldiv = styled.div`

 margin : auto;
height : 700px;
 @media (max-width: 768px) {
  height : 550px;
  }

 `

const Postnavbar = styled.div`
width : 100%;
height : 57px;
border : solid 1px lightgray
  
`
const Navbarspan = styled.span`
font-size : 15px;
font-weight : 800;
font-family : sans-serif;
padding-top : 10px;
margin-left : 10px
`
 
  
const Imgdiv = styled.div`
width : 100%;
height : auto;
min-height : 200px; 
margin-top : 16px;
`


const Commentsec = styled.div`
  width : 100%;
  height : 250px;
  border : solid 1px lightgray
`

const Commentslogo = styled.div`
width : 100px;
height : 40px;
margin : 15px;
display : flex;
align-items : center;
justify-content : space-around;
font-size : 30px
`

const Likedmany = styled.p`
font-weight : 800;
font-family : sans-serif;
margin-left : 20px
`

const Mycomment = styled.p`
font-weight : 800;
font-size : 15px;
margin-left : 20px
`

const Gocomment = styled.p`
color : gray;
font-weight : 800;
margin-left : 20px;
cursor : pointer
`

  
const Openmobil = styled.div`
@media (max-width: 768px) {
 width : 100%;
 height : 70px
  }

`  
    
 
 function Postcontent() {
   const {allpost} = useContext(Context)
   const [likelength,setlikelenght] = useState()
    const [likeat,setlikeat] = useState(false)
    const [commentText,setcommentText] = useState("")


    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);






  const like = (id) => {
        axios.put("http://localhost:8100/post/like",{id : id}).then(() => {
         setlikeat(false)
         console.log("like success")
            }).catch(err => {
              console.log(err)
            })
     }



     const unlike = (id) => {
      axios.put("http://localhost:8100/post/unlike",{id : id}).then(() => {
          setlikeat(true)
          console.log("unlike success")
            }).catch(err => {
              console.log(err)
            })
     }
        

    const sendComment = (id) => {

      const verifycomment = {
        id : id,
        comment : commentText
      }

      axios.put("http://localhost:8100/post/comment",verifycomment).then(() => {
        console.log("comment success")
      }).catch(err => {
        console.log(err)
      })
    }
        


  return (
    <div style = {{marginTop : "70px"}}>

      <div className = "container">
        <div className = "row">
         

       
          {
            allpost.map((q) => {
              return(
                <Alldiv className = "col-md-8">

                          <Postnavbar>
          <RiShieldUserFill style = {{fontSize : "40px",marginTop : "7px",marginLeft : "10px"}}/>
          <Navbarspan>{q.creator}</Navbarspan>
          
          
          <div style = {{display : "flex",justifyContent : "flex-end",marginTop : "-26px"}}>
          <FiMoreHorizontal style = {{fontSize : "20px",marginRight : "20px"}}/>
          </div>


          <Imgdiv>
          <img  className = "img-fluid" src = {`http://localhost:8100/uploads/${q.image}`}/>
          </Imgdiv>


          {/**  psot   */}

        <CommentsModal showModal = {showModal} handleCloseModal = {handleCloseModal} allcomment = {q.comments} image = {q.image} postComment = {q.postComment} creator = {q.creator}/>

        <Commentsec>

        <Commentslogo>
        <AiOutlineLike onClick = {() => {
          likeat ? like(q._id) : unlike(q._id)
        }} style = {{cursor : "pointer"}}/>
        <FaRegComment onClick = {handleShowModal} style = {{cursor : "pointer"}}/>
        </Commentslogo>


        <Likedmany>{q.like.length} liked</Likedmany>
        <Mycomment>{q.creator} : {q.postComment}</Mycomment>
        <Gocomment onClick = {handleShowModal}>all comments {q.comments.length}</Gocomment>

        <div style = {{display : "flex",justifyContent : "space-around"}}>
        <input type = "text" placeholder = "Add comment" className = "form-control" style = {{marginTop : "20px",width : "80%"}} onChange = {(e) => {
          setcommentText(e.target.value)
        }}/>
       <button style = {{width :"20%",marginTop : "20px"}} className = "btn btn-primary" onClick = {() => {
         sendComment(q._id)
       }}>Send</button> 
      
        </div>

        


        </Commentsec>




          </Postnavbar>



          </Alldiv>
              )
            })
          }
       
          
          
      
          <Openmobil/>
        </div>
      </div>


    </div>
  )
}



export default  Postcontent