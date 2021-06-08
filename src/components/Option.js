import React from 'react';

const Option = (props) => (
    <div className="option">
        <p className="option__text">{props.count}. {props.optionText}</p>
        <button 
            className="button button--link"
            onClick={(e) => {
                props.handleDeleteOption(props.optionText);
            }}
            // we can not call handleDeleteOption(props.optionText) becaue here we need to catch the e coming from event.
        >
            remove
        </button>
    </div>
);

export default Option;