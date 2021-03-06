import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAll} from '../store'
import socket from '../socket'
import ShippingDetail from './shippingDetail'
import { Button, Header, Icon, Container, Card, Modal } from 'semantic-ui-react'

class Main extends Component {
    constructor() {
        super()
        this.pickRequest = this.pickRequest.bind(this)
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

    render() {
        const {shipment} = this.props
        return (
            <Container style={{margin: '5em'}}>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='users' circular />
                    <Header.Content>main component</Header.Content>
                    <br/>
                    <Link to='/shippingRequest'><Button primary>Shipping Request!</Button></Link>
                </Header>

                <Card.Group>
                    {shipment && shipment.shipments && shipment.shipments.map(item=>{
                        return (
                            <Card key={item.id}>
                                <Card.Content>
                                    <Card.Header>Shipment {item.id}</Card.Header>
                                    <Card.Meta>
                                        pick up at {item.pickupDate}<br/>
                                        delivery by {item.deliveryDate}
                                    </Card.Meta>
                                    <Card.Description>
                                        From: {item.pickup}<br/>
                                        To: {item.delivery}<br/>
                                        Dims: {item.item[0][0]} x {item.item[0][1]} x {item.item[0][2]}<br/>
                                        lbs: {item.item[0][3]}<br/>
                                        Pcs: {item.item.length}<br/>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui two buttons'>
                                        <Button color='green' onClick={()=>this.pickRequest(item.pickup, item.delivery)}>Pick</Button>
                                        <Modal trigger={<Button color='purple'>View Details</Button>}>
                                            <ShippingDetail address={item.pickup} delivery={item.delivery}/>
                                        </Modal>
                                    </div>
                                </Card.Content>
                            </Card>
                        )
                    })}
                </Card.Group>
            </Container>
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
