import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//
import { getTasks, reset, resetSuccess } from '../features/tasks/taskSlice';
//
import TaskItem from './TaskItem';
import Spinner from './Spinner';


const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks, isLoading, isError, message, isCreateSuccess } = useSelector(state => state.tasks)

  useEffect(() => {
    dispatch(getTasks());

    if (isError) {
      console.log(message);
      toast.error(message);
    }

    if (isCreateSuccess) {
      toast.success('创建成功');
      // 在触发成功消息后，重置 isSuccess 状态
      dispatch(resetSuccess());
    }
    // 清理函数
    return () => {
      dispatch(reset());
      dispatch(resetSuccess());
    };
  }, [dispatch, navigate])

  useEffect(() => {
    if (isCreateSuccess) {
      toast.success('创建成功');
      // 在触发成功消息后，重置 isSuccess 状态
      dispatch(resetSuccess());
    }
  }, [isCreateSuccess])


  return (
    isLoading ? <Spinner /> : (
      <section className="content">
        {tasks.length > 0 && (
          <div className="tasks">
            {tasks.map(task => <TaskItem key={task.id} task={task} />)}
          </div>
        )}
      </section>
    )
  )
}

export default TaskList;

