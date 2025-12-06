# Project Context

## Purpose
`vite-monkey-utils` 是一個專為 vite-monkey 設計的工具函式庫，提供開發 userscripts（用戶腳本）和瀏覽器擴充時常用的 DOM 操作工具。核心功能包括智能等待 DOM 元素的 `waitForElement` 工具，以及用於 Vite 整合的虛擬模組插件。

## Tech Stack
- **語言**: TypeScript 5.9+ (ESNext, 嚴格模式)
- **構建工具**: tsdown 0.16+
- **測試框架**: Vitest 4.0+
- **代碼檢查**: ESLint 9+ with @antfu/eslint-config
- **包管理器**: pnpm 9.12+
- **目標環境**: ES2023 + DOM APIs
- **模組系統**: 純 ESM

## Project Conventions

### Code Style
- **命名規範**:
  - 函數和變數：camelCase（例：`waitForElement`, `viteMonkeyUtilsPlugin`）
  - 介面和型別：PascalCase（例：`WaitForElementOptions`）
  - 檔案名稱：camelCase
- **TypeScript 規範**:
  - 啟用所有嚴格模式檢查（`strict: true`）
  - 明確標註所有參數和返回值型別
  - 使用函數重載提供型別安全的多重簽名
  - 啟用 `isolatedDeclarations` 和 `verbatimModuleSyntax`
  - 禁止未使用的區域變數（`noUnusedLocals: true`）
- **程式碼組織**:
  - 每個檔案一個主要匯出
  - 相關工具函式群組在子目錄中（如 `utils/`）
  - 匯入路徑使用 `.js` 副檔名（即使是 TypeScript 檔案）
- **註釋與文件**:
  - 程式碼註釋使用繁體中文
  - 說明邏輯流程和條件判斷
  - 錯誤訊息使用繁體中文，包含上下文資訊
- **ESLint 配置**: 使用 @antfu/eslint-config 的預設規則

### Architecture Patterns
- **函數重載模式**: 根據選項參數提供不同的返回型別，確保型別安全
- **選項物件模式**: 使用配置物件作為參數，支援向後相容和易於擴展
- **虛擬模組模式**: Vite 插件使用 `virtual:monkey-utils` 進行運行時注入
- **Promise 非同步模式**: 所有非同步操作返回 Promise，支援 async/await
- **觀察者模式**: 使用 MutationObserver 進行高效 DOM 監控，避免輪詢
- **模組匯出策略**:
  - 主入口點從 utils 重新匯出（支援 tree-shaking）
  - 插件獨立打包供 Vite 整合使用
  - 型別定義檔案包含 source maps

### Testing Strategy
- 使用 Vitest 進行單元測試
- DOM 相關測試使用適當的測試環境
- 所有公開 API 需要測試覆蓋
- 測試檔案位於 `tests/` 目錄
- 執行測試：`pnpm run test`
- 型別檢查：`pnpm run typecheck`

### Git Workflow
- 分支命名：使用描述性前綴（如 `feat/`, `fix/`, `docs/`, `chore/`）
- 提交訊息：清晰描述變更內容
- 重大變更需要遵循 OpenSpec 工作流程：
  1. 建立提案（proposal.md）
  2. 定義任務（tasks.md）
  3. 實施並驗證（`openspec validate --strict`）
  4. 部署後歸檔至 `openspec/changes/archive/`
- **文件語言規範**: 所有 OpenSpec 相關文件（包括 proposal.md、tasks.md、design.md 等）必須使用繁體中文編寫

## Domain Context
- **Userscript 開發領域**: 此專案專注於用戶腳本（userscripts）開發，需要處理動態載入的 DOM 元素和非同步內容
- **DOM 操作需求**:
  - 等待動態插入的元素
  - 處理 SPA（單頁應用）的 DOM 變化
  - 支援可見性判斷和自訂條件
- **Vite 整合**: 作為 vite-monkey 生態系統的一部分，需要與 Vite 構建流程無縫整合

## Important Constraints
- **瀏覽器相容性**: 需要支援現代瀏覽器的 DOM APIs（MutationObserver, Promise）
- **零依賴**: 核心工具不依賴外部套件（除了 Vite 作為 peer dependency）
- **型別安全**: 必須提供完整的 TypeScript 型別定義
- **模組格式**: 僅支援 ESM，不提供 CommonJS 版本
- **打包策略**: 使用 unbundle 模式保留原始結構，Vite 標記為外部依賴

## External Dependencies
- **Peer Dependencies**:
  - `vite` ^7.2.4 - 用於插件整合
- **開發依賴**:
  - TypeScript - 型別系統和編譯
  - tsdown - 構建工具
  - Vitest - 測試執行器
  - ESLint + @antfu/eslint-config - 程式碼檢查
  - bumpp - 版本管理
- **運行時依賴**: 無（純前端工具庫）
