import { useState } from 'react';
import Task from './Task';
import AddTask from './addTask';
import TaskInterface from '../interfaces/tasks';

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

  const markHasCompleted = (taskId: number) => {
    setTasks(previousArray => {
      return previousArray.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      );
    });
  };

  console.log(tasks);

  return (
    <>
      <ul id="tasks-list">
        {tasks.map(task => {
          return (
            <li
              key={task.id}
              className={`${
                task.completed ? 'task-container completed' : 'task-container'
              }`}
            >
              <Task task={task} markHasCompleted={markHasCompleted} />
            </li>
          );
        })}
      </ul>
      <AddTask setTasks={setTasks} />
    </>
  );
};

export default TaskList;
