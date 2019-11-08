import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import ShippingForm from './shippingForm'
import {add} from '../store'
import socket from '../socket'
import { Container, Header, Icon } from 'semantic-ui-react'

class ShippingRequest extends Component {
    constructor() {
        super()
        this.state = {
            pickup: "",
            delivery: "",
            pickupDate: "",
            deliveryDate: "",
            length: 0,
            width: 0,
            height: 0,
            weight: 0,
            numberOfPackage: 0,
        }
        this.textChange = this.textChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    textChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault()
        const newShipment = {
            pickup: this.state.pickup,
            delivery: this.state.delivery,
            pickupDate: this.state.pickupDate,
            deliveryDate: this.state.deliveryDate,
            item: [[Number(this.state.length), Number(this.state.width), Number(this.state.height), Number(this.state.weight)]]
            // item: `{${this.state.length},${this.state.width},${this.state.height},${this.state.weight}}`
        }
        await this.props.addShipment(newShipment);
        alert("submitted!!")
        history.push("/")
        socket.emit("shipmentUpdate")
    }

    render() {
        return (
            <Container style={{margin: '5em'}}>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='shipping' circular />
                    <Header.Content>shipping request</Header.Content>
                </Header>
                <ShippingForm textChange={this.textChange} handleSubmit={this.handleSubmit} value={this.state}/>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addShipment: shipment => dispatch(add(shipment))
    }
}

export default connect(null, mapDispatchToProps)(ShippingRequest)
