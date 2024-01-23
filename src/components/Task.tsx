import TaskInterface from '../interfaces/tasks';

const Task = ({ task }: { task: TaskInterface }) => {
  return (
    <>
      <div className="task-header">
        <p className="task-id">#{task.id}</p>
        <h2 className="task-title">{task.title}</h2>
      </div>
      <p className="task-description">{task.description}</p>
      <p className="task-status">
        {task.completed ? 'Completed' : 'Incomplete'}
      </p>
    </>
  );
};

export default Task;
