import { useState, useEffect } from 'react'

const TodoList = ({ user, onLogout }) => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editingTodo, setEditingTodo] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [todosPerPage] = useState(5)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟从后端获取Todo数据
    fetchTodos()
  }, [])

  const fetchTodos = () => {
    // 模拟API调用
    setTimeout(() => {
      const mockTodos = [
        { id: 1, text: '学习React', completed: false, createdAt: new Date().toISOString() },
        { id: 2, text: '学习Node.js', completed: true, createdAt: new Date().toISOString() },
        { id: 3, text: '学习MongoDB', completed: false, createdAt: new Date().toISOString() },
        { id: 4, text: '构建全栈应用', completed: false, createdAt: new Date().toISOString() },
        { id: 5, text: '部署到Vercel', completed: false, createdAt: new Date().toISOString() },
        { id: 6, text: '测试应用', completed: false, createdAt: new Date().toISOString() }
      ]
      setTodos(mockTodos)
      setLoading(false)
    }, 500)
  }

  const handleAddTodo = (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      createdAt: new Date().toISOString()
    }

    setTodos([...todos, todo])
    setNewTodo('')
  }

  const handleEditTodo = (todo) => {
    setEditingTodo(todo.id)
    setEditingText(todo.text)
  }

  const handleSaveEdit = (e, id) => {
    e.preventDefault()
    if (!editingText.trim()) return

    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editingText } : todo
    ))
    setEditingTodo(null)
    setEditingText('')
  }

  const handleCancelEdit = () => {
    setEditingTodo(null)
    setEditingText('')
  }

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    onLogout()
  }

  // 分页逻辑
  const indexOfLastTodo = currentPage * todosPerPage
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo)
  const totalPages = Math.ceil(todos.length / todosPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>欢迎, {user?.name}</h2>
        <button onClick={handleLogout}>退出登录</button>
      </div>

      <form className="todo-form" onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="添加新的Todo..."
        />
        <button type="submit">添加</button>
      </form>

      <ul className="todo-list">
        {currentTodos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {editingTodo === todo.id ? (
              <form className="edit-form" onSubmit={(e) => handleSaveEdit(e, todo.id)}>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button type="submit" className="save">保存</button>
                <button type="button" className="cancel" onClick={handleCancelEdit}>取消</button>
              </form>
            ) : (
              <>
                <div className="todo-content">
                  <h3>{todo.text}</h3>
                  <p>{new Date(todo.createdAt).toLocaleString()}</p>
                </div>
                <div className="todo-actions">
                  <button className="edit" onClick={() => handleEditTodo(todo)}>编辑</button>
                  <button className="complete" onClick={() => handleToggleComplete(todo.id)}>
                    {todo.completed ? '未完成' : '完成'}
                  </button>
                  <button className="delete" onClick={() => handleDeleteTodo(todo.id)}>删除</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default TodoList