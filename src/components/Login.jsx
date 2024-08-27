import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from "./Spinner"
import { LogIn } from "lucide-react"


const Login = () => {
  const [formData, setFormData] = useState({
    uid: '',
    email: '',
    password: '',
  });
  const { uid, email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess && user) {
      toast.success("登录成功", { autoClose: 1000, position: "top-center" });
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
    const userData = { uid, email, password };
    dispatch(login(userData));
  }


  return (
    isLoading ? <Spinner /> : (
      <>
        <section className="heading mt-28">
          <div><LogIn size={32} /></div>
          <p className="ml-1">登录</p>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            {/* <div className="form-group">
              <input type="search" className="form-control" name="uid" id="uid" value={uid}
                placeholder="B站uid" onChange={onChange}
              />
            </div> */}
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
  )
}

export default Login;
