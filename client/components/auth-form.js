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
              placeholder='Username'
            />
            <Form.Input
              icon='lock'
              iconPosition='left'
              label='Password'
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

    // <div>
    //   <div className="ui placeholder segment">
    //     <div className="ui two column very relaxed stackable grid">
    //       <div className="column">
    //         <div id="error-message">
    //           {error &&
    //             error.response && (
    //               <div>
    //                 {' '}
    //                 {'*'}
    //                 {error.response.data}{' '}
    //               </div>
    //             )}
    //         </div>
    //         <div className="ui form">
    //           <form onSubmit={handleSubmit} name={name}>
    //             <div className="field">
    //               <label>Username</label>
    //               <div className="ui left icon input">
    //                 <input type="text" name="email" placeholder="Username" />
    //                 <i className="user icon" />
    //               </div>
    //             </div>
    //             <div className="field">
    //               <label>Password</label>
    //               <div className="ui left icon input">
    //                 <input type="password" name="password" />
    //                 <i className="lock icon" />
    //               </div>
    //             </div>
    //             <br />
    //             <button
    //               className="ui blue submit button"
    //               id="login-button"
    //               type="submit"
    //             >
    //               Login
    //             </button>
    //           </form>
    //         </div>
    //       </div>
    //       <div className="middle aligned column">
    //         <div className="auth-button">
    //           <a href="/auth/google">
    //             <button className="ui google plus button">
    //               <i className="google plus icon" />
    //               {displayName} with Google
    //             </button>
    //           </a>
    //         </div>
    //         <div className="auth-button">
    //           <a href="/auth/facebook">
    //             <button className="ui facebook button">
    //               <i className="facebook icon" />
    //               {displayName} with Facebook
    //             </button>
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="ui vertical divider">Or</div>
    //   </div>
    // </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

// const mapState = authProps => state => ({
//   user: state.user,
//   cart: state.cart,
//   ...authProps(state)
// })

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
