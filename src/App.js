import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Dashboard from './components/Dashboard';
import Content from './components/Content';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import TaskList from './components/TaskList';
import BooksDisplay from './components/BooksDisplay';
import BookPage from './components/pages/BookPage';
import UserPage from './components/pages/UserPage';

import './App.css'
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <div className="">
          <div className="container">
            <Header />
            <Routes>
              <Route path='/' element={<Content />}>
                <Route path='books' element={<BooksDisplay />} />
              </Route>
              <Route path='/book/:bookid' element={<BookPage />} />
              <Route path='/user/:userid' element={<UserPage />} />
              <Route path='/addtask' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/alltasks' element={<TaskList />} />
              <Route path='/upload' element={<TaskList />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>

  );
}

export default App;
