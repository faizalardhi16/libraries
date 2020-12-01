import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Left from './Left'
import Right from './Right'

export default function Landing() {
    return (
        <div>
            <Row>
                <Col md={6}>
                    <Left/>
                </Col>

                <Col md={6}>
                    <Right/>
                </Col>
            </Row>
        </div>
    )
}
