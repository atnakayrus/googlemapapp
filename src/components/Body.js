import { Button, duration, Input } from '@mui/material';
import React, { useRef } from 'react'
import { useState } from 'react'
import { GoogleMap, useLoadScript, Marker, DirectionsService, useJsApiLoader , DirectionsRenderer } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getlatlng } from 'use-places-autocomplete'
import LocationAutocomplete from './BodyComponents/LocationAutocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';

const Body = () => {
    const lib=["places"];
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
    const [Duration, setDuration] = useState();
    const [Distance, setDistance] = useState();
    const [DirectionResponse, setDirectionResponse] = useState();
    const [stops, setStops] = useState([]);
    const [stop, setStop] = useState();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAolXVBph__8LXk-JukgnxDUI4LPDQAsxQ',
        libraries: lib
    });
    const [map, setMap] = useState(null);
    const google = window.google = window.google ? window.google : {}

    async function AddStop() {
        if (stop === '')
        return
        setStops(stops.concat({location:stop,stopover:true}))
        console.log(stops)
    }

    const mToKm=(val)=>{
        let x=Math.round(val/1000)
        return(x+' km')
    }

    const sToH=(val)=>{
        let h=Math.round(val/3600)
        let m=Math.round((val%3600)/60)
        return (h+' Hours and '+m+" minutes")
    }

    const resetStops=() => {
        setStops([])
    }

    async function CalculateRoute() {
        if (origin === '' || destination === '') {
            return
        }
        const directionsService = new google.maps.DirectionsService();
        const originll = await llByAddress(origin)
        const destll = await llByAddress(destination)
        const result = await directionsService.route({
            origin: originll,
            destination: destll,
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints:stops
        })
        console.log(result)
        setDirectionResponse(result)
        let dist=0
        let dura=0
        for(let i =0 ; i< result.routes[0].legs.length;i++)
        {
            dist+=result.routes[0].legs[i].distance.value
            dura+=result.routes[0].legs[i].duration.value
        }
        setDistance(mToKm(dist))
        setDuration(sToH(dura))
    }

    const llByAddress = async value => {
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0]);
        return(ll);
    }

    if (!isLoaded) return (<div></div>)
    return (
        <div className='bg-neutral-100 py-3 w-full'>
            <div className='flex flex-row-reverse flex-wrap w-11/12 mx-auto'>
                <p className='hidden lg:inline items-center w-full text-center text-blue-800 p-3 text-xl'>Let's calculate distance from Google Maps</p>
                <div className='h-[100vw] lg:h-[90vh] lg:w-1/2 bg-yellow-100 w-full'>
                    {isLoaded ?
                        <GoogleMap zoom={5} center={{ lat: 22.6, lng: 77.2 }} mapContainerClassName='h-full w-full' mapContainerStyle={{ width: '100%', height: '100%' }}
                            options={{ zoomControl: false, streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
                            onLoad={(map) => { setMap(map) }}>
                            {DirectionResponse &&
                            <DirectionsRenderer directions={DirectionResponse}></DirectionsRenderer>}
                        </GoogleMap>
                        : <div className="w-full h-full bg-black"></div>}
                </div>
                <div className='lg:w-1/2 h-auto flex-col flex p-10 w-full'>
                    <div className='flex w-full lg:flex-row flex-col'>
                        <div>
                            <p>Origin</p>
                            <div className='mr-auto'>
                                <LocationAutocomplete label='Origin' setLocation={setOrigin}></LocationAutocomplete>
                            </div>
                            <p>Stop </p>
                            {stops ? stops.map(stop=>{
                                return(
                                    <div className='py-1 px-3 m-1 rounded-full bg-gray-300'>{stop.location}</div>
                                )
                            }):<div>No Stops</div>}
                            <div className='mr-auto'>
                                <LocationAutocomplete label='Stop' setLocation={setStop}></LocationAutocomplete>
                                <Button onClick={resetStops}>x Reset Stops</Button>
                                <Button onClick={AddStop}>+ Add this stop</Button>
                            </div>
                            <p>Destination </p>
                            <div className='mr-auto'>
                                <LocationAutocomplete label='Destination' setLocation={setDestination}></LocationAutocomplete>
                            </div>
                        </div>
                        <div className='m-auto'>
                            <div className='bg-blue-800 rounded-full '>
                                <Button
                                    onClick={()=>CalculateRoute()}><p className='text-white text-l p-1'>Calculate</p></Button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full mt-auto mb-10'>
                        <div className='flex flex-row p-6 bg-white'>
                            <p className='text-xl'>Distance</p>
                            <p className='text-xl font-bold ml-auto text-blue-600'>{Distance}</p>
                        </div>
                        {DirectionResponse && <p className='text-base'>The distance between <span className='font-bold'>{origin}</span> and <span className='font-bold'>{destination}</span> is <span className='font-bold'>{Duration}</span></p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;