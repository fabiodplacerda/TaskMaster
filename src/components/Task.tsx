import TaskInterface from '../interfaces/tasks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SelectedTask from '../interfaces/selected';

const Task = ({
  task,
  markHasCompleted,
  selected,
  setSelected,
}: {
  task: TaskInterface;
  markHasCompleted: (taskId: number) => void;
  selected: SelectedTask;
  setSelected: React.Dispatch<React.SetStateAction<SelectedTask>>;
}) => {
  const taskSelection = (task: SelectedTask) => {
    if (task.id === selected.id) {
      setSelected({});
    } else {
      setSelected(task);
    }
  };

  return (
    <>
      <div
        className="task-main-container"
        onClick={() => {
          taskSelection(task);
        }}
      >
        <div className="task-header">
          <p className="task-id">#{task.id}</p>
          <h2 className="task-title">{task.title}</h2>
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
        </div>
        <p className="task-description">{task.description}</p>
      </div>
    </>
  );
};

export default Task;
