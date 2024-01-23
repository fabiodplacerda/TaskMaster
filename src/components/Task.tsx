import TaskInterface from '../interfaces/tasks';

const Task = ({ task }: { task: TaskInterface }) => {
  return (
    <>
      <h2>{task.title}</h2>
      <p>{task.id}</p>
      <p>{task.completed ? 'Completed' : 'Incomplete'}</p>
    </>
  );
};

export default Task;
