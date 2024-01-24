import { useEffect, useState } from 'react';
import SelectedTask from '../interfaces/selected';
import TaskInterface from '../interfaces/tasks';

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
  const [showForm, setShowForm] = useState(false);

  console.log(editTitle, 'Title to be edited');
  console.log(editDescription, 'Description to be edited');

  useEffect(() => {
    if (isEditing) {
      setEditTitle(selected.title || '');
      setEditDescription(selected.description || '');
      setShowForm(true);
    } else {
      setShowForm(false);
      setEditTitle('');
      setEditDescription('');
    }
  }, [isEditing]);

  const editTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  const editDescriptionHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditDescription(event.target.value);
  };

  const saveHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
  };

  if (showForm) {
    return (
      <form action="" className="edit-task-form" onSubmit={saveHandler}>
        <label htmlFor="edit-title">Title</label>
        <input
          type="text"
          id="edit-title"
          value={editTitle}
          onChange={editTitleHandler}
        />
        <label htmlFor="edit-description">Description</label>
        <textarea
          name="edit-description"
          id="edit-description"
          cols={30}
          rows={10}
          value={editDescription}
          onChange={editDescriptionHandler}
        ></textarea>
        <button type="submit">Save</button>
      </form>
    );
  }
};

export default EditTask;
