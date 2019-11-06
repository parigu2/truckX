import React, {Component} from 'react'
import ReactMapGL, {GeolocateControl, NavigationControl, Marker} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import DeckGL, {GeoJsonLayer} from 'deck.gl'
import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import CityPin from './cityPin'

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
}

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
});

const direction = new MapboxDirections({
    accessToken: "pk.eyJ1IjoicGFyaWd1MiIsImEiOiJjamtrNG96NHcxbmNoM3hxaGJwd2cyeWk5In0.C85GPiyv8CD06EhjheZxtQ"
})

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
            },
            pickup: {
                latitude: 0,
                longitude: 0
            },
            delivery: {
                latitude: 0,
                longitude: 0
            },
            route: {
                distance: 0,
                time: 0,
            }
        }
        this.updateGeocoderProximity = this.updateGeocoderProximity.bind(this);
    }

    async componentDidMount() {
        // this.map = new mapboxgl.Map({
        //     container: this.mapContainer,
        //     style: 'mapbox://styles/mapbox/streets-v10',
        //     center: [-87.63, 41.88],
        //     zoom: 12
        // })

        // this.map.addControl(direction, 'top-left')

        // //Search nearby first
        // this.map.on('load', this.updateGeocoderProximity); // set proximity on map load
        // this.map.on('moveend', this.updateGeocoderProximity); // and then update proximity each time the map moves

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
        const pickup = {
            latitude: location.data.features[0].center[1],
            longitude: location.data.features[0].center[0]            
        }
        const goingTo = this.addressEditor(this.props.delivery)
        const destination = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${goingTo}.json?types=address&access_token=pk.eyJ1IjoicGFyaWd1MiIsImEiOiJjamtrNG96NHcxbmNoM3hxaGJwd2cyeWk5In0.C85GPiyv8CD06EhjheZxtQ`)
        const delivery = {
            latitude: destination.data.features[0].center[1],
            longitude: destination.data.features[0].center[0]   
        }

        const routeEst = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickup.longitude},${pickup.latitude};${delivery.longitude},${delivery.latitude}.json?access_token=pk.eyJ1IjoicGFyaWd1MiIsImEiOiJjamtrNG96NHcxbmNoM3hxaGJwd2cyeWk5In0.C85GPiyv8CD06EhjheZxtQ`)
        const route = {
            distance: routeEst.data.routes[0].distance,
            time: routeEst.data.routes[0].duration
        }

        this.setState({
            viewport,
            pickup,
            delivery,
            route
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

    updateGeocoderProximity() {
        // proximity is designed for local scale, if the user is looking at the whole world,
        // it doesn't make sense to factor in the arbitrary centre of the map
        if (this.map.getZoom() > 20) {
            var center = this.map.getCenter().wrap(); // ensures the longitude falls within -180 to 180 as the Geocoding API doesn't accept values outside this range
            geocoder.setProximity({ longitude: center.lng, latitude: center.lat });
        } else {
            geocoder.setProximity(null);
        }
    }

    render() {
        const {viewport, pickup, delivery, route} = this.state
        return (
            <div>
                <ReactMapGL
                    ref={this.mapRef}
                    {...viewport}
                    onViewportChange={this.handleViewportChange}
                    mapboxApiAccessToken="pk.eyJ1IjoicGFyaWd1MiIsImEiOiJjamtrNG96NHcxbmNoM3hxaGJwd2cyeWk5In0.C85GPiyv8CD06EhjheZxtQ"
                    mapStyle='mapbox://styles/mapbox/streets-v10'
                >
                    <Marker latitude={pickup.latitude} longitude={pickup.longitude}><CityPin/></Marker>
                    <Marker latitude={delivery.latitude} longitude={delivery.longitude}><CityPin/></Marker>
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
                <p>distance: {Math.floor(route.distance/1610)} miles / time: {Math.floor(route.time/60)} min</p>
                {/* <div style={{width: '600px', height: '500px'}} ref={el => this.mapContainer = el}/> */}
            </div>
        )
    }
}
