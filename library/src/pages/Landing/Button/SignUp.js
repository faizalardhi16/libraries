import React, {useState, useContext} from "react";
import {Button, Modal, Form} from 'react-bootstrap';
import '../Style/styleL.css';
import {UserContext} from '../../../context/UserContext';
import { API, setAuthToken } from '../../../config/api';
import {
  useHistory
} from "react-router-dom";


export default function SignUp() {

    let history = useHistory();
    const [state, dispatch] = useContext(UserContext);
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        fullName:"",  
        email: "",
        password: "",
        phone:"",
        address:"",
        gender:"-"
    });

    const { fullName, email, password, phone, address, gender } = formData;

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if(fullName != "" && gender != "-" && email != "" && password != "" && phone !="" && address != ""){
        console.log(formData);
        handleClose();
        setFormData("");
      }

      const config = {
        headers:{
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ fullName, email, password, gender, phone, address, isadmin:false });

      try{
        const res = await API.post("/register", body, config);
        
        dispatch({
          type:"REGISTER_SUCCESS",
          payload: res.data.data,
        })

        console.log("SINI")

        setAuthToken(res.data.data.token);

        try {
          const res = await API.get('/auth')
          
          dispatch({
            type: "USER_LOADED",
            payload: res.data.data.users,
          })
          history.push("/member/books/all");
        } catch (error) {
          dispatch({
            type:"AUTH_ERROR",
          })
          alert('user tidak terdaftar')
        }

      }catch(error){
        dispatch({
          type:"LOGIN_FAILED",
        })
      }
    };
      
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <>
                <button className="buts1" style={{background:'#ff4f00', 
                    border:'none', 
                    width:200, 
                    height:50}} onClick={handleShow}>
                        Sign Up
                </button>

                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={(e)=>handleSubmit(e)}>

                        <Form.Group controlId="formBasicText">
                            <Form.Control type="text" placeholder="Full Name" name="fullName"
                            value={fullName}
                            onChange={(e)=>handleChange(e)}
                            />
                            <div id="warn"></div>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" name="email"
                            value={email}
                            onChange={(e)=>handleChange(e)}
                            />
                            <div id="warn1"></div>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Control as="select" name="gender" value={gender} onChange={(e)=>handleChange(e)}>
                            <option disabled>Pilih Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" name="password"
                            value={password}
                            onChange={(e)=>handleChange(e)}
                            />
                            <div id="warn2"></div>
                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                            <Form.Control type="text" placeholder="Phone" name="phone"
                            value={phone}
                            onChange={(e)=>handleChange(e)}
                            />
                            <div id="warn4"></div>
                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                            <Form.Control type="Text" placeholder="Address" name="address"
                            value={address}
                            onChange={(e)=>handleChange(e)}
                            />
                            <div id="warn5"></div>
                        </Form.Group>

                        <Button style={{width:'100%', background:'#ff4f00', outline:'none', border:'none'}}  type="submit">
                            Sign Up
                        </Button>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <p style={{width:'100%', textAlign:'center'}}>Already Have an Account ? <a style={{color:'black'}} href="#">Click Here</a></p>
                </Modal.Footer>
                </Modal>
        </>
    );
}
