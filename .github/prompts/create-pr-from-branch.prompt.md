---
name: create-pr-from-branch
description: 建立僅包含當前分支 commits 的 Pull Request
argument-hint: 目標分支名稱（預設：main）
---

建立一個 Pull Request，僅包含當前分支的 commits。

請依照以下步驟執行：

1. 取得當前分支相對於目標分支的 commits：
   ```
   git log --oneline <目標分支>..<當前分支>
   ```

2. 針對每個 commit，取得詳細資訊包含檔案變更統計：
   ```
   git show <commit-hash> --stat
   ```

3. 根據 commit 訊息產生 PR 標題：
   - 單一 commit：直接使用該 commit 訊息作為標題
   - 多個 commits：建立一個總結所有變更的描述性標題

4. 產生完整的 PR 內容描述，應包含：
   - 變更摘要：簡述此 PR 的目的
   - 主要變更：使用條列式列出關鍵更新項目
   - 影響範圍：檔案變更統計資訊
   - Commit 列表：顯示所有 commit 的 hash 與訊息

5. 使用 GitHub CLI 建立 Pull Request：
   ```
   gh pr create --base <目標分支> --head <當前分支> --title "<標題>" --body "<內容>"
   ```

注意：忽略未 staged 的變更，PR 描述中只需包含已提交的變更。
