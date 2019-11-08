import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTpyes from 'prop-types'
import {me} from './store'

import {Login, Signup, Main, ShippingRequest, ShippingDetail, Orders, OrderDetail} from './components'

class Routes extends Component {
    componentDidMount() {
        this.props.loadInitialData();
    }

    render() {
        const {isLoggedIn, isAdmin} = this.props

        return (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                {
                    isLoggedIn && (
                        <Switch>
                            <Route exact path='/' component={Main}/>
                            <Route path='/shippingRequest' component={ShippingRequest}/>
                            <Route path='/shippingDetail' component={ShippingDetail}/>
                            <Route exact path='/orders' component={Orders} />
                            <Route path='/orders/:id' component={OrderDetail} />
                            <Route component={Main}/>
                        </Switch>
                    )
                }
                <Route component={Login}/>
            </Switch>
        )
    }
}

const mapState = state => {
    return {
        isLoggedIn: !!state.auth.email,
        isAdmin: !!state.auth.isAdmin
    }
}

const mapDispatch = dispatch => {
    return {
        loadInitialData() {
            dispatch(me())
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
    loadInitialData: PropTpyes.func.isRequired,
    isLoggedIn: PropTpyes.bool.isRequired,
    isAdmin: PropTpyes.bool.isRequired
}
