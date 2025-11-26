# vite-monkey-utils

vite-monkey 的工具函式庫。

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
