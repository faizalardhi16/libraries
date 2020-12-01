import React from "react";


//import images
import Logos from '../../components/images/logos.png';


//import css
import './Style/styleL.css';

//import component System
import SignIn from './Button/SignIn';
import SignUp from './Button/SignUp';

//import component
import {Col, Row} from 'react-bootstrap';

function Landing() {

    return(
      <div >

        <Row className="contener">
            <Col>

            <img src={Logos} width={150} className="logoz" alt="Gambar"/>
            <h1 className="heading" style={{textAlign:'left', fontFamily:'classic', fontWeight:'bold'}}><span style={{fontStyle:"italic", fontFamily:'classic', fontWeight:'bold'}}>Your</span> Library <br/>
                Anywhere
            </h1>

            <p style={{textAlign:'justify', fontSize:25, width:400}}>
                Sign-UP today and receive unlimited access to all 
                of your reading - share your book
            </p>

            <Row>
                <Col md={6}>
                    <SignUp/>
                </Col>

                <Col md={6}>
                    <SignIn/>
                </Col>
                
            </Row>

            </Col>

            <Col>

            </Col>
        </Row>
        
      </div>
      
      
    );
}

export default Landing;

