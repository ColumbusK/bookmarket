import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { register, reset } from '../features/auth/authSlice';
import Spinner from "./Spinner";


const Register = () => {
  console.log("register page");
  const [formData, setFormData] = useState({
    uid: '',
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { uid, username, email, password, password2 } = formData;
  // console.log(formData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess && user) {
      toast.success('注册成功', { autoClose: 1000 });
      navigate('/');
    };
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('密码不一致');
    } else {
      const userData = { uid, username, email, password };
      dispatch(register(userData));
    }
  }

  return (
    isLoading ? <Spinner /> : (
      <>
        <section className="heading mt-28">
          <div><User size={32} /></div>
          <p className="ml-1">创建账户</p>
        </section>
        <section className="form">
          <form action="" onSubmit={onSubmit}>
            <div className="form-group">
              <input type="search" className="form-control" name="uid" id="uid" value={uid}
                placeholder="B站Uid" onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input type="search" className="form-control" name="username" id="username" value={username}
                placeholder="用户名" onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input type="email" className="form-control" name="email" id="email" value={email}
                placeholder="电子邮箱" onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input type="search" className="form-control" name="password" id="password" value={password}
                placeholder="密码" onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input type="search" className="form-control" name="password2" id="password2" value={password2}
                placeholder="再次输入密码" onChange={onChange}
              />
            </div>
            {/* <div className="form-group">
              <input type="search" className="form-control" name="uid" id="uid" value={uid}
                placeholder="请输入B站uid" onChange={onChange}
              />
            </div> */}
            <div className='form-group'>
              <button type='submit' className='btn btn-block'>注册</button>
            </div>
          </form>
        </section>
      </>
    )
  )
}

export default Register;
