import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import TodoList from './components/TodoList'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 检查本地存储中的用户信息
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
      </header>
      <main>
        {user ? (
          <TodoList user={user} onLogout={() => setUser(null)} />
        ) : (
          <Login onLogin={setUser} />
        )}
      </main>
    </div>
  )
}

export default App