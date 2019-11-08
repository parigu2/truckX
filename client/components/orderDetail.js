import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {get} from '../store'
import ShippingDetail from './shippingDetail'
import { Button, Card, Container, Icon, Header, Modal } from 'semantic-ui-react'

class OrderDetail extends Component {
  constructor() {
    super()
    this.pickRequest = this.pickRequest.bind(this)
  }
  async componentDidMount() {
    await this.props.getShipment(this.props.match.params.id)
  }

  pickRequest(pickup, delivery) {
    alert('pick this shipment!!')
    socket.emit('pickupRequest', pickup, delivery)
  }

  render() {
    const {shipment} = this.props.shipment

    return (
      <Container style={{margin: '5em'}}>
        {
          shipment &&
          <div>
            <Header as='h2' icon textAlign='center'>
              <Icon name='file alternate outline' circular />
              <Header.Content>Order {shipment.id}</Header.Content>
              <Header.Content>Status {shipment.status}</Header.Content>
            </Header>

            <Card>
              <Card.Content>
                <Card.Meta>
                  pick up at {shipment.pickupDate}<br/>
                  delivery by {shipment.deliveryDate}
                </Card.Meta>
                <Card.Description>
                  From: {shipment.pickup}<br/>
                  To: {shipment.delivery}<br/>
                  Dims: {shipment.item[0][0]} x {shipment.item[0][1]} x {shipment.item[0][2]}<br/>
                  lbs: {shipment.item[0][3]}<br/>
                  Pcs: {shipment.item.length}<br/>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button color='green' onClick={()=>this.pickRequest(shipment.pickup, shipment.delivery)}>Pick</Button>
                  <Modal trigger={<Button color='purple'>View Details</Button>}>
                      <ShippingDetail address={shipment.pickup} delivery={shipment.delivery}/>
                  </Modal>
                </div>
              </Card.Content>
          </Card>
          </div>
        }
        <Link to='/orders'><Button>List</Button></Link>
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
      getShipment: id => dispatch(get(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
