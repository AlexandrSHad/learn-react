import useHttpRequest from '../../hooks/use-http-request';
import urls from '../../config/urls';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const [ postTask, isLoading, error ] = useHttpRequest(urls.tasks, 'POST');

  const enterTaskHandler = async (taskText) => {
    var response = await postTask( JSON.stringify({ text: taskText }) );

    const generatedId = response.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
