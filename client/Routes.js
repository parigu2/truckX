import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTpyes from 'prop-types'
import {me} from './store'

import {Login, Signup, Main, ShippingRequest, ShippingDetail} from './components'

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
                <Route exact path='/' component={Main}/>
                <Route path='/shippingRequest' component={ShippingRequest}/>
                <Route path='/shippingDetail' component={ShippingDetail}/>
            </Switch>
        )
    }
}

const mapState = state => {
    return {
        isLoggedIn: !!state.auth.name,
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
