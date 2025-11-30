#!/bin/bash

# 喵喵和声 Pro - GitHub 上传脚本
# 使用方法: bash upload-to-github.sh

echo "🎸 喵喵和声 Pro - GitHub 上传工具"
echo "=================================="
echo ""

# 检查是否已经初始化 Git
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    
    echo "👤 配置 Git 用户信息..."
    git config user.name "Misaka-15134"
    git config user.email "cy103050847@outlook.com"
else
    echo "✅ Git 仓库已存在"
fi

# 检查是否有远程仓库
if ! git remote | grep -q "origin"; then
    echo ""
    echo "⚠️  尚未配置远程仓库"
    echo "请先在 GitHub 上创建仓库，然后执行："
    echo "git remote add origin https://github.com/Misaka-15134/你的仓库名.git"
    echo ""
    read -p "是否继续添加文件到暂存区？(y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ 远程仓库已配置"
fi

echo ""
echo "📋 检查将要提交的文件..."
git status

echo ""
echo "⚠️  请确认以下文件已被忽略："
echo "  - node_modules/"
echo "  - .env"
echo "  - dist/"
echo ""

read -p "确认无误？继续添加文件到暂存区？(y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 已取消"
    exit 1
fi

echo ""
echo "➕ 添加所有文件到暂存区..."
git add .

echo ""
echo "💾 创建提交..."
git commit -m "Initial commit: 喵喵和声 Pro Max - 智能吉他和声助手"

echo ""
echo "🚀 准备推送到 GitHub..."
echo ""
echo "如果这是首次推送，请使用："
echo "  git branch -M main"
echo "  git push -u origin main"
echo ""
echo "如果已经推送过，请使用："
echo "  git push"
echo ""
echo "✅ 文件已准备就绪！"
echo ""
echo "📝 提示："
echo "  - 首次推送可能需要输入 GitHub 用户名和 Token"
echo "  - Token 可在 https://github.com/settings/tokens 生成"
echo "  - 勾选 'repo' 权限即可"
