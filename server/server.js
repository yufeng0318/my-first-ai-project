const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// 加载环境变量
dotenv.config()

// 连接数据库
connectDB()

const app = express()

// 中间件
app.use(cors())
app.use(express.json())

// 路由
app.use('/api/auth', require('./routes/auth'))
app.use('/api/todos', require('./routes/todos'))

// 健康检查
app.get('/', (req, res) => {
  res.json({ message: 'Todo App API is running' })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
