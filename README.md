# 創投恐怖故事 · VC Horror Stories

> 一份雙語、可互動的靜態網站,收錄創辦人在 X 上公開分享的「創投恐怖故事」—— 而且,有些人直接點名。

2026 年 6 月,一條在 X(Twitter)上爆紅的串文變成了一場集體告解:創辦人(其中不乏億萬富翁)輪流講出創投界最不堪的時刻 —— 當場睡著的合夥人、因性別而被拒絕的募資、想在晚餐桌上拆散創始團隊的提議。本站把這些故事整理成一頁式的雙語檔案,並用「深色驚悚編輯風」呈現,共 **15 則、橫跨 5 個地區**:美國的 X 串文,再加上歐洲(Sifted 讀者問卷)、日本與台灣。內容來源為創辦人公開貼文截圖(由 Grok 翻譯為繁中)、TechCrunch 報導,以及各地區的公開資料(詳見下方來源)。

---

## 🔗 線上版 / Live

| | 網址 |
|---|---|
| 🌐 網站 | <https://tingwei161803.github.io/vc-horror-stories/> |

> ⚠️ 本站設有**關鍵字認證門** —— 需先輸入關鍵字才能看到內容,直接點進去會先看到登入畫面。

---

## ✨ 功能特色

- 🌏 **中英文全頁切換** — 一鍵切換 `中 / EN`,整頁(故事、卡片、導覽、詳情、標題 meta)全部換語言,無任何殘留。
- 🌗 **深色 / 淺色雙主題** — 預設深色(這是恐怖故事集);淺色為「閱讀模式」,偏好記在 `localStorage`。
- 🧱 **複合多區段(composite)** — 一頁由多個區段依序組成:Hero 統計 → 點名堂 → 故事檔案 → 類型解剖長條圖 → 金句牆 → 恐怖圖鑑 → 反思長文 → 來源。
- 🌍 **跨地區** — 每則故事標上地區旗標(🇺🇸 🇬🇧 🇪🇺 🇯🇵 🇹🇼),涵蓋美國、英國、歐洲、日本、台灣。
- 🏷️ **主題篩選** — 故事可依「恐怖類型」(睡著 / 傲慢 / 偏見 / 荒謬 / 權力 / 越界 / 制度之惡)即時篩選,並顯示結果數。
- 🗂️ **點名堂(Hall of Shame)** — 把被指名的創投(Sequoia、a16z、Khosla)做成「案件檔案卡」,標明指控、由誰點名、以及是否已有合夥人公開回應。
- 🔗 **深連結** — 每則故事都有專屬 `#<slug>`,可直接分享到特定故事;支援鍵盤操作與 `Esc` 關閉。
- 🧭 **黏性區段導覽 + scrollspy** — 捲動時自動高亮目前所在區段。
- 🔢 **數字 count-up 動畫**、🖼️ **inline SVG 長條圖**(無圖表函式庫)。
- 📱 **響應式** — 手機、平板、桌機皆適配(已驗證 375px 無水平溢出)。
- ⚡ **純靜態、零 build** — 無後端、無打包工具、可離線開啟,直接部署到任何靜態主機。
- ♿ **基本無障礙** — 互動元件具可存取名稱、鍵盤可操作、尊重 `prefers-reduced-motion`。

---

## 📂 內容結構 / 資料來源

本站內容整理自以下來源(各則故事的卡片底部都附原始連結):

1. **美國 · 主要來源**:創辦人於 **X(Twitter)** 公開分享的貼文截圖,由 Grok 翻譯為繁體中文(原始截圖存於本機 `sources/`,**未隨網站發佈**)。
   涉及創辦人:Matthew Prince(Cloudflare)、Greg Isenberg、Liz Wessel、Todd Jackson、Mark Cummins、Isaiah Taylor、dax(@thdxr)等。
2. **美國 · 佐證來源**:TechCrunch,〈Founders share VC horror stories, and some are naming names〉,作者 Julie Bort,2026-06-05。補齊 Mark Pincus(Zynga)、Travis Kalanick(Uber)、Julie Fredrickson(Chaotic Capital)等未截圖的故事;以及被點名創投的回應(Shaun Maguire / Sequoia、Arianna Simpson / 前 a16z)。
3. **歐洲**:Sifted,〈'You must have very understanding husbands': Founders share their VC horror stories〉—— 59 位創辦人的匿名讀者問卷。
4. **日本**:① The Bridge(2019)——STRIVE 合夥人堤達生對「100 萬日圓換 15%」詐騙天使的公開示警;② Money Forward —— 公開的新創資金調達失敗案例(基金償還期限、事前同意條款)。
5. **台灣**:一篇談台灣募資的專訪(創投 Gaviann Tseng、天使投資人 Elias Ek)。台灣沒有對應的「爆紅點名串文」,因此這一則誠實地以「結構性 / 制度面」的募資困境呈現,而非個人軼事。

```
vc-horror-stories/
├── index.html          # 入口頁(meta / OG / JSON-LD / 字體)
├── assets/
│   ├── styles.css       # MD3 token(深 + 淺)+ 深色驚悚編輯風
│   └── app.js           # 區段渲染註冊表、i18n 全頁切換、篩選、對話框、深連結
├── data/
│   └── data.js          # window.SITE_META / SITE_THEMES / SITE_SECTIONS(雙語)
├── sources/             # 原始截圖存檔(本機,已 gitignore,不發佈)
├── .nojekyll            # 讓 GitHub Pages 跳過 Jekyll
└── README.md
```

> ⚠️ **內容性質與免責**:本站收錄的皆為「創辦人單方面、公開分享」的說法,屬個人視角,**未經獨立查證**;部分被點名的創投已有現任或前任合夥人在同一串文公開回應。請把它當成「附帶證據的江湖傳說」來讀,並自行判斷。故事、引述與觀看數的著作權皆屬原作者;整理與雙語編輯為本專案所做。如為權利人並希望調整或移除內容,請開 issue 聯絡。

---

## 🛠 本機使用

本專案為純靜態網站,不需安裝任何依賴。

```bash
# 1. clone 專案
git clone <your-repo-url>
cd vc-horror-stories

# 2a. 最簡單:直接開啟 index.html
open index.html

# 2b. 或啟動本機伺服器(建議,深連結 #slug 才正常運作)
uv run python -m http.server 4173
# 然後瀏覽 http://localhost:4173
```

### (選配)跑 UX 驗收測試

```bash
# 一次性:下載 Playwright 驅動的 Chromium
uv run --no-project --with playwright playwright install chromium

# 對網站資料夾跑檢查(會自起本機 server、檢查後自動關閉)
uv run --no-project --with playwright python <skill>/scripts/verify.py --dir .
```

> 依使用者偏好,所有 Python 操作一律使用 `uv`,不使用 `pip` / `venv` / 裸 `python3`。

最近一次驗收結果:**11 PASS · 1 SKIP(無全文搜尋,改用主題篩選 chip)· 0 FAIL**。

---

## 🧩 技術棧

純 HTML / CSS / JS,零 build。Material Design 3 token 為基底,重新調色為血紅 + 琥珀的深色編輯風;字體使用 Google Fonts CDN 的 **Fraunces**(英文 display serif)、**Noto Serif TC / Noto Sans TC**(中文)與 **Roboto Flex**。所有資料存成 `window.SITE_*` 全域物件,`app.js` 依 `type` 逐段渲染(section-type registry),新增區段只需在註冊表加一個渲染函式。

---

## 📝 聲明 / License

- 本站為非官方整理,內容著作權歸原始作者(各 X 貼文作者)與 TechCrunch 所有。
- 程式碼以 **MIT** 授權釋出。
- 原始截圖僅作本機存檔與比對之用,未隨網站公開發佈。
