
import React, {useState, useEffect} from "react";
import {
    Col, 
    Row, Card,
    Dropdown} from 'react-bootstrap';

import { API } from '../../config/api';
import './style.css';

//import images
import FixYou from '../../components/images/fix.png';

//import database
import Data from '../../components/Assets/db.json';
import Cat from '../../components/Assets/dbcat.json';
import Detail from '../Details/Details';

import {
    BrowserRouter as Router,
    Switch,
    Route, useParams, Link
  } from "react-router-dom";


function Ngeroute(){
    return(
        <Router>
            <Switch>
                <Route exact path="/member/detail/:id">
                    <Detail/>
                </Route>

                <Route exact path="/member/books/:category">
                    <Home/>
                </Route>
            </Switch>
        </Router>


    )
}

export default function Home() {
    const { category } = useParams();

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cat, setCat] = useState([]);

    useEffect(() => {
        const loadBooks = async () =>{
            
            try {
                setLoading(true);
                const res = await API.get("/books");
                setBooks(res.data.data.book);
                setLoading(false);
                
            } catch (error) {
                setLoading(false);
                console.log(error)
            }

        }
        
        loadBooks();
    },[]);

    
    useEffect(() => {
        const loadCats = async () =>{
            
            try {
                setLoading(true);
                const res = await API.get("/categories");
                setCat(res.data.data.categories);
                setLoading(false);
                
            } catch (error) {
                setLoading(false);
                console.log(error)
            }

        }
        
        loadCats();
    },[]);

    console.log(cat);



    return (
        <div>
                <Row  className="jumbo">
                    
                    <Col className="homeJumbLeft">
                        <h1>Share, read and <span style={{fontStyle:'italic', fontFamily:'classic'}}>love</span></h1>
                            <p className="caption">
                                Reading is Facinating
                            </p>
                    </Col>

                    <Col className="jumboR" md={5}>
                        <span className="border1">{' '}</span>    
                        <span className="border1">{' '}</span>  
                        <span className="border1">{' '}</span>
                        <span className="border1">{' '}</span>   
                        <span className="border1">{' '}</span>   
                        <img className="imgfile" style={{position:'relative', right:-100}}width={250} src={FixYou} alt="Logo"/>
                    </Col>   

                </Row>   

                <div className="order">
                    <h1>List Book</h1>

                    <Dropdown>
                        <Dropdown.Toggle style={{background:'#dfe6e9',color:'black'}} id="dropdown-basic">
                            Category
                        </Dropdown.Toggle>

                        <Dropdown.Menu>

                            {cat.map((item)=>(
                                <div key={item.id}>
                                    <Dropdown.Item >
                                        <Link className="Links" to={`/member/books/${item.name}`}>
                                            {item.name}
                                        </Link>
                                    </Dropdown.Item>
                                </div>
                            ))}
                            
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="book-list">
                    <Row>   
                        
                    {books.map((item)=>(
                        <div key={item.id}>
                            {item.status == "Approve" ? 
                            "all" == category || item.category.name == category ?
                            (<Col sm={2}>
                                <Link className="Links" to={`/member/detail/${item.id}`}>
                                    <div className="card" style={{ width: '12.7rem' , border:'none'}} >
                                        <Card.Img variant="top"  style={{height:300}} src={`${item.images}`}/>
                                        <Card.Body>
                                            <Card.Title style={{
                                            fontStyle:'bold',
                                            fontFamily:'classic',
                                            textAlign:'center', 
                                            fontWeight:800}}>{item.title}</Card.Title>
                                            <Card.Text style={{position:'relative', color:'black'}}>
                                            <p style={{textAlign:'center'}} className="muted">{item.user.fullName}</p>
                                            </Card.Text>
                                        </Card.Body>
                                    </div>
                                </Link>

                            </Col>) : "" : ""}
                        </div>
                    ))}

                    <div id="warn"></div>

                        
                    </Row>


                </div>            
        </div>
    )
}
