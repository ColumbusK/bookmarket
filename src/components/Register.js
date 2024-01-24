import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { User } from "lucide-react"


const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { username, email, password, password2 } = formData;
  console.log(formData);

  const onChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <section className="heading mt-28">
        <div><User size={32} /></div>
        <p className="ml-1">创建账户</p>
      </section>
      <section className="form">
        <form action="" onSubmit={onSubmit}>
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
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>注册</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register;
