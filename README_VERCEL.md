# 🎸 喵喵和声 Pro Max - Vercel 部署版本

这是专门为 Vercel 部署优化的版本。

## 🚀 快速部署

### 方法 1: 从 GitHub 导入（推荐）

1. **上传到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/Misaka-15134/meow-harmony-pro-vercel.git
   git push -u origin main
   ```

2. **在 Vercel 导入**
   - 访问 https://vercel.com
   - New Project → Import Git Repository
   - 选择此仓库 → Deploy

### 方法 2: 使用 Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

## ⚙️ 环境变量（可选）

**不建议配置** - 让用户自己输入 API Key 更安全。

如需配置：
- `VITE_GEMINI_API_KEY`: Gemini API Key
- `VITE_DEEPSEEK_API_KEY`: DeepSeek API Key

## 📚 详细文档

查看 `VERCEL_DEPLOYMENT.md` 获取完整部署指南。

## 🌟 功能特性

- 🎹 18种和弦类型
- 🎸 交互式吉他指板
- 🤖 AI 智能推荐
- 📊 和声分析工具
- 🎵 多种节奏模式

---

**原项目**: `../喵喵和声-pro/`
