import { useState } from 'react';
import TaskInterface from '../interfaces/tasks';

const AddTask = ({
  setTasks,
}: {
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
}) => {
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

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
  };

  return (
    <form action="" onSubmit={submitTask}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        placeholder="Task Title"
        onChange={titleHandler}
        value={titleInput}
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        cols={30}
        rows={10}
        onChange={descriptionHandler}
        value={descriptionInput}
      ></textarea>
      <button type="submit">Submit task</button>
    </form>
  );
};

export default AddTask;
