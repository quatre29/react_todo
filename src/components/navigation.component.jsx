import React, {useState, useEffect} from 'react'
import ButtonTodo from './button.component'
import Input from './input.component'
import Task from './task.component'

const Navigation = (props) => {
    const [inputTask, setInputTask] = useState('')
    const [category, setCategory] = useState();

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
                {value: 'daily', displayValue: 'Daily'}
            ]
 
            
        }
    })
    const [task, setTask] = useState([])

    const [query, setQuery] = useState();

    // useEffect(() => {
    //     setTask(inputTask)
    // }, [inputTask])

    useEffect(() => {
        const timeOut = setTimeout(() => setInputTask(query), 500);
        console.log(query)
        return () => clearTimeout(timeOut)
    }, [query])

    const categoryChangeHandler = (category) => {
        setCategory(category);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const buttonClickedHandler = () => {
        setTask(prevState => {
          return [
              ...prevState,
              inputTask
          ]
        })
        console.log(task)
        console.log(category)

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

    return(
        <div className="navigation-container">
            <ButtonTodo className="add-todo">Add todo</ButtonTodo>
            {form}

            

            <ButtonTodo clicked={buttonClickedHandler} className="send">Add task</ButtonTodo>
            
        </div>
    );
}

export default Navigation;