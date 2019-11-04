import React, {Component} from 'react'
import MapGL, {GeolocateControl} from 'react-map-gl'

const geolocateStyle = {
    float: 'left',
    margin: '50px',
    padding: '10px'
}

export default class ShippingDetail extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <MapGL
                    width="100%"
                    height={900}
                    latitute={0}
                    longitude={0}
                    zoom={2}
                    mapboxApiAccessToken="pk.eyJ1IjoicGFyaWd1MiIsImEiOiJjamtrNG96NHcxbmNoM3hxaGJwd2cyeWk5In0.C85GPiyv8CD06EhjheZxtQ"
                    mapStyle='mapbox://styles/mapbox/dark-v9'

                >
                    <GeolocateControl
                        style={geolocateStyle}
                        positionOptions={{enableHighAccuracy: true}}
                        trackUserLocation={true}
                    />
                </MapGL>
            </div>
        )
    }
}
