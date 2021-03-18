import React,{useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap'
import axios from 'axios'

function Modalauth({handleCloseLogin,showLogin,handleCloseSign,showSign}) {

  const [username,setusername] = useState("")
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  const [passwordverify,setpasswordverify] = useState("")



  const [errSign,seterrsign] = useState("")
  const [errLogin,seterrLogin] = useState("")


    const Signin =  (e) => {
      e.preventDefault()

      const user = {
        username,
        email,
        password,
        passwordverify
      }
    



      axios.post("http://localhost:8100/user/sigin",user).then(() => {
        window.location.reload()
      }).catch(err => {
        seterrsign(err.response.data)
      })
    } 



    const Loginin =  (e) => {
      e.preventDefault()

      const user = {
        email,
        password,
      }
    



      axios.post("http://localhost:8100/user/login",user).then(() => {
       window.location.reload()
      }).catch(err => {
        console.log(err)
      })
    } 





  return (
    <div>
      {/* logjn */}
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <br/>
        <input type = "email" placeholder = "email" className = "form-control" onChange = {(e) => {setemail(e.target.value)}}/> 
        <br/>
        <input type = "password" placeholder = "password" className = "form-control" onChange = {(e) => {setpassword(e.target.value)}}/> 
        <br/>
        {
          errLogin ? <p className = "alert alert-danger">{errLogin}</p>  : null
        }

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Close
          </Button>
          <Button variant="primary" onClick={Loginin}>
          Login
          </Button>
        </Modal.Footer>
      </Modal>
      {/* login */}




      {/* Sign */}
      <Modal show={showSign} onHide={handleCloseSign}>
        <Modal.Header closeButton>
          <Modal.Title>Sign</Modal.Title>
        </Modal.Header>
        <br/>
        <input type = "text" placeholder = "username" className = "form-control" onChange = {(e) => {setusername(e.target.value)}}/> 
        <br/>
        <input type = "email" placeholder = "email" className = "form-control" onChange = {(e) => {setemail(e.target.value)}}/> 
        <br/>
        <input type = "password" placeholder = "password" className = "form-control" onChange = {(e) => {setpassword(e.target.value)}}/> 
        <br/>
        <input type = "password" placeholder = "verifiy password" className = "form-control" onChange = {(e) => {setpasswordverify(e.target.value)}}/> 
        <br/>
        {
          errSign ? <p className = "alert alert-danger">{errSign}</p>  : null
        }
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSign}>
            Close
          </Button>
          <Button variant="primary" onClick={Signin}>
            Sign
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Sign */}






    </div>
  )
}


export default  Modalauth