# 🏗️ P-MCDM Building Material Selection

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://YOUR_USERNAME.github.io/p-mcdm-web-demo/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-purple)](https://vitejs.dev/)

> **Probabilistic Multi-Criteria Decision Making for Sustainable Building Material Selection**
> 
> 面向可持续建筑材料选择的概率多准则决策分析工具

🌐 **Live Demo** | 在线演示: https://zj7wbusagkqle.ok.kimi.link/

---

## ✨ Features | 功能特性

### 📊 Component-Level Analysis | 组件级别分析

Analyze building components individually with probabilistic rankings:

- **External Wall** | 外墙
- **Floor Slab** | 楼板
- **Roof** | 屋顶
- **Structural Frame** | 结构框架

Each component displays:
- Score distributions with box plots (候选材料得分分布 - 箱线图)
- Probability of Rank 1, P(Rank=1) (概率排名)
- Mean scores and standard deviations (平均值与标准差)

### 🏢 Building Combinations Assessment | 建筑组合评估

- Multi-component performance analysis (多组件组合性能分析)
- Pareto frontier visualization (帕累托前沿可视化)
- Component contribution decomposition (组件贡献度分解)
- Sensitivity heatmaps (敏感性热力图)

### 🔬 MCDM Method Comparison | 多准则决策方法对比

Three Multi-Criteria Decision Making methods supported:

| Method | Description | 中文名 |
|--------|-------------|--------|
| **MIVES** | Weighted Utility Function | 加权效用函数法 |
| **TOPSIS** | Technique for Order Preference by Similarity to Ideal Solution | 逼近理想解排序法 |
| **VIKOR** | VlseKriterijumska Optimizacija I Kompromisno Resenje | 折衷排序法 |

Includes method agreement analysis with Spearman correlation coefficients (包含Spearman相关系数的方法一致性分析).

### 🌱 Biogenic Carbon Impact Analysis | 生物碳影响分析

- Reported GWP vs Fossil-only GWP comparison
- Visualization of ranking shifts due to biogenic carbon accounting (生物碳排名偏移可视化)

### 📋 Scenarios & Priority Profiles | 场景与优先级配置

**Scenarios** | 场景:
- Sustainability × Reported/Fossil-only GWP (可持续性 × Reported/Fossil-only GWP)
- Circularity × Reported/Fossil-only GWP (循环性 × Reported/Fossil-only GWP)

**Priority Profiles** | 优先级配置:
- Baseline (equal weights)
- Economic-first (Economic ×3.0) | 经济优先
- Environmental-first (Environmental ×3.0) | 环境优先
- Social-first (Social ×3.0) | 社会优先
- Technical-first (Technical ×3.0) | 技术优先

Custom weights via interactive sliders (交互式滑块调整自定义权重).

---

## 🖼️ Screenshots | 界面预览

| Component Results | Building Combinations |
|:---:|:---:|
| ![Component Results](docs/screenshot-component.png) | ![Building Combinations](docs/screenshot-building.png) |
| 组件结果页 | 建筑组合页 |

| Method Analysis | Material Lookup |
|:---:|:---:|
| ![Analysis](docs/screenshot-analysis.png) | ![Material Lookup](docs/screenshot-material.png) |
| 方法分析页 | 材料查询页 |

---

## 🚀 Quick Start | 快速开始

### Live Demo | 在线访问
Access the deployed version on Kimi: 直接访问部署在Kimi的演示版本
👉 https://zj7wbusagkqle.ok.kimi.link/

### Local Development | 本地运行

```bash
# Clone the repository | 克隆仓库
git clone https://github.com/YOUR_USERNAME/p-mcdm-web-demo.git
cd p-mcdm-web-demo

# Install dependencies | 安装依赖
npm install

# Start development server | 启动开发服务器
npm run dev

# Build for production | 构建生产版本
npm run build
```

### GitHub Pages Deployment | GitHub Pages 部署

This project is configured for automatic deployment via GitHub Actions 本项目已配置GitHub Actions自动部署:

1. Fork this repository
2. Go to **Settings → Pages**
3. Select **"GitHub Actions"** as Source
4. Visit `https://YOUR_USERNAME.github.io/p-mcdm-web-demo/`

---

## 🛠️ Tech Stack | 技术栈

| Category | Technology | 说明 |
|----------|------------|------|
| Frontend Framework | React 19 + TypeScript | 前端框架 |
| Build Tool | Vite 7 | 构建工具 |
| Styling | Tailwind CSS 3.4 | 样式框架 |
| UI Components | shadcn/ui | UI组件库 |
| Charts | Plotly.js + Recharts | 图表库 |
| Icons | Lucide React | 图标库 |

---

## ⚠️ Important Notice | 重要声明

### Research Prototype Declaration | 研究原型声明

> **This demonstration uses mock data for interface display only.** All material scores, rankings, and statistical indicators are randomly generated demonstration data and do not represent actual calculation results.
> 
> **本演示使用模拟数据进行界面展示**。所有材料得分、排名和统计指标均为随机生成的演示数据，不代表真实计算结果。

### Core Algorithms | 核心算法

This repository contains frontend code only 本仓库仅包含前端界面代码:

| Included ✅ | Not Included ❌ |
|-------------|----------------|
| User Interface (用户界面) | MCDM Core Algorithms (MCDM核心算法) |
| Data Visualization (数据可视化) | RDF Knowledge Graph Engine (RDF知识图谱引擎) |
| Interactive Logic (交互逻辑) | LHS Sampling Computation (LHS采样计算) |

The complete research codebase will be open-sourced after paper publication 完整的研究代码将在相关论文发表后开源.

---

## 📄 Publication Information | 论文信息

- **Title** | 标题: [To be added | 待添加]
- **Authors** | 作者: [To be added | 待添加]
- **Journal/Conference** | 期刊/会议: [To be added | 待添加]
- **Status** | 状态: 📝 Under Review | 审稿中
- **Preprint** | 预印本: [To be added | 待添加]

### Citation | 引用

If you use or reference this work in your research, please cite 如果您在研究中使用或参考了本工作，请使用以下引用格式:

```bibtex
@article{pmcdm2025,
  title={P-MCDM: Probabilistic Multi-Criteria Decision Making for Sustainable Building Material Selection},
  author={[Authors]},
  journal={[Journal]},
  year={2025},
  publisher={[Publisher]}
}
```

---

## 📬 Contact | 联系方式

- 📧 **Email**: [your-email@example.com]
- 🏫 **Institution** | 机构: [Your Institution]
- 🔗 **Website** | 个人主页: [Your Website]

---

## 📜 License | 许可证

This project is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)](https://creativecommons.org/licenses/by-nc-nd/4.0/) 本项目采用 CC BY-NC-ND 4.0 许可证。

You are free to 您可以:
- ✅ **Share** — copy and redistribute the material in any medium or format (在任何媒介或格式中复制、分发该作品)
- ✅ **Attribute** — You must give appropriate credit (您必须给出适当的署名)

Under the following terms 但须遵守以下条件:
- ❌ **NonCommercial** — You may not use the material for commercial purposes (不得用于商业目的)
- ❌ **NoDerivatives** — You may not modify or transform the material (不得修改、转换或基于该作品创作)

See the [LICENSE](./LICENSE) file for full license text 完整许可证文本见LICENSE文件。

---

## 🙏 Acknowledgments | 致谢

- Built with [shadcn/ui](https://ui.shadcn.com/) component library 本项目基于shadcn/ui组件库构建
- Charts powered by [Plotly.js](https://plotly.com/javascript/) 图表可视化由Plotly.js提供支持
- Thanks to all peer reviewers for their feedback and suggestions 感谢所有提供反馈和建议的同行评审专家

---

<div align="center">

**⭐ If this project helps you, please give it a Star! | 如果这个项目对您有帮助，请给它一个Star！**

Made with ❤️ for sustainable construction research

</div>
