import React, {useState, useEffect} from "react";
import {API} from '../../config/api';

import { AiFillCloseCircle } from "react-icons/ai";


import {Row, Col, Navbar, Nav, NavDropdown, Form, FormControl, Modal,
    Table, Button, Container} from 'react-bootstrap'


import {Link} from 'react-router-dom'
import {MdVerifiedUser} from 'react-icons/md'
import logo from '../../components/images/logos.png'


import 'reactjs-popup/dist/index.css';


export default function Admin() {
    
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

    console.log(books)

    return (
    <div>
        <Container>
            
            <Navbar  expand="lg">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#home"><img width={150} src={logo} alt="logo"/></Nav.Link>
                    <Nav.Link href="#link"></Nav.Link>
                    </Nav>
                    <NavDropdown title="Menu" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1"><Link to="/admin/addbook">
                        Add Book
                        </Link></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            <Link to="/">Back To Home</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>

            <Table style={{marginTop:100, textAlign:'center'}} striped  hover>
            <thead>
                <tr>
                <th>No</th>
                <th>Nama</th>
                <th>ISBN</th>
                <th>Ebook</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {books.map((item, index)=>(
                    
                        <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.user.fullName}</td>
                                <td>{item.isbn}</td>
                                <td>{item.title}</td>
                                <td>{item.status}</td>
                                <td>{
                                item.status == "Cancel" ? <AiFillCloseCircle style={{fontSize:30, color:'#c0392b'}}/> : 
                                item.status == "Approve" ? <MdVerifiedUser style={{ fontSize:30, color:'green'}}/> : "Not Approve" || 
                                item.status == "Waiting To Approval" ? 
                                <Row style={{width:170}}>
                                    <Col sm={6}>
                                        <Button variant="danger">Cancel</Button>
                                    </Col>
                                    <Col sm={6}>
                                        <App/>
                                    </Col>
                                </Row> : "Verif"
                            }</td>
                        </tr>
                    
                ))}
            </tbody>
            </Table>
        </Container>
        
        </div>
    )
}


function Example(props) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <p>
            Your Book Has Been Approved
          </p>
        </Modal.Body>
      </Modal>
    );
  }
  
  function App() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button variant="success" onClick={() => setModalShow(true)}>
          Approve
        </Button>
  
        <Example
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
