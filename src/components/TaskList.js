import TaskForm from "./TaskForm"
import Task from "./Task"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios';
import { URL } from "../App";
import loadingImg from "../assets/loader.gif"
import { set } from "mongoose";
const TaskList = () => {

const [tasks, setTasks] = useState([])
const [completedTasks, setCompletedTasks] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [isEditing, setIsEditing] = useState(false)
const [taskId, setTaskId] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  })

   const {name}= formData

   const handleInputChange = (e) => {
    const {name, value}= e.target;
    setFormData({...formData, [name]: value})
    
   }   

   const createTask= async(e) =>{
e.preventDefault()
    if(name===""){
      return toast.error("fiels is empty")
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData)
      setFormData({...formData, name: ""})
      toast.success("task added successfully")
      getTasks()
      // setIsEditing(false)
    } catch (error) {
      return toast.error(error.message)
      console.log(error);
    }
    }

    const deleteTask = async (id)=>{
try {
  await axios.delete(`${URL}/api/tasks/${id}`)
  getTasks()
} catch (error) {
  toast.error(error.message)
}
    }

    const getTasks = async () => {
setIsLoading(true)
      try {
  const {data} = await axios.get(`${URL}/api/tasks`)
  setTasks(data)
  setIsLoading(false)
} catch (error) {
  toast.error(error.message)
  setIsLoading(false)
}

    }
    const getSingleTask= async(task)=>{
setFormData({name: task.name, completed: false})
setTaskId(task._id)
setIsEditing(true)
    }

    const updateTask = async (e)=>{
e.preventDefault()
if (formData.name===""){ return toast.error("name is empty")}
  try {
    await axios.put(`${URL}/api/tasks/${taskId}`, formData)
    setFormData({...formData, name:""})
    setIsEditing(false)
    getTasks()
  } catch (error) {
    toast.error(error.message)
  } 



}

const setToComplete = async (task)=>{
  const newFormData=
  {
    
    name: task.name, 
    completed:true
  
  }
  try {
    await axios.put(`${URL}/api/tasks/${task._id}`, newFormData)
    getTasks()

  } catch (error) {
    toast.error(error.message)
  }
  
}
    
  useEffect(()=>{
getTasks()
    },[])

    useEffect(() => {
      const cTasks= tasks.filter((task)=>{
        return task.completed===true
      })
      setCompletedTasks(cTasks)
    },[tasks])
  return (
    <div>
    <h2>Task Manager</h2>
    <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} updateTask={updateTask} isEditing={isEditing}/>
    
    {
      tasks.length > 0 &&(
        <div className="--flex-between pb">
  <p>
    <b>
      Total Tasks :
    </b>{tasks.length}
  </p>
  <p>
    <b>
     Completed Tasks :
    </b>{completedTasks.length}
  </p>
</div>  

      )}
    <hr/>

      

{
  isLoading && (
    <div className="--flex-center">
<img src={loadingImg} alt="Loading"/>
    </div>
  )
}

{ !isLoading==true && tasks.length===0 ?(
  <p className="--py">
    No task added.  Please add a task!
  </p>
):(
<>
  {tasks.map((task, index )=>{
    return <Task key={task._id} task={task} index={index} setToComplete={setToComplete} deleteTask={deleteTask} getSingleTask={getSingleTask}  />
  }
  
  )}
  </>
)
}


    </div>
  )
}

export default TaskList