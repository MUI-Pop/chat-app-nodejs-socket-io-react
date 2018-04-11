import React from 'react';

const Label = (props) => {

    return (
        <label
            className="label" 
        >{props.children}
        </label>
    )

}

export default Label;