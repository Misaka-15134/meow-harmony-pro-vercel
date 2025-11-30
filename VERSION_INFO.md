# 📋 版本说明

## 🎯 此版本用途

这是 **Vercel 部署专用版本**，与原版相比做了以下优化：

---

## 🔄 主要差异

| 项目 | 原版 (`喵喵和声-pro`) | Vercel 版本 (`喵喵和声-pro-vercel`) |
|------|---------------------|----------------------------------|
| **部署目标** | GitHub 仓库 / 本地开发 | Vercel 在线部署 |
| **vite.config.ts** | 包含 GitHub Pages base path | 无 base path（适配 Vercel） |
| **vercel.json** | ❌ 无 | ✅ 已配置 |
| **文档** | 通用文档 | 包含 `VERCEL_DEPLOYMENT.md` |

---

## 📁 文件结构

```
喵喵和声-pro-vercel/
├── components/          # React 组件（与原版相同）
├── services/           # 服务层（与原版相同）
├── .github/workflows/  # GitHub Actions（与原版相同）
├── vercel.json         # ✨ Vercel 配置文件（新增）
├── vite.config.ts      # ✨ 优化后的 Vite 配置
├── VERCEL_DEPLOYMENT.md # ✨ Vercel 部署指南（新增）
├── README_VERCEL.md    # ✨ Vercel 版本说明（新增）
└── 其他文件...         # 与原版相同
```

---

## 🚀 使用方式

### 本地开发
```bash
npm install
npm run dev
```
访问: http://localhost:3000

### 部署到 Vercel

**方式 1: GitHub 导入**
1. 上传此文件夹到 GitHub（新建仓库）
2. 在 Vercel 中导入该仓库
3. 自动部署

**方式 2: Vercel CLI**
```bash
vercel
vercel --prod
```

详见 `VERCEL_DEPLOYMENT.md`

---

## ⚙️ 配置说明

### 不需要配置环境变量

用户可以直接在界面上输入 API Key，无需在 Vercel 中配置。

### 如果要配置环境变量

在 Vercel Dashboard → Settings → Environment Variables 添加：

- `VITE_GEMINI_API_KEY` - Gemini API Key（可选）
- `VITE_DEEPSEEK_API_KEY` - DeepSeek API Key（可选）

⚠️ **注意**: 配置后所有访客会使用你的 API Key，可能消耗配额

---

## ✅ 部署检查清单

部署前确认：
- [ ] `vercel.json` 文件存在
- [ ] `vite.config.ts` 中无 base path 配置
- [ ] `.env` 文件已在 `.gitignore` 中排除
- [ ] 本地测试 `npm run build` 成功

部署后检查：
- [ ] 应用正常加载
- [ ] 和弦选择功能正常
- [ ] 音频播放正常
- [ ] AI 功能可用（输入 API Key）

---

## 🔗 相关链接

- **原版项目**: `../喵喵和声-pro/`
- **Vercel 文档**: https://vercel.com/docs
- **部署指南**: `VERCEL_DEPLOYMENT.md`

---

## 📞 需要帮助？

查看文档：
- `VERCEL_DEPLOYMENT.md` - Vercel 部署完整指南
- `TROUBLESHOOTING.md` - 故障排除
- `README_VERCEL.md` - 快速开始

---

**版本**: 1.0.0 (Vercel Optimized)  
**最后更新**: 2024-11-30
