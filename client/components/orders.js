import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getAll} from '../store'
import socket from '../socket'
import { Container, Icon, Header, Card, Menu, Table } from 'semantic-ui-react'

class Orders extends Component {
  constructor() {
    super()
    this.state = {
      filtered: '',
      activeItem: 'All'
    }
    this.orderFilter = this.orderFilter.bind(this)
    this.pickOrder = this.pickOrder.bind(this)
  }

  async componentDidMount() {
    await this.props.getAllShipments();
    // socket.on('updateReceive', async () => {
    //   await this.props.getAllShipments();
    // })

    // socket.on('pickupRequested', (pickup, delivery) => {
    //   alert("your shipment has been taken" + pickup + delivery)
    // })
  }

  orderFilter(event) {
    const word = event.target.name
    var filterWord = ''
    if (word === 'pending') {
      filterWord = 'pending'
    } else if (word === 'processing') {
      filterWord = 'processing'
    } else if (word === 'done') {
      filterWord = 'done'
    } else if (word === 'cancel') {
      filterWord = 'cancel'
    }
    this.setState({
      filtered: filterWord
    })
  }

  handleItemClick = (e, {name}) =>
    name === 'All'
      ? this.setState({
          activeItem: name,
          filtered: ''
        })
      : this.setState({
          activeItem: name,
          filtered: name
        })

  pickOrder = id => {
    this.props.history.push(`/orders/${id}`)
  }

  render() {
    const {activeItem, filtered} = this.state
    let color = filtered === 'processing' ? 'green' : filtered === 'pending' ? 'yellow' : filtered === 'done' ? 'purple' : filtered === 'cancel' ? 'red' : 'black'
    let icon = filtered === 'processing' ? 'truck' : filtered === 'pending' ? 'hourglass' : filtered === 'done' ? 'calendar check outline' : filtered === 'cancel' ? 'dont' : 'unordered list'
    return (
      <Container style={{margin: '5em'}}>
        <Header as='h2' icon textAlign='center'>
          <Icon name={icon} color={color} circular />
          <Header.Content>Order List</Header.Content><br/>
        </Header>

        <Menu tabular>
          <Menu.Item
            name="All"
            active={activeItem === 'All'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="pending"
            active={activeItem === 'pending'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="processing"
            active={activeItem === 'processing'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="done"
            active={activeItem === 'done'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="cancel"
            active={activeItem === 'cancel'}
            onClick={this.handleItemClick}
          />
        </Menu>

        {/* <Header as='h2'>
          <Icon color={color} name={icon} />
          <Header.Content>{activeItem[0].toUpperCase()}{activeItem.slice(1)}</Header.Content>
        </Header> */}
        <Card.Group>
          <Card link fluid color={color}>
            {this.props.shipment.shipments[0] ? (
              this.props.shipment.shipments.map(order => {
                if (
                  order.status === filtered || !filtered
                ) {
                  return (
                    <Card.Content key={order.id} onClick={()=>this.pickOrder(order.id)}>
                      <Card.Header>
                        {order.pickup}
                      </Card.Header>
                      <Card.Meta>
                        {order.pickupDate}
                      </Card.Meta>
                      <Card.Description>
                        {order.item[0][0]} x {order.item[0][1]} x {order.item[0][2]} / {order.item[0][3]}
                      </Card.Description>
                    </Card.Content>
                  )
                }
              })
            ) : (
              <h2>None of orders at this time</h2>
            )}
          </Card>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders))
