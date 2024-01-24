import { useState } from 'react';
import TaskInterface from '../interfaces/tasks';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';

import Popup from 'reactjs-popup';

const AddTask = ({
  setTasks,
}: {
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
}) => {
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
  };

  const descriptionHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescriptionInput(event.target.value);
  };

  const submitTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTasks((curr: TaskInterface[]) => [
      ...curr,
      {
        id: Math.random() * 10000,
        title: titleInput,
        description: descriptionInput,
        completed: false,
      },
    ]);
    setTitleInput('');
    setDescriptionInput('');
    setOpen(false);
  };

  return (
    <div>
      <AddCircleIcon
        sx={{ fontSize: 40 }}
        type="button"
        className="button"
        onClick={() => setOpen(o => !o)}
        id="add-button"
      />

      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal modal-add-task">
          <button className="close" onClick={closeModal}>
            X
          </button>
          <form action="" onSubmit={submitTask} id="form">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Task name"
              onChange={titleHandler}
              value={titleInput}
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              cols={30}
              rows={5}
              minLength={10}
              onChange={descriptionHandler}
              value={descriptionInput}
            ></textarea>
            <Button type="submit" variant="contained" color="success">
              Submit task
            </Button>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default AddTask;
