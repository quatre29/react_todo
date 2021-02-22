import React from 'react'
import {Button} from 'antd'

const ButtonTodo = (props) => {
    return(
        <Button onClick={props.clicked}type="primary">{props.children}</Button>
    )
}
export default ButtonTodo;