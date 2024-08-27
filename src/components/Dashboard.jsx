import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//
import { reset } from "../features/tasks/taskSlice";
//
import TaskForm from "./TaskForm";
import { Button } from "./ui/button";


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (!user) navigate('/login');

    dispatch(reset());
  }, [user, navigate, dispatch])




  return (
    <>
      <section className="py-5">
        <h1 className="text-3xl">Welcome {user && user.username}</h1>
        <div className="flex justify-center">
          <Button onClick={() => navigate('/alltasks')}>Check Tasks</Button>
        </div>
      </section>
      <TaskForm />
    </>
  )
}

export default Dashboard;
