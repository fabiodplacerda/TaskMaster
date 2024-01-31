import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Calendar from './Calendar';
import moment from 'moment';

import TaskInterface from '../interfaces/tasks';
import SelectedTask from '../interfaces/selected';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

interface AddTaskProps {
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
  setSelected: React.Dispatch<React.SetStateAction<SelectedTask>>;
  openAdder: boolean;
  setOpenAdder: React.Dispatch<React.SetStateAction<boolean>>;
  messageEvent: (msg: string) => void;
}

const AddTask = ({
  setTasks,
  setSelected,
  openAdder,
  setOpenAdder,
  messageEvent,
}: AddTaskProps) => {
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [titleReqChar, setTitleReqChar] = useState(false);
  const [descriptionReqChar, setDescriptionReqChar] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [dueDate, setDueDate] = useState<Dayjs | null>(dayjs());

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setTitleInput(input);
    setTitleReqChar(input.length >= 5 && input.length <= 30);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const textArea = event.target.value;
    setDescriptionInput(textArea);
    setDescriptionReqChar(textArea.length >= 5 && textArea.length <= 100);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAdding(true);
    setTimeout(() => {
      messageEvent('Task successfully added!');
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
      setOpenAdder(false);
      setDescriptionReqChar(false);
      setTitleReqChar(false);
      setIsAdding(false);
      setDueDate(dayjs());
    }, 800);
  };

  const handleAddButtonClick = () => {
    setOpenAdder(true);
    setSelected({});
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 50);
  };

  return (
    <>
      {openAdder ? (
        <div className="form-container">
          <form action="" onSubmit={handleSubmit} className="form">
            <div className="input-container">
              <TextField
                id="outlined-basic"
                label="Task Name"
                variant="outlined"
                onChange={handleTitleChange}
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
                onChange={handleDescriptionChange}
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
                  setOpenAdder(false);
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                color="success"
                loading={isAdding ? true : false}
                disabled={!titleReqChar || !descriptionReqChar}
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
