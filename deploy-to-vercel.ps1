# Vercel 快速部署脚本
# 使用方法: .\deploy-to-vercel.ps1

Write-Host "🎸 喵喵和声 Pro - Vercel 部署工具" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# 检查是否安装了 Vercel CLI
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "⚠️  未检测到 Vercel CLI" -ForegroundColor Yellow
    Write-Host ""
    $install = Read-Host "是否现在安装 Vercel CLI? (y/n)"
    
    if ($install -eq "y" -or $install -eq "Y") {
        Write-Host "📦 正在安装 Vercel CLI..." -ForegroundColor Yellow
        npm install -g vercel
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Vercel CLI 安装成功！" -ForegroundColor Green
        } else {
            Write-Host "❌ 安装失败，请手动执行: npm install -g vercel" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "❌ 需要 Vercel CLI 才能继续，请先安装: npm install -g vercel" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Vercel CLI 已安装" -ForegroundColor Green
Write-Host ""

# 检查是否已登录
Write-Host "🔐 检查 Vercel 登录状态..." -ForegroundColor Yellow
$whoami = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  未登录 Vercel" -ForegroundColor Yellow
    Write-Host "📝 请在浏览器中完成登录..." -ForegroundColor Yellow
    vercel login
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 登录失败" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ 已登录 Vercel" -ForegroundColor Green
Write-Host ""

# 选择部署方式
Write-Host "📦 选择部署方式：" -ForegroundColor Cyan
Write-Host "1. 快速部署（预览环境）" -ForegroundColor White
Write-Host "2. 生产环境部署" -ForegroundColor White
Write-Host ""

$choice = Read-Host "请选择 (1/2)"

Write-Host ""
Write-Host "🚀 开始部署..." -ForegroundColor Cyan
Write-Host ""

if ($choice -eq "2") {
    # 生产环境部署
    Write-Host "📦 部署到生产环境..." -ForegroundColor Yellow
    vercel --prod
} else {
    # 预览环境部署
    Write-Host "📦 部署到预览环境..." -ForegroundColor Yellow
    vercel
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉 部署成功！" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 提示：" -ForegroundColor Yellow
    Write-Host "  - 部署 URL 已显示在上方输出中"
    Write-Host "  - 访问 https://vercel.com/dashboard 查看所有部署"
    Write-Host "  - 修改代码后重新运行此脚本可更新部署"
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ 部署失败" -ForegroundColor Red
    Write-Host "请检查错误信息并重试" -ForegroundColor Yellow
    Write-Host ""
}
