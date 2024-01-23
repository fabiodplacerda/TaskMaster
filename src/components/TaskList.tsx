import { useState } from 'react';
import Task from './Task';
import AddTask from './addTask';
import TaskInterface from '../interfaces/tasks';

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([
    {
      id: 1,
      title: 'Learn TypeScript',
      completed: true,
      description: 'lorem ipsmu',
    },
    {
      id: 2,
      title: 'Do some TypeScript Katas',
      completed: false,
      description: 'lorem ipsmu',
    },
  ]);

  console.log(tasks);

  return (
    <>
      <ul>
        {tasks.map(task => {
          return (
            <li key={task.id}>
              <Task task={task} />
            </li>
          );
        })}
      </ul>
      <AddTask setTasks={setTasks} />
    </>
  );
};

export default TaskList;
