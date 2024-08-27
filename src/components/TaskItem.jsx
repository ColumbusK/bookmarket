import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
//
import { Button } from "./ui/button";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector(state => state.tasks);

  const createdAt = task.createdAt;
  const beijingTime = new Date(createdAt).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

  return (
    <div className="task">
      <div>{beijingTime}</div>
      <h2>{task.text}</h2>
      <button onClick={() => dispatch(deleteTask(task.id))} className="close">X</button>
    </div>
  )
}

export default TaskItem;
