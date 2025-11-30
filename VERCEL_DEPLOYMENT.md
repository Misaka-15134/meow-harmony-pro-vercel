# 🚀 Vercel 部署指南（专用版本）

## 📦 此版本说明

这是专门为 Vercel 部署优化的版本，与原版的区别：
- ✅ 移除了 GitHub Pages 的 base path 配置
- ✅ 添加了 `vercel.json` 配置文件
- ✅ 优化了构建配置

---

## 🎯 快速部署步骤

### 方式一：从 GitHub 导入（推荐）

#### 1. 上传到 GitHub

在此文件夹下执行：

```powershell
cd "d:\stata\统计作业\统计ppt\喵喵和声-pro-vercel"

# 初始化 Git
git init
git config user.name "Misaka-15134"
git config user.email "cy103050847@outlook.com"

# 添加文件
git add .
git commit -m "Initial commit: Vercel 部署版本"

# 在 GitHub 创建新仓库后关联
# 仓库名建议: meow-harmony-pro-vercel
git remote add origin https://github.com/Misaka-15134/meow-harmony-pro-vercel.git
git branch -M main
git push -u origin main
```

#### 2. 连接到 Vercel

1. 访问 https://vercel.com 并登录
2. 点击 "Add New Project"
3. 从 GitHub 选择 `meow-harmony-pro-vercel` 仓库
4. Vercel 会自动检测配置（已通过 `vercel.json` 配置）
5. 点击 "Deploy"

#### 3. 等待部署完成

- 构建时间：约 2-3 分钟
- 部署成功后会得到一个 URL：
  - `https://meow-harmony-pro-vercel.vercel.app`
  - 或类似的自动生成域名

---

### 方式二：使用 Vercel CLI

#### 1. 安装 Vercel CLI

```powershell
npm install -g vercel
```

#### 2. 登录

```powershell
vercel login
```

#### 3. 部署

```powershell
cd "d:\stata\统计作业\统计ppt\喵喵和声-pro-vercel"
vercel
```

按提示操作：
- Set up and deploy? → **Yes**
- Which scope? → 选择你的账号
- Link to existing project? → **No**
- Project name? → `meow-harmony-pro-vercel`
- In which directory? → `./`
- Override settings? → **No**

#### 4. 部署到生产环境

```powershell
vercel --prod
```

---

## ⚙️ 环境变量配置（可选）

### ⚠️ 重要提示

**不建议在 Vercel 中配置 API Key！**

原因：
- 所有访客会使用你的 API Key
- 可能快速消耗你的配额
- 存在安全风险

**推荐做法：**
让用户在界面上自己输入 API Key（应用已支持）

### 如果确实需要配置

在 Vercel Dashboard 中：
1. Project Settings → Environment Variables
2. 添加变量：

```
Name: VITE_GEMINI_API_KEY
Value: 你的_API_Key
Environment: Production, Preview, Development
```

其他可选 API Key：
- `VITE_DEEPSEEK_API_KEY`
- `VITE_OPENAI_API_KEY`
- `VITE_CLAUDE_API_KEY`

---

## ✅ 部署检查清单

### 部署前
- [ ] 已复制所有必要文件到此文件夹
- [ ] `vercel.json` 文件存在
- [ ] `vite.config.ts` 中没有 base path 配置
- [ ] `.env` 文件已被排除（不会上传）

### 部署后
- [ ] 访问部署 URL 确认应用加载正常
- [ ] 测试和弦选择功能
- [ ] 测试音频播放
- [ ] 测试指板可视化
- [ ] 测试节奏播放
- [ ] 测试 AI 功能（在界面输入 API Key）
- [ ] 检查浏览器控制台无错误

---

## 🔧 常见问题

### Q: 部署失败 "Build Error"

**解决方案：**
```powershell
# 本地测试构建
npm install
npm run build

# 如果本地构建成功，重新推送到 GitHub
git add .
git commit -m "Fix build configuration"
git push
```

Vercel 会自动重新部署。

### Q: 页面显示空白

**检查：**
1. 浏览器控制台是否有错误
2. 确认 `vite.config.ts` 中没有错误的 base path
3. 检查 Vercel 构建日志

### Q: 音频无法播放

**原因：** 浏览器需要用户交互才能播放音频

**解决：** 点击任何和弦播放按钮，首次需要用户交互

### Q: AI 功能报错

**原因：** 没有配置 API Key

**解决：** 在 AI 面板的输入框中输入你的 Gemini API Key
- 获取地址：https://aistudio.google.com/apikey

### Q: 想要自定义域名

**步骤：**
1. Vercel Dashboard → Settings → Domains
2. 添加你的域名
3. 按提示配置 DNS 记录

---

## 📊 部署后的性能优化

### 1. 启用分析

在 Vercel Dashboard：
- Analytics → Enable

### 2. 配置 CDN

Vercel 已自动启用全球 CDN，无需额外配置

### 3. 查看构建日志

Deployments → 选择部署 → View Function Logs

---

## 🔄 更新部署

### 方式 1: 通过 Git 推送（自动部署）

```powershell
# 修改代码后
git add .
git commit -m "描述你的更改"
git push
```

Vercel 会自动检测并重新部署。

### 方式 2: 手动重新部署

在 Vercel Dashboard：
- Deployments → 最新部署 → 三个点 → Redeploy

---

## 📱 部署后的 URL

部署成功后，你会得到：

- **生产环境**: `https://meow-harmony-pro-vercel.vercel.app`
- **预览环境**: 每次推送到非主分支会生成预览 URL

你可以在 Vercel Dashboard 中查看所有部署的 URL。

---

## 🎉 部署成功！

现在你可以：
1. ✅ 分享你的应用 URL
2. ✅ 配置自定义域名
3. ✅ 查看访问分析
4. ✅ 设置环境变量（可选）

---

## 📞 需要帮助？

- Vercel 文档: https://vercel.com/docs
- Vite 文档: https://vitejs.dev/guide/
- 项目问题: 查看 `TROUBLESHOOTING.md`

---

**祝部署顺利！** 🚀
