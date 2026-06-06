/* =========================================================================
   創投恐怖故事 · VC Horror Stories — data layer
   ----------------------------------------------------------------------
   來源 (sources):
     · 主要 (primary): 創辦人在 X (Twitter) 上公開分享的貼文截圖,
       由 Grok 翻譯為繁體中文 (本機存檔於 /tmp,未隨站發佈)。
     · 佐證 (corroboration): TechCrunch, "Founders share VC horror stories,
       and some are naming names", Julie Bort, 2026-06-05.

   一頁多區段 (composite):app.js 依 `type` 逐段渲染。每個可見字串都是
   {en,zh} 物件,語言鈕一按全頁切換,無殘留。

   ⚠ 內容性質:以下皆為「創辦人單方面公開分享」的說法,屬個人視角,
     未經獨立查證;部分被點名的創投已公開回應。僅供閱讀與討論。
   ========================================================================= */

window.SITE_META = {
  title:    { en: "VC Horror Stories", zh: "創投恐怖故事" },
  subtitle: { en: "Founders share their worst pitch-room nightmares — and some are naming names.",
              zh: "創辦人說出最不堪的募資惡夢 —— 有些人,直接點名。" }
};

/* 主題 keys 供卡片 tag、篩選與長條圖共用 */
window.SITE_THEMES = [
  { key: "asleep",     en: "Asleep in the room", zh: "當場睡著" },
  { key: "arrogance",  en: "Arrogance & monologues", zh: "傲慢獨白" },
  { key: "bias",       en: "Bias & gatekeeping", zh: "偏見與守門" },
  { key: "absurd",     en: "Absurd & surreal", zh: "荒謬離奇" },
  { key: "power",      en: "Power plays", zh: "權力操弄" },
  { key: "boundary",   en: "Crossing the line", zh: "越界騷擾" },
  { key: "system",     en: "Systemic & structural", zh: "制度之惡" }
];

window.SITE_SECTIONS = [
  /* ============================================================== HERO */
  {
    type: "hero",
    id: "top",
    title:    { en: "Welcome to the pitch room", zh: "歡迎來到募資會議室" },
    subtitle: { en: "A viral X thread turned into a confessional: founders, some of them billionaires, recounting venture capital's most cursed moments — now with chapters from Europe, Japan and Taiwan. Tap any story to read it in full.",
                zh: "一條在 X 上爆紅的串文,變成了一場集體告解 —— 創辦人(其中不乏億萬富翁)輪流講出創投界最不堪的時刻,如今再補上歐洲、日本與台灣的篇章。點任一則故事,讀完整版。" },
    stats: [
      { label: { en: "Horror stories", zh: "恐怖故事" },        value: 15 },
      { label: { en: "Regions", zh: "涵蓋地區" },               value: 5 },
      { label: { en: "Firms named", zh: "被點名創投" },          value: 3 },
      { label: { en: "Views, top post", zh: "最高單篇觀看" },     value: 900000 }
    ]
  },

  /* ====================================================== HALL OF SHAME */
  {
    type: "roster",
    id: "hall-of-shame",
    title:    { en: "Hall of Shame — and they named names", zh: "點名堂 —— 這次,他們指名道姓" },
    subtitle: { en: "Most founders kept the firms anonymous. Cloudflare's billionaire founder Matthew Prince did not. Three of the Valley's most storied names, and what he says they did.",
                zh: "多數創辦人選擇匿名。但 Cloudflare 的億萬富翁創辦人 Matthew Prince 沒有 —— 他直接點了矽谷三大名號,以及他口中他們做過的事。" },
    entries: [
      {
        name: "Sequoia Capital",
        person: { en: "an unnamed partner", zh: "一位未具名合夥人" },
        accused: { en: "Rejected Cloudflare because he believed a woman couldn't lead a security-infrastructure company. (Co-founder: Michelle Zatlyn.)",
                   zh: "拒絕了 Cloudflare,因為他認為「女人無法領導一家安全基礎設施公司」。(共同創辦人為 Michelle Zatlyn。)" },
        by: "Matthew Prince · Cloudflare",
        severity: { en: "Gender bias", zh: "性別偏見" },
        response: { en: "Current Sequoia partner Shaun Maguire replied that he admires Zatlyn and pressed Prince to name the partner. Prince deflected: “Maybe over a drink one day. But I bet you have a good guess already.”",
                    zh: "現任 Sequoia 合夥人 Shaun Maguire 回應說他很欣賞 Zatlyn,並追問 Prince 那位合夥人是誰。Prince 打太極:「也許哪天喝一杯時再說吧。但我猜,你心裡已經有答案了。」" }
      },
      {
        name: "a16z (Andreessen Horowitz)",
        person: { en: "Marc Andreessen & the partner team", zh: "Marc Andreessen 與整個合夥團隊" },
        accused: { en: "A casual intro meeting turned into a full partner-team pitch ambush. One partner said “you look unprepared.” Prince framed the rejection letter they sent.",
                   zh: "一場以為是隨意見面的會,變成整個合夥團隊出席的「推銷會」突襲。其中一人說「你看起來不太有準備」。Prince 把他們寄來的拒絕信裱了起來。" },
        by: "Matthew Prince · Cloudflare",
        severity: { en: "Ambush & condescension", zh: "突襲與輕慢" },
        response: { en: "Former a16z partner Arianna Simpson joined the wider thread with a quip about all the sleeping VCs: “Are VCs ok?? Narcolepsy appears to be running rampant.”",
                    zh: "前 a16z 合夥人 Arianna Simpson 也加入討論,對滿坑滿谷睡著的創投開玩笑:「創投還好嗎??看來嗜睡症正在大流行。」" }
      },
      {
        name: "Khosla Ventures",
        person: { en: "Vinod Khosla", zh: "Vinod Khosla" },
        accused: { en: "Over dinner, after handing Prince a Series C term sheet, he allegedly leaned in while the co-founders were away and offered: fire them, and I'll give you all their shares.",
                   zh: "在給出 C 輪投資條件清單後的晚餐上,趁兩位共同創辦人離席,湊過來提議:把他們解雇,我就把他們的股份全給你。" },
        by: "Matthew Prince · Cloudflare",
        severity: { en: "Splitting the founders", zh: "離間創辦人" },
        response: { en: "Prince later added nuance: “He's extremely smart/clever. Has been an incredible investor — can't argue with his track record.”",
                    zh: "Prince 後來補了一句:「他非常聰明、機敏,一直是個了不起的投資人 —— 他的成績單無從反駁。」" }
      }
    ]
  },

  /* =================================================== THE STORIES (cards) */
  {
    type: "stories",
    id: "stories",
    title:    { en: "The Stories", zh: "恐怖故事檔案" },
    subtitle: { en: "Fifteen entries across five regions — the US X thread, plus Europe, Japan and Taiwan. Filter by the flavour of horror, then tap a card for the full account and its source.",
                zh: "十五則,橫跨五個地區 —— 美國的 X 串文,再加上歐洲、日本與台灣。用「恐怖類型」篩選,再點開卡片看完整故事與出處。" },
    items: [
      {
        slug: "matthew-prince-cloudflare",
        founder: "Matthew Prince",
        handle: "@eastdakota",
        company: { en: "Cloudflare · co-founder & CEO", zh: "Cloudflare · 共同創辦人暨執行長" },
        title:   { en: "Matthew Prince", zh: "Matthew Prince" },
        summary: { en: "“Our two worst VC stories” became three — a gender-biased rejection, an a16z ambush, and a dinner-table attempt to split his founding team.",
                   zh: "「我們最糟的兩段 VC 故事」最後變成三段 —— 一次性別偏見的拒絕、一次 a16z 突襲,還有一場想在餐桌上拆散他創始團隊的提議。" },
        themes: ["bias", "power", "arrogance"],
        named: ["Sequoia", "a16z", "Khosla"],
        meta:  { en: "~900K views · Jun 5, 2026", zh: "約 90 萬次觀看 · 2026/6/5" },
        overview: {
          en: "1. A Sequoia partner rejected Cloudflare because he thought a woman couldn't lead a security-infrastructure company. Really. 🙄\n\n2. I got introduced to @pmarca. The meeting was set for a Monday — that should've been a clue. I thought it was a casual hello; he thought it was a pitch, and brought the entire a16z partner team. What followed was a circus. At one point someone said, “you look unprepared.” Fair — I genuinely wasn't. I framed the rejection letter they sent me.\n\n3. (Added later, after he was reminded) Khosla Ventures wanted into our Series C. After Vinod handed me a term sheet, he took me, Michelle and Lee out to dinner. As it wrapped up, Michelle and Lee got up to use the restroom. Vinod leaned in and said: “I'm very impressed with you — less so with them. How about, if you fire them, I give you all their shares?” The charitable read is that he was testing my character. But I was so angry we never spoke again. I literally blocked his number.",
          zh: "1. 一名紅杉(Sequoia)合夥人拒絕了 Cloudflare,因為他認為女人無法領導一家安全基礎設施公司。真的。🙄\n\n2. 我被介紹給 @pmarca。會議安排在週一,這本該是個線索。我以為這只是個隨意的會面,他卻以為這是個推銷會,帶了整個 a16z 合夥團隊前來。接下來就是一場鬧劇。有一次,其中一人說:「你看起來不太有準備。」這話沒錯,因為我確實沒準備。我把他們寄來的拒絕信裱了起來。\n\n3. (後來被提醒才補上)Khosla Ventures 想要投資我們的 C 輪。Vinod 在給了我一張投資條件清單後,帶我、Michelle 和 Lee 出去吃晚餐。快結束時,Michelle 和 Lee 起身去上廁所。Vinod 湊過來說:「我對你很印象深刻,對他們就沒那麼多了。如果解雇他們,我把他們的股份全給你怎麼樣?」我覺得最寬容的解讀是,這是在測試我的品格。但我實在太生氣了,我們從此再沒說過話。真的把他電話號碼拉黑了。"
        },
        source: { label: { en: "Original thread on X", zh: "X 原始串文" }, url: "https://x.com/eastdakota" }
      },
      {
        slug: "greg-isenberg-asleep",
        founder: "Greg Isenberg",
        handle: "@gregisenberg",
        company: { en: "Late Checkout · founder", zh: "Late Checkout · 創辦人" },
        title:   { en: "Greg Isenberg", zh: "Greg Isenberg" },
        summary: { en: "Pitching a top-3 firm for a $15M Series A. Twelve people in the room. One GP slept through 30+ minutes of it — and everyone just carried on.",
                   zh: "向頂尖前三大創投推銷 1500 萬美元的 A 輪。會議室裡十二個人,一位合夥人睡死了三十多分鐘 —— 而所有人就這樣繼續進行。" },
        themes: ["asleep"],
        named: [],
        meta:  { en: "~110K views · Jun 4, 2026", zh: "約 11 萬次觀看 · 2026/6/4" },
        overview: {
          en: "I once pitched in a boardroom at a top-3 VC firm for a $15M Series A. Twelve people in the meeting. One of the partners fell completely asleep — out cold for a solid 30+ minutes. Nobody mentioned it. Everyone just carried on.\n\nSo I kept presenting my Series A deck to a man slumped, dead asleep, in a Herman Miller chair — and somehow this was treated as normal. That's the VC world.\n\nYou might fly across an entire country to perform for a group of people who may or may not be conscious. It's a dance. Sometimes you lead, sometimes you follow, and sometimes your dance partner is unconscious.",
          zh: "我曾經在頂尖前三大的創投公司會議室裡,為一輪 1500 萬美元的 A 輪融資做簡報。會議室裡有 12 個人。其中一位合夥人完全睡著了,整整 30 多分鐘毫無知覺。沒有人提及這件事,大家就這樣繼續進行。\n\n我繼續向一個坐在 Herman Miller 椅子上昏睡不醒的男人展示我的 A 輪簡報投影片,而這竟然被視為正常。那就是創投世界。\n\n你可能會飛越整個國家,去為一群可能清醒也可能不省人事的人表演。這是一場舞蹈。有時你帶領,有時你跟隨,有時你的舞伴是不省人事的。"
        },
        source: { label: { en: "Original post on X", zh: "X 原始貼文" }, url: "https://x.com/gregisenberg" }
      },
      {
        slug: "liz-wessel-asleep",
        founder: "Liz Wessel",
        handle: "@lizwessel",
        company: { en: "WayUp co-founder · now a VC herself", zh: "WayUp 共同創辦人 · 如今自己也是創投" },
        title:   { en: "Liz Wessel", zh: "Liz Wessel" },
        summary: { en: "2015 Series A: a famous Midas-List partner fell asleep, another scowled the whole time — then they sent a term sheet and acted shocked when she said no.",
                   zh: "2015 年的 A 輪:一位上過 Midas 榜的知名合夥人睡著、另一位全程皺眉 —— 結果他們寄來投資條件清單,還對她婉拒一事表現得很震驚。" },
        themes: ["asleep"],
        named: [],
        meta:  { en: "~47K views · Jun 5, 2026", zh: "約 4.7 萬次觀看 · 2026/6/5" },
        overview: {
          en: "Back in 2015, I was pitching our Series A. One of the partners — a famous Midas List name — fell asleep, while another couldn't stop frowning the entire time.\n\nTwo hours after the investment-committee meeting, I got the call: they wanted to send a term sheet. (And then, somehow, they acted shocked when we didn't accept it.)\n\nFor better or worse, the VC world has changed.",
          zh: "我曾在 2015 年為我們的 A 輪融資推銷一項合作案,其中一位合夥人(著名的 Midas 榜單人物)睡著了,另一位則忍不住一直皺眉。在投資委員會會議結束兩小時後,我接到電話,他們要寄送一份投資條件清單過來。(而不知為何,後來他們還表現得震驚,因為我們沒有接受它。)無論好壞,創投界已經改變了。"
        },
        source: { label: { en: "Original post on X", zh: "X 原始貼文" }, url: "https://x.com/lizwessel" }
      },
      {
        slug: "todd-jackson-monologue",
        founder: "Todd Jackson",
        handle: "@tjack",
        company: { en: "Founder, now a partner at First Round Capital", zh: "創辦人,現為 First Round Capital 合夥人" },
        title:   { en: "Todd Jackson", zh: "Todd Jackson" },
        summary: { en: "2013, raising seed: a partner showed up 25 minutes late, listened for 5, then monologued for 20 about unrelated hot companies. The only pitch he ever walked out of.",
                   zh: "2013 年募種子輪:合夥人遲到 25 分鐘,聽了 5 分鐘,然後對著不相關的熱門公司獨白 20 分鐘。這是他唯一一次中途離席的募資會議。" },
        themes: ["arrogance"],
        named: [],
        meta:  { en: "Palo Alto, 2013", zh: "帕羅奧圖 · 2013" },
        overview: {
          en: "In 2013, my co-founder and I pitched a mid-tier (but well-known, large-AUM) firm. I'll never forget it. A lavish Palo Alto office full of fine decorations, expensive electronics everywhere — all forgotten, batteries dead. Logos of famous companies they'd backed at Series D or E hung on the walls. We were raising a seed round.\n\nThe partner came in 25 minutes late. He listened to about 5 minutes of our pitch, then launched into a long monologue about other, completely unrelated companies that were hot at the time. He held forth for 20 minutes. My co-founder and I just stared at each other, not knowing what was happening.\n\nHe wouldn't stop. So halfway through, we simply stood up, thanked him, and walked out. It's the only pitch meeting I've ever left early.\n\nTo this day I've told this story to hundreds of founders. Those impressions stick. As a VC, your brand is what founders say about you when you're not in the room.",
          zh: "2013 年,我和我的共同創辦人向一家中階(但知名度高、資產管理規模大)公司推銷我們的計畫。我永遠不會忘記那次經歷。帕羅奧圖的豪華辦公室,充滿了各種精緻的裝飾品。辦公室裡到處是昂貴的電子產品,全都已被遺忘,電池也沒電了。牆上掛著他們在 D 輪或 E 輪投資過的知名公司標誌。我們當時正在募資種子輪。\n\n合夥人遲到了 25 分鐘才進來。聽了我們 5 分鐘的簡報,然後就開始對我們長篇大論,講述當時熱門但與我們完全無關的其他領域的公司。他獨白了 20 分鐘。我的共同創辦人和我只是面面相覷,不知道這到底是怎麼回事。\n\n他就是停不下來。所以在他講到一半的時候,我們乾脆站起來,向他道謝,然後就走了出去。這是我唯一一次中途離開的創投會議。\n\n直到今天,我已經向數百位創辦人講過這個故事。這些印象會深深烙印。作為創投,你的品牌就是當你不在房間裡時,創辦人們在背後談論你的內容。"
        },
        source: { label: { en: "Original post on X", zh: "X 原始貼文" }, url: "https://x.com/tjack" }
      },
      {
        slug: "mark-cummins-sandhill",
        founder: "Mark Cummins",
        handle: "@mark_cummins",
        company: { en: "Repeat founder (Plink, Pots)", zh: "連續創業者 (Plink、Pots)" },
        title:   { en: "Mark Cummins", zh: "Mark Cummins" },
        summary: { en: "A VC who unlocked her dark, empty Sand Hill Road office clutching a giant pack of toilet paper — and the time he pitched the receptionist by mistake.",
                   zh: "一位夾著一大包衛生紙、來開鎖進入漆黑空辦公室的 Sand Hill Road 創投 —— 還有他誤把整場簡報講給接待員聽的那次。" },
        themes: ["absurd"],
        named: [],
        meta:  { en: "Sand Hill Road oddities", zh: "Sand Hill Road 怪談" },
        overview: {
          en: "Our second round was brutal. I feel like I pitched every VC firm on Earth. Some of the stranger ones:\n\n— I arrived at a Chinese VC firm on Sand Hill Road. The building was locked, the lights were off, nobody inside. I waited ten minutes past our appointment. A car pulled up; the partner got out with a big pack of toilet paper tucked under one arm. She unlocked the building, turned on the lights, walked me in — then disappeared into the bathroom with her roll of toilet paper. Then, once the bathroom business was concluded, we started the pitch.\n\n— The office of a small deep-tech investment firm. The receptionist greeted me and took me to the conference room. I got set up and waited, and waited, and waited. Eventually someone came in and asked me to begin. Something felt off. I slowly realised I was pitching the receptionist. The partner had double-booked himself and evidently decided this was better than rescheduling.",
          zh: "我們的第二輪融資很艱難。我覺得我已經向地球上每一家創投公司推銷過了。其中一些比較奇怪的:\n\n— 我來到位於 Sand Hill Road 的一家中國創投公司。大樓鎖著門,燈都關了,裡面沒人。我在約定時間後等了十分鐘。一輛車開過來,那位合夥人下車,她一隻手臂下夾著一大包衛生紙。她開鎖進入大樓,打開燈,帶我進去。她拿著她的衛生紙捲消失在廁所裡。然後,廁所處理完畢,我們開始推銷。\n\n— 一家小型深度科技投資公司的辦公室。接待員迎接我,並帶我去會議室。我準備好,等啊等啊等。終於有人走進來,請我開始。感覺有點不對勁。我漸漸意識到,我正在向接待員推銷。那位合夥人把時間安排衝突了,顯然覺得這比重新安排時間更好。"
        },
        source: { label: { en: "Original post on X", zh: "X 原始貼文" }, url: "https://x.com/mark_cummins" }
      },
      {
        slug: "isaiah-taylor-nuclear",
        founder: "Isaiah Taylor",
        handle: "@isaiah_p_taylor",
        company: { en: "Valar Atomics · founder (nuclear energy)", zh: "Valar Atomics · 創辦人 (核能)" },
        title:   { en: "Isaiah Taylor", zh: "Isaiah Taylor" },
        summary: { en: "The VC conversation types he hates most: a $140B “backlog” in a rival's deck, herd money that begs back in, and a rejection threatening “capex unseen since WWII.”",
                   zh: "他最討厭的幾類創投對話:競爭對手簡報裡的 1400 億美元「訂單積壓」、被拒後又拚命想擠回來的跟風資本,以及一封威脅「自二戰以來未見的資本支出」的拒絕信。" },
        themes: ["arrogance"],
        named: [],
        meta:  { en: "On VC archetypes", zh: "談創投的幾種典型" },
        overview: {
          en: "There are a lot of laugh-out-loud stories in this thread — it's warmed my heart. I won't take shots at any specific event, but I will single out the types of VC conversations I dislike the most.\n\n1. “What's your order backlog?” One of our competitors listed a *$140 billion order backlog* in their deck. Hahaha! Why not a trillion? Do you really think cheap energy is a demand-side market risk? What are you even trying to underwrite here?\n\n2. Early on, lots of investors rejected us for not raising enough. Six months later, those same investors were scrambling to push into our follow-on rounds — at valuations far beyond their range. I firmly believe “capital follows capital” is a terrible way to invest. It might work briefly in a hype cycle, but fundamentally you have to believe the cream rises and be good at spotting real quality. Over the long run there's no alpha in herd thinking. Good companies always find a way to raise enough.\n\n3. Once, a top-tier VC told me in a rejection letter that our company would involve “large-scale capital-expenditure management on a scale not seen since World War II.” Uh… based on what? Don't threaten me with a beautiful future, would you??",
          zh: "這裡面有很多讓人捧腹的故事,溫暖了我的心。我不會針對特定事件做任何抨擊,但我會特別點出我最不喜歡的幾類 VC 對話類型。\n\n1. 「你們的訂單積壓是多少?」我們的一個競爭對手在他們的簡報中列出了 *1400 億美元的訂單積壓*。哈哈哈!為什麼不來個一兆呢?你們真的認為廉價能源是市場需求的風險嗎?你們到底想在這裡承銷什麼?\n\n2. 在早期,我們因為募資金額不夠而被很多投資人拒絕。六個月後,那些相同的投資人卻拚命想擠進我們後續的募資輪,而那些輪次的估值遠遠超出他們的投資範圍。我堅信「資本跟隨資本」是一種非常糟糕的投資方式。也許在某些炒作週期中它能短暫奏效,但從根本上來說,你必須相信菁華會浮上檯面,並且擅長辨識什麼才是真正的優質。在長期來看,這種思維方式完全沒有超額報酬。好公司總會找到方法來募得足夠的資金。\n\n3. 有一次,一位一線 VC 在拒絕信中告訴我,這家公司將涉及「大規模資本支出管理,其規模是我們自二戰以來未曾見過的」。呃……基於什麼?別用美好的前景來威脅我好嗎??"
        },
        source: { label: { en: "Original post on X", zh: "X 原始貼文" }, url: "https://x.com/isaiah_p_taylor" }
      },
      {
        slug: "dax-boundary",
        founder: "dax",
        handle: "@thdxr",
        company: { en: "Founder (SST / dev tools)", zh: "創辦人 (SST / 開發者工具)" },
        title:   { en: "dax", zh: "dax" },
        summary: { en: "A partner interrupted his pitch, leaned in to whisper something deeply inappropriate, made an unwanted physical advance — then said he wanted the whole seed round.",
                   zh: "一位合夥人打斷他的簡報,湊近耳邊說了極不得體的話,還做出越界的肢體舉動 —— 然後表示他想包下整個種子輪。" },
        themes: ["boundary", "absurd"],
        named: [],
        meta:  { en: "Pre-pandemic, in person", zh: "疫情前 · 面對面" },
        overview: {
          en: "My worst VC story:\n\nAn [unnamed] partner interrupted my pitch midway. This was pre-pandemic, so it was face to face. He walked right up in front of me, leaned in and whispered something crude and sexual in my ear, then patted me on the backside — and said he wanted to take the entire seed round.\n\nI felt completely violated and walked out on the spot.\n\n(For the record: the meeting was, bizarrely, being held in his bedroom.)",
          zh: "我最糟糕的 VC 故事:\n\n一位〔未具名〕合夥人在我中途打斷了我的 pitch。這是疫情前,所以這些都是面對面進行的。他走到我面前,在我耳邊低語了一句極為粗俗、帶有性意味的話,接著拍了我的屁股 —— 然後說他想要我的整個種子輪。\n\n我感到被徹底冒犯,立即離開了。\n\n(補充一個荒謬的細節:這場會,是在他的臥室裡進行的。)"
        },
        source: { label: { en: "Original post on X", zh: "X 原始貼文" }, url: "https://x.com/thdxr" }
      },
      {
        slug: "anonymous-london",
        founder: { en: "Anonymous founder", zh: "匿名創辦人" },
        handle: "",
        region:  { flag: "🇬🇧", en: "United Kingdom", zh: "英國" },
        company: { en: "From the same viral thread · London", zh: "出自同一串爆紅串文 · 倫敦" },
        title:   { en: "The London Trilogy", zh: "倫敦三連擊" },
        summary: { en: "Three encounters with London VCs: “you'll fail” (then a DM to join the round), an assistant bragging about squeezing a portfolio company, and a French partner calling the founder's parents “failures.”",
                   zh: "與倫敦創投的三次交手:「你會失敗」(隨後又私訊想加入這輪)、一位助理炫耀正在壓榨投資組合公司,以及一位法國合夥人當面說創辦人的父母是「失敗者」。" },
        themes: ["absurd", "arrogance", "bias"],
        named: [],
        meta:  { en: "Source screenshots, author not shown", zh: "截圖出處,未顯示作者" },
        overview: {
          en: "— Pitched a London VC. He told me he liked me as a founder, but my business would never work. Nobody had ever said it so bluntly — usually VCs keep their options open. But he was emphatic: “You might close this round, but you'll just waste a year or two of your life, then fail. The idea doesn't work.” A month later, I got a message from him: “I heard [big name] invested — can we get into your round?” Bro. Seriously?\n\n— Another London VC. While I waited for the partner, I chatted with his assistant, who told me one of their portfolio companies needed a bridge round and he was squeezing them as hard as he possibly could. He said it completely matter-of-factly. Uh… thanks for the transparency, I guess. You look like a great firm.\n\n— The strangest of all time. A French VC with a London office. The assistant received me; on the way up to the conference room he warned me the partner was a bit unconventional. We started the pitch. “What does your father do?” the partner asked, in a heavy French accent. OK, that's new. I said he trained as a theoretical physicist but later went into business. “Aha! Your father is a failure!” “And what does your mother do?” I said she's a biochemist who became a schoolteacher. “Also a failure!” he cried. The assistant was visibly falling apart inside. Was this some bizarre test, or is he just an asshole? I have hundreds of employees; we need the money. “Would you like to hear about my company?” I asked him.",
          zh: "— 向一家倫敦創投推銷。他告訴我,他喜歡我作為創辦人,但我的生意永遠不會成功。我從沒人這樣直說過,通常創投喜歡保留彈性。但他非常明確:「你可能會完成這輪融資,但你只會浪費一兩年的生命,然後失敗,這個想法行不通。」一個月後,我收到他的訊息:「我聽說(大牌)投資了,我們能加入你的輪次嗎?」老兄,認真的嗎?\n\n— 另一家倫敦創投。我在等合夥人到來時,和那位助理聊天。他告訴我他們投資組合中的一家公司需要過橋輪次,他正在盡可能壓榨他們。他說得很直接。呃……謝謝你的透明度,我想,你們看起來是一家很棒的公司。\n\n— 有史以來最奇怪的。一家在倫敦設有辦公室的法國創投。那位助理接見我,我們上樓去會議室的路上,他說那位合夥人有點不按常規出牌。我們開始推銷。「你父親是做什麼的?」那位合夥人用濃重的法國口音問我。好吧,這是個新鮮的。我說他受訓成為理論物理學家,但後來轉行做生意。「啊哈!你父親是個失敗者!」「你母親是做什麼的?」我說她是生化學家,後來成為學校老師。「也是個失敗者!」他驚呼道。那位助理明顯內心在崩潰。這是某種奇怪的考驗,還是他就是個混蛋?我有上百名員工,我們需要資金。「你想聽聽我的公司嗎?」我問他。"
        },
        source: { label: { en: "From the viral X thread", zh: "出自 X 爆紅串文" }, url: "https://techcrunch.com/2026/06/05/founders-share-vc-horror-stories-and-some-are-naming-names/" }
      },
      {
        slug: "mark-pincus-bernies",
        founder: "Mark Pincus",
        handle: "@markpinc",
        company: { en: "Zynga · founder", zh: "Zynga · 創辦人" },
        title:   { en: "Mark Pincus", zh: "Mark Pincus" },
        summary: { en: "The Zynga founder's own sleeping-VC tale, which he described as “Weekend at Bernie's meets Silicon Valley.”",
                   zh: "Zynga 創辦人也有一段「睡著的創投」往事 —— 他形容那是「《魏先生與我》遇上矽谷」。" },
        themes: ["asleep"],
        named: [],
        meta:  { en: "Reported by TechCrunch", zh: "TechCrunch 轉述" },
        overview: {
          en: "Mark Pincus, founder of Zynga, joined the pile-on with his own sleeping-investor story, summing the genre up perfectly: it was, he said, like “Weekend at Bernie's” meets Silicon Valley — a room politely carrying on around a partner who is, for all intents and purposes, not there.\n\n(Recounted in TechCrunch's write-up of the thread; full wording is Pincus's own on X.)",
          zh: "Zynga 創辦人 Mark Pincus 也加入了這場「集體吐槽」,貢獻了自己版本的「睡著投資人」故事,並完美地總結了這個類型:他說那就像電影《魏先生與我》(Weekend at Bernie's)遇上矽谷 —— 整個房間禮貌地圍著一位實際上「已經不在場」的合夥人繼續開會。\n\n(轉述自 TechCrunch 對該串文的報導;完整原文為 Pincus 本人於 X 所發。)"
        },
        source: { label: { en: "Via TechCrunch", zh: "經 TechCrunch 報導" }, url: "https://techcrunch.com/2026/06/05/founders-share-vc-horror-stories-and-some-are-naming-names/" }
      },
      {
        slug: "travis-kalanick-car",
        founder: "Travis Kalanick",
        handle: "@travisk",
        company: { en: "Uber · co-founder", zh: "Uber · 共同創辦人" },
        title:   { en: "Travis Kalanick", zh: "Travis Kalanick" },
        summary: { en: "The Uber co-founder once followed a VC who was trying to leave the building — and kept pitching from the passenger seat of the man's car.",
                   zh: "Uber 共同創辦人曾經一路跟著一位想離開大樓的創投 —— 然後坐進對方的副駕駛座,繼續推銷。" },
        themes: ["absurd"],
        named: [],
        meta:  { en: "Reported by TechCrunch", zh: "TechCrunch 轉述" },
        overview: {
          en: "Not every horror story is about the VC behaving badly — sometimes it's the founder's sheer desperation. Travis Kalanick, co-founder of Uber, recalled following a VC who was trying to leave the building, then continuing his pitch from the passenger seat of the investor's car. The founder-side version of a nightmare: nowhere left to run, so you climb into the getaway vehicle.\n\n(Recounted in TechCrunch's write-up of the thread.)",
          zh: "並不是每個恐怖故事都是創投行為失當 —— 有時恐怖的是創辦人那股孤注一擲的執著。Uber 共同創辦人 Travis Kalanick 回憶,他曾經一路跟著一位試圖離開大樓的創投,然後坐進投資人車子的副駕駛座,繼續他的推銷。這是創辦人視角的惡夢版本:無處可逃,於是你直接爬上對方的逃生車。\n\n(轉述自 TechCrunch 對該串文的報導。)"
        },
        source: { label: { en: "Via TechCrunch", zh: "經 TechCrunch 報導" }, url: "https://techcrunch.com/2026/06/05/founders-share-vc-horror-stories-and-some-are-naming-names/" }
      },
      {
        slug: "julie-fredrickson-rock",
        founder: "Julie Fredrickson",
        handle: "@almostmedical",
        company: { en: "Chaotic Capital · founder-turned-investor", zh: "Chaotic Capital · 創辦人轉投資人" },
        title:   { en: "Julie Fredrickson", zh: "Julie Fredrickson" },
        summary: { en: "Before one meeting she was warned about a rock formation outside the VC's office — shaped, apparently, like male genitalia.",
                   zh: "某次會議前,她被「提醒」要注意創投辦公室外的一塊岩石造景 —— 據說,形狀神似男性生殖器。" },
        themes: ["absurd"],
        named: [],
        meta:  { en: "Reported by TechCrunch", zh: "TechCrunch 轉述" },
        overview: {
          en: "Julie Fredrickson — a founder who became an investor at Chaotic Capital — added a story from the surreal end of the spectrum: ahead of a meeting, she received a pre-emptive warning about a rock formation outside the VC's office that was, shall we say, anatomically suggestive of male genitalia. The kind of detail that tells you everything about a firm's culture before you've shaken a single hand.\n\n(Recounted in TechCrunch's write-up of the thread.)",
          zh: "Julie Fredrickson —— 一位後來成為 Chaotic Capital 投資人的創辦人 —— 貢獻了光譜上最超現實的一則:在一場會議之前,她事先收到「提醒」,要注意那家創投辦公室外的一處岩石造景 —— 怎麼說呢,在解剖學上神似男性生殖器。這種細節,往往在你還沒和任何人握手之前,就已經把一家公司的文化說得清清楚楚。\n\n(轉述自 TechCrunch 對該串文的報導。)"
        },
        source: { label: { en: "Via TechCrunch", zh: "經 TechCrunch 報導" }, url: "https://techcrunch.com/2026/06/05/founders-share-vc-horror-stories-and-some-are-naming-names/" }
      },
      {
        slug: "sifted-survey-europe",
        founder: { en: "Anonymous founders", zh: "匿名創辦人們" },
        handle: "",
        region:  { flag: "🇪🇺", en: "Europe", zh: "歐洲" },
        company: { en: "From Sifted's reader survey · Europe", zh: "出自 Sifted 讀者問卷 · 歐洲" },
        title:   { en: "The Sifted Files", zh: "Sifted 讀者檔案" },
        summary: { en: "Fifty-nine European founders answered anonymously. The greatest hits: a VC who yawned eight times, “you must have very understanding husbands,” and being told to go find “greedy investors.”",
                   zh: "五十九位歐洲創辦人匿名作答。精選輯:打了八次哈欠的創投、「你們的先生一定很體貼吧」,以及被叫去找「貪婪一點的投資人」。" },
        themes: ["bias", "asleep", "arrogance"],
        named: [],
        meta:  { en: "Sifted reader survey · 59 respondents", zh: "Sifted 讀者問卷 · 59 位受訪者" },
        overview: {
          en: "Sifted ran the European version of the same confessional — a reader survey of 59 founders. Over 75% said they'd faced arrogant VCs or been ghosted. A sampler, all anonymised:\n\n— Pitching alongside a female co-founder, a male VC offered: “Wow — you must have very understanding husbands.”\n\n— A serial fintech founder's investor “turned up late, asked no questions, explained nothing… and openly yawned eight times.”\n\n— A first-time founder signed a term sheet, then watched a major fund “drag their heels for months” to run the company's cash down — before trying to renegotiate aggressively.\n\n— A female first-time founder was called “silly” for wanting female decision-makers in the room, and told to go find some “greedy investors” instead.\n\n— Another female CEO noticed the VC made eye contact only with her male co-founder, the entire meeting.\n\n— A Black founder with six years' experience and an exit behind them still faced “sexual overtures [and] racist microaggressions.”",
          zh: "Sifted 做了歐洲版的同款告解 —— 一份 59 位創辦人的讀者問卷。超過 75% 的人說自己遇過傲慢的創投或被已讀不回。以下是匿名摘選:\n\n— 帶著女性共同創辦人去 pitch,一位男性創投說:「哇 —— 你們的先生一定都很體貼吧。」\n\n— 一位連續創業的金融科技創辦人,他的投資人「遲到、不問問題、什麼都不解釋……還公然打了八次哈欠」。\n\n— 一位首次創業者簽了投資條件清單,然後眼睜睜看著一家大型基金「拖了好幾個月」把公司現金耗到見底 —— 接著才來大砍條件、重新談判。\n\n— 一位女性首次創業者,因為希望會議室裡有女性決策者,被說「太天真」,還被叫去找一些「貪婪一點的投資人」。\n\n— 另一位女性執行長發現,整場會議裡創投只跟她的男性共同創辦人有眼神接觸。\n\n— 一位有六年資歷、已經有過一次成功出場的黑人創辦人,仍然遭遇「性暗示與種族微歧視」。"
        },
        source: { label: { en: "Sifted · the full survey", zh: "Sifted · 完整問卷報導" }, url: "https://sifted.eu/articles/founders-vc-horror-stories" }
      },
      {
        slug: "japan-strive-scam-angel",
        founder: "堤 達生 (Tatsuo Tsutsumi)",
        handle: "STRIVE",
        region:  { flag: "🇯🇵", en: "Japan", zh: "日本" },
        company: { en: "STRIVE · a VC warning founders", zh: "STRIVE · 對創辦人示警的創投" },
        title:   { en: "The ¥1M-for-15% Angel", zh: "「100 萬日圓換 15%」的天使" },
        summary: { en: "A Tokyo VC went public about a self-styled angel circling young Kyoto founders with a predatory offer: ¥1,000,000 for 15% of the company.",
                   zh: "一位東京創投公開示警:有個自稱天使的投資人,盯上京都的年輕創辦人,開出掠奪式的條件 —— 100 萬日圓,換公司 15% 股份。" },
        themes: ["power", "system"],
        named: [],
        meta:  { en: "Japan · via The Bridge", zh: "日本 · 經 The Bridge 報導" },
        overview: {
          en: "Not every horror story is a sleeping partner — some are predatory terms dressed up as a lifeline. Tatsuo Tsutsumi, a partner at Japanese VC STRIVE, took to social media to warn founders after hearing of a self-proclaimed “individual investor” offering student founders in Kyoto ¥1,000,000 (about US$9,000) in exchange for 15% of their company.\n\nHis warning, paraphrased: handing over equity is “like surrendering a part of your body,” and cap-table decisions “can never be reversed.” These deals prey on inexperienced founders paired with equally inexperienced money — and if that investor later turns difficult, they become, in his words, “a cancer to the corporation.”\n\nThe advice: learn the minimum finance you need to recognise a predatory deal, find real mentors, and lean on legitimate independent VCs' programmes rather than grabbing the first cheque waved in your face.",
          zh: "不是每個恐怖故事都是睡著的合夥人 —— 有些,是把掠奪式條件包裝成救命繩。日本創投 STRIVE 的合夥人堤達生,在社群媒體上對創辦人示警:他聽說有個自稱「個人投資人」的人,對京都的學生創辦人開出 100 萬日圓(約 9,000 美元)換公司 15% 股份的條件。\n\n他的提醒(大意):讓出股權「就像割讓自己身體的一部分」,而股權結構的決定「永遠無法回頭」。這類交易,專挑沒經驗的創辦人配上同樣沒經驗的錢 —— 一旦那位投資人日後翻臉,用他的話說,就會變成「公司的癌細胞」。\n\n他的建議:把識別掠奪式條件所需的最低財務知識學起來、找到真正的導師,並善用正規獨立創投提供的計畫,而不是抓住第一張在你眼前晃的支票。"
        },
        source: { label: { en: "The Bridge · scam angels", zh: "The Bridge · 詐騙天使" }, url: "https://thebridge.jp/2019/09/scam-angels" }
      },
      {
        slug: "japan-funding-traps",
        founder: { en: "Documented Japanese cases", zh: "日本的真實案例" },
        handle: "",
        region:  { flag: "🇯🇵", en: "Japan", zh: "日本" },
        company: { en: "Japan · startup-finance case studies", zh: "日本 · 新創財務案例" },
        title:   { en: "Japan's quiet term-sheet traps", zh: "日本的隱形條款陷阱" },
        summary: { en: "Less theatrical than a sleeping GP, just as deadly: a fund's 5-year clock that forces a sale, and a single clause that froze a pivot for three months.",
                   zh: "沒有睡著的合夥人那麼戲劇化,卻一樣致命:一支基金 5 年到期的倒數逼公司賣身,以及一條讓轉型卡了三個月的條款。" },
        themes: ["system", "power"],
        named: [],
        meta:  { en: "Japan · documented case studies", zh: "日本 · 公開案例研究" },
        overview: {
          en: "Two recurring Japanese fundraising horrors, drawn from startup-finance case studies rather than a viral thread:\n\n— A healthcare startup spent five years building the business. In year five, the investing fund's redemption deadline came due: with no IPO in sight, the founder was pushed to either sell the company or buy back the fund's stake. In the end, they simply closed it down.\n\n— A real-estate startup, backed by several VCs and CVCs, wanted to pivot. The investment agreement required investor sign-off to amend the business plan — so the pivot sat frozen for three months while three firms negotiated their consent.\n\nThe lesson Japanese founders keep relearning: the scariest line in a term sheet is rarely the valuation. It's the clause about redemption deadlines and pre-approval rights — read it with a lawyer, before you sign.",
          zh: "兩種反覆出現的日本募資恐怖,取自新創財務的案例研究,而非爆紅串文:\n\n— 一家健康照護新創花了五年把事業做起來。到了第五年,投資基金的償還期限到了:在看不到 IPO 的情況下,創辦人被逼著要嘛把公司賣掉、要嘛把基金的股份買回來。最後,他們乾脆把公司收了。\n\n— 一家房地產新創,背後有好幾家 VC 與 CVC。當他們想轉型時,投資合約裡寫著「修改事業計畫需經投資人同意」—— 於是這個轉型整整卡了三個月,只為了讓三家公司談妥各自的同意。\n\n日本創辦人反覆學到的教訓:投資條件清單裡最可怕的一行,往往不是估值,而是關於「償還期限」與「事前同意權」的條款 —— 簽名之前,請和律師一起把它讀完。"
        },
        source: { label: { en: "Money Forward · funding failures", zh: "Money Forward · 資金調達失敗案例" }, url: "https://biz.moneyforward.com/establish/basic/76330/" }
      },
      {
        slug: "taiwan-structural",
        founder: { en: "Raising in Taiwan", zh: "在台灣募資" },
        handle: "",
        region:  { flag: "🇹🇼", en: "Taiwan", zh: "台灣" },
        company: { en: "Taiwan · per VC Gaviann Tseng & angel Elias Ek", zh: "台灣 · 創投 Gaviann Tseng 與天使投資人 Elias Ek 觀點" },
        title:   { en: "The slow, structural horror", zh: "結構性的慢性恐怖" },
        summary: { en: "Taiwan had no viral naming-names tweet. Its horror is quieter and structural: risk-averse corporate money, instruments that aren't even legal, and a government review that grinds deals to a crawl.",
                   zh: "台灣沒有一條爆紅的點名推文。它的恐怖更安靜、更結構性:極度避險的企業資金、連在法律上都不被承認的募資工具,還有把交易拖到龜速的政府審查。" },
        themes: ["system"],
        named: [],
        meta:  { en: "Taiwan · ecosystem account", zh: "台灣 · 生態觀察" },
        overview: {
          en: "Taiwan didn't produce a viral “naming names” thread — so this entry is honest about what it is: the structural, slow-burn version of a VC horror story, as described by local VC Gaviann Tseng and angel investor Elias Ek.\n\n— Risk-averse capital. Local investors, especially corporate-VC arms, “don't really take risk.” They want predictable returns or synergy with an existing business, which means many startups must already show revenue and proven fit before anyone writes a cheque.\n\n— Instruments that aren't legal. SAFE and KISS notes — the global default for fast early rounds — have no legal recognition under Taiwan's company law, and a 20% dividend tax on foreign payouts adds friction for overseas investors.\n\n— Bureaucracy as a brake. Investment reviews (e.g. via the MOEA) slow dealmaking considerably. The workaround founders keep choosing: incorporate in Delaware, Singapore or the Cayman/BVI while operating in Taiwan.\n\n— And the founder-side red flags are universal: chasing pitch-competition fame over real traction, and — as Ek puts it — “founders who refuse to listen usually fail.”",
          zh: "台灣並沒有產生一條爆紅的「點名」串文 —— 所以這一則就誠實地說清楚它是什麼:創投恐怖故事的結構性、慢燒版本,內容取自本地創投 Gaviann Tseng 與天使投資人 Elias Ek 的描述。\n\n— 避險的資金。本地投資人(尤其是企業創投 CVC)「其實不太冒險」。他們要的是可預期的報酬,或與既有事業的綜效 —— 這意味著許多新創必須先做出營收、證明市場契合,才會有人開支票。\n\n— 連法律都不承認的工具。SAFE 與 KISS 這類全球早期募資的預設工具,在台灣公司法下並無法律地位;對境外投資人而言,20% 的境外股利稅又多添了一層摩擦。\n\n— 把交易踩煞車的官僚。投資審查(例如經濟部投審)讓交易明顯變慢。創辦人反覆選擇的繞道方式:在德拉瓦、新加坡或開曼/BVI 設立公司,卻在台灣營運。\n\n— 而創辦人這一側的警訊則放諸四海皆準:追逐 pitch 比賽的名氣勝過真實的成長動能,還有 —— 用 Ek 的話說 ——「不肯聽建議的創辦人,通常都會失敗。」"
        },
        source: { label: { en: "Startup funding in Taiwan (interview)", zh: "台灣新創募資(專訪)" }, url: "https://www.erdincekinci.com/post/startup-funding-in-taiwan-how-to-raise-money-with-vc-gaviann-tseng-and-angel-investor-elias-ek" }
      }
    ]
  },

  /* ============================================== ANATOMY OF HORROR (bars) */
  {
    type: "bars",
    id: "anatomy",
    title:    { en: "Anatomy of a VC horror", zh: "恐怖類型解剖" },
    subtitle: { en: "How the fifteen stories break down by the flavour of nightmare (a story can carry more than one). “Absurd” still wins; the new Asia chapters pile into “systemic.”",
                zh: "把十五則故事按「惡夢類型」拆開來看(一則可橫跨多種)。「荒謬離奇」仍然奪冠;新增的亞洲篇章,則把「制度之惡」一舉推高。" },
    series: [
      { label: { en: "Absurd", zh: "荒謬離奇" },     value: 5 },
      { label: { en: "Asleep", zh: "當場睡著" },     value: 4 },
      { label: { en: "Arrogance", zh: "傲慢獨白" },  value: 4 },
      { label: { en: "Bias", zh: "偏見守門" },       value: 3 },
      { label: { en: "Power play", zh: "權力操弄" }, value: 3 },
      { label: { en: "Systemic", zh: "制度之惡" },   value: 3 },
      { label: { en: "Line crossed", zh: "越界騷擾" }, value: 1 }
    ]
  },

  /* =================================================== QUOTE WALL (quotes) */
  {
    type: "quotes",
    id: "quotes",
    title:    { en: "The Quote Wall", zh: "金句牆" },
    subtitle: { en: "The lines that made the whole internet wince.",
                zh: "讓整個網路一起皺眉(又忍不住轉發)的句子。" },
    quotes: [
      { text: { en: "He thought a woman couldn't lead a security-infrastructure company. Really. 🙄",
                 zh: "他認為女人無法領導一家安全基礎設施公司。真的。🙄" },
        by: "Matthew Prince · Cloudflare" },
      { text: { en: "As a VC, your brand is what founders say about you when you're not in the room.",
                 zh: "作為創投,你的品牌就是當你不在房間裡時,創辦人們在背後談論你的內容。" },
        by: "Todd Jackson" },
      { text: { en: "If you fire them, I'll give you all their shares — how about that?",
                 zh: "如果解雇他們,我把他們的股份全給你怎麼樣?" },
        by: "Vinod Khosla, as recalled by Matthew Prince" },
      { text: { en: "You might fly across an entire country to perform for people who may or may not be conscious. It's a dance.",
                 zh: "你可能會飛越整個國家,去為一群可能清醒也可能不省人事的人表演。這是一場舞蹈。" },
        by: "Greg Isenberg" },
      { text: { en: "Don't threaten me with a beautiful future, would you??",
                 zh: "別用美好的前景來威脅我好嗎??" },
        by: "Isaiah Taylor" },
      { text: { en: "For better or worse, the VC world has changed.",
                 zh: "無論好壞,創投界已經改變了。" },
        by: "Liz Wessel" },
      { text: { en: "Are VCs ok?? Narcolepsy appears to be running rampant.",
                 zh: "創投還好嗎??看來嗜睡症正在大流行。" },
        by: "Arianna Simpson · former a16z partner" },
      { text: { en: "Wow — you must have very understanding husbands.",
                 zh: "哇 —— 你們的先生一定都很體貼吧。" },
        by: "a male VC, to two female co-founders (via Sifted)" },
      { text: { en: "Handing over equity is like surrendering a part of your body — and the cap table can never be reversed.",
                 zh: "讓出股權,就像割讓自己身體的一部分 —— 而股權結構,永遠無法回頭。" },
        by: "堤 達生 Tatsuo Tsutsumi · STRIVE" }
    ]
  },

  /* ============================================ FIELD GUIDE (accordion) */
  {
    type: "accordion",
    id: "field-guide",
    title:    { en: "Field guide to VC horrors", zh: "創投恐怖圖鑑" },
    subtitle: { en: "Six archetypes you may meet in the wild. Know the warning signs.",
                zh: "六種你可能在野外遇到的典型。認得出警訊,才躲得開。" },
    qa: [
      { q: { en: "😴 The Sleeper", zh: "😴 沉睡者" },
        a: { en: "Falls asleep mid-pitch and somehow still sends a term sheet. The room performs around them as if it's normal. Spotted by: Greg Isenberg, Liz Wessel, Mark Pincus.",
             zh: "在簡報中途睡著,事後卻照樣寄來投資條件清單。整個房間圍著他繼續演,彷彿一切正常。目擊者:Greg Isenberg、Liz Wessel、Mark Pincus。" } },
      { q: { en: "🎤 The Monologuer", zh: "🎤 獨白俠" },
        a: { en: "Arrives late, listens for five minutes, then talks over you for twenty about companies that have nothing to do with yours. Spotted by: Todd Jackson.",
             zh: "遲到入場,聽你講五分鐘,接著對著跟你毫無關係的公司獨白二十分鐘。目擊者:Todd Jackson。" } },
      { q: { en: "🚪 The Biased Gatekeeper", zh: "🚪 偏見守門人" },
        a: { en: "Rejects you over who you are rather than what you've built — your gender, your parents, your background. Spotted by: Matthew Prince (the Sequoia story), the anonymous London founder (the French partner).",
             zh: "他拒絕你,是因為「你是誰」而不是「你做了什麼」—— 你的性別、你的父母、你的出身。目擊者:Matthew Prince(紅杉那段)、匿名倫敦創辦人(那位法國合夥人)。" } },
      { q: { en: "🐑 The Herd Follower", zh: "🐑 跟風者" },
        a: { en: "Passes on you, then begs to get in the moment a big name invests — at a valuation way outside their range. Capital following capital. Spotted by: Isaiah Taylor, the anonymous London founder.",
             zh: "先放掉你,等大牌一進場就拚命想擠進來 —— 估值早已超出他們的射程。資本跟著資本跑。目擊者:Isaiah Taylor、匿名倫敦創辦人。" } },
      { q: { en: "♟️ The Power Player", zh: "♟️ 權力玩家" },
        a: { en: "Tries to turn you against your own co-founders, dangling their equity as the prize. Spotted by: Matthew Prince (the Khosla dinner).",
             zh: "試圖挑撥你和共同創辦人的關係,還把對方的股份當成獎品掛在你面前。目擊者:Matthew Prince(Khosla 的那頓晚餐)。" } },
      { q: { en: "🚫 The Boundary-Crosser", zh: "🚫 越界者" },
        a: { en: "Makes inappropriate comments or advances and treats the pitch like leverage. Spotted by: dax (@thdxr); and, in Sifted's European survey, a founder who faced sexual overtures and racist microaggressions.",
             zh: "說出不得體的話、做出越界的舉動,還把投資當成籌碼。目擊者:dax(@thdxr);以及 Sifted 歐洲問卷裡,一位遭遇性暗示與種族微歧視的創辦人。" } },
      { q: { en: "🏛️ The System", zh: "🏛️ 制度之牆" },
        a: { en: "Not a person at all — the structural traps: redemption deadlines that force a fire-sale, pre-approval clauses that freeze a pivot, risk-averse local capital, and instruments that aren't even legal where you operate. Spotted in: Japan, Taiwan.",
             zh: "根本不是某個人,而是結構性的陷阱:逼你賤賣的償還期限、凍結轉型的事前同意條款、極度避險的本地資金,以及在你營運的地方根本不合法的募資工具。出沒地:日本、台灣。" } }
    ]
  },

  /* =================================================== WHAT IT MEANS (prose) */
  {
    type: "prose",
    id: "takeaways",
    title:    { en: "Why founders are suddenly talking", zh: "為什麼創辦人突然都說了出來" },
    subtitle: { en: "A thread, a power shift, and a lesson hiding in plain sight.",
                zh: "一條串文、一次權力翻轉,以及一個藏在明處的教訓。" },
    blocks: [
      { type: "p",
        text: { en: "For years, the unwritten rule was simple: never burn a VC in public, because you might need them next round. So founders swallowed the bad behaviour and kept quiet.",
                zh: "多年來,有一條不成文的規矩很簡單:絕不公開得罪創投,因為你下一輪可能還需要他們。於是創辦人把那些不堪都吞了下去,保持沉默。" } },
      { type: "p",
        text: { en: "What changed? Some of these founders now have what Silicon Valley politely calls “FU money.” When Cloudflare's Matthew Prince — a billionaire — names Sequoia, a16z and Khosla on a public timeline, he is no longer asking anyone for permission. The leverage has flipped.",
                zh: "那什麼變了?這些創辦人裡,有些人如今手握矽谷婉轉稱之為「FU money(老子不缺錢)」的本錢。當身為億萬富翁的 Cloudflare 創辦人 Matthew Prince 在公開時間軸上點名紅杉、a16z 和 Khosla,他已經不需要向任何人請求許可了。槓桿,翻轉了。" } },
      { type: "h3",
        text: { en: "The lesson the VCs handed out for free", zh: "創投免費送出的教訓" } },
      { type: "p",
        text: { en: "Todd Jackson said it best, and it cuts both ways: your brand is what people say about you when you're not in the room. Every founder in this thread is, right now, in a room you're not in.",
                zh: "Todd Jackson 講得最好,而且這話兩面都成立:你的品牌,是你不在場時別人怎麼談論你。而此刻,這條串文裡的每一位創辦人,都正在一個你不在的房間裡。" } },
      { type: "h3",
        text: { en: "Three things every one of these stories is really about", zh: "每一則故事其實都在講的三件事" } },
      { type: "ul",
        items: {
          en: ["Respect — or the casual absence of it — toward the person doing the hardest job in the room.",
               "Power — who holds it, who's performing for whom, and what happens when that flips.",
               "Memory — founders remember everything, for a decade or more, and eventually they get a megaphone."],
          zh: ["尊重 —— 或者那種漫不經心的「不尊重」—— 對著房間裡做最難那份工作的人。",
               "權力 —— 誰握著它、誰在為誰表演,以及當這一切翻轉時會發生什麼。",
               "記憶 —— 創辦人什麼都記得,記上十年甚至更久,而他們終究會拿到擴音器。"]
        } },
      { type: "p",
        text: { en: "A fair caveat: the X stories are founders' one-sided, public recollections, not verified accounts — and several named firms have partners who already responded in the thread. The Europe, Japan and Taiwan entries are different in kind: drawn from Sifted's reader survey and documented startup-finance case studies, they trade viral drama for structural truth. Read the whole archive as folklore with receipts — and decide for yourself.",
                zh: "也要公允地提醒一句:X 上的故事是創辦人單方面、公開的回憶,並非查證後的定論 —— 被點名的幾家公司,已有合夥人在串文裡回應。而歐洲、日本與台灣這幾則性質不同:它們取自 Sifted 的讀者問卷與公開的新創財務案例,用爆紅的戲劇性換來了結構性的真實。把整份檔案當成「附帶證據的江湖傳說」來讀 —— 然後自己判斷。" } }
    ]
  },

  /* ============================================================== SOURCE (cta) */
  {
    type: "cta",
    id: "source",
    title: { en: "Read the original reporting", zh: "讀原始報導" },
    text:  { en: "Sources: founders' public X posts (archived locally) and TechCrunch's write-up; Sifted's European reader survey; The Bridge and Money Forward for Japan; and an interview on raising in Taiwan. Stories, quotes and numbers belong to their authors; the curation and bilingual edit are ours.",
             zh: "資料來源:創辦人在 X 上的公開貼文(本機存檔)與 TechCrunch 的報導;Sifted 的歐洲讀者問卷;日本部分取自 The Bridge 與 Money Forward;台灣部分取自一篇募資專訪。故事、引述與數字都屬於原作者;整理與雙語編輯則是我們做的。" },
    link:  { label: { en: "TechCrunch · the full article", zh: "TechCrunch · 完整文章" },
             url: "https://techcrunch.com/2026/06/05/founders-share-vc-horror-stories-and-some-are-naming-names/" }
  }
];
