import React, { useState } from 'react'
import '../styles/login.css'
import { FaGoogle } from 'react-icons/fa'
import logoImage from '../assets/avatar.svg'

export const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8080/users/log-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Handle successful login
        console.log('Login successful', data)
        localStorage.setItem('authToken', data.jwt);
        console.log('Token stored:', localStorage.getItem('authToken'));
        onLoginSuccess() // Call the onLoginSuccess function passed from App.jsx
      } else {
        setError(data.message || 'Login failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
        // onLoginSuccess()
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="background-image"></div>
      
      <div className="login-form-container">
        <div className="login-form">
          <div className="form-header">
            <img src={logoImage} alt="UI Logo" className="logo" width="50" height="50" />
            <h2>Nice to see you again</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" id="remember-me" name="remember-me" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="sign-in-button" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <button type="button" className="google-sign-in">
            <FaGoogle className="google-icon" />
            Sign in with Google
          </button>
          <p className="sign-up-prompt">
            Don't have an account? <a href="#">Sign up now</a>
          </p>
        </div>
      </div>
    </div>
  )
}