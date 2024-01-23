import TaskInterface from '../interfaces/tasks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Task = ({
  task,
  markHasCompleted,
}: {
  task: TaskInterface;
  markHasCompleted: (taskId: number) => void;
}) => {
  return (
    <>
      <div className="task-header">
        <p className="task-id">#{task.id}</p>
        <h2 className="task-title">{task.title}</h2>
      </div>
      <p className="task-description">{task.description}</p>
      <p className="task-status">
        <label htmlFor={`status-${task.id}`} className="check">
          {<CheckCircleIcon />}
        </label>
        <input
          type="checkbox"
          name="status"
          id={`status-${task.id}`}
          className="checkbox-status"
          onChange={() => {
            markHasCompleted(task.id);
          }}
        />
      </p>
    </>
  );
};

export default Task;
