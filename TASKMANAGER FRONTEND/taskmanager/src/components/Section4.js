import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddTask from './AddTask';
import DeleteAlert from './DeleteAlert';
import TaskCompletePopUp from './TaskCompletePopUp';
const TaskItem = ({ categories,task,tasks,setTasks }) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpen = () => {
    setOpen(true)
    setEditTask(task);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const [expanded, setExpanded] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const [isChecked, setIsChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCheckboxChange = (event, task) => {
    setIsChecked(event.target.checked);
    setSelectedTask(task);
    setShowPopup(true);
  };

  const handleConfirmStatusChange = (confirm) => {
    if (confirm) {
      // Change status of selectedTask to complete
      // You can implement this logic here
      console.log('Changing status of task to complete:', selectedTask);
    }
    setShowPopup(false);
  };

  return (
    <div className="task-item">
      <div className="checkbox-column">
        <input type="checkbox" checked={task.status.name==="COMPLETED"} onChange={(e) => handleCheckboxChange(e, task)} />
        {showPopup && (
        <TaskCompletePopUp
          onConfirm={handleConfirmStatusChange}
          taskId={task.id}
          onClose={() => setShowPopup(false)}
        />
      )}
      </div>
      <div className="task-data-column">
        <div className="task-info">
          <div className='center'><b>{task.title}</b></div>
          <div className='details'><b>Category:</b> {task.category.name}</div>
          <div className='details'><b>Start Date:</b> {task.startDate}</div>
          <div className='details'><b>Due Date: </b>{task.dueDate}</div>
        </div>
        {expanded && (
          <div className="additional-info">
            <div className='details'><b>Description:</b> {task.description}</div>
            <div className='details'><b>Overdue By:</b> {task.updatedat}</div>
            <div className='details'><b>Last Update:</b>{task.updatedat}</div>
          </div>
        )}
      </div>
      <div className="button-column">
        <button onClick={toggleExpand}><ExpandMoreIcon/></button>
        {expanded &&(
        <div className="button-column">
        <button onClick={handleOpenDelete}><DeleteIcon/></button>
        {openDelete && (
        <DeleteAlert setTasks={setTasks} tasks={tasks} task={task} onClose={() => setOpenDelete(false)} />
      )}
        {open && (
        <AddTask categories={categories} editTaskDestails={editTask} onClose={() => setOpen(false)} />
      )}
        <button onClick={handleOpen}><EditIcon/></button>
        </div>
        )}
      </div>
    </div>
  );
};

const TaskList = ({categories,tasks,setTasks}) => {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TaskItem tasks={tasks} setTasks={setTasks} categories={categories} key={index} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
