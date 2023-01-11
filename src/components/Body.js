import { Button, Input } from '@mui/material';
import React, { useRef } from 'react'
import { useState } from 'react'
import InputLocation from './BodyComponents/InputLocation';
import { GoogleMap, useLoadScript, Marker, DirectionsService, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getlatlng } from 'use-places-autocomplete'
const Body = () => {
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
    const [Duration, setDuration] = useState();
    const [Distance, setDistance] = useState();
    const [DirectionResponse, setDirectionResponse] = useState();

    const OriginRef = useRef(null);
    const DestinationRef = useRef(null);

    const [stops, setStops] = useState([]);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAolXVBph__8LXk-JukgnxDUI4LPDQAsxQ',
        libraries: ["places"]
    });
    const [map, setMap] = useState(null);
    const google = window.google = window.google ? window.google : {}

    const handleOrigin = (e)=>{
        setOrigin(e.target.value)
    }

    async function CalculateRoute() {
        if( OriginRef.current=='' || DestinationRef.current=='')
        {
            return
        }
        console.log(OriginRef.current.value)
        console.log(origin)
        const directionsService= new google.maps.DirectionsService();
        const result = await directionsService.route({
            origin:OriginRef.current,
            destination:DestinationRef.current,
            travelMode:google.maps.TravelMode.DRIVING
        })
        setDirectionResponse(result)
        setDistance(result.routes[0].legs[0].distance.text)
        setDuration(result.routes[0].legs[0].duration.text)
    }

    if(!isLoaded) return( <div></div>)
    return (
        <div className='bg-neutral-100 py-3 w-full'>
            <div className='flex flex-row-reverse flex-wrap w-11/12 mx-auto'>
                <p className='w-full text-center text-blue-800 p-3 text-l'>Let's calculate distance from Google Maps</p>
                <div className='h-[45.83vw] w-1/2 bg-yellow-100'>
                    {isLoaded ?
                        <GoogleMap zoom={15} center={{ lat: 22.6, lng: 77.2 }} mapContainerClassName='h-full w-full' mapContainerStyle={{ width: '100%', height: '100%' }}
                            options={{ zoomControl: false, streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
                            onLoad={(map) => { setMap(map) }}>
                            <Marker position={{ lat: 22.6, lng: 77.2 }} />
                        </GoogleMap>
                        : <div className="w-full h-full bg-black"></div>}
                </div>
                <div className='w-1/2'>
                    <div className='flex w-full'>
                        <div>
                            <p>Origin </p>
                            <Autocomplete>
                            <Input type='text' placeholder='Origin' ref={OriginRef} Autocomplete={true} />
                            </Autocomplete>

                            {/* {stops.map(stop => {
                                    return (<p>{stop}</p>);
                                })}
                            <Button onClick={() => {
                                setStops(stops.concat('stop 1'))
                            }}>Click me to add stops</Button> */}
                            <p>Stop </p>
                            <Autocomplete>
                                <Input type='text' placeholder='Stop'  />
                            </Autocomplete>
                            <p>Destination </p>
                            <Autocomplete>
                            <Input type='text' placeholder='Destination' ref={DestinationRef} Autocomplete={true}/>
                            </Autocomplete>
                        </div>
                        <div className='m-auto'>
                            <div className='bg-blue-800 rounded-full '>
                                <Button
                                onClick={CalculateRoute}>Calculate</Button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex flex-row p-6 bg-white'>
                            <p className='text-xl'>Distance</p>
                            <p className='text-xl ml-auto text-blue-600'>{Distance}</p>
                        </div>
                        <p className='text-base'>The distance between mumbai and delhi is 10 seconds via anywhere door</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;