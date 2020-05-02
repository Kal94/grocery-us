import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

import './form-input.styles.scss'

const FormInput = ({ name, value, label, type, placeholder, controlId, ...inputProps }) => (
    <Form.Group as={Row} controlId={controlId}>
        <Form.Label column sm={2}>
        {label}
        </Form.Label>
        <Col sm={10}>
        <Form.Control name={name} type={type} placeholder={placeholder} {...inputProps} />
        </Col>
    </Form.Group>
)

export default FormInput;