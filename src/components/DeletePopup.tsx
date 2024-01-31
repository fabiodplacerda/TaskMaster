import Popup from 'reactjs-popup';
import { SetStateAction, useState } from 'react';
import TaskInterface from '../interfaces/tasks';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';
import LoadingButton from '@mui/lab/LoadingButton';

interface DeletePopupProps {
  taskId: number;
  setTasks: React.Dispatch<SetStateAction<TaskInterface[]>>;
  messageEvent: (msg: string) => void;
}

const DeletePopup = ({ taskId, setTasks, messageEvent }: DeletePopupProps) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const closeModal = () => setOpen(false);

  const deleteTask = () => {
    setIsDeleting(true);
    setTimeout(() => {
      messageEvent('Task successfully deleted!');
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
            Deleting this task will permanently remove it from the task list.
            This action cannot be undone!
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
              loadingIndicator="Deleting..."
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
