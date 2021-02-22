import React, {useState} from 'react'

const Input = (props) => {
    let inputElement = null;
    switch(props.type) {
        case ('text'):
            inputElement = <input 
                                className={props.className}
                                type={props.type}
                                value={props.value}
                                onChange={props.change}
                            />
        break;
        case ('select'):
            inputElement = <select 
                                selected={props.selected}
                                className={props.className}
                                type={props.type}
                                value={props.value}
                                onChange={props.change}
                            >
                                {
                                    props.categories.map(option => (
                                        <option key={option.value} value={option.value}>
                                         {option.displayValue} 
          
                                         </option>
                                    ))
                                }
                    
                            </select>
        break;
        default:
            <input 
                className={props.className}
                type={props.type}
                value={props.value}
                onChange={props.change}
            />
    }

    return(
        <div>
            <label>{props.label}</label>
            {inputElement}
        </div>
        
    );
}

export default Input;