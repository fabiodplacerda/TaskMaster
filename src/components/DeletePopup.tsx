import Popup from 'reactjs-popup';
import { SetStateAction, useState } from 'react';
import TaskInterface from '../interfaces/tasks';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';
import LoadingButton from '@mui/lab/LoadingButton';

const DeletePopup = ({
  taskId,
  setTasks,
}: {
  taskId: number;
  setTasks: React.Dispatch<SetStateAction<TaskInterface[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTask = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setTasks(currTasks => {
        return currTasks.filter(task => task.id !== taskId);
      });
      setIsDeleting(false);
    }, 500);
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
          <WarningIcon sx={{ fontSize: 40, color: '#E34252' }} />
          <button className="close" onClick={closeModal}>
            X
          </button>
          <h3 className="delete-modal-title">
            Would you like to delete this task?
          </h3>
          <p className="delete-modal-text">
            Once deleted, this task will no longer be available.
          </p>
          <div className="btn-container-delete">
            <Button onClick={closeModal} variant="contained">
              Cancel
            </Button>
            <LoadingButton
              variant="outlined"
              color="error"
              onClick={deleteTask}
              loading={isDeleting ? true : false}
              loadingIndicator="deleting..."
            >
              Delete Task
            </LoadingButton>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default DeletePopup;
