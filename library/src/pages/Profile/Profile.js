import React, {useContext, useEffect, useState} from 'react';
import {
    Col, 
    Row, Button, Card} from 'react-bootstrap';

import { API } from '../../config/api';
//import css
import '../../components/Style/style.css';

//import images
import Geo from '../../components/images/geo.png';
import MyBook from '../../components/images/mb.png';
import {UserContext} from '../../context/UserContext';

//import icon
import {MdEmail} from 'react-icons/md';
import {FaTransgender} from 'react-icons/fa';
import {HiPhone} from 'react-icons/hi';
import {ImLocation} from 'react-icons/im';

export default function Profile() {
    
    const [ state, dispatch ] = useContext(UserContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadBooks = async () =>{
            
            try {
                setLoading(true);
                const res = await API.get(`/books`);
                setBooks(res.data.data.book);
                setLoading(false);
                
            } catch (error) {
                setLoading(false);
                console.log(error)
            }

        }
        
        loadBooks();
    },[]);

    console.log(books);


    const deleteThis = async () =>{
        try {
            const res = await API.delete(`/books/${id}`);
            
            const filrerBooks = books.filter((book)=> book.id != id);
            setBooks(filterBooks);
        } catch (error) {
            console.log(err);
        }
    }


    return (
        <div>

            <div className="jumbotrons">
                <Row  style={{opacity:1}}>
                        <Col md={6}>
                            <Row style={{marginBottom:10}}>
                                <Col sm={2} style={{marginRight:-15}} >
                                    <MdEmail style={{fontSize:50, color:'#8A8C90'}}/>
                                </Col>

                                <Col sm={10} style={{textAlign:'justify', fontSize:20}}>
                                    <p style={{marginBottom:-2, color:'#2d3436',fontStyle:'bold'}}>{state.user ? state.user.email : "" }</p>
                                    <p style={{color:'#8A8C90'}}>Email</p>
                                </Col>
                            </Row>
                            
                            <Row style={{marginBottom:10}}>
                                <Col sm={2} style={{marginRight:-15}} >
                                    <FaTransgender style={{fontSize:50, color:'#8A8C90'}}/>
                                </Col>

                                <Col sm={10} style={{textAlign:'justify', fontSize:20}}>
                                    <p style={{marginBottom:-2, fontStyle:'bold'}}>{state.user ? state.user.gender : "" }</p>
                                    <p style={{color:'#8A8C90'}}>Gender</p>
                                </Col>
                            </Row>

                            <Row style={{marginBottom:10}}>
                                <Col sm={2} style={{marginRight:-15}} >
                                    <HiPhone style={{fontSize:50, color:'#8A8C90'}}/>
                                </Col>

                                <Col sm={10} style={{textAlign:'justify', fontSize:20}}>
                                    <p style={{marginBottom:-2, fontStyle:'bold'}}>{state.user ? state.user.phone : "" }</p>
                                    <p style={{color:'#8A8C90'}}>Mobile Phone</p>
                                </Col>
                            </Row>

                            <Row style={{marginBottom:10}}>
                                <Col sm={2} style={{marginRight:-15}} >
                                    <ImLocation style={{fontSize:50, color:'#8A8C90'}}/>
                                </Col>

                                <Col sm={10} style={{textAlign:'left', fontSize:20}}>
                                    <p style={{marginBottom:-2, fontStyle:'bold'}}>{state.user ? state.user.address : "" }</p>
                                    <p style={{color:'#8A8C90'}}>Address</p>
                                </Col>
                            </Row>
                        </Col>

                        <Col style={{paddingLeft:150}}>
                            <img  width={250} src={Geo} alt="Logo"/>
                            <br/>
                            <Button style={{marginTop:20, 
                                background:'#ff4f00', 
                                border:'none',
                                paddingLeft:50,
                                paddingRight:50,
                                paddingTop:20,
                                paddingBottom:20}}>Chage Photo Profile</Button>
                        </Col>   

                </Row> 
            </div>
  

            <div className="order">
                <h1 style={{textAlign:'left'}}>List Book</h1>
            </div>

            <div className="maBook">
                <Row >
                {books.map((item)=> item.user.id === state.user.id && item.status === "Approve" ?
                    <Col sm={3} className="isi" style={{display:'flex', flexDirection:'row',marginBottom:50, marginTop:50}}>
                        <div className="card" style={{ width: '18rem' , border:'none', textAlign:"left"}} >
                            <Card.Img variant="top" src={`${item.images}`}/>
                            <Card.Body>
                                <Card.Title style={{fontWeight:'bold', 
                                position:'relative', 
                                left:-20,
                                fontSize:20}}>{item.title}</Card.Title>
                                <Card.Text style={{position:'relative', left:-20, color:'black'}}>
                                {item.user.fullName}
                                </Card.Text>
                                
                            </Card.Body>
                        </div>
                    </Col>  : item.user.id === state.user.id && item.status === "Waiting For Approval" ? 
                    (
                        <Col sm={3} className="isi" style={{opacity:'0.5', display:'flex', flexDirection:'row',marginBottom:50, marginTop:50}}>
                            <div className="card" style={{ width: '18rem' , border:'none', textAlign:"left"}} >
                                <Card.Img variant="top" src={`${item.images}`}/>
                                <Card.Body>
                                    <Card.Title style={{fontWeight:'bold', 
                                    position:'relative', 
                                    left:-20,
                                    fontSize:20}}>{item.title}</Card.Title>
                                    <Card.Text style={{position:'relative', left:-20, color:'black'}}>
                                    {item.user.fullName}
                                    </Card.Text>
                                </Card.Body>
                            </div>
                        </Col>
                    ) : ""
                )}
                

                </Row>
                
            </div>          
        </div>
    )
}
