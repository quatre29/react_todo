import React, {useState, useEffect, useReducer} from 'react'
import ButtonTodo from './button.component'
import Input from './input.component'
import Task from './task.component'
import todoReducer from '../reducer/reducer'
import * as actions from '../reducer/actions'

const Navigation = (props) => {
    const [inputTask, setInputTask] = useState()

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

    const [category, setCategory] = useState({
        value: formElements.categories.cat[0].value,
        label: formElements.categories.cat[0].displayValue
    });

    const [task, setTask] = useReducer(todoReducer, [])

    const [query, setQuery] = useState();


    

    useEffect(() => {
        const timeOut = setTimeout(() => setInputTask(query), 500);
        console.log(query)
        return () => clearTimeout(timeOut)
    }, [query, category])


    const categoryChangeHandler = (category) => {
        const upperCaseCat = category.charAt(0).toUpperCase() + category.slice(1)
        setCategory({
            value: category,
            label: upperCaseCat
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const buttonClickedHandler = () => {
        setTask({
            type: actions.ADD_TODO,
            value: inputTask,
            category: category
        })
    }

    const deleteTaskHandler = (id) => {
        setTask({
            type: actions.REMOVE_TODO,
            id: id
        })
    }

    const completeTaskHandler = (id) => {
       const completeTask =  task.find(taskItem => taskItem.id === id)
       setTask({
           type: actions.COMPLETE_TODO,
           id: id,
           complete: completeTask.complete
       })
       console.log(completeTask)
    }

    const formElementsArray = [];
    for(let key in formElements) {
        formElementsArray.push({
            id: key,
            config: formElements[key]
        })
    }

    let form = (
        <form onSubmit={handleSubmit}>
            {
            formElementsArray.map(formEl => {
                return <Input 
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

    let tasksRender = null;
    if(task !== null) {
       tasksRender = <ul>
                {task.map(task => {
        return <li key={task.id} ><Task 
                    clicked={() => completeTaskHandler(task.id)}
                    category={task.category.label}
                > {task.value}</Task><span onClick={() => deleteTaskHandler(task.id)}>CLOSE</span></li>
    })}
       </ul> 
    }

    return(
        <div className="navigation-container">
            <ButtonTodo className="add-todo">Add todo</ButtonTodo>
            {form}
            <ButtonTodo clicked={buttonClickedHandler} className="send">Add task</ButtonTodo>
            {tasksRender}
            
        </div>
    );
}

export default Navigation;