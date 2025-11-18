# 拼音转换器 (Pinyin Converter)

🌟 一个功能强大、易于使用的汉字转拼音工具，支持多音字识别、多种声调格式和灵活的输出选项。

## � 核心特性

- **🔄 智能汉字转拼音** - 完整支持简体和繁体中文
- **🔍 多音字识别** - 自动识别并显示所有可能的读音
- **🎵 多种声调格式** - 符号声调(nǐ)、数字声调(ni3)、无声调(ni)
- **⚙️ 灵活输出选项** - 自定义分隔符、大小写、非中文字符处理
- **💻 全平台支持** - 浏览器、Node.js、TypeScript 完美兼容
- **⚡ 高性能** - 优化的数据结构和加载算法
- **📱 响应式设计** - 适配各种设备和屏幕尺寸

## 🚀 快速开始

### 🌐 浏览器使用（推荐）

```html
<!DOCTYPE html>
<html>
<head>
    <title>拼音转换器示例</title>
    <script src="dist/pinyin-converter.min.js"></script>
</head>
<body>
    <script>
        // 快速开始 - 一行代码即可转换
        const result = PinyinConverter.pinyin('你好世界');
        console.log(result); // "nǐ hǎo shì jiè"
        
        // 高级用法 - 自定义转换选项
        const converter = PinyinConverter.getPinyinConverter();
        const detailed = converter.convert('华风夏韵，洛水天依', {
            toneStyle: 'number',  // 数字声调
            separator: '-'        // 连字符分隔
        });
        console.log(detailed); // "hua2-feng1-xia4-yun4-luo4-shui3-tian1-yi1"        
        
        // 数字声调输出
        const numberResult = converter.convertToString(testText, {
            toneStyle: 'number',
            separator: '-'
        });
        console.log('数字声调:', numberResult); // "hua2-feng1-xia4-yun4-luo4-shui3-tian1-yi1"
        
        // 符号声调输出
        const markResult = converter.convertToString(testText, {
            toneStyle: 'mark',
            separator: ' '
        });
        console.log('符号声调:', markResult); // "huá fēng xià yùn luò shuǐ tiān yī"
    </script>
</body>
</html>
```

### 🖥️ Node.js 使用

```bash
# 安装依赖
npm install

# 在项目中使用
```javascript
const { PinyinConverter } = require('./dist/pinyin-converter.cjs.js');

// 初始化转换器（仅需一次）
const converter = new PinyinConverter();
await converter.init();

// 转换文本 - 多种格式可选
const result = converter.convert('汉字转拼音', {
    toneStyle: 'mark',      // 声调符号: 'mark' | 'number' | 'none'
    heteronym: true,        // 显示多音字
    separator: ' ',         // 分隔符: ' ' | '-' | ''
    lowercase: true        // 小写输出
});

console.log(result);
// 输出: [{origin: "汉", pinyin: ["hàn"], isHeteronym: false}, ...]
```

## � API 参考文档

### 🏗️ 核心类：PinyinConverter

#### 快速初始化
```typescript
// 推荐：使用全局实例（自动初始化）
const converter = PinyinConverter.getPinyinConverter();

// 手动创建实例（需要初始化）
const converter = new PinyinConverter();
await converter.init();
```

#### 主要方法
```typescript
// 核心转换方法
convert(text: string, options?: PinyinOptions): PinyinResult[]

// 快捷字符串转换
convertToString(text: string, options?: PinyinOptions): string

// 获取拼音首字母
getInitials(text: string): string[]

// 统计中文字符数量
countChinese(text: string): number

// 获取所有多音字
getAllHeteronyms(text: string): Array<{char: string, pinyins: string[]}>
```

### ⚙️ 配置选项 (PinyinOptions)

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `toneStyle` | `'mark' \| 'number' \| 'none'` | `'mark'` | 声调格式：符号声调、数字声调、无声调 |
| `heteronym` | `boolean` | `false` | 是否显示多音字的所有读音 |
| `separator` | `' ' \| '-' \| ''` | `' '` | 拼音之间的分隔符 |
| `lowercase` | `boolean` | `true` | 是否使用小写字母 |
| `nonChinese` | `'keep' \| 'remove'` | `'keep'` | 非中文字符的处理方式 |

### 📊 返回结果 (PinyinResult)

```typescript
interface PinyinResult {
    origin: string;       // 原始字符（如："汉"）
    pinyin: string[];     // 拼音数组（如：["hàn"]）
    isHeteronym: boolean; // 是否为多音字
}
```

## 💡 实用示例

### 🎯 基础转换（一行代码搞定）
```javascript
// 最简单的用法
PinyinConverter.pinyin('你好世界');
// 输出: "nǐ hǎo shì jiè"

// 获取详细信息
const converter = PinyinConverter.getPinyinConverter();
converter.convert('你好');
// 输出: [
//   {origin: "你", pinyin: ["nǐ"], isHeteronym: false},
//   {origin: "好", pinyin: ["hǎo"], isHeteronym: false}
// ]
```

### 🔍 多音字智能识别
```javascript
const converter = PinyinConverter.getPinyinConverter();

// 识别多音字
const result = converter.convert('中', { heteronym: true });
// 输出: [{origin: "中", pinyin: ["zhōng", "zhòng"], isHeteronym: true}]

// 批量获取多音字
const heteronyms = converter.getAllHeteronyms('中国银行');
// 输出: [
//   {char: "中", pinyins: ["zhōng", "zhòng"]},
//   {char: "行", pinyins: ["háng", "xíng"]}
// ]
```

### 🎵 声调格式对比
```javascript
const converter = PinyinConverter.getPinyinConverter();
const text = '拼音转换器';

// 符号声调（最常用）
converter.convertToString(text, { toneStyle: 'mark' });
// 输出: "pīn yīn zhuǎn huàn qì"

// 数字声调（便于处理）
converter.convertToString(text, { toneStyle: 'number' });
// 输出: "pin1 yin1 zhuan3 huan4 qi4"

// 无声调（简洁输出）
converter.convertToString(text, { toneStyle: 'none' });
// 输出: "pin yin zhuan huan qi"
```

### ⚙️ 分隔符自定义
```javascript
const converter = PinyinConverter.getPinyinConverter();
const text = '人工智能';

// 空格分隔（默认）
converter.convertToString(text, { separator: ' ' });
// 输出: "rén gōng zhì néng"

// 连字符分隔（适合URL）
converter.convertToString(text, { separator: '-' });
// 输出: "rén-gōng-zhì-néng"

// 无分隔（紧凑输出）
converter.convertToString(text, { separator: '' });
// 输出: "réngōngzhìnéng"
```

### 🚀 高级组合用法
```javascript
const converter = PinyinConverter.getPinyinConverter();

// 数字声调 + 连字符 + 小写（最适合程序处理）
converter.convertToString('机器学习', {
    toneStyle: 'number',
    separator: '-',
    lowercase: true
});
// 输出: "ji1-qi4-xue2-xi2"

// 符号声调 + 无分隔（传统拼音风格）
converter.convertToString('北京', {
    toneStyle: 'mark',
    separator: '',
    lowercase: false
});
// 输出: "BěiJīng"
```

## 🛠️ 开发指南

### 📋 环境要求
- Node.js 14.0 或更高版本
- npm 6.0 或更高版本

### 🔧 开发步骤
```bash
# 1. 克隆项目
git clone https://github.com/XinChengP/Pinyin-converter.git

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 构建项目
npm run build

# 5. 运行测试
npm test
```

### 📦 构建输出
- `dist/pinyin-converter.js` - UMD 格式（浏览器通用）
- `dist/pinyin-converter.min.js` - UMD 压缩版（生产环境）
- `dist/pinyin-converter.esm.js` - ES 模块格式（现代浏览器）
- `dist/pinyin-converter.cjs.js` - CommonJS 格式（Node.js）

## 📁 项目结构

```
Pinyin-converter/
├── src/                    # 📝 源代码
│   ├── index.ts           # 主入口文件
│   ├── converter.ts       # 核心转换器类
│   ├── data-loader.ts     # 高性能数据加载器
│   ├── utils.ts           # 工具函数（包含声调转换）
│   ├── types.ts           # TypeScript 类型定义
│   └── pinyin-data.ts     # 拼音数据处理
├── dist/                  # 📦 构建输出（自动生成）
├── pinyin-data/           # 📊 拼音数据文件
│   ├── pinyin.txt         # 主要拼音数据
│   ├── kMandarin.txt      # 简体字拼音
│   └── ...               # 其他拼音数据源
├── docs/                  # 🌐 GitHub Pages 部署文件
├── demo.html              # 🎯 在线演示页面
├── test-*.html            # 🧪 测试页面
├── package.json           # 📋 项目配置
├── tsconfig.json          # ⚙️ TypeScript 配置
└── rollup.config.js       # 🛠️ 构建配置
```

## 🌐 在线体验

### 🎯 立即体验
打开 [`demo.html`](demo.html) 即可体验完整功能！

✨ **特色功能**：
- 🎯 **智能编辑模式** - 支持多音字选择和声调调整
- 🔍 **多音字高亮** - 自动识别并标注多音字
- 🎵 **实时转换** - 输入即转换，无需等待
- � **响应式设计** - 完美适配手机和电脑

### 🧪 测试页面
- [`test-editor.html`](test-editor.html) - 编辑模式测试
- [`test-tone-position.html`](test-tone-position.html) - 声调位置测试
- [`test-github-pages.html`](test-github-pages.html) - GitHub Pages 兼容性测试

### � 在线访问
项目已配置 GitHub Pages，可以直接在线访问：
```
https://[your-username].github.io/Pinyin-converter/
```

## 📄 数据来源

拼音数据来源于权威的 [mozillazg/pinyin-data](https://github.com/mozillazg/pinyin-data) 项目，包含：

| 文件 | 说明 | 字符数 |
|------|------|--------|
| `pinyin.txt` | 主要拼音数据 | 4万+ |
| `kMandarin.txt` | 简体字拼音数据 | 2.6万+ |
| `kHanyuPinlu.txt` | 汉语拼音频率数据 | 4.1万+ |
| `kXHC1983.txt` | 现代汉语词典数据 | 1.6万+ |

### 🙏 特别感谢

特别感谢 [mozillazg/pinyin-data](https://github.com/mozillazg/pinyin-data) 项目提供的拼音数据支持，为本项目的准确转换奠定了坚实基础！

## 📝 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献指南

我们欢迎各种形式的贡献！

### 🐛 报告问题
- 在 [Issues](https://github.com/your-username/Pinyin-converter/issues) 页面提交
- 提供详细的复现步骤
- 包含环境信息（浏览器/Node.js版本）

### 💡 功能建议
- 在 [Discussions](https://github.com/your-username/Pinyin-converter/discussions) 发起讨论
- 说明使用场景和预期效果
- 欢迎提交 Pull Request

### 📋 开发规范
- 遵循 TypeScript 编码规范
- 添加适当的测试用例
- 更新相关文档

## 📞 联系方式

- 📧 **Issues**: [GitHub Issues](https://github.com/XinChengP/Pinyin-converter/issues)
- 💬 **讨论**: [GitHub Discussions](https://github.com/XinChengP/Pinyin-converter/discussions)
- ⭐ **支持**: 给项目点个 Star 吧！

---

<div align="center">

**🎉 享受拼音转换的乐趣！** 

⭐ 如果这个项目对你有帮助，请给我们一个 Star！

</div>