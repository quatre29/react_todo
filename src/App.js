import React from 'react'
import { Navigation, TasksContainer } from './components'
import Store from './hoc/store'

const App = () => {
  return (
    <div className="App">
      <Store>
        <Navigation />
        <TasksContainer />
      </Store>

    </div>
  );
}

export default App;
