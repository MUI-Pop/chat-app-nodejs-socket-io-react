import React from 'react';

const TextArea = (props) => {

    return (
        <textarea
            className="login-text-area" 
            value={props.value}
            onChange={props.onChange}
        />
    )
}

export default InputBox;