// import {name, handleInputChange} from "./TaskList"
import { useState } from "react"
const TaskForm = ( { name ,handleInputChange ,createTask,updateTask, isEditing}) => {

  return (
    <div>
<form className={"task-form"} onSubmit={!isEditing ? createTask : updateTask}>
  <input type="text" placeholder="Add a task" name="name"   value={name} onChange={ handleInputChange}></input>
  {/* onChange={(e) => handleInputChange(e)} */}
<button type="submit">{ !isEditing ? "Add" : "Edit" }</button>

</form>

    </div>
  )
}

export default TaskForm