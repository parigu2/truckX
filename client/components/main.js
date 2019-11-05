import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAll} from '../store'
import socket from '../socket'
import ShippingDetail from './shippingDetail'

class Main extends Component {
    constructor() {
        super()
        this.state = {
            switch: false
        }
        this.pickRequest = this.pickRequest.bind(this)
        this.onSwitch = this.onSwitch.bind(this)
    }

    async componentDidMount() {
        await this.props.getAllShipments();
        socket.on('updateReceive', async () => {
            await this.props.getAllShipments();
        })

        socket.on('pickupRequested', (pickup, delivery) => {
            alert("your shipment has been taken" + pickup + delivery)
        })
    }

    pickRequest(pickup, delivery) {
        alert('pick this shipment!!')
        socket.emit('pickupRequest', pickup, delivery)
    }

    onSwitch() {
        this.setState({
            switch: !this.state.switch
        })
    }

    render() {
        const {shipment} = this.props
        return (
            <div>
                <h2>main component</h2>
                <Link to='/shippingRequest'><button>Shipping Request!</button></Link>

                {shipment && shipment.shipments && shipment.shipments.map(item=>{
                    return (
                        <div key={item.pickup}>
                            {item.pickup}<br/>
                            {item.delivery}<br/>
                            {item.length, item.width, item.height}<br/>
                            {item.weight}<br/>
                            {item.numberOfPackage}<br/>
                            pick up at {item.pickupDate} delivery by {item.deliveryDate}<br/>
                            <button onClick={()=>this.pickRequest(item.pickup, item.delivery)}>Pick this shipment</button>
                            <button onClick={()=>this.onSwitch()}>view details</button>
                            {this.state.switch && <ShippingDetail address={item.pickup}/>}
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        shipment: state.shipment
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllShipments: () => dispatch(getAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)