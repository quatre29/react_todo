import React from 'react'
// import {Button} from 'antd'
import Button from '@material-ui/core/Button'

const ButtonTodo = (props) => {
    return(
        <Button
            variant="contained" 
            color="primary" 
            onClick={props.clicked}
            type="primary">{props.children}</Button>
    )
}
export default ButtonTodo;