import { FiLogIn, FiLogOut, FiUser, FiBookOpen } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LogOut, Bell, Search } from "lucide-react"
import { logout, reset } from '../features/auth/authSlice';


import '../index.css'
import { UserNav } from "./common/UserNav";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  // console.log("user state", user);

  const logoutFn = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
    toast.warn('退出登录', { autoClose: 1000, position: "top-center" });
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // 用户按下了回车键
      console.log('Enter key pressed! Do something...');
      // 在这里执行你的逻辑
    }
  };

  return (
    <header className='header'>
      <div className="logo text-xl">
        <Link to='/'><FiBookOpen />书集<span className="text-2xs">BooksDistribution</span></Link>
      </div>
      <ul>
        {
          !user ? (
            <>
              <li className="mr-4">
                <Link to='login'>
                  <FiLogIn /> 登录
                </Link>
              </li>
              <li>
                <Link to='register'>
                  <FiUser /> 注册
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <div className="flex flex-row mr-4">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="relative">
                      <Search className="absolute left-2 top-3 h-4 w-6 text-muted-foreground" />
                      <Input placeholder="搜索" className="pl-8 w-64 placeholder:text-gray-400 rounded-3xl focus-visible:border-gray-400" onKeyDown={handleKeyDown} />

                    </div>
                  </form>
                </div>
              </li>
              <li>
                <Button variant="ghost" className="mr-4 rounded-full">
                  <Bell className="mr-1 h-4 w-4" />消息
                </Button>
              </li>
              <li>
                <UserNav />
              </li>
            </>
          )
        }
      </ul>
    </header>
  )
}

export default Header;
