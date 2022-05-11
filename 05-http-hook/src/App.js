import React, { useCallback, useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttpRequest from './hooks/use-http-request';
import urls from './config/urls';

const mapTasks = (tasks) => {
  const mappedTasks = [];
  for (const taskKey in tasks) {
    mappedTasks.push({ id: taskKey, text: tasks[taskKey].text });
  }
  return mappedTasks;
};

function App() {
  const [ getTasks, isLoading, error ] = useHttpRequest(urls.tasks, 'GET', mapTasks);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    setTasks(await getTasks());
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
