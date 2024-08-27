// TopicNavbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
//
import { topics } from '../utils/mocks';


const TopicNavbar = () => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const ulRef = useRef(null);
  const navigate = useNavigate();
  // 使用 useLocation 钩子获取当前路由的 location 对象
  const location = useLocation();
  // 从 location.search 中解析查询参数
  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get('tag');

  useEffect(() => {
    navigate(`/?tag=${"经济学人"}`);
  }, []);


  const handleClick = (index) => {
    // console.log(index);
    setSelectedIndex(index);
  };

  const handleScroll = (direction) => {
    const scrollAmount = direction === 'left' ? -150 : 150;
    ulRef.current.scrollLeft += scrollAmount;
    setScrollLeft(ulRef.current.scrollLeft);
  };

  const handleTopicClick = (taskItem) => {
    // 使用 navigate 函数进行路由跳转，带上任务的 ID 作为查询参数
    navigate(`/?tag=${taskItem}`);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="w-1/10 flex">
        <button className="px-2" onClick={() => handleScroll('left')}>
          <ChevronLeft size={20} />
        </button>
      </div>
      <div className="w-8/10 overflow-x-auto">
        <nav>
          <ul
            ref={ulRef}
            className="flex items-center w-8/10 overflow-hidden"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
              transition: 'scroll-left 0.3s ease-in-out', // 添加过渡效果
              scrollBehavior: 'smooth', // 平滑滚动
            }}
          >
            {
              topics.map((item, idx) => {
                return (
                  <li key={idx}
                    onClick={() => {
                      handleClick(idx);
                      handleTopicClick(item);
                    }}
                    className={`mr-4 cursor-pointer
                    hover:bg-gray-200 hover:text-gray-900 px-2 py-0
                    rounded-2xl
                    ${item === topic ? 'bg-gray-200 text-gray-900' : ''}`
                    }>
                    <a href="#" className="whitespace-nowrap">
                      {item}
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </nav>
      </div>
      <div className="w-1/10 flex">
        <button className="px-2" onClick={() => handleScroll('right')}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopicNavbar;
