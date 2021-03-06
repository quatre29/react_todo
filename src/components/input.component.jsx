import React, {useState} from 'react'
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
  }));

const Input = (props) => {
    const classes = useStyles();

    let inputElement = null;
    switch(props.type) {
        case ('text'):      
            inputElement = <TextField 
                                label="Add taks"
                                id="standard-basic"
                                onKeyPress={props.submit}
                                className={props.className}
                                type={props.type}
                                value={props.value}
                                onChange={props.change}
                            />
        break;
        case ('select'):
        //     inputElement =  <select 
        //     selected={props.selected}
        //     className={props.className}
        //     type={props.type}
        //     value={props.value}
        //     onChange={props.change} 
        // >
        //     {
        //         props.categories.map(option => (
        //             <option key={option.value} value={option.value}>
        //              {option.displayValue} 

        //              </option>
        //         ))
        //     }

        // </select>
                 
                inputElement = <FormControl className={classes.formControl}>
                                     <InputLabel id="demo-simple-select-helper-label">Categories</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={props.value}
                                    onChange={props.change}
                                    
                                    // className={classes.selectEmpty}
                                    >
                                    {/* <option aria-label="None" value="" />
                                    <option value={10}>Ten</option>
                                    <option value={20}>Twenty</option>
                                    <option value={30}>Thirty</option> */}
                                     {
                                        props.categories.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.displayValue} 
            
                                            </MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl>
            
 
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