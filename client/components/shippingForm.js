import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const ShippingForm = props => {
    const {pickup, delivery, pickupDate, deliveryDate, length, width, height, weight, numberOfPackage} = props.value

    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Field>
                <label>Pick up from</label>
                <input type="text" name="pickup" placeholder="Pick up address" value={pickup} onChange={event => props.textChange(event)}/>
            </Form.Field>
            <Form.Field>
                <label>Delivery to</label>
                <input type="text" name="delivery" placeholder="Delivery address" value={delivery} onChange={event => props.textChange(event)}/>
            </Form.Field>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Pick up date</label>
                    <input type="date" name="pickupDate" value={pickupDate} onChange={event => props.textChange(event)}/>
                </Form.Field>
                <Form.Field>
                    <label>Expected Delivery date</label>
                    <input type="date" name="deliveryDate" value={deliveryDate} onChange={event => props.textChange(event)}/>
                </Form.Field>
            </Form.Group>
            <br/>
            <Form.Field>
                <label>Shipping Detail</label>
            </Form.Field>
            <Form.Group>
                <Form.Field width='2'>
                    <label>Length (in)</label>
                    <input type="number" name="length" value={length} onChange={event => props.textChange(event)}/>
                </Form.Field>
                <Form.Field width='2'>
                    <label>Width (in)</label>
                    <input type="number" name="width" value={width} onChange={event => props.textChange(event)}/>
                </Form.Field>
                <Form.Field width='2'>
                    <label>Height (in)</label>
                    <input type="number" name="height" value={height} onChange={event => props.textChange(event)}/>
                </Form.Field>
                <Form.Field>
                    <label>Weight (lbs)</label>
                    <input type="number" name="weight" value={weight} onChange={event => props.textChange(event)}/>
                </Form.Field>
                <Form.Field width='2'>
                    <label>No of Package</label>
                    <input type="number" name="numberOfPackage" value={numberOfPackage} onChange={event => props.textChange(event)}/>
                </Form.Field>
            </Form.Group>
            <br/>
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default ShippingForm