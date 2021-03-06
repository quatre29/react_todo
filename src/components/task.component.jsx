import React from 'react'

const Task = (props) => {
    return(
        <div onClick={props.clicked} className={props.class}>
            <p>{props.category}</p>
            {props.children}
        </div>
    );
}

export default Task;