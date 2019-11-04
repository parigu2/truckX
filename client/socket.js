import io from 'socket.io-client'

const socket = io(window.location.origin)

// import shipmentEvent from './components/shippingRequest'

socket.on('connect', () => {
    console.log('Connected!')
})

export default socket