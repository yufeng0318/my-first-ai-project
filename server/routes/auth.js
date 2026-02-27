const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// 注册路由
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    // 检查用户是否已存在
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: '用户已存在' })
    }

    // 创建新用户
    const user = await User.create({ name, email, password })

    // 生成JWT令牌
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    res.status(201).json({ user, token })
  } catch (error) {
    res.status(500).json({ message: '注册失败', error })
  }
})

// 登录路由
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    // 查找用户
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: '邮箱或密码错误' })
    }

    // 验证密码
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: '邮箱或密码错误' })
    }

    // 生成JWT令牌
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    res.json({ user, token })
  } catch (error) {
    res.status(500).json({ message: '登录失败', error })
  }
})

module.exports = router
