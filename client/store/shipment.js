import axios from 'axios'

const initialState = {
    shipments: []
};

const GET_ALL_SHIPMENTS = 'GET_ALL_SHIPMENTS'
const ADD_SHIPMENT = 'ADD_SHIPMENT'

const getAllShipments = () => ({type: GET_ALL_SHIPMENTS})
const addShipment = shipment => ({type: ADD_SHIPMENT, shipment})

export const getAll = () => async dispatch => {
    try {
        dispatch(getAllShipments())
    } catch (err) {
        console.error(err)
    }
}

export const add = shipment => async dispatch => {
    try {
        dispatch(addShipment(shipment))
    } catch (err) {
        console.error(err)
    }
}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_ALL_SHIPMENTS:
            return state
        case ADD_SHIPMENT:
            return {...state, shipments: [...state.shipments, action.shipment]}
        default:
            return state
    }
}