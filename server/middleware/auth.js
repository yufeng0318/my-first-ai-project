const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: '未提供认证令牌' })
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    )

    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: '无效的认证令牌' })
  }
}

module.exports = authMiddleware
