import { useEffect, useState } from 'react';
import moment from 'moment';
import TaskInterface from '../interfaces/tasks';
import SelectedTask from '../interfaces/selected';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface TaskProps {
  task: TaskInterface;
  markHasCompleted: (taskId: number) => void;
  selected: SelectedTask;
  setSelected: React.Dispatch<React.SetStateAction<SelectedTask>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const Task = ({
  task,
  markHasCompleted,
  selected,
  setSelected,
  setIsEditing,
}: TaskProps) => {
  const [day] = useState(moment().startOf('day'));
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
        } else if (
          relativeTime.includes('months ago') ||
          relativeTime.includes('month ago')
        ) {
          setDueDate(relativeTime);
          setOverdue(true);
        } else {
          setDueDate(relativeTime);
          setOverdue(false);
        }
        break;
    }
  }, [task.dueDate]);

  const handleTaskSelection = (task: SelectedTask) => {
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
          handleTaskSelection(task);
        }}
      >
        <div className="task-header">
          <p className={task.completed ? 'task-id completed' : 'task-id'}>
            #{task.id}
          </p>
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
