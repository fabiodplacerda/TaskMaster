import { useEffect, useState } from 'react';

import SelectedTask from '../interfaces/selected';
import TaskInterface from '../interfaces/tasks';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Calendar from './Calendar';
import dayjs, { Dayjs } from 'dayjs';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import moment from 'moment';

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
  const [dueDate, setDueDate] = useState<Dayjs | null>(dayjs());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const closeModal = () => {
    setOpen(false);
    setIsEditing(false);
    setTitleReqChar(false);
    setDescriptionReqChar(false);
  };

  // console.log(editTitle, 'Title to be edited');
  // console.log(editDescription, 'Description to be edited');

  useEffect(() => {
    if (isEditing) {
      setEditTitle(selected.title || '');
      setEditDescription(selected.description || '');
    } else {
      setEditTitle('');
      setEditDescription('');
    }
  }, [isEditing]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget.closest('li'));
    setOpen(previousOpen => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

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
            return {
              ...task,
              title: editTitle,
              description: editDescription,
              dueDate: moment(dueDate!.toDate()).startOf('day').toISOString(),
            };
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
        onClick={event => {
          handleClick(event);
          setIsEditing(curr => {
            return !curr;
          });
        }}
        variant="outlined"
        aria-describedby={id}
      >
        EDIT
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div id="add-task-container">
              <form action="" onSubmit={saveHandler} className="form">
                <div className="input-container">
                  <TextField
                    id="outlined-basic"
                    label="Task Name"
                    variant="outlined"
                    onChange={editTitleHandler}
                    value={editTitle}
                  />
                  <p className="req-text">
                    Please enter between 5 - 30 characters
                  </p>
                  <p className="req-text">{editTitle.length} of 30 char</p>
                </div>

                <div className="input-container">
                  <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={5}
                    onChange={editDescriptionHandler}
                    value={editDescription}
                  />
                  <p className="req-text">
                    Please enter between 5 - 100 characters
                  </p>
                  <p className="req-text">
                    {editDescription.length} of 100 char
                  </p>
                </div>

                <Calendar dueDate={dueDate} setDueDate={setDueDate} />

                <div className="btn-container-add">
                  <Button onClick={closeModal}>Cancel</Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="success"
                    loading={isSaving ? true : false}
                    disabled={titleReqChar && descriptionReqChar ? false : true}
                  >
                    Save
                  </LoadingButton>
                </div>
              </form>
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default EditTask;

// if (open) {
//   return (
//     <div id="add-task-container">
//       <button className="close" onClick={closeModal}>
//         X
//       </button>
//       <form action="" onSubmit={saveHandler} className="form">
//         <div className="input-container">
//           <TextField
//             id="outlined-basic"
//             label="Task Name"
//             variant="outlined"
//             onChange={editTitleHandler}
//             value={editTitle}
//           />
//           <p className="req-text">Please enter between 5 - 30 characters</p>
//           <p className="req-text">{editTitle.length} of 30 char</p>
//         </div>

//         <div className="input-container">
//           <TextField
//             id="outlined-multiline-static"
//             label="Description"
//             multiline
//             rows={5}
//             onChange={editDescriptionHandler}
//             value={editDescription}
//           />
//           <p className="req-text">Please enter between 5 - 100 characters</p>
//           <p className="req-text">{editDescription.length} of 100 char</p>
//         </div>

//         <Calendar dueDate={dueDate} setDueDate={setDueDate} />

//         <div className="btn-container-add">
//           <Button
//             onClick={() => {
//               setOpen(false);
//             }}
//           >
//             Cancel
//           </Button>
//           <LoadingButton
//             type="submit"
//             variant="contained"
//             color="success"
//             loading={isSaving ? true : false}
//             disabled={titleReqChar && descriptionReqChar ? false : true}
//           >
//             Save
//           </LoadingButton>
//         </div>
//       </form>
//     </div>
//   );
// } else {
//   return (
//     <Button
//       type="button"
//       className="button"
//       onClick={() => {
//         setIsEditing(curr => {
//           return !curr;
//         });
//         setOpen(true);
//       }}
//       variant="outlined"
//     >
//       EDIT
//     </Button>
//   );
// }
