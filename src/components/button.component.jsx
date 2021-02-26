import React from 'react'
// import {Button} from 'antd'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        border: 0,
        borderRadius: 5,
        color: 'white',
        padding: '10px 5px',
        alignItems: 'center'
    }
})


const ButtonTodo = (props) => {
    const classes = useStyles();

    return(
        <Button
            className={classes.root}
            startIcon={props.icon}
            variant={props.variant} 
            color={props.color} 
            onClick={props.clicked}
            type="primary"
        >{props.children}</Button>
    )
}
export default ButtonTodo;