# 🎸 喵喵和声 Pro Max

<div align="center">

![GitHub](https://img.shields.io/github/license/Misaka-15134/meow-harmony-pro)
![Node Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.8.2-blue)

</div>

一个智能吉他和声助手应用，帮助你创作、分析和理解吉他和弦进行。

## ✨ 功能特点

- 🎹 **和弦选择器**：支持18种常见和弦类型（大三、小三、属七、大七、小七等）
- 🎸 **交互式指板**：可视化显示和弦指法位置，支持自定义点选
- 🤖 **AI 智能推荐**：集成多种AI模型（Gemini、DeepSeek、Claude、GPT等），智能推荐下一个和弦
- 📊 **和声分析**：向量可视化、张力分析、新鲜感曲线等专业分析工具
- 🎵 **节奏播放**：支持多种节奏模式（民谣扫弦、分解和弦、摇滚切音等）
- 🎨 **五度圈可视化**：基于音乐理论的和声色彩分析
- 📝 **和弦序列管理**：保存、编辑和播放你的和弦进行

## 🚀 快速开始

### 前置要求

- Node.js 16+ 
- npm 或 yarn

### 安装步骤

1. **安装依赖**
   ```bash
   npm install
   ```

2. **配置 API Key（可选，用于AI功能）**
   
   复制 `.env.example` 为 `.env`：
   ```bash
   cp .env.example .env
   ```
   
   然后编辑 `.env` 文件，填入你的 API Key：
   ```
   VITE_GEMINI_API_KEY=你的_Gemini_API_Key
   VITE_DEEPSEEK_API_KEY=你的_DeepSeek_API_Key  # 可选
   ```
   
   **获取 API Key：**
   - Google Gemini: https://aistudio.google.com/apikey
   - DeepSeek: https://platform.deepseek.com/api_keys

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **打开浏览器**
   
   访问 http://localhost:3000

### 生产构建

```bash
npm run build
npm run preview
```

## 📖 使用指南

### 基础功能（无需 API Key）

1. **选择和弦**：在和弦选择面板选择根音、类型和低音
2. **试听和弦**：点击播放按钮试听当前和弦
3. **添加到序列**：点击 + 按钮将和弦添加到序列中
4. **播放序列**：在节奏面板中调整BPM和节奏模式，然后播放整个序列
5. **指板可视化**：在底部指板上查看和弦的指法位置
6. **切换模式**：点击"切换到指板点选"可以自由选择音符

### AI 功能（需要 API Key）

1. 在 AI 面板输入你的 API Key
2. 选择 AI 模型提供商
3. 选择目标风格/氛围
4. 添加自定义提示词（可选）
5. 点击"获取 AI 灵感"获取推荐和弦
6. 点击推荐的和弦可直接应用

### 深度分析模式

切换到"深度分析"标签页可以查看：
- 向量与色彩分析（五度圈可视化）
- 张力、色彩角度、音符数统计
- 新鲜感与张力曲线图
- 张力分布饼图

## 🛠️ 技术栈

- **前端框架**：React 19
- **构建工具**：Vite 6
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **图表**：Recharts
- **图标**：Lucide React
- **AI集成**：Google Gemini、DeepSeek、OpenAI GPT、Claude 等

## 📝 支持的和弦类型

- 大三和弦 (maj)
- 小三和弦 (min)
- 强力和弦 (5)
- 属七和弦 (7)
- 大七和弦 (maj7)
- 小七和弦 (min7)
- 小大七和弦 (min/maj7)
- 挂四和弦 (sus4)
- 挂二和弦 (sus2)
- 大六和弦 (6)
- 小六和弦 (min6)
- 属九和弦 (9)
- 小九和弦 (min9)
- 大九和弦 (maj9)
- 加九和弦 (add9)
- 挂四七和弦 (7sus4)
- 减三和弦 (dim)
- 减七和弦 (dim7)
- 增三和弦 (aug)

## 🎨 节奏模式

- **民谣扫弦** (strum)：快速扫弦效果
- **分解和弦** (arpeggio)：琶音效果
- **柱式和弦** (block)：同时发声
- **摇滚切音** (rock)：强力和弦重复

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有开源项目的贡献者！

---

**享受音乐创作的乐趣！🎵**
