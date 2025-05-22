# RealtimeSalary 💰

> 实时工资计算器 - 看着你的收入每秒增长

一个有趣的实时工资计算器，可以按秒显示你正在赚取的收入。支持多种货币和计算周期，让你直观地感受时间就是金钱。

![RealtimeSalary Demo](realtime-salary.gif)

## ✨ 特性

- 🕐 **实时计算** - 按秒实时更新收入显示
- 💱 **多货币支持** - 支持人民币、美元等多种货币
- 📊 **多种计算周期** - 支持年薪、月薪、日薪等不同计算方式
- 🎯 **精确计算** - 精确到小数点后多位
- 🌙 **深色模式** - 支持明暗主题切换
- 📱 **响应式设计** - 完美适配手机和桌面端
- ⏱️ **计时功能** - 显示已工作时间
- 🎨 **简洁界面** - 干净直观的用户界面

## 🚀 在线体验

[立即体验 RealtimeSalary](https://realtime-salary.mereith.com)

## 📱 功能展示

### 设置页面
- 选择货币类型（人民币、美元等）
- 输入薪资金额
- 选择计算周期（年薪/月薪/日薪等）

### 实时显示页面
- 大字体显示已赚取金额
- 每秒收入详细显示
- 工作计时器
- 月薪/年薪总额显示

## 🛠️ 技术栈

- **前端框架**: [React/原生JS]
- **样式**: CSS3 / Tailwind CSS
- **构建工具**: Vite / Webpack
- **数学计算**: 高精度数值计算
- **响应式**: Flexbox / Grid

## 💻 本地开发

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 快速开始

```bash
# 克隆项目
git clone https://github.com/mereithhh/realtime-salary.git

# 进入项目目录
cd realtime-salary

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📐 计算逻辑

```javascript
// 年薪转换为每秒收入
const perSecond = annualSalary / (365 * 24 * 60 * 60);

// 月薪转换为每秒收入  
const perSecond = monthlySalary / (30 * 24 * 60 * 60);

// 实时累计收入
const currentEarnings = perSecond * elapsedSeconds;
```

## 🎯 使用场景

- 💼 **工作激励** - 看着收入增长保持工作动力
- 📈 **时间价值感知** - 直观感受时间的价值
- 🎓 **理财教育** - 帮助理解被动收入概念
- 🎮 **娱乐工具** - 有趣的数字游戏

## 🌟 截图

| 设置页面 | 计算页面 |
|---------|---------|
| ![设置页面](screenshots/setup.png) | ![计算页面](screenshots/ticker.png) |

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！