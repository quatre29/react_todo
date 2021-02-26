import React, {useContext} from 'react'
import {Context} from '../hoc/store'
import Task from './task.component'
import * as actions from '../reducer/actions'

import { makeStyles} from '@material-ui/core/styles'
import ButtonTodo from '../components/button.component'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const useStyles = makeStyles({
    root: {

    }
})

const TasksContainer = (props) => {
    const [task, setTask] = useContext(Context)
    const classes = useStyles();

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

    let tasksRender = null;
    if(task !== null) {
       tasksRender = <ul>
                {task.map(task => {
        return <li key={task.id} >
                    <Task
                        class={task.complete ? 'complete' : 'incomplete'}
                        clicked={() => completeTaskHandler(task.id)}
                        category={task.category.label}
                    > {task.value}</Task>
                    <ButtonTodo
                        color="secondary"
                        variant="contained"
                        icon={<DeleteForeverOutlinedIcon />}
                        clicked={() => deleteTaskHandler(task.id)}
                    />
                </li>
    })}
       </ul> 
    }
    return (
        <div className="tasks_container">
            {tasksRender}
        </div>
    )
}

export default TasksContainer;