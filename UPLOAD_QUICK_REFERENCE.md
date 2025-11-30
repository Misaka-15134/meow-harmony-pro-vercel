# 🚀 GitHub 上传快速参考

## 方式一：使用自动化脚本（推荐）

### Windows PowerShell
```powershell
# 在项目目录下执行
.\upload-to-github.ps1
```

### Linux/Mac
```bash
bash upload-to-github.sh
```

---

## 方式二：手动命令（完整步骤）

### 1️⃣ 初始化仓库
```bash
cd "d:\stata\统计作业\统计ppt\喵喵和声-pro"
git init
git config user.name "Misaka-15134"
git config user.email "cy103050847@outlook.com"
```

### 2️⃣ 在 GitHub 创建仓库
1. 访问: https://github.com/new
2. 仓库名: `meow-harmony-pro`
3. 描述: `🎸 智能吉他和声助手 - AI驱动的和弦创作与分析工具`
4. 选择 Public 或 Private
5. **不要**勾选任何初始化选项
6. 点击 "Create repository"

### 3️⃣ 添加文件并提交
```bash
git add .
git status  # 检查文件列表，确认没有 .env 和 node_modules
git commit -m "Initial commit: 喵喵和声 Pro Max - 智能吉他和声助手"
```

### 4️⃣ 关联远程仓库
```bash
git remote add origin https://github.com/Misaka-15134/meow-harmony-pro.git
git branch -M main
```

### 5️⃣ 推送到 GitHub
```bash
git push -u origin main
```

**首次推送需要登录：**
- 用户名: `Misaka-15134`
- 密码: 使用 **Personal Access Token**（不是你的 GitHub 密码）

---

## 🔑 获取 Personal Access Token

1. 访问: https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 设置名称: `meow-harmony-pro`
4. 勾选权限: `repo` (所有复选框)
5. 点击 "Generate token"
6. **立即复制保存** Token（只显示一次！）

---

## ✅ 上传后验证清单

访问: https://github.com/Misaka-15134/meow-harmony-pro

检查以下内容：
- [ ] README.md 正确显示，包含徽章
- [ ] 项目描述和标签已设置
- [ ] **.env 文件没有被上传** ⚠️ 重要
- [ ] **node_modules/ 没有被上传** ⚠️ 重要
- [ ] LICENSE 文件存在
- [ ] .env.example 文件存在
- [ ] 所有源代码文件都已上传

---

## 🎨 可选配置（上传后）

### 添加 Topics 标签
仓库页面 → About（右侧）→ 点击齿轮 → 添加标签：
- `guitar` `music` `harmony` `chord-progression` `ai-assistant`
- `music-theory` `react` `typescript` `vite`

### 启用 GitHub Pages（在线演示）
Settings → Pages → Source 选择 `main` 分支 → Save

### 启用 GitHub Actions
已自动配置，推送后会自动运行构建测试

---

## 🛠️ 常见问题速查

### Q: 推送失败 "Permission denied"
```bash
# 检查远程 URL
git remote -v

# 重新设置（使用 Token）
git remote set-url origin https://Misaka-15134:你的Token@github.com/Misaka-15134/meow-harmony-pro.git
```

### Q: 误提交了 node_modules
```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules"
git push
```

### Q: 误提交了 .env 文件 ⚠️
```bash
# 立即删除
git rm --cached .env
git commit -m "Remove .env file"
git push

# 然后立即更换 API Key！
```

### Q: 修改提交信息
```bash
# 修改最后一次提交
git commit --amend -m "新的提交信息"
git push -f
```

---

## 📞 需要帮助？

- GitHub 文档: https://docs.github.com
- Git 文档: https://git-scm.com/doc
- 项目问题: 提交 Issue

---

**准备好了？开始上传吧！** 🎉
