import { useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import TaskInterface from '../interfaces/tasks';
import SelectedTask from '../interfaces/selected';
import EditTask from './EditTask';
import DeletePopup from './DeletePopup';

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([
    {
      id: 1,
      title: 'Learn TypeScript',
      completed: false,
      description:
        'Learn all about TypeScript, is functionalities, types interfaces and more! ',
      dueDate: '2024-01-27T00:00:00.000Z',
    },
    {
      id: 2,
      title: 'Do some TypeScript exercises',
      completed: false,
      description:
        'Reinforce my understanding of TypeScript through practical exercises to strengthen my skills.',
      dueDate: '2024-01-28T00:00:00.000Z',
    },
  ]);
  const [selected, setSelected] = useState<SelectedTask>({ id: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [openAdder, setOpenAdder] = useState(false);
  const markHasCompleted = (taskId: number) => {
    setTasks(previousArray => {
      return previousArray.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      );
    });
  };

  console.log(selected, 'this was selected');

  if (!tasks.length) {
    return (
      <div id="no-tasks-container">
        <p id="no-tasks-text">You have got not tasks at the moment</p>
        <AddTask
          setTasks={setTasks}
          setSelected={setSelected}
          openAdder={openAdder}
          setOpenAdder={setOpenAdder}
        />
      </div>
    );
  }

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
              onClick={() => {}}
            >
              <Task
                task={task}
                markHasCompleted={markHasCompleted}
                selected={selected}
                setSelected={setSelected}
                setIsEditing={setIsEditing}
              />
              {task.id === selected.id && (
                <div className="btn-container">
                  <EditTask
                    selected={selected}
                    setTasks={setTasks}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    setSelected={setSelected}
                    setOpenAdder={setOpenAdder}
                  />
                  <DeletePopup taskId={task.id} setTasks={setTasks} />
                </div>
              )}
            </li>
          );
        })}
        <AddTask
          setTasks={setTasks}
          setSelected={setSelected}
          openAdder={openAdder}
          setOpenAdder={setOpenAdder}
        />
      </ul>
    </>
  );
};

export default TaskList;
