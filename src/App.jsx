import { useState, useEffect  } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import {Login} from './pages/Login'
import {Home} from './pages/Home'
import "./index.css"
import "./app.css"
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if the authToken exists in localStorage
    const token = localStorage.getItem('authToken')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/home" replace /> : 
              <Login onLoginSuccess={handleLoginSuccess} />
          } 
        />
        <Route 
          path="/home" 
          element={
            isAuthenticated ? 
              <Home /> : 
              <Navigate to="/login" replace />
          } 
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
