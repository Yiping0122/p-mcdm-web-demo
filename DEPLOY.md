# 🚀 部署指南

本文档介绍如何将本项目部署到 GitHub Pages。

## 自动部署（推荐）

本项目已配置 GitHub Actions 自动部署。只需推送到 `main` 分支，网站会自动构建并部署。

### 首次部署步骤

1. **在 GitHub 创建新仓库**
   - 访问 https://github.com/new
   - 仓库名称：`p-mcdm-web-demo`（或你喜欢的名字）
   - 设为 Public

2. **初始化本地仓库并推送**

```bash
# 进入项目目录
cd p-mcdm-web-demo

# 初始化 git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: P-MCDM Web Prototype"

# 关联远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/p-mcdm-web-demo.git

# 推送到 main 分支
git branch -M main
git push -u origin main
```

3. **启用 GitHub Pages**
   - 进入仓库 → Settings → Pages
   - Source 选择 "GitHub Actions"
   - 系统会自动识别 `.github/workflows/deploy.yml`

4. **等待部署完成**
   - 进入 Actions 标签页查看部署状态
   - 首次部署可能需要 2-3 分钟
   - 部署完成后，访问 `https://YOUR_USERNAME.github.io/p-mcdm-web-demo/`

## 手动部署

如果你想手动部署到 GitHub Pages：

```bash
# 安装 gh-pages
npm install -g gh-pages

# 构建项目
npm run build

# 部署
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

## 部署到其他平台

### Vercel

1. 导入项目到 Vercel
2. 构建命令：`npm run build`
3. 输出目录：`dist`

### Netlify

1. 拖拽 `dist` 文件夹到 Netlify
2. 或使用 Git 集成自动部署

## 常见问题

### Q: 部署后页面空白？

A: 检查 `vite.config.ts` 中的 `base` 配置：
- GitHub Pages: `base: '/p-mcdm-web-demo/'`（与仓库名一致）
- 自定义域名: `base: '/'`

### Q: 资源加载 404？

A: 确保所有资源引用使用相对路径。检查 `index.html` 中的资源引用。

### Q: 如何绑定自定义域名？

A: 
1. 在仓库 Settings → Pages 中添加自定义域名
2. 在你的 DNS 提供商处添加 CNAME 记录指向 `YOUR_USERNAME.github.io`

### Q: 如何更新网站？

A: 只需修改代码并推送到 main 分支，GitHub Actions 会自动重新部署：

```bash
git add .
git commit -m "Update: xxx"
git push
```

## 本地预览生产构建

```bash
npm run build
npm run preview
```

这会启动一个本地服务器预览生产构建版本。
