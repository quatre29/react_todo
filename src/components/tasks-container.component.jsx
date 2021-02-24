import React, {useContext} from 'react'
import {Context} from '../hoc/store'
import Task from './task.component'
import * as actions from '../reducer/actions'

const TasksContainer = (props) => {
    const [task, setTask] = useContext(Context)

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
        return <li key={task.id} ><Task
                    class={task.complete ? 'complete' : 'incomplete'}
                    clicked={() => completeTaskHandler(task.id)}
                    category={task.category.label}
                > {task.value}</Task><span onClick={() => deleteTaskHandler(task.id)}>CLOSE</span></li>
    })}
       </ul> 
    }
    return (
        <div>
            {tasksRender}
        </div>
    )
}

export default TasksContainer;