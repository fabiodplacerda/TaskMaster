import { useState } from 'react';
import TaskInterface from '../interfaces/tasks';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import dayjs, { Dayjs } from 'dayjs';
import Calendar from './Calendar';
import moment from 'moment';

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
  const [dueDate, setDueDate] = useState<Dayjs | null>(dayjs());

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setTitleInput(input);
    if (input.length >= 5 && input.length <= 30) {
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
          dueDate: moment(dueDate!.toDate()).startOf('day').toISOString(),
        },
      ]);
      setTitleInput('');
      setDescriptionInput('');
      setOpen(false);
      setDescriptionReqChar(false);
      setTitleReqChar(false);
      setIsAdding(false);
      setDueDate(dayjs());
    }, 800);
  };

  const handleAddButtonClick = () => {
    setOpen(true);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 50);
  };

  return (
    <>
      {open ? (
        <div id="add-task-container">
          <form action="" onSubmit={submitTask} className="form">
            <div className="input-container">
              <TextField
                id="outlined-basic"
                label="Task Name"
                variant="outlined"
                onChange={titleHandler}
                value={titleInput}
              />
              <p className="req-text">Please enter between 5 - 30 characters</p>
              <p className="req-text">{titleInput.length} of 30 char</p>
            </div>
            <div className="input-container">
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={5}
                onChange={descriptionHandler}
                value={descriptionInput}
              />
              <p className="req-text">
                Please enter between 5 - 100 characters
              </p>
              <p className="req-text">{descriptionInput.length} of 100 char</p>
            </div>

            <Calendar dueDate={dueDate} setDueDate={setDueDate} />
            <div className="btn-container-add">
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                color="success"
                loading={isAdding ? true : false}
                disabled={titleReqChar && descriptionReqChar ? false : true}
              >
                Submit task
              </LoadingButton>
            </div>
          </form>
        </div>
      ) : (
        <div id="add-task-btn">
          <p>Add a new task</p>
          <AddCircleIcon
            sx={{ fontSize: 40 }}
            type="button"
            className="button"
            id="add-button"
            onClick={handleAddButtonClick}
          />
        </div>
      )}
    </>
  );
};

export default AddTask;
