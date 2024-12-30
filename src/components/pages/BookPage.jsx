import axios from "axios";
import { useParams } from "react-router-dom";
import BookCover from "../common/BookCover";
import { Button } from "../ui/button";
import { FileDownIcon, DownloadCloud } from "lucide-react";
import { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import bookService from "../../features/books/bookService"; // 导入默认导出
const { getMagzineById } = bookService; // 从默认导出中解构获取 getAllTE

const album = {
  name: "Async Awakenings",
  artist: "@哥伦布骑士",
  cover:
    "https://freemagazines.top/wp-content/uploads/2024/01/The-Economist-USA-January-27-2024.webp",
};

const BookPage = () => {
  const { bookid } = useParams();
  console.log("bookid", bookid);
  const [error, setError] = useState(false);
  const [bookInfo, setBookInfo] = useState({
    user: "@哥伦布骑士",
    title: "经济学人-20240413",
    type: "TE",
    coverUrl:
      "https://freemagazines.top/wp-content/uploads/2024/04/The-Economist-April-13th-19th-2024.webp",
    panUrl: "http://8.130.161.27/magzines/magzines/TE20240413.pdf",
    datetime: "2024-04-13T19:00:00.000Z",
    tags: "eco/politic/culture/经济学人",
    createdAt: "2024-04-14T06:59:29.938Z",
    updatedAt: "2024-04-14T06:59:29.938Z",
    id: "661b7ed171a443d6c248b4ff",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await getMagzineById(bookid)).data[0];
        console.log("data", data);
        setBookInfo({
          ...data,
          user: "@哥伦布骑士",
        });
      } catch (error) {
        // Handle error if necessary
        setError(true);
      }
    };

    fetchData(); // Call the async function immediately

    // Clean-up function if needed
    return () => {
      // Perform any clean-up here
    };
  }, []); // Dependency array for useEffect

  return error ? (
    <>
      <div className="flex flex-row justify-center items-center w-full h-[70vh] ">
        <h1>未知错误！</h1>
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-row justify-center items-center w-full h-[70vh] ">
        <div className="border-slate-500  mr-16">
          <BookCover
            key={bookInfo.title}
            src={bookInfo.coverUrl}
            className="w-[300px] my-2"
            aspectRatio="portrait"
            width={250}
            height={330}
          />
        </div>
        <div className="flex flex-col justify-between items-start min-w-80 min-h-[400px] bg-gray-100 p-2 rounded-md">
          <div className="w-full text-left">
            <div>
              <h1 className="text-2xl">{bookInfo.title}</h1>
            </div>
            <div>
              <p>
                <span className="text-gray-600">上传者</span>{" "}
                <a href="" className="hover:border-b border-gray-700">
                  {bookInfo.user}
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center w-full mt-4 mb-4 ">
            <div className="flex flex-col justify-center items-center w-full mt-4 mb-4 ">
              <img
                src="https://knightnewstands.com/magzines/magzines/donateQR.jpg"
                alt="打赏二维码"
                className="w-56 h-56"
              />
              <p className="text-gray-600 text-sm mt-2">
                赞赏务必留言您的注册邮箱以便后续享受更多权益
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col justify-start">
            <h2 className="text-left">下载地址</h2>
            <div className="flex justify-between w-full">
              <a href={bookInfo.panUrl} download="downloaded_file.pdf">
                <Button size="lg">
                  <FileDownIcon className="mr-1 h-4 w-4" />
                  直接下载
                </Button>
              </a>
              <Button size="lg">
                <DownloadCloud className="mr-1 h-4 w-4" />
                云盘链接
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookPage;
