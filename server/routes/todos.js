const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')
const authMiddleware = require('../middleware/auth')

// 获取Todo列表（带分页）
router.get('/', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const skip = (page - 1) * limit

    const total = await Todo.countDocuments({ user: req.user.id })
    const todos = await Todo.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    res.json({ todos, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    res.status(500).json({ message: '获取Todo列表失败', error })
  }
})

// 创建新Todo
router.post('/', authMiddleware, async (req, res) => {
  const { text } = req.body

  try {
    const todo = await Todo.create({ user: req.user.id, text })
    res.status(201).json(todo)
  } catch (error) {
    res.status(500).json({ message: '创建Todo失败', error })
  }
})

// 更新Todo
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  const { text, completed } = req.body

  try {
    const todo = await Todo.findOne({ _id: id, user: req.user.id })
    if (!todo) {
      return res.status(404).json({ message: 'Todo不存在' })
    }

    if (text !== undefined) todo.text = text
    if (completed !== undefined) todo.completed = completed

    await todo.save()
    res.json(todo)
  } catch (error) {
    res.status(500).json({ message: '更新Todo失败', error })
  }
})

// 删除Todo
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params

  try {
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.id })
    if (!todo) {
      return res.status(404).json({ message: 'Todo不存在' })
    }

    res.json({ message: 'Todo删除成功' })
  } catch (error) {
    res.status(500).json({ message: '删除Todo失败', error })
  }
})

module.exports = router
