

import React, {useContext} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import {UserContext} from '../context/UserContext';
import {Row, Col} from 'react-bootstrap'


//import logo
import { BsPerson } from "react-icons/bs";
import { FiBook } from "react-icons/fi";
import {BiAddToQueue} from "react-icons/bi";
import {FiLogOut} from "react-icons/fi";

import elipse from './images/elipse.png';
import logo from './images/logos.png'

import Profile from '../pages/Profile/Profile';
import MyLibrary from '../pages/MyLibrary/MyLibrary';
import Details from '../pages/Details/Details';
import Addbook from '../pages/AddBooks/Addbook';
import Home from '../pages/Home/Home';

import './Style/style.css';



export default function NestingExample() {
const { id } = useParams();
  return (
      
    <Router>
      <div className="containers">

        <Switch>

        
        <Route exact path={`/member/books/:category`}>
                <Row>

                    <Col md={3}>
                        <Menus />
                    </Col>

                    <Col>
                        <Home/>
                    </Col>

                </Row>
          </Route>

          <Route exact path="/member/profile">
                <Row>

                    <Col md={3}>
                        <Menus />
                    </Col>

                    <Col>
                        <Profile/>
                    </Col>

                </Row>
          </Route>

          
          <Route exact path="/member/mylibrary">
                <Row>

                    <Col md={3}>
                        <Menus />
                    </Col>

                    <Col>
                        <MyLibrary/>
                    </Col>

                </Row>
          </Route>

          <Route exact path={`/member/detail/:id`}>
                <Row>
                    
                    <Col md={3}>
                        <Menus />
                        
                    </Col>

                    <Col>
                        <Details/>
                    </Col>

                </Row>
          </Route>

          <Route exact path={`/member/post`}>
                <Row>
                    
                    <Col md={3}>
                        <Menus />
                    </Col>

                    <Col>
                        <Addbook/>
                    </Col>

                </Row>
          </Route>

        </Switch>

      </div>
    </Router>

  );
}


function Menus() {

  const [state, dispatch] = useContext(UserContext);

  return (

    <div>

        <ul style={{ listStyleType: "none", padding: 0 }}>

            <div className="navigate" style={{display:'flex',flexDirection:'column'}}>

                <Link to={`/member/books/all`}>
                    <img width={150} className="logo" src={logo} alt="Logo"/>
                </Link>

                <img width={150} className="indentImage" style={{marginTop:30, marginLeft:10}} src={elipse} alt="Logo"/>
            <h3 style={{ fontSize:20, paddingTop:20}}>
                {state.user ? state.user.fullName : "" }
            </h3> 

            </div>

            <li style={{marginTop:30}}>
                <Link to="/member/profile" style={{textDecoration:'none'}}>
                    <div className="child-menus">
                        <BsPerson className="icon"/> 
                        <p>Profile</p>
                    </div>
                </Link>
            </li>

            <li>
                <Link to="/member/mylibrary" style={{textDecoration:'none'}}>
                    <div className="child-menus">
                        <FiBook className="icon"/> 
                        <p>My Library</p>
                    </div>
                </Link>
            </li>

            <li>

                <Link to="/member/post" style={{textDecoration:'none'}}>
                    <div className="child-menus">
                        <BiAddToQueue className="icon"/> 
                        <p>Add Book</p>
                    </div>
                </Link>

            </li>

            <li>
                <hr/>
            </li>

            <li>
                <Link className="linku" to="/"
                    onClick={() =>
                    dispatch({
                        type: "LOGOUT",
                    })
                    }>
                    <div className="child-menus">              
                        <FiLogOut className="icon"/> 
                        <p>Logout</p> 
                    </div>
                </Link>
            </li>
        </ul>
    </div>
  );
}



