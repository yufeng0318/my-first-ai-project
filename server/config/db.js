const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    // 这里使用MongoDB Atlas的连接字符串
    // 在实际部署时，需要在Vercel的环境变量中设置
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp'
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

module.exports = connectDB
