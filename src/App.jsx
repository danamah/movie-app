import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router'
import Navbar from "./assets/Components/Navbar/Navbar"
import Home from "./assets/Pages/Home/Home"
import Footer from "./assets/Components/Footer/Footer"
import LogInPage from './assets/Pages/Auth/LogInPage/LogInPage'
import SignUpPage from './assets/Pages/Auth/SignUpPage/SignUpPage'
import TrendingMovie from './assets/Pages/Trending/TrendingMovie'
import MovieDetails from './assets/Pages/MovieDetails/MovieDetails'
import NotFoundPage from './assets/Pages/NotFoundPage/NotFoundPage'
import AppProtectedRoutes from './assets/Components/ProtectedRoutes/AppProtectedRoutes'
import MainLayout from './assets/Components/Layout/MainLayout'
import AuthLayout from './assets/Components/Layout/AuthLayout'
import AuthProtectedRoutes from './assets/Components/ProtectedRoutes/AuthProtectedRoutes'
function App() {
  const router = createBrowserRouter([
    {
      path:"", element:<AppProtectedRoutes><MainLayout/></AppProtectedRoutes>, children:[
        {index:true, element: <Navigate to={"/trending"}/>},
        {path:"/trending", element:<TrendingMovie/>},
        {path:"/home", element:<Home/>},
        { path: "/movie/:id", element: <MovieDetails /> },
      ]
    },{
      path:"", element:<AuthProtectedRoutes><AuthLayout/></AuthProtectedRoutes>, children:[
        {path:"/login", element:<LogInPage/>},
        {path:"/signup", element:<SignUpPage/>}
      ]
    },{
      path:"*",element:<NotFoundPage/>
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
