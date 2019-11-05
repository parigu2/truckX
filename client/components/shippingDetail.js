import React, {Component} from 'react'
import ReactMapGL, {GeolocateControl, NavigationControl, Marker} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import DeckGL, {GeoJsonLayer} from 'deck.gl'
import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import axios from 'axios'

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
}

export default class ShippingDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewport: {
                latitude: 41.88,
                longitude: -87.63,
                zoom: 12,
                bearing: 0,
                pitch: 0,
                width: '80vw',
                height: '80vh',
            }
        }
    }
    async componentDidMount() {
        const address = this.addressEditor(this.props.address)
        const location = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=address&access_token=pk.eyJ1IjoicGFyaWd1MiIsImEiOiJjamtrNG96NHcxbmNoM3hxaGJwd2cyeWk5In0.C85GPiyv8CD06EhjheZxtQ`)
        const viewport = {
            latitude: location.data.features[0].center[1],
            longitude: location.data.features[0].center[0],
            zoom: 16,
            bearing: 0,
            pitch: 0,
            width: '80vw',
            height: '80vh',
        }
        this.setState({
            viewport
        })
    }

    addressEditor(address) {
        let updated = ""
        for (let i = 0; i < address.length; i++) {
            if (address[i] === " ") {
                updated += "%20"
            } else if (address[i] === ",") {
                updated += "%2C"
            } else {
                updated += address[i]
            }
        }
        return updated
    }


    mapRef = React.createRef()

    handleViewportChange = viewport => {
        this.setState({
            viewport: {...this.state.viewport, ...viewport}
        })
    }

    handleGeocoderViewportChange = viewport => {
        const geocoderDefaultOverrides = {transitionDuration: 1000}
        return this.handleViewportChange({
            ...viewport, ...geocoderDefaultOverrides
        })
    }

    handleOnResult = event => {
        this.setState({
            searchResultLayer: new GeoJsonLayer({
                id: "search-result",
                data: event.result.geometry,
                getFillColor: [255, 0, 0, 128],
                getRadius: 1000,
                pointRadiusMinPixels: 10,
                pointRadiusMaxPixels: 10
            })
        })
    }

    render() {
        const {viewport} = this.state
        return (
            <div>
                <ReactMapGL
                    ref={this.mapRef}
                    {...viewport}
                    onViewportChange={this.handleViewportChange}
                    mapboxApiAccessToken="pk.eyJ1IjoicGFyaWd1MiIsImEiOiJjamtrNG96NHcxbmNoM3hxaGJwd2cyeWk5In0.C85GPiyv8CD06EhjheZxtQ"
                    mapStyle='mapbox://styles/mapbox/streets-v10'
                >
                    <Marker latitude={viewport.latitude} longitude={viewport.longitude}>Pick up</Marker>
                    <Geocoder 
                        mapRef={this.mapRef} 
                        mapboxApiAccessToken="pk.eyJ1IjoicGFyaWd1MiIsImEiOiJjamtrNG96NHcxbmNoM3hxaGJwd2cyeWk5In0.C85GPiyv8CD06EhjheZxtQ" 
                        position="top-right"
                        onResult={this.handleOnResult}
                        onViewportChange={this.handleGeocoderViewportChange}
                    />
                    {/* <GeolocateControl/> */}
                    <div className="nav" style={navStyle}>
                        <NavigationControl/>
                    </div>
                </ReactMapGL>
                {/* <MapGL
                    ref={this.mapRef}
                    {...viewport}
                    mapboxApiAccessToken="pk.eyJ1IjoicGFyaWd1MiIsImEiOiJjamtrNG96NHcxbmNoM3hxaGJwd2cyeWk5In0.C85GPiyv8CD06EhjheZxtQ"
                    mapStyle='mapbox://styles/mapbox/streets-v10'
                    // onViewportChange={this.handleViewportChange}
                >
                    <div className="nav" style={navStyle}>
                        <NavigationControl/>
                    </div> */}
                    {/* <GeolocateControl
                        style={geolocateStyle}
                        positionOptions={{enableHighAccuracy: true}}
                        trackUserLocation={true}
                    /> */}
                {/* </MapGL> */}
            </div>
        )
    }
}
