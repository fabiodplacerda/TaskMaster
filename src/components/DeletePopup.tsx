import Popup from 'reactjs-popup';
import { SetStateAction, useState } from 'react';
import TaskInterface from '../interfaces/tasks';

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
      <button type="button" className="button" onClick={() => setOpen(o => !o)}>
        Delete
      </button>
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
          <button onClick={closeModal}>Cancel</button>
          <button onClick={deleteTask}>Delete Task</button>
        </div>
      </Popup>
    </div>
  );
};

export default DeletePopup;
