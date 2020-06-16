import React from 'react';
import axios from 'axios';
import { Nav, Form, InputGroup } from 'react-bootstrap';

import './item-container.styles.scss'

import ItemPreview from '../item-preview/item-preview.component';

class ItemContainer extends React.Component {

    constructor(){
        super();

        this.state = {
            items: [],
            filter: '',
            search: ''
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
    }

    searchItems = event => {
        const { value } = event.target;
        this.setState({ search: value })
    }

    clearSearch = () => {
        this.setState({ search: '' })
    }

    render(){
        const { search } = this.state;
        const searchedArray = this.state.items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        console.log(searchedArray)
        return (
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-10 item-container">
                        <Nav variant="pills" className="justify-content-between" defaultActiveKey="/home">
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
                            <Form inline>
                                <InputGroup>
                                    <input type="text" class="form-control mr-sm-2" id="search" onChange={this.searchItems} placeholder="Search..." /> 
                                </InputGroup>
                            </Form>
                        </Nav>
                        { search ?
                            (<div className="mt-4"><h4>Search results for "{ search }"</h4></div>) :
                            false 
                        }
                        <div className="row justify-content-start items">
                            {

                                this.state.filter ? 
                                this.state.items.filter(item => item.category === this.state.filter).filter(item => item.name.toLowerCase().includes(search.toLowerCase())).map(item => <ItemPreview key={item._id} item={item} />) : 
                                searchedArray.length ? searchedArray.map(item => <ItemPreview key={item._id} item={item} />) : (<div className="no-results"><h6>No results found</h6></div>)
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