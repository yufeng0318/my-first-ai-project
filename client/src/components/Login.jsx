import { useState } from 'react'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      // 这里应该调用后端API进行登录/注册
      // 由于是模拟环境，我们直接创建一个用户对象
      const user = {
        id: 1,
        email: email,
        name: email.split('@')[0]
      }

      // 存储用户信息到本地存储
      localStorage.setItem('user', JSON.stringify(user))
      
      // 调用回调函数更新父组件的用户状态
      onLogin(user)
    } catch (err) {
      setError('登录失败，请检查邮箱和密码')
    }
  }

  return (
    <div className="login-form">
      <h2>{isRegister ? '注册' : '登录'}</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">邮箱</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">密码</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isRegister ? '注册' : '登录'}</button>
      </form>
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          style={{
            background: 'none',
            border: 'none',
            color: '#646cff',
            cursor: 'pointer',
            padding: 0,
            fontSize: '0.9rem'
          }}
        >
          {isRegister ? '已有账号？点击登录' : '没有账号？点击注册'}
        </button>
      </div>
    </div>
  )
}

export default Login