import { useState } from 'react';
import TaskInterface from '../interfaces/tasks';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoadingButton from '@mui/lab/LoadingButton';
import Popup from 'reactjs-popup';

const AddTask = ({
  setTasks,
}: {
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
}) => {
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [open, setOpen] = useState(false);
  const [titleReqChar, setTitleReqChar] = useState(false);
  const [descriptionReqChar, setDescriptionReqChar] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const closeModal = () => {
    setOpen(false);
    setTitleInput('');
    setDescriptionInput('');
    setTitleReqChar(false);
    setDescriptionReqChar(false);
  };

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setTitleInput(input);
    if (input.length >= 5 && input.length <= 20) {
      setTitleReqChar(true);
    } else {
      setTitleReqChar(false);
    }
  };

  const descriptionHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const textArea = event.target.value;
    setDescriptionInput(textArea);
    if (textArea.length >= 5 && textArea.length <= 100) {
      setDescriptionReqChar(true);
    } else {
      setDescriptionReqChar(false);
    }
  };

  const submitTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAdding(true);
    setTimeout(() => {
      setTasks((curr: TaskInterface[]) => [
        ...curr,
        {
          id: Math.floor(Math.random() * 100),
          title: titleInput,
          description: descriptionInput,
          completed: false,
        },
      ]);
      setTitleInput('');
      setDescriptionInput('');
      setOpen(false);
      setDescriptionReqChar(false);
      setTitleReqChar(false);
      setIsAdding(false);
    }, 800);
  };

  return (
    <div id="add-task-container">
      <p>Add a new task</p>
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
          <form action="" onSubmit={submitTask} className="form">
            <label htmlFor="title">Task Name</label>
            <input
              type="text"
              id="title"
              placeholder="name your task"
              onChange={titleHandler}
              value={titleInput}
            />
            <p className="req-text">please enter between 5 - 20 characters</p>
            <p className="req-text">{titleInput.length} of 20 char</p>

            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              cols={30}
              rows={5}
              onChange={descriptionHandler}
              value={descriptionInput}
              placeholder="describe your task..."
            ></textarea>
            <p className="req-text">please enter between 5 - 100 characters</p>
            <p className="req-text">{descriptionInput.length} of 100 char</p>
            <LoadingButton
              type="submit"
              variant="contained"
              color="success"
              loading={isAdding ? true : false}
              disabled={titleReqChar && descriptionReqChar ? false : true}
            >
              Submit task
            </LoadingButton>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default AddTask;
