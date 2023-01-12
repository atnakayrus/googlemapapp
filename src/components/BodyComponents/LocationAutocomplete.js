import { Input } from '@mui/material';
import React, { useRef, useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getlatlng } from 'use-places-autocomplete'
import {TextField,Autocomplete} from '@mui/material';

const LocationAutocomplete = (props) => {
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete();
    

    const PlaceList=(data)=>{
        let list=[]
        for ( let i=0;i<data.length;i++)
        {
            list.push(data[i].description)
        }
        return(list)
    }

    return (
        <div>
            <div>
                <Autocomplete
                    options={status ? PlaceList(data) : []}
                    value={value}
                    className='p-2 xs:w-[300px] w-[200px]'
                    onSelect={e => {
                        setValue(e.target.value)
                        props.setLocation(e.target.value)
                    }}
                    renderInput={(params) =>
                        <TextField {...params} label={props.label} variant="outlined" />}
                />
            </div>
        </div>
    );
}

export default LocationAutocomplete;