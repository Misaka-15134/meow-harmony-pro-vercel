# 故障排除指南

## 🔧 常见问题及解决方案

### 1. 安装和启动问题

#### Q: `npm install` 失败
**可能原因：**
- 网络问题
- npm 版本过旧
- node_modules 损坏

**解决方案：**
```bash
# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 清除 npm 缓存
npm cache clean --force

# 重新安装
npm install
```

#### Q: `npm run dev` 启动失败
**可能原因：**
- 端口3000被占用
- 依赖安装不完整

**解决方案：**
```bash
# 检查端口占用
netstat -ano | findstr :3000

# 修改端口（在 vite.config.ts 中修改 server.port）
# 或者杀掉占用端口的进程

# 重新安装依赖
npm install
```

### 2. 运行时问题

#### Q: 页面空白/白屏
**可能原因：**
- JavaScript 错误
- 浏览器不兼容

**解决方案：**
1. 打开浏览器开发者工具（F12）查看控制台错误
2. 确保使用现代浏览器（Chrome 90+, Firefox 88+, Edge 90+）
3. 清除浏览器缓存并刷新
4. 检查终端是否有编译错误

#### Q: 没有声音
**可能原因：**
- 浏览器阻止自动播放
- 音频上下文未初始化
- 系统音量静音

**解决方案：**
1. 确保浏览器允许音频播放
2. 尝试先点击播放按钮交互后再试
3. 检查系统音量和浏览器标签是否静音
4. 刷新页面重试

#### Q: 和弦播放卡顿
**可能原因：**
- BPM 设置过高
- 浏览器性能问题

**解决方案：**
1. 降低 BPM 值
2. 关闭其他浏览器标签
3. 使用性能模式（简化节奏模式）

### 3. AI 功能问题

#### Q: AI 推荐失败："请先输入有效的 API Key"
**解决方案：**
1. 在 AI 面板输入框中输入 API Key
2. 或者配置 `.env` 文件：
   ```
   VITE_GEMINI_API_KEY=你的密钥
   ```
3. 重启开发服务器

#### Q: API 调用失败："生成失败，请检查 API Key、网络连接或所选模型"
**可能原因：**
- API Key 无效或过期
- 网络连接问题
- API 配额耗尽
- CORS 跨域问题

**解决方案：**
1. 验证 API Key 是否正确：
   - Gemini: 访问 https://aistudio.google.com/apikey
   - DeepSeek: 访问 https://platform.deepseek.com/api_keys
2. 检查网络连接是否正常
3. 查看 API 使用额度是否耗尽
4. 如果使用 Claude，切换到 OpenRouter 或其他提供商

#### Q: Claude API 报 CORS 错误
**原因：**
Claude API 不支持浏览器直接调用

**解决方案：**
使用 OpenRouter 调用 Claude 模型：
1. 在 AI 提供商中选择 "OpenRouter"
2. 在 OpenRouter Model 输入框输入：`anthropic/claude-3-sonnet`
3. 使用 OpenRouter API Key

### 4. 构建和部署问题

#### Q: `npm run build` 失败
**可能原因：**
- TypeScript 类型错误
- 依赖缺失
- 内存不足

**解决方案：**
```bash
# 检查 TypeScript 错误
npx tsc --noEmit

# 增加 Node.js 内存限制
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# 或在 Windows PowerShell 中
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### Q: 构建警告："Some chunks are larger than 500 kB"
**说明：**
这是正常的警告，不影响功能。主要是因为包含了完整的图表库和 AI SDK。

**优化方案（可选）：**
1. 启用代码分割
2. 使用动态导入
3. 调整 `build.chunkSizeWarningLimit`

### 5. 浏览器兼容性问题

#### Q: 在旧版浏览器中无法运行
**最低要求：**
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

**解决方案：**
升级浏览器到最新版本

### 6. 性能问题

#### Q: 应用运行缓慢
**优化建议：**
1. 减少和弦序列长度（建议 < 20 个）
2. 使用简单的节奏模式（block）
3. 关闭深度分析模式
4. 清除浏览器缓存
5. 重启浏览器

### 7. 数据问题

#### Q: 和弦序列刷新后丢失
**说明：**
当前版本不支持持久化存储，数据保存在内存中。

**临时方案：**
1. 截图保存序列
2. 手动记录和弦名称
3. 使用浏览器的"不要关闭此标签"功能

**未来计划：**
- LocalStorage 持久化
- 导出/导入功能
- 云端保存

## 🆘 获取帮助

如果以上方案都无法解决问题：

1. **查看开发者工具控制台**
   - 按 F12 打开
   - 查看 Console 标签的错误信息
   - 查看 Network 标签的网络请求

2. **检查终端输出**
   - 查看是否有编译错误
   - 查看是否有警告信息

3. **提交 Issue**
   - 访问项目 GitHub 仓库
   - 提供详细的错误信息和复现步骤
   - 附上截图和日志

## 📝 调试技巧

### 启用详细日志
在浏览器控制台中执行：
```javascript
localStorage.setItem('debug', 'true');
location.reload();
```

### 检查 API 调用
在 Network 标签中筛选 XHR/Fetch 请求，查看：
- 请求 URL
- 请求头（包括 API Key）
- 响应内容
- 状态码

### 测试音频
在控制台中执行：
```javascript
const ctx = new AudioContext();
const osc = ctx.createOscillator();
osc.connect(ctx.destination);
osc.start();
setTimeout(() => osc.stop(), 1000);
```

---

**如果问题仍未解决，请保留错误信息并寻求技术支持。**
