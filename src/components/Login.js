import React, { useState } from "react";
import { LogIn } from "lucide-react"


const Login = () => {
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
        <div><LogIn size={32} /></div>
        <p className="ml-1">登录</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
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
            <button type='submit' className='btn btn-block'>登录</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login;
