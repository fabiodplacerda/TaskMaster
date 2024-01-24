import { useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import TaskInterface from '../interfaces/tasks';
import SelectedTask from '../interfaces/selected';
import EditTask from './EditTask';

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([
    {
      id: 1,
      title: 'Learn TypeScript',
      completed: false,
      description:
        'Learn all about TypeScript, is functionalities, types interfaces and more! ',
    },
    {
      id: 2,
      title: 'Do some TypeScript exercises',
      completed: false,
      description:
        'Reinforce my understanding of TypeScript through practical exercises to strengthen my skills.',
    },
  ]);
  const [selected, setSelected] = useState<SelectedTask>({ id: 0 });
  const [isEditing, setIsEditing] = useState(false);

  const markHasCompleted = (taskId: number) => {
    setTasks(previousArray => {
      return previousArray.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      );
    });
  };

  const taskSelection = task => {
    if (task.id === selected.id) {
      setSelected({});
    } else {
      setSelected(task);
    }
  };

  console.log(selected);

  return (
    <>
      <ul id="tasks-list">
        {tasks.map(task => {
          return (
            <li
              key={task.id}
              className={`${
                task.completed ? 'task-container completed' : 'task-container'
              } ${task.id === selected.id ? 'selected' : 'not-selected'}`}
              onClick={() => {
                taskSelection(task);
              }}
            >
              <Task
                task={task}
                markHasCompleted={markHasCompleted}
                setIsEditing={setIsEditing}
              />
            </li>
          );
        })}
      </ul>
      <AddTask setTasks={setTasks} />
      <EditTask selected={selected} setTasks={setTasks} isEditing={isEditing} />
    </>
  );
};

export default TaskList;
