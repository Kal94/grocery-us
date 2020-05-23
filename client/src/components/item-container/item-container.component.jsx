import React from 'react';
import axios from 'axios';
import { Nav } from 'react-bootstrap';

import './item-container.styles.scss'

import ItemPreview from '../item-preview/item-preview.component';

class ItemContainer extends React.Component {

    constructor(){
        super();

        this.state = {
            items: [],
            filter: ''
        }
    }

    componentDidMount(){
        axios({
            url: 'items',
            method: 'GET'
        }).then(response => {
            this.setState({items: response.data})
        }).catch(error => {
            console.log(error)
        })

    }

    select = (eventKey) => {
        this.setState({ filter: eventKey })
        console.log(this.state.filter);
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-10 item-container">
                        <h1>{this.state.filter}</h1>
                        <Nav variant="pills" className="justify-content-center" defaultActiveKey="/home">
                            <Nav.Item>
                                <Nav.Link onSelect={this.select} eventKey='Fruit and Veg'>Fruit &amp; Veg</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onSelect={this.select} eventKey="Dairy">Dairy</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onSelect={this.select} eventKey="Drinks">Drinks</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onSelect={this.select} eventKey="Cereal">Cereal</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onSelect={this.select} eventKey="Frozen Food">Frozen Food</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <div className="row justify-content-between">
                            {
                                this.state.items
                                    .filter(item => item.category === this.state.filter)
                                    .map(item => 
                                        <ItemPreview key={item._id} item={item} />
                                    
                                )
                            }
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        )
    }
}

export default ItemContainer;