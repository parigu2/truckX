import axios from 'axios'

const initialState = {
    shipments: []
};

const GET_ALL_SHIPMENTS = 'GET_ALL_SHIPMENTS'
const GET_SHIPMENT = 'GET_SHIPMENT'
const ADD_SHIPMENT = 'ADD_SHIPMENT'
const EDIT_SHIPMENT = 'EDIT_SHIPMENT'
const REMOVE_SHIPMENT = 'REMOVE_SHIPMENT'

const getAllShipments = shipments => ({type: GET_ALL_SHIPMENTS, shipments})
const getShipment = shipment => ({type: GET_SHIPMENT, shipment})
const addShipment = shipment => ({type: ADD_SHIPMENT, shipment})
const editShipment = shipment => ({type: EDIT_SHIPMENT, shipment})

const removeShipment = id => ({type: REMOVE_SHIPMENT, id})

export const getAll = () => async dispatch => {
    try {
        const res = await axios.get('/api/orders')
        dispatch(getAllShipments(res.data))
    } catch (err) {
        console.error(err)
    }
}

export const get = id => async dispatch => {
    try {
        const res = await axios.get(`/api/orders/${id}`)
        dispatch(getShipment(res.data))
    } catch(err) {
        console.error(err)
    }
}

export const add = shipment => async dispatch => {
    try {
        const res = await axios.post('/api/orders', shipment)
        dispatch(addShipment(res.data))
    } catch (err) {
        console.error(err)
    }
}

export const edit = shipment => async dispatch => {
    try {
        const res = await axios.put(`/api/orders/${shipment.id}`, shipment)
        dispatch(editShipment(res.data))
    } catch(err) {
        console.error(err)
    }
}

export const remove = id => async dispatch => {
    try {
        await axios.delete(`/api/orders/${id}`)
        dispatch(removeShipment(id))
    } catch(err) {
        console.error(err)
    }
}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_ALL_SHIPMENTS:
            return {...state, shipments: action.shipments}
        case GET_SHIPMENT:
            return {...state, shipment: action.shipment}
        case ADD_SHIPMENT:
            return {...state, shipments: [...state.shipments, action.shipment]}
        case EDIT_SHIPMENT:
            return {...state, shipments: [...state.shipments].map(shipment=>{
                shipment.id === action.shipment.id ? action.shipment : shipment
            }).sort((a,b)=>{a.id-b.id})}
        case REMOVE_SHIPMENT:
            return {...state, shipments: [...state.shipments].filter(shipment=>{
                return shipment.id !== Number(action.id)
            })}
        default:
            return state
    }
}
