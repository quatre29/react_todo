import React, {useState, useEffect} from 'react'
import useStateRef from 'react-usestateref'
import ButtonTodo from './button.component'
import Input from './input.component'
import Task from './task.component'

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

    const [task, setTask, ref] = useStateRef([])

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
        setTask(prevState => {
          return [
              ...prevState,
              {
                  value: inputTask,
                  id: Math.random() * 6,
                  category: category,
                  complete: false
              }
          ]
        })
    }

    const deleteTaskHandler = (id) => {
        const newTasks = task.filter(taskItem => {
            return taskItem.id !== id
        } )
        setTask(newTasks)
    }

    const completeTaskHandler = (id) => {
       const completeTask =  task.find(taskItem => taskItem.id === id)
       console.log(completeTask)
       console.log(id)
        // setTask(prevState => {
        //     return [
        //         ...prevState,
        //         {
        //             ...prevState.
        //         }
        //     ]
        // })
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

    let tasks = null;
    if(task !== null) {
       tasks = <ul>
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
            {tasks}
            
        </div>
    );
}

export default Navigation;