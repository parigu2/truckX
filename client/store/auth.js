const initialState = {};

const LOG_IN = "LOG_IN";

const logIn = user => ({
    type: LOG_IN,
    user
})

export const auth = user => async dispatch => {
    try {
        dispatch(logIn(user))
    } catch (err) {
        console.error(err)
    }
}

export default function(state=initialState, action) {
    switch(action.type) {
        case LOG_IN:
            return action.user
        default:
            return state
    }
}