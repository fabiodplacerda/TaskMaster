import TaskInterface from '../interfaces/tasks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SelectedTask from '../interfaces/selected';
import moment from 'moment';
import { useEffect, useState } from 'react';

const Task = ({
  task,
  markHasCompleted,
  selected,
  setSelected,
  setIsEditing,
}: {
  task: TaskInterface;
  markHasCompleted: (taskId: number) => void;
  selected: SelectedTask;
  setSelected: React.Dispatch<React.SetStateAction<SelectedTask>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [day, setDay] = useState(moment().startOf('day'));
  const [dueDate, setDueDate] = useState('');
  const [overdue, setOverdue] = useState(false);

  useEffect(() => {
    const relativeTime = moment(task.dueDate).startOf('day').from(day);

    switch (relativeTime) {
      case 'a few seconds ago':
        setDueDate('Today');
        setOverdue(false);
        break;
      case 'a day':
        setDueDate('Tomorrow');
        setOverdue(false);
        break;
      case 'a day ago':
        setDueDate('Yesterday');
        setOverdue(true);
        break;
      default:
        if (relativeTime.includes('days ago')) {
          setOverdue(true);
          setDueDate(relativeTime);
        } else {
          setDueDate(relativeTime);
          setOverdue(false);
        }
        break;
    }
  }, [task.dueDate]);

  const taskSelection = (task: SelectedTask) => {
    if (task.id === selected.id) {
      setSelected({});
      setIsEditing(false);
    } else {
      setSelected(task);
      setIsEditing(false);
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
          {task.completed ? (
            <p className="due-date">Completed!</p>
          ) : (
            <p className="due-date">
              Due:{' '}
              <span className={overdue ? 'overdue' : 'on-time'}>{dueDate}</span>
            </p>
          )}

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
