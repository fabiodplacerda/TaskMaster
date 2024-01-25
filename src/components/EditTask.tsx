import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import SelectedTask from '../interfaces/selected';
import TaskInterface from '../interfaces/tasks';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

const EditTask = ({
  selected,
  setTasks,
  isEditing,
  setIsEditing,
  setSelected,
}: {
  selected: SelectedTask;
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<SelectedTask>>;
}) => {
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  // const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [titleReqChar, setTitleReqChar] = useState(false);
  const [descriptionReqChar, setDescriptionReqChar] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const closeModal = () => {
    setOpen(false);
    setIsEditing(false);
    setTitleReqChar(false);
    setDescriptionReqChar(false);
  };

  console.log(editTitle, 'Title to be edited');
  console.log(editDescription, 'Description to be edited');

  useEffect(() => {
    if (isEditing) {
      setEditTitle(selected.title || '');
      setEditDescription(selected.description || '');
      // setShowForm(true);
    } else {
      // setShowForm(false);
      setEditTitle('');
      setEditDescription('');
    }
  }, [isEditing]);

  const editTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setEditTitle(input);
    if (input.length >= 5 && input.length <= 30) {
      setTitleReqChar(true);
    } else {
      setTitleReqChar(false);
    }
  };

  const editDescriptionHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const textArea = event.target.value;
    setEditDescription(event.target.value);
    if (textArea.length >= 5 && textArea.length <= 100) {
      setDescriptionReqChar(true);
    } else {
      setDescriptionReqChar(false);
    }
  };

  const saveHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setTasks((currValue: TaskInterface[]) => {
        return currValue.map(task => {
          if (task.id === selected.id) {
            return { ...task, title: editTitle, description: editDescription };
          } else {
            return task;
          }
        });
      });
      setSelected({ id: 0 });
      setIsEditing(false);
      setEditDescription('');
      setEditTitle('');
      setOpen(false);
      setIsSaving(false);
    }, 800);
  };

  return (
    <div>
      <Button
        type="button"
        className="button"
        onClick={() => {
          setIsEditing(curr => {
            return !curr;
          });
          setOpen(o => !o);
        }}
        variant="outlined"
      >
        EDIT
      </Button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal modal-add-task">
          <button className="close" onClick={closeModal}>
            X
          </button>
          <form action="" onSubmit={saveHandler} className="form">
            <label htmlFor="edit-title">Task Name</label>
            <input
              type="text"
              id="edit-title"
              value={editTitle}
              onChange={editTitleHandler}
            />
            <p className="req-text">please enter between 5 - 30 characters</p>
            <p className="req-text">{editTitle.length} of 30 char</p>
            <label htmlFor="edit-description">Description</label>
            <textarea
              name="edit-description"
              id="edit-description"
              cols={30}
              rows={5}
              value={editDescription}
              onChange={editDescriptionHandler}
              placeholder="describe your task..."
            ></textarea>
            <p className="req-text">please enter between 5 - 100 characters</p>
            <p className="req-text">{editDescription.length} of 100 char</p>
            <LoadingButton
              type="submit"
              variant="contained"
              color="success"
              loading={isSaving ? true : false}
              disabled={titleReqChar && descriptionReqChar ? false : true}
            >
              Save
            </LoadingButton>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default EditTask;
