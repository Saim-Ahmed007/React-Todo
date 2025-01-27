import React, { useState } from 'react'
import SearchTask from './SearchTask'
import TaskAction from './TaskAction'
import TaskList from './TaskList'
import AddTaskModal from './AddTaskModal'

const TaskBoard = () => {
    const defaultTask = {
        'id': crypto.randomUUID(),
        'title': "Learn React",
        'description': "I want to learn react such that I can treat it like my slave and make it do whatever I want to do",
        'tags': ["web", "react", "js"],
        'priority': "High",
        'isFavorite': true
    }
    const [tasks, setTasks] = useState([defaultTask])
    const [showAddModal, setShowAddModal] = useState(false)
    const [taskToUpdate, setTaskToUpdate] = useState(null)

    const handleAddTask = (newTask, isAdd) =>{
      if(isAdd){
        setTasks([...tasks, newTask])
      }else{
        setTasks(
          tasks.map((task) => {
            if(task.id === newTask.id){
              return newTask
            }
            return task
          })
        )
      }
     
      setShowAddModal(false)
    }

    const handleEditTask = (task) => {
      setTaskToUpdate(task)
      setShowAddModal(true)
      
    }
    const handleCloseClick = () =>{
      setShowAddModal(false)
      setTaskToUpdate(null)
    }

    const handleDeleteTask = (taskId) => {
      const taskAfterDelete = tasks.filter(task => task.id !== taskId)
      setTasks(taskAfterDelete)
    }

    const handleAllDeleteClick = () =>{
      tasks.length = 0
      setTasks([...tasks])
    }

    const handleFavorite = (taskId) => {
      const taskIndex = tasks.findIndex(task => task.id === taskId)
      const newTasks = [...tasks]
      newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite 
    }

    const handleSearch = (searchTerm) => {
      const filtered = tasks.filter((task) => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setTasks([...filtered])
    }

  return (
    <div>

<section className="mb-20 w-11/12 mx-auto" id="tasks">

		{showAddModal && <AddTaskModal
     onCloseClick={handleCloseClick}
      onSave={handleAddTask} 
      taskToUpdate={taskToUpdate}
       />}

		<div className="container">
			
		<div className="p-2 flex justify-end">
			<SearchTask onSearch={handleSearch}/>
		</div>
		
			<div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">

				<TaskAction onDeleteAllClick={handleAllDeleteClick} onAddClick={()=> setShowAddModal(true)}/>

				{ tasks.length > 0 ?
          <TaskList 
          onFav={handleFavorite} 
          onDelete={handleDeleteTask} 
          tasks={tasks} 
          onEdit={handleEditTask}/> :
          "No Task Found Please Add Task" 
        }
			</div>
		</div>
	</section>
      
    </div>
  )
}

export default TaskBoard
