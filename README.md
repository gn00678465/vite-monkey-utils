# vite-monkey-utils

vite-monkey 的工具函式庫。

## 安裝

### 從 GitHub Packages 安裝

首先，配置 npm 使用 GitHub Packages：

```bash
# 在專案根目錄建立或編輯 .npmrc
echo "@gn00678465:registry=https://npm.pkg.github.com" >> .npmrc
```

然後安裝套件：

```bash
npm install @gn00678465/vite-monkey-utils
# 或
pnpm add @gn00678465/vite-monkey-utils
# 或
yarn add @gn00678465/vite-monkey-utils
```

**注意：** 如果 repository 是私有的，需要先使用 GitHub Personal Access Token 進行身份驗證。

## API

### waitForElement

等待元素出現在 DOM 中，提供進階選項。

```typescript
import { waitForElement } from 'vite-monkey-utils'

// 基本用法 - 等待單一元素
const element = await waitForElement('.target-element')

// 進階用法
const elements = await waitForElement('.list-item', {
  // 超時時間（毫秒）（預設：10000）
  timeout: 5000,
  // 觀察的父元素（預設：document.body）
  parent: document.querySelector('#container'),
  // 等待多個元素（回傳 Element[]）
  multiple: true,
  // 只等待可見元素
  visible: true,
  // 自定義條件函數
  condition: el => el.textContent.includes('Success')
})
```

## 開發

- 安裝依賴：

```bash
pnpm install
```

- 執行單元測試：

```bash
pnpm run test
```

- 建置函式庫：

```bash
pnpm run build
```

## CI/CD

本專案使用 GitHub Actions 進行持續整合與部署：

- **CI 工作流程**: 每次推送到 `main` 分支或建立 Pull Request 時自動執行
  - 型別檢查 (`pnpm typecheck`)
  - 單元測試 (`pnpm test`)
  - 建置專案 (`pnpm build`)
  - 支援 Node.js 18.x 和 20.x

- **發佈工作流程**: 建立 GitHub Release 時自動觸發
  - 執行完整的測試流程
  - 自動發佈到 GitHub Packages

### 如何發佈新版本

1. 更新版本號：
   ```bash
   pnpm bumpp
   ```

2. 推送變更和標籤：
   ```bash
   git push --follow-tags
   ```

3. 在 GitHub 上建立 Release，發佈工作流程會自動執行

## License

MIT
