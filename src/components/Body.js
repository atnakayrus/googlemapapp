import { Button } from '@mui/material';
import React from 'react'
import { useState } from 'react'
import InputLocation from './BodyComponents/InputLocation';
const Body = () => {
    const [origin,setOrigin]=useState();
    const [destination,setDestination]=useState();
    const [stops,setStops]=useState([]);

    return (
        <div className='bg-neutral-100 py-3 w-full'>
            <div className='flex flex-row-reverse flex-wrap w-11/12 mx-auto'>
                <p className='w-full text-center text-blue-800 p-3 text-l'>Let's calculate distance from Google Maps</p>
                <div className='h-[45.83vw] w-1/2 bg-yellow-100'>

                </div>
                <div className='w-1/2'>
                    <div className='flex w-full'>
                        <div>
                            <p>Origin</p>
                            <InputLocation />
                            {
                            stops.map(stop=>{
                                return(<p>{stop}</p>);
                            })}
                            <Button onClick={()=>{
                                setStops(stops.concat('stop 1'))
                            }}>Click me to add stops</Button>
                            <p>Stops</p>
                            <InputLocation />
                            <p>Destinations</p>
                            <InputLocation />
                        </div>
                        <div className='m-auto'>
                            <div className='bg-blue-800 rounded-full '>
                                <Button>Calculate</Button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex flex-row p-6 bg-white'>
                            <p className='text-xl'>Distance</p>
                            <p className='text-xl ml-auto text-blue-600'>1406 Km</p>
                        </div>
                        <p className='text-base'>The distance between mumbai and delhi is 10 seconds via anywhere door</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;