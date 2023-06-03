import './global.css'
import { useEffect, useState } from 'react'

import Header from "./components/Header/Header"
import Tasks from './components/Tasks/Tasks'

const LOCAL_STORAGE_KEY = 'todo:savedTasks'

export interface ITask {
  id: string,
  title: string,
  isCompleted: boolean
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([])

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, [])

  function setTasksAndSave(newTasks: ITask[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
  }

  function addTask(taskTitle: string) {
    setTasksAndSave([
      ...tasks, {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false
      }
    ]);
  }

  function deleteTask(taskId: string) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toogleTaskCompleted(taskId: string) {
    const newTasks = tasks.map(task => {
      if (task.id == taskId) {
        return {
          ...task, isCompleted: !task.isCompleted
        }
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  return (
    <>
      <Header
        onAddTask={addTask}
      />
      <main>
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onComplete={toogleTaskCompleted}
        />
      </main>
    </>
  )
}

export default App
