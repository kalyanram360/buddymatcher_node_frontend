import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './components/Home/Home.jsx'
import Layout from './Layout.jsx'
import Login from './components/Login/Login.jsx'
import ProfilePage from './components/ProfilePage/ProfilePage.jsx'
import Signup from './components/Signup/Signup.jsx'
import Match from './components/Match/Match.jsx'

const router = createBrowserRouter([{
  path : '/',
  element : <Layout />,
  children : [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/profile',
      element: <ProfilePage />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/match',
      element: <Match />
    }
  ]
}, ])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
