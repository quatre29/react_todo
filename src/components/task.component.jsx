import React from 'react'

const Task = (props) => {
    return(
        <div className="task">
            {props.children}
        </div>
    );
}

export default Task;