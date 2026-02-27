# Vercel部署指南

## 前提条件

1. 拥有GitHub账号
2. 拥有Vercel账号
3. 拥有MongoDB数据库（推荐使用MongoDB Atlas）

## 部署步骤

### 1. 将项目推送到GitHub仓库

1. 在GitHub上创建一个新的仓库
2. 初始化本地仓库并推送到GitHub：

```bash
# 初始化git仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "初始化Todo全栈项目"

# 添加远程仓库
git remote add origin <your-github-repo-url>

# 推送代码
git push -u origin main
```

### 2. 在Vercel上导入GitHub仓库

1. 登录Vercel官网：https://vercel.com
2. 点击"New Project"按钮
3. 选择你的GitHub仓库
4. 点击"Import"按钮

### 3. 配置环境变量

在Vercel的项目设置中，添加以下环境变量：

| 变量名 | 值 |
|--------|-----|
| MONGO_URI | 你的MongoDB连接字符串 |
| JWT_SECRET | 你的JWT密钥 |

### 4. 部署项目

点击"Deploy"按钮，Vercel将自动构建和部署你的项目。

### 5. 测试部署后的应用

部署完成后，Vercel会提供一个URL，你可以通过这个URL访问你的应用。

## 注意事项

1. 确保MongoDB数据库允许外部连接（对于MongoDB Atlas，需要在网络访问设置中添加0.0.0.0/0）
2. 使用强密码和密钥，避免在代码中硬编码敏感信息
3. 定期更新依赖包，确保应用的安全性

## 故障排除

如果部署失败，可以查看Vercel的构建日志，找出失败原因。常见的问题包括：

1. MongoDB连接字符串错误
2. 环境变量未正确设置
3. 依赖包安装失败
4. 代码语法错误

如果遇到问题，可以检查相关配置并重新部署。