import React from 'react'

const ShippingForm = props => {
    const {pickup, delivery, pickupDate, deliveryDate, length, width, height, weight, numberOfPackage} = props.value

    return (
        <form onSubmit={props.handleSubmit}>
            <label>Pick up from</label>
            <input type="text" name="pickup" value={pickup} onChange={event => props.textChange(event)}/>

            <label>Delivery to</label>
            <input type="text" name="delivery" value={delivery} onChange={event => props.textChange(event)}/><br/>

            <label>Pick up date</label>
            <input type="date" name="pickupDate" value={pickupDate} onChange={event => props.textChange(event)}/><br/>

            <label>Expected Delivery date</label>
            <input type="date" name="deliveryDate" value={deliveryDate} onChange={event => props.textChange(event)}/><br/>

            <label>Shipping Detail</label>
            <label>Length</label>
            <input type="number" name="length" value={length} onChange={event => props.textChange(event)}/>
            <label>Width</label>
            <input type="number" name="width" value={width} onChange={event => props.textChange(event)}/>
            <label>Height</label>
            <input type="number" name="height" value={height} onChange={event => props.textChange(event)}/>
            <label>Weight</label>
            <input type="number" name="weight" value={weight} onChange={event => props.textChange(event)}/>
            <label>No of Package</label>
            <input type="number" name="numberOfPackage" value={numberOfPackage} onChange={event => props.textChange(event)}/><br/>

            <input type="submit"/>
        </form>
    )
}

export default ShippingForm