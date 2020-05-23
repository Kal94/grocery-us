import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import CustomButton from '../../components/custom-button/custom-button.component';

import './delivery.styles.scss';

const DeliveryPage = () => {

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    
    const dateArrayFunc = () => {
        const dateArray = []
        for (var i = 0; i < 10; i++){
            const cmoment = moment().add(i, 'days');
            const current = cmoment.format('dddd, MMMM Do YYYY')
            dateArray.push(current)
        }
        return dateArray
    }

    const handleDate = event => {
        setDate(event.target.value)
    }

    const handleTime = event => {
        setTime(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(event)
    }

    return (
        
        <div className="container">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 delivery-page">
                    <h2 className="delivery-slot">Delivery Slot</h2>
                    <Form className="date-picker" onSubmit={handleSubmit}>
                        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                            <div className="mt-1">
                                <Form.Label>Select date</Form.Label>
                                <Form.Control as="select" onChange={handleDate} size="sm" custom required>
                                    <option defaultValue>Select date...</option>
                                    {
                                        dateArrayFunc().map((value, index) => 
                                            <option key={index}>{value}</option>
                                        )
                                    }
                                </Form.Control>
                            </div>
                            <div className="mt-3">
                                <Form.Label>Select time</Form.Label>
                                <Form.Control as="select" onChange={handleTime} size="sm" custom required>
                                    <option defaultValue>Select time...</option>
                                    <option value="9">9am - 12pm (£5.99)</option>
                                    <option value="12">12pm - 3pm (£6.99)</option>
                                    <option value="15">3pm - 6pm (£4.99)</option>
                                </Form.Control>
                            </div>
                        </Form.Group>
                        <Link to={{
                                    pathname: "/checkout",
                                    state:  {
                                        date: date,
                                        time: time
                                    }
                                }}  className="row justify-content-end register-button"><CustomButton isLogin>Checkout
                                </CustomButton></Link>
                    </Form>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    )
}

export default DeliveryPage;