import React from 'react';
const InputLocation = (props) => {
    return ( 
        <input type='text'
        placeholder='Select starting position'
        name='start' 
        className='border-2 border-red-500'
        onChange={(e)=>{
            props.onChange(e);
        }}
        ref={props.ref}>
        </input>
     );
}
 
export default InputLocation;