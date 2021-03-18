import React from 'react'
import styled from 'styled-components'
import {useState} from 'react'
import {Modal,Button} from  'react-bootstrap' 
import axios from 'axios'
 function Addpost({showAddpost,handleCloseAddpost}) {



  const [image,setimage] = useState("")
  const [postComment,setpostComment] = useState("")

 
   

  const addnewpost = () => {
    const data = new FormData()
    data.append("image",image)
    data.append("postComment",postComment)

    axios.post("http://localhost:8100/post/addpost",data).then(() => {
      console.log("data success")
    }).catch(err => {
      console.log(err)
    })






  }
   
   

   

  return (
    <div>
<Modal
        show={showAddpost}
        onHide={handleCloseAddpost}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <input type = "file" className = "form-control" onChange = {(e) => {setimage(e.target.files[0])}}/> 
         <br/>
         <input type = "text" className = "form-control" placeholder = "your comment" onChange = {(e) => {setpostComment(e.target.value)}}/> 


         
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddpost}>
            Close
          </Button>
          <Button variant="primary" onClick = {addnewpost}>Understood</Button>
        </Modal.Footer>
      </Modal>


      
    </div>
  )
}
export default Addpost