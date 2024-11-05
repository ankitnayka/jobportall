import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom"
import SignUp from "./components/auth/SignUp"
import Login from "./components/auth/Login"
import Home from "./components/Home"
import Jobs from "./components/Jobs"
import Browse from './components/Browse'
import Profile from "./components/Profile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import CompanyCreate from "./components/admin/CompanyCreate"
import CompanySetUp from "./components/admin/CompanySetUp"

const appRouter =createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/jobdescription/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  //all admin routes
  {
    path:'/admin/companies',
    element:<Companies/>
  },
  {
    path:'/admin/companies/create',
    element:<CompanyCreate/>
  },
  {
    path:'/admin/companies/:id',
    element:<CompanySetUp/>
  },

])



function App() {
  
  return (
    <>
        <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
