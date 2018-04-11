import React from 'react';

const InputBox = (props) => {

    return (
        <input
            type={props.type}
            className="login-input" 
            placeholder={props.placeholder}
            required={props.required}
            value={props.value}
            onChange={props.onChange}
        />
    )
}

export default InputBox;