import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, getBooksByTag } from "../features/books/bookSlice";
import { TabsList, Tabs, TabsTrigger } from "./ui/tabs";
import { useRequest } from 'ahooks';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import TopicNavbar from "./TopicNavBar";
import AlbumArtwork from "./BookItem";

import bookService from "../features/books/bookService"; // 导入默认导出
const { getAllMgazines } = bookService; // 从默认导出中解构获取 getAllTE



const Content = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  // 使用ahooks获取经济学人
  const { data: books, error, loading: isLoading } = useRequest(getAllMgazines);

  // 使用 useLocation 钩子获取当前路由的 location 对象
  const location = useLocation();
  // 从 location.search 中解析查询参数
  const queryParams = new URLSearchParams(location.search);
  let topic = queryParams.get('tag');

  useEffect(() => {
    if (!user) navigate('/login');
    dispatch(reset());
  }, [user, navigate, dispatch]);

  const handleChange = (value) => {
    console.log(value);
  }

  return (
    <>
      <section className="min-h-96 relative">
        <TopicNavbar />
        <div className="space-between flex items-center absolute -left-9 top-48 shadow-slate-700">
          <Tabs defaultValue="书籍" className="h-full space-y-6" onValueChange={handleChange}>
            <TabsList>
              <TabsTrigger value="书单" className="relative" disabled>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>书单</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>书单暂不可用(To do)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsTrigger>
              <TabsTrigger value="书籍">书籍</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <section className="min-h-[30vh]">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[40vh]">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-14 space-between overflow-hidden px-2 mt-2 pb-20">
              {books && books.length > 0 ? (
                books.map((item) => (
                  <AlbumArtwork
                    key={item.id}
                    album={item}
                    className="w-[250px] mt-4"
                    aspectRatio="portrait"
                    width={250}
                    height={330}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center min-h-[30vh]">
                  <p>No books found</p>
                </div>
              )}
            </div>
          )}
        </section>
        <Outlet />
      </section>
    </>
  )
}

export default Content;
