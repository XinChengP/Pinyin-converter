# GitHub Actions 构建故障排除指南

## 构建失败常见问题及解决方案

### 1. Actions 版本过时
**问题**: 使用过时的GitHub Actions版本可能导致构建失败
**解决方案**: 
- 使用最新稳定版本的actions
- 定期检查并更新actions版本

### 2. Node.js 版本兼容性
**问题**: Node.js版本与项目依赖不兼容
**解决方案**:
- 确保GitHub Actions中的Node.js版本与项目engines配置匹配
- 推荐使用Node.js 20 LTS版本

### 3. 依赖安装失败
**问题**: npm ci命令失败
**解决方案**:
- 确保package-lock.json文件存在且最新
- 检查依赖版本冲突
- 尝试使用npm install替代npm ci进行测试

### 4. 构建输出路径问题
**问题**: GitHub Pages无法找到构建产物
**解决方案**:
- 验证构建输出目录存在
- 确保上传路径配置正确
- 检查文件权限和路径格式

### 5. 文件复制问题
**问题**: dist文件未正确复制到docs目录
**解决方案**:
- 在构建流程中添加文件复制步骤
- 验证文件复制命令的执行结果

## 当前配置检查清单

✅ **已修复的问题**:
- [x] 更新actions/upload-pages-artifact到v4版本
- [x] 更新actions/deploy-pages到v4.0.5版本  
- [x] 添加type: module到package.json
- [x] 升级Node.js版本到20
- [x] 添加构建输出验证步骤
- [x] 添加dist文件复制到docs目录的步骤

## 验证步骤

1. **本地构建验证**:
   ```bash
   npm run build
   ```

2. **检查构建输出**:
   ```bash
   ls -la dist/
   ls -la docs/
   ```

3. **验证GitHub Actions日志**:
   - 访问GitHub仓库的Actions标签页
   - 查看最新的构建日志
   - 检查每个步骤的执行结果

## 监控构建状态

构建触发条件:
- 推送到main或master分支
- 创建或更新Pull Request

构建状态可以通过以下方式监控:
- GitHub仓库的Actions标签页
- 提交历史中的状态图标
- GitHub Pages部署状态

## 联系支持

如果问题持续存在，请:
1. 检查GitHub状态页面
2. 查看GitHub Actions官方文档
3. 在GitHub社区寻求帮助