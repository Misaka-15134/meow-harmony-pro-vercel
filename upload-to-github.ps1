# 喵喵和声 Pro - GitHub 上传脚本 (Windows PowerShell)
# 使用方法: .\upload-to-github.ps1

Write-Host "🎸 喵喵和声 Pro - GitHub 上传工具" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# 检查是否已经初始化 Git
if (-not (Test-Path ".git")) {
    Write-Host "📦 初始化 Git 仓库..." -ForegroundColor Yellow
    git init
    
    Write-Host "👤 配置 Git 用户信息..." -ForegroundColor Yellow
    git config user.name "Misaka-15134"
    git config user.email "cy103050847@outlook.com"
} else {
    Write-Host "✅ Git 仓库已存在" -ForegroundColor Green
}

# 检查是否有远程仓库
$hasRemote = git remote 2>&1 | Select-String "origin"
if (-not $hasRemote) {
    Write-Host ""
    Write-Host "⚠️  尚未配置远程仓库" -ForegroundColor Yellow
    Write-Host "请先在 GitHub 上创建仓库，然后执行："
    Write-Host "git remote add origin https://github.com/Misaka-15134/你的仓库名.git" -ForegroundColor Cyan
    Write-Host ""
    
    $continue = Read-Host "是否继续添加文件到暂存区？(y/n)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        Write-Host "❌ 已取消" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ 远程仓库已配置" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 检查将要提交的文件..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "⚠️  请确认以下文件已被忽略：" -ForegroundColor Yellow
Write-Host "  - node_modules/" -ForegroundColor Gray
Write-Host "  - .env" -ForegroundColor Gray
Write-Host "  - dist/" -ForegroundColor Gray
Write-Host ""

$confirm = Read-Host "确认无误？继续添加文件到暂存区？(y/n)"
if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "❌ 已取消" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "➕ 添加所有文件到暂存区..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "💾 创建提交..." -ForegroundColor Yellow
git commit -m "Initial commit: 喵喵和声 Pro Max - 智能吉他和声助手"

Write-Host ""
Write-Host "🚀 准备推送到 GitHub..." -ForegroundColor Cyan
Write-Host ""
Write-Host "如果这是首次推送，请执行以下命令：" -ForegroundColor Yellow
Write-Host "  git branch -M main" -ForegroundColor Cyan
Write-Host "  git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "如果已经推送过，请执行：" -ForegroundColor Yellow
Write-Host "  git push" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ 文件已准备就绪！" -ForegroundColor Green
Write-Host ""
Write-Host "📝 提示：" -ForegroundColor Yellow
Write-Host "  - 首次推送可能需要输入 GitHub 用户名和 Token"
Write-Host "  - Token 可在 https://github.com/settings/tokens 生成"
Write-Host "  - 勾选 'repo' 权限即可"
Write-Host ""

$push = Read-Host "是否立即推送到 GitHub？(y/n)"
if ($push -eq "y" -or $push -eq "Y") {
    Write-Host ""
    Write-Host "🚀 推送到 GitHub..." -ForegroundColor Cyan
    
    # 检查是否是首次推送
    $hasBranch = git branch 2>&1 | Select-String "main"
    if (-not $hasBranch) {
        git branch -M main
    }
    
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "🎉 成功推送到 GitHub！" -ForegroundColor Green
        Write-Host "访问你的仓库: https://github.com/Misaka-15134/你的仓库名" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "❌ 推送失败，请检查网络连接和权限" -ForegroundColor Red
    }
} else {
    Write-Host ""
    Write-Host "📝 请稍后手动执行推送命令" -ForegroundColor Yellow
}
