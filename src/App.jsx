// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import LandingPage from './Component/LandingPage'
import UploadPdf from './Component/UploadPdf'
import FetchPdf from './Component/FetchPdf'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<LandingPage/>
    },
    {
      path:"/uploadpdf",
      element:<UploadPdf/>
    },
    {
      path:"/fetchpdf",
      element:<FetchPdf/>
    }
  ])

  return (
    <>
    <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
