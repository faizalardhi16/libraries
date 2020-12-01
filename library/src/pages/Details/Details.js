import React, {useState, useEffect} from 'react'
import { API } from '../../config/api';
import {
    Col, 
    Row,Modal} from 'react-bootstrap';

import './style.css';
import { useParams} from 'react-router-dom'

import {BsBookmark} from 'react-icons/bs'
import {RiArrowRightSLine} from 'react-icons/ri';




function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>

        <Modal.Body>
          <p style={{padding:20, color:'green'}}>
          Your book has been added successfully
          </p>
        </Modal.Body>

      </Modal>
    );
}

export default function Detail() {
    const [modalShow, setModalShow] = React.useState(false);
    let { id } = useParams();

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

    return (
        <div>
            <div className="detil">
                <Row>
                    <Col sm={5}>
                    {books.map((item)=>(
                        <div key={item.id}>
                            {item.id == id ? <img className="img" width={400} src={`${item.images}`} alt="gambar" /> : ""}
                        </div>
                    ))}
                    </Col>
    
                    <Col sm={7} style={{textAlign:'justify'}}>
                            {books.map((item)=>(
                            <div key={item.id}>
                                
                                {item.id == id ? 
                                <ul className="list-order" style={{listStyleType:'none'}}>
                                    
                                    <li>
                                        <h1 style={{fontWeight:800, fontStyle:'bold', textAlign:'left', fontFamily:'classic', fontSize:50}}>{item.title}</h1>
                                        <span className="muted" >{item.penulis}</span>
                                    </li>

                                    <li>
                                        <h4 style={{fontWeight:700, fontStyle:'bold'}}>Publication Date</h4>
                                        <span className="muted" >{item.publication}</span>
                                    </li>

                                    <li>
                                        <h4 style={{fontWeight:700, fontStyle:'bold'}}>Category</h4>
                                        <span className="muted" >{item.category.name}</span>
                                    </li>

                                    <li>
                                        <h4 style={{fontWeight:700, fontStyle:'bold'}}>Pages</h4>
                                        <span className="muted" >{item.pages}</span>
                                    </li>

                                    <li>
                                        <h4 style={{fontWeight:700, fontStyle:'bold', color:'#EE4622'}}>ISBN</h4>
                                        <span className="muted" >{item.isbn}</span>
                                    </li>
                                    
                                </ul>
                                : ""}
                            </div> 
                            ))}    
                    </Col>
                </Row>
            </div>
 
            <div className="main">
                <h1>About This Book</h1>
                {books.map((item)=>
                    <div key={item.id}>
                        {item.id == id ? item.about : "" }
                    </div>
                )}
                
            </div>

            <div className="button">
                
                <button className="btnL" onClick={()=>setModalShow(true)}>
                    Add Library <BsBookmark style={{fontSize:20}}/>
                </button>

                
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />

                <a href="/member/read">
                    <button className="btnR">
                        Read Book <RiArrowRightSLine style={{fontSize:20}}/>
                    </button>
                </a>


            </div>
        </div>
    )
}
