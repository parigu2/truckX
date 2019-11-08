import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import store, {auth} from '../store'
import { Button, Divider, Form, Grid, Segment, Icon, Message } from 'semantic-ui-react'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Segment placeholder raised style={{margin: '2em'}}>
      <Grid columns={2} relaxed='very' stackable textAlign='center'>
        <Grid.Column>
          <Form onSubmit={handleSubmit} name={name}>
            <Form.Input
              icon='user'
              iconPosition='left'
              label='Username'
              name='email'
              placeholder='Username'
            />
            <Form.Input
              icon='lock'
              iconPosition='left'
              label='Password'
              name='password'
              type='password'
            />

            <Button content={displayName} primary />
            {error && error.response && <div> {error.response.data} </div>}
          </Form>
        </Grid.Column>

        <Grid.Column verticalAlign='middle'>
          <Message>
            <Message.Header>{displayName} with</Message.Header>
          </Message>
          <Button.Group>
            <Button color='google plus' size='huge'><Icon name='google plus' /> Google</Button>
            <Button.Or />
            <Button color='facebook' size='huge'><Icon name='facebook' />  Facebook</Button>
          </Button.Group>
        </Grid.Column>
      </Grid>

      <Divider vertical>Or</Divider>
    </Segment>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    async handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      await dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
