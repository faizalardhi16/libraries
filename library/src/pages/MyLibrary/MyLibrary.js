import React, {useState, useContext, useEffect} from "react";



import { API } from '../../config/api';

import {
    Col, 
    Row, Card} from 'react-bootstrap';

    import {
        BrowserRouter as Router,
        Switch,
        Route, Link
      } from "react-router-dom";


import '../../components/Style/style.css';  

//import images



import Detail from '../Details/Details'


 function Detailing() {
    
    return (
        <Router>
            <Switch>

                <Route exact path="/member/detail/:id">
                    <Detail/>
                </Route>

                
                <Route exact path="/member/mylibrary">
                    <MyLibrary/>
                </Route>

            </Switch>
        </Router>
    )
}


  
export default function MyLibrary(){    

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
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

    console.log(books);

    return(
            <div>

            <div className="order">
                <h1 style={{
                textAlign:'left', 
                fontFamily:'classic',
                fontWeight:'bold'}} >
                    My Library
                </h1>
            </div>

            <div className="book-list">
                <Row>  

                {loading || !books ? (<h2>Loading..</h2>) : (
                books.map((item)=>
                    <div key={item.id}>
                        {item.status == "Approve" ? 
                        (<Col sm={2}>
                            <Link className="Links" style={{color:'black'}} to={`/member/detail/${item.id}`}>
                                <div className="card" style={{ width: '12.5rem' , border:'none'}} >
                                    <Card.Img className="imegs" variant="top" src={`${item.images}`}/>
                                    <Card.Body>
                                        <Card.Title style={{position:'relative', 
                                        left:-20, 
                                        fontStyle:'bold',
                                        fontFamily:'classic', 
                                        fontWeight:800}}>{item.title}</Card.Title>
                                        <Card.Text style={{position:'relative', left:-20, color:'black'}}>
                                        {item.user.fullName}
                                        </Card.Text>
                                    </Card.Body>
                                </div>
                            </Link>
                        </Col>) : ""}
                    </div>
                ))}

                </Row>
            </div>            
    </div>
    )
}





