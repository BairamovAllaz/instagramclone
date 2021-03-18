import React,{useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap'
import styled from 'styled-components' 


const Imgdiv = styled.div`
width : 200px;
height : 120px;
display : flex;
align-items : center;
justify-content : center;
margin : 0 auto
`


const Alldiv = styled.div`
width : 100%;
height : 50px;
border : solid 1px lightgray;
margin-top : 15px;
display : flex;
justify-content : space-between
`
 
const Commentuser = styled.p`
color : black;
font-weight : 800;
font-family : sans-serif;
line-height : 50px;
text-align : center

`


const Commentcomments = styled.p`
color : black;
font-weight : 800;
font-family : sans-serif;
float : left;
line-height : 50px;
`
const Mycomment  = styled.p`
text-align : center;
font-weight : 700;
font-family : sans-serif;
font-size : 20px;
padding : 20px
`




  
   






function Commentsmodal({showModal,handleCloseModal,allcomment,image,postComment,creator}) {
  useEffect(() => {

    console.log(allcomment)

  },[])

 



  return (
    <div>


<Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
          
          <Imgdiv>
                <img className = "img-fluid" src = {`http://localhost:8100/uploads/${image}`}/>
          </Imgdiv>
          <Mycomment>{creator} : {postComment}</Mycomment>


         <h3 style = {{fontWeight : 800,fontWeight : 800,padding : "10px"}}>Comments : </h3> 
          {
            allcomment.map(e => {
              return(
                <div>
              
                <Alldiv>

                <div style = {{width : "20%",height : "50px"}}>
                <Commentuser>{e.username} : </Commentuser>
                </div>
                

                <div style = {{width : "80%",height : "50px"}}>
                <Commentcomments>{e.comment}</Commentcomments>
                </div>

                </Alldiv>
              </div>
                
              )
            })
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    
    </div>
  )
}


export default Commentsmodal