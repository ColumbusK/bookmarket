import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
//
import { createTask, resetSuccess } from '../features/tasks/taskSlice';



const TaskForm = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreateSuccess } = useSelector(state => state.tasks);


  const onSubmit = (e) => {
    // console.log('task form add task', text);
    e.preventDefault();
    dispatch(createTask({ text }));
    dispatch(resetSuccess());
    setText('');
    navigate('/alltasks');
  }

  const onChange = (e) => {
    setText(e.target.value);
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text" className="font-bold">Enter Task</label>
          <input type="text" id="text" value={text} onChange={onChange} />
        </div>
        <div className="form-group">
          <Button className="btn btn-block" type='submit'>Add Task</Button>
        </div>
      </form>
    </section>
  )
}


export default TaskForm;
