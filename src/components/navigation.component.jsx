import React, {useState, useEffect, useReducer, useContext} from 'react'
import ButtonTodo from './button.component'
import Input from './input.component'
import {Context} from '../hoc/store'
import * as actions from '../reducer/actions'
import AccordionTodo from '../components/accordion.component'

import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

const Navigation = (props) => {
    const [inputTask, setInputTask] = useState()
    const [inputCat, setInputCat] = useState()

    const [formElements, setFormElements] = useState({
        task: {
            type: 'text',
            value: 'text',
            className: 'task-input'
        },
        categories: {
            type: 'select',
            value: 'select',
            className: 'categories-input',
            cat: [
                {value: 'money', displayValue: 'Money'},
                {value: 'health', displayValue: 'Health'},
                {value: 'daily', displayValue: 'Daily'},
                {value: 'food', displayValue: 'Food'}
            ]
 
            
        }
    })

    const [category, setCategory] = useState(
        {
        // value: formElements.categories.cat[0].value,
        // label: formElements.categories.cat[0].displayValue
        value: '',
        label: ''
    }
    );

    const [task, setTask] = useContext(Context);

    const [query, setQuery] = useState();
    const [queryCat, setQueryCat] = useState();

    

    useEffect(() => {
        const timeOut = setTimeout(() => setInputTask(query), 500);
        
        return () => clearTimeout(timeOut)
    }, [query])

    useEffect(() => {
        const timeOut = setTimeout(() => setInputCat(queryCat), 500)
        console.log(queryCat)
        return () => clearTimeout(timeOut)
    }, [queryCat])


    const categoryChangeHandler = (categoryValue) => {
        const upperCaseCat = categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1)
        setCategory({
            value: categoryValue,
            label: upperCaseCat
        });
    }

    const handleSubmit = (e) => {
        if(e.key === 'Enter') {
            if(inputTask === null || inputTask === '' || category.value === null) {
                alert('Please enter an input task or add a category!')
             } else {
                setTask({
                    type: actions.ADD_TODO,
                    value: inputTask,
                    category: category
                })
             }
        }
    }

    const buttonClickedHandler = (e) => {
        e.preventDefault();
        if(inputTask === '' || category.value === '') {
           alert('Please enter an input task or add a category!')
        } else {
           setTask({
            type: actions.ADD_TODO,
            value: inputTask,
            category: category
        })
        }
    }

    const buttonAddCategoryHandler = (e, valueInput) => {
        e.preventDefault()
        const newArray = [...formElements.categories.cat, {value: `${valueInput}`, displayValue: `${valueInput.charAt(0).toUpperCase() + valueInput.slice(1)}`}]
        setFormElements(prevState => {
            return({
                ...prevState,
                categories: {
                    ...prevState.categories,
                    cat: newArray
                }
            })

        })
    }

    const formElementsArray = [];
    for(let key in formElements) {
        formElementsArray.push({
            id: key,
            config: formElements[key]
        })
    }

    let form = (
        <form>
            {
            formElementsArray.map(formEl => {
                return <Input
                submit={handleSubmit} 
                key={formEl.id}
                type={formEl.config.type} 
                value={formEl.value} 
                change={
                    formEl.config.type === 'text' ?
                    (event) => setQuery(event.target.value) :
                    (event) => categoryChangeHandler(event.target.value)
                }
                categories={formEl.config.cat}
                className={formEl.config.className}
            />
            })}
        </form>
    )

    return(
        <div className="navigation-container">

            <AccordionTodo className="accordion-todo">
                <div className="create-task-container">
                    {form}
                    <ButtonTodo 
                        variant="contained"
                        color='primary'
                        icon={<AddOutlinedIcon />}
                        clicked={buttonClickedHandler} 
                        className="send">Add task
                    </ButtonTodo>
                </div>
            </AccordionTodo>

            <AccordionTodo className="accordion-todo">
                 <div className="create-category-container">
                    <Input 
                        type="text"
                        change={e => setQueryCat(e.target.value)}
                    />
                </div>
                <ButtonTodo 
                        variant="contained"
                        color='primary'
                        icon={<AddOutlinedIcon />}
                        clicked={e => buttonAddCategoryHandler(e, inputCat)} 
                        className="send">Create Category
                    </ButtonTodo>
            </AccordionTodo>

        </div>
    );
}

export default Navigation;