import React, {useState, useContext} from "react";

import {UserContext} from '../../../context/UserContext';
import {useHistory} from 'react-router-dom';
import {Form, Modal, Button} from 'react-bootstrap';
import '../Style/styleL.css';
import { API, setAuthToken } from '../../../config/api'

export default function SignIn() {
    let history = useHistory();
    const [state, dispatch] = useContext(UserContext);

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const { email, password } = formData;

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const config = {
        headers:{
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ email, password });

      try{
        const res = await API.post("/login", body, config);
        
        dispatch({
          type:"LOGIN_SUCCESS",
          payload: res.data.data,
        })

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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <button className="buts" onClick={handleShow}>
                Sign In
            </button>                              

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body> 

                    <Form onSubmit={(e) => handleSubmit(e)} >

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>

                            <Form.Control 
                            type="email" 
                            placeholder="Enter email"
                            name="email" 
                            value={email}
                            onChange={(e) => handleChange(e)}
                            />

                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                                        
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                                <Form.Control 
                                type="password" 
                                name="password"
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => handleChange(e)}
                                />
                        </Form.Group>

                        <Button type="submit" style={{width:'100%', 
                        background:'#ff4f00', 
                        outline:'none', 
                        border:'none'}}>       
                            Sign In         
                        </Button>                              
                               
                    </Form>

                </Modal.Body>
            </Modal>                                   
            
        </div>
    )
}

