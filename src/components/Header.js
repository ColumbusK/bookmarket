import { FiLogIn, FiLogOut, FiUser, FiBookOpen } from "react-icons/fi";
import { Link } from "react-router-dom";

import '../index.css'

const Header = () => {

  return (
    <header className='header'>
      <div className="logo">
        <Link to='/'><FiBookOpen />书集<span>BooksDistribution</span></Link>
      </div>
      <ul>
        <li>
          <Link to='login'>
            <FiLogIn /> 登录
          </Link>
        </li>
        <li>
          <Link to='register'>
            <FiUser /> 注册
          </Link>
        </li>
      </ul>
    </header>

  )

}

export default Header;
