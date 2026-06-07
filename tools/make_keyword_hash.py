# /// script
# requires-python = ">=3.9"
# dependencies = []
# ///
"""
make_keyword_hash.py — 產生登入關鍵字的 SHA-256 雜湊。

用途:
    層級 1 認證門 (assets/auth.js) 不把關鍵字明文寫進原始碼,
    而是存「關鍵字的 SHA-256 雜湊」。瀏覽器把使用者輸入也雜湊後比對。
    這支腳本就是用來產生那個雜湊字串,貼到 auth.js 的 KEYWORD_SHA256。

    ⚠ 提醒:這只是「假門」。內容資料 (data/data.js) 仍會被瀏覽器下載,
       懂技術的人可繞過。雜湊只是讓關鍵字本身不直接外露,不保護內容。

用法 (一律走 uv):
    # 互動式輸入(不會留在 shell history,推薦):
    uv run --no-project tools/make_keyword_hash.py

    # 直接帶參數:
    uv run --no-project tools/make_keyword_hash.py "你的關鍵字"

輸出:可直接貼進 assets/auth.js 的那一行。
"""
import hashlib
import sys
from getpass import getpass


def sha256_hex(keyword: str) -> str:
    return hashlib.sha256(keyword.encode("utf-8")).hexdigest()


def main() -> int:
    if len(sys.argv) > 1:
        keyword = sys.argv[1]
    else:
        keyword = getpass("輸入登入關鍵字 (輸入時不顯示): ")

    keyword = keyword.strip()
    if not keyword:
        print("✗ 關鍵字不可為空。", file=sys.stderr)
        return 1

    digest = sha256_hex(keyword)
    print()
    print("✓ 已產生雜湊。把下面這行貼到 assets/auth.js:")
    print()
    print(f'  const KEYWORD_SHA256 = "{digest}";')
    print()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
