# GitHub Pages 部署指南

## 🚀 项目概述

拼音转换器已成功配置为支持 GitHub Pages 部署！项目包含以下核心功能：

- ✅ **编辑模式**：支持直接编辑拼音结果，智能处理多音字
- ✅ **多音字支持**：自动识别和显示多音字，提供选择功能
- ✅ **多种输出格式**：支持声调符号、数字声调、无声调等格式
- ✅ **实时预览**：所见即所得的拼音转换体验
- ✅ **响应式设计**：适配各种设备屏幕

## 📁 GitHub Pages 文件结构

```
docs/
├── index.html              # GitHub Pages 主页
├── demo.html              # 主演示页面
├── test-editor.html       # 编辑器测试页面
├── test-github-pages.html # GitHub Pages 兼容性测试页面
├── dist/
│   ├── pinyin-converter.js     # 未压缩的转换器代码
│   └── pinyin-converter.min.js # 压缩后的转换器代码
└── pinyin-data/
    ├── kMandarin.txt      # 普通话拼音数据
    └── pinyin.txt         # 基础拼音数据
```

## ⚙️ 配置文件

### 1. GitHub Actions 工作流 (`.github/workflows/deploy.yml`)
自动构建和部署到 GitHub Pages，包含：
- Node.js 环境配置
- 依赖安装和项目构建
- GitHub Pages 部署设置

### 2. Jekyll 配置 (`_config.yml`)
GitHub Pages 主题和元数据配置：
- 使用 `jekyll-theme-minimal` 主题
- 项目信息和描述
- 排除不需要的目录

## 🌐 访问地址

项目部署后可通过以下地址访问：

- **主页**: `https://[username].github.io/pinyin-converter/`
- **演示页面**: `https://[username].github.io/pinyin-converter/demo.html`
- **编辑器测试**: `https://[username].github.io/pinyin-converter/test-editor.html`
- **兼容性测试**: `https://[username].github.io/pinyin-converter/test-github-pages.html`

## 🧪 本地测试

在本地测试 GitHub Pages 设置：

```bash
cd docs
python -m http.server 8081
```

然后访问：
- http://localhost:8081/test-github-pages.html (兼容性测试)
- http://localhost:8081/demo.html (主演示页面)
- http://localhost:8081/test-editor.html (编辑器测试)

## 🔧 部署步骤

### 1. 创建 GitHub 仓库
1. 在 GitHub 上创建新仓库 `pinyin-converter`
2. 将本地代码推送到仓库

### 2. 启用 GitHub Pages
1. 进入仓库 Settings > Pages
2. Source 选择 "Deploy from a branch"
3. Branch 选择 "main" 和 "/docs" 文件夹
4. 点击 Save

### 3. 自动部署
GitHub Actions 会自动触发部署流程：
- 构建 TypeScript 项目
- 复制文件到 docs 目录
- 部署到 GitHub Pages

## 📋 功能验证清单

### ✅ 核心功能
- [x] 汉字转拼音基础功能
- [x] 多音字识别和显示
- [x] 编辑模式支持
- [x] 多种拼音格式输出
- [x] 文件路径正确配置

### ✅ GitHub Pages 兼容性
- [x] 所有文件路径使用相对路径
- [x] JavaScript 文件正确加载
- [x] 拼音数据文件可访问
- [x] 跨域请求处理
- [x] 移动端适配

### ✅ 部署配置
- [x] GitHub Actions 工作流配置
- [x] Jekyll 配置文件
- [x] 文档结构优化
- [x] 测试页面创建

## 🎯 使用说明

### 基本使用
1. 访问演示页面
2. 在输入框中输入汉字文本
3. 选择所需的转换选项
4. 点击"转换"按钮
5. 查看拼音结果

### 编辑模式
1. 切换到"编辑"标签页
2. 直接点击拼音进行修改
3. 多音字会显示选择框
4. 支持添加新的拼音项
5. 保存修改或重置到原始结果

### 高级选项
- **声调样式**: 符号声调、数字声调、无声调
- **分隔符**: 空格、无分隔、自定义
- **大小写**: 保持小写或首字母大写
- **非中文字符**: 保留或移除

## 🔍 故障排除

### 常见问题

1. **页面加载缓慢**
   - 检查网络连接
   - 确认 GitHub Pages 状态

2. **拼音数据加载失败**
   - 验证 pinyin-data 文件完整性
   - 检查浏览器控制台错误信息

3. **编辑模式无法使用**
   - 确保 JavaScript 已启用
   - 检查浏览器兼容性

### 调试工具

使用 `test-github-pages.html` 页面进行：
- 文件结构检查
- 数据加载测试
- 功能验证测试

## 📞 支持

如遇到问题，请：
1. 检查浏览器控制台错误信息
2. 使用兼容性测试页面诊断问题
3. 查看 GitHub Actions 构建日志
4. 提交 Issue 到项目仓库

---

**🎉 恭喜！您的拼音转换器已准备好部署到 GitHub Pages！**