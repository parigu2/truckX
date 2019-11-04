import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import ShippingForm from './shippingForm'
import {add} from '../store'
import socket from '../socket'

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

        await this.props.addShipment(this.state);
        alert("submitted!!")
        history.push("/")
        socket.emit("shipmentUpdate")
    }

    render() {
        return (
            <div>
                shipping request
                <ShippingForm textChange={this.textChange} handleSubmit={this.handleSubmit} value={this.state}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addShipment: shipment => dispatch(add(shipment))
    }
}

export default connect(null, mapDispatchToProps)(ShippingRequest)