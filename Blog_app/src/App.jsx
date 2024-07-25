import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import About from './components/About'
import { Route, Routes } from 'react-router-dom'
import MyBlogs from './components/MyBlogs'
import Home1 from './components/Home1'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import NewBlog from './components/NewBlog'
import BlogPost from './components/BlogPost';
import UserBlogs from './components/UserBlogs'
import UpdateBlog from './components/UpdateBlog'
import AdminSet from './components/AdminSet'
import Profile from './components/Profile';
// import Profile from './components/Profile'


function App() {
  const [count, setCount] = useState(0)

  return (  
    <>
      <div className='app'>
      
      
      <Routes>
      <Route path="/" element={<Home1 />} />
      <Route path="/about" element={<About />} />
      <Route path="/myblogs" element={<MyBlogs />} /> 
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/blog/:id" element={<BlogPost/>} />
      <Route path='/old' element={<UserBlogs/>}/>
      <Route path="/update/:id" element={<UpdateBlog/>} />
      <Route path="/admin" element={<AdminSet/>} />
      <Route path="/profile" element={<Profile/>} />

      </Routes>
      </div>
    </>
  )
}

export default App
