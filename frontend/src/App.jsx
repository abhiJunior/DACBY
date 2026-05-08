import React from 'react'
import Register from './pages/Register'
import AuthProvider from './context/AuthContext'

function App() {
  return (
    <>
    <AuthProvider>
        <Register/>
    </AuthProvider>
    
    </>
    
  )
}

export default App
