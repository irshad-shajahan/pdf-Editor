/* eslint-disable no-unused-vars */
import { React, Suspense, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import FallbackUI from './components/Shared/FallbackUI';
import DownloadPdf from './pages/DownloadPdf';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicRoute from './components/RouteProtection/publicRoute';
import ProtectedRoute from './components/RouteProtection/protectedRoute';
import MyDocuments from './pages/MyDocuments';

function App() {
  const isLoading = useSelector((state) => state.alerts.loading)



  return (
    <BrowserRouter>
      {isLoading && <FallbackUI />}
      <div className='overflw-hidden'>
        <Routes>
          {/* To only allow login users to homepage */}
          {/* <Route path="/" element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/download-pdf" element={<DownloadPdf />} />
          <Route path="/my-documents" element={<ProtectedRoute>
            <MyDocuments />
          </ProtectedRoute>} />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>} />
          <Route path="/register" element={<PublicRoute>
            <Register />
          </PublicRoute>} />
        </Routes>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  )
}

export default App
