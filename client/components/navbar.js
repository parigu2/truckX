import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { Menu } from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Menu>
      <Menu.Item>
        <h1>TruckX</h1>
      </Menu.Item>
      {isLoggedIn ? (
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
      ): (
        <Menu.Item>
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
      {isLoggedIn &&
        <Menu.Item>
          <Link to="/orders">Order</Link>
        </Menu.Item>
      }
      {isLoggedIn ? (
        <Menu.Item>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </Menu.Item>
      ):(
        <Menu.Item>
          <Link to="/signup">Sign Up</Link>
        </Menu.Item>
      )}
    </Menu>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
