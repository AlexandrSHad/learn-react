import React, { useCallback, useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttpRequest from './hooks/use-http-request';
import urls from './config/urls';

function App() {
  const [ getTasks, isLoading, error ] = useHttpRequest();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(() => {
    getTasks({ url: urls.tasks }, (tasksData) => {
      const mappedTasks = [];
      for (const taskKey in tasksData) {
        mappedTasks.push({ id: taskKey, text: tasksData[taskKey].text });
      }

      setTasks(mappedTasks);
    });
  }, [getTasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
