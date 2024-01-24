import Popup from 'reactjs-popup';
import { SetStateAction, useState } from 'react';
import TaskInterface from '../interfaces/tasks';
import Button from '@mui/material/Button';

const DeletePopup = ({
  taskId,
  setTasks,
}: {
  taskId: number;
  setTasks: React.Dispatch<SetStateAction<TaskInterface[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const deleteTask = () => {
    setTasks(currTasks => {
      return currTasks.filter(task => task.id !== taskId);
    });
  };
  return (
    <div>
      <Button
        type="button"
        className="button"
        onClick={() => setOpen(o => !o)}
        variant="outlined"
        color="error"
      >
        Delete
      </Button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <button className="close" onClick={closeModal}>
            X
          </button>
          <h3 className="delete-modal-title">
            Would you like to delete this task?
          </h3>
          <p className="delete-modal-text">
            Once deleted, this task will no longer be available.
          </p>
          <Button onClick={closeModal} variant="contained">
            Cancel
          </Button>
          <Button onClick={deleteTask} variant="outlined" color="error">
            Delete Task
          </Button>
        </div>
      </Popup>
    </div>
  );
};

export default DeletePopup;
