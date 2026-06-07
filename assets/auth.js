/* =========================================================================
   創投恐怖故事 — 關鍵字認證門 (層級 1 / soft gate)
   -------------------------------------------------------------------------
   做什麼:
     1. 在 app.js 渲染「之前」攔截啟動 (window.__AUTH_GATE)。
     2. 顯示一個全螢幕登入畫面,要求輸入關鍵字。
     3. 關鍵字正確 → 移除登入畫面,呼叫 window.__BOOT_APP() 才開始渲染內容。

   ⚠ 安全層級:這是「假門」。內容資料 (data/data.js) 仍會被瀏覽器下載,
      懂技術的人能繞過。關鍵字以 SHA-256 雜湊儲存,只是不讓它明文外露,
      並不保護內容本身。若要真正保護,需改用「層級 2:加密內容」。

   要改關鍵字:跑 `uv run --no-project tools/make_keyword_hash.py`,
   把輸出那行貼回下面的 KEYWORD_SHA256。
   ========================================================================= */
(function () {
  "use strict";

  // ---- 設定 ---------------------------------------------------------------
  // 關鍵字的 SHA-256 雜湊(由 tools/make_keyword_hash.py 產生;明文不寫在這裡)。
  // 要換關鍵字就重跑該腳本,把新的一行貼回來。
  const KEYWORD_SHA256 =
    "5eb3707abbaf45282237f69707d7329a3e3fb517f700e494287c568a4c72172d";

  // 記住解鎖用的 storage key。
  const STORE_KEY = "vchs.unlocked";

  // 解鎖記憶策略:sessionStorage = 關掉分頁就要重新輸入(較安全);
  //              localStorage  = 換成這個則長期記住(較方便)。
  //              這一行是你的選擇,兩者擇一即可。
  const store = window.sessionStorage;

  // 告訴 app.js:先別自動渲染,等門解開再說。
  window.__AUTH_GATE = true;

  // ---- 工具:把字串做 SHA-256,輸出 hex -----------------------------------
  async function sha256hex(text) {
    const bytes = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // ---- 解鎖:記住狀態、移除門、啟動 app -----------------------------------
  function unlock(remember) {
    if (remember) {
      try { store.setItem(STORE_KEY, "1"); } catch (_) { /* 隱私模式可能擋 */ }
      // GA4:只在「真的輸對關鍵字進來」時送一次事件(同分頁已記住的重載不算)。
      // 搭配自動的 page_view(在登入畫面就送)可區分「到門口」vs「真進來」。
      if (typeof window.gtag === "function") {
        window.gtag("event", "unlock", { method: "keyword" });
      }
    }
    const gate = document.getElementById("authGate");
    if (gate) {
      gate.classList.add("authgate--out");
      setTimeout(() => gate.remove(), 320);
    }
    document.documentElement.classList.remove("is-locked");
    if (typeof window.__BOOT_APP === "function") window.__BOOT_APP();
  }

  function alreadyUnlocked() {
    try { return store.getItem(STORE_KEY) === "1"; } catch (_) { return false; }
  }

  // ---- 介面接線 -----------------------------------------------------------
  function wireGate() {
    const form  = document.getElementById("authForm");
    const input = document.getElementById("authInput");
    const error = document.getElementById("authError");
    if (!form || !input) return;

    input.focus();

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const guess = input.value.trim();
      if (!guess) return;

      const ok = (await sha256hex(guess)) === KEYWORD_SHA256;
      if (ok) {
        unlock(true);
      } else {
        // 答錯:抖動 + 提示 + 清空,但不洩漏正確答案。
        error.hidden = false;
        form.classList.remove("authgate__form--shake");
        void form.offsetWidth;            // 重啟 CSS 動畫的小技巧
        form.classList.add("authgate__form--shake");
        input.value = "";
        input.focus();
      }
    });
  }

  // ---- 進場 ---------------------------------------------------------------
  function start() {
    if (alreadyUnlocked()) {
      // 之前這個 session 已經解過 → 直接放行,連門都不顯示。
      unlock(false);
      return;
    }
    document.documentElement.classList.add("is-locked");
    wireGate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
