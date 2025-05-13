<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>글자 수 세기 & 형태소 분석</title>
  <style>
    :root {
      --primary: #6c63ff;
      --bg: #f7f7f7;
      --card: #fff;
      --text: #333;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
      color: var(--text);
      line-height: 1.6;
    }
    .container {
      max-width: 800px;
      margin: 40px auto;
      background: var(--card);
      border: 2px solid var(--primary);
      border-radius: 6px;
      padding: 16px;
    }
    .tabs {
      display: flex;
      border-bottom: 2px solid var(--primary);
      margin-bottom: 16px;
    }
    .tab-btn {
      flex: 1;
      padding: 8px 0;
      background: none;
      border: none;
      border-bottom: 3px solid transparent;
      cursor: pointer;
      font-size: 14px;
      color: var(--text);
      transition: all .2s;
    }
    .tab-btn.active {
      border-color: var(--primary);
      color: var(--primary);
      font-weight: bold;
    }
    .panel { display: none; }
    .panel.active { display: block; }
    textarea {
      width: 100%;
      box-sizing: border-box;
      height: 180px;
      padding: 8px;
      font-size: 14px;
      border: 1px solid var(--primary);
      border-radius: 4px;
      margin-bottom: 8px;
      resize: vertical;
    }
    .results p {
      margin: 4px 0;
      font-size: 14px;
    }
    button.copy {
      padding: 8px 16px;
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background .2s;
      margin-bottom: 16px;
    }
    button.copy:hover {
      background: #514bc1;
    }
    #morphList {
      list-style: none;
      padding: 0;
      margin: 0;
      max-height: 200px;
      overflow-y: auto;
      font-size: 14px;
    }
    #morphList li {
      padding: 4px 0;
      border-bottom: 1px solid #eee;
    }
    @media (max-width: 600px) {
      .container { padding: 12px; }
      textarea { height: 140px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="tabs">
      <button class="tab-btn active" data-target="count">글자 수</button>
      <button class="tab-btn"        data-target="morph">형태소</button>
    </div>
    <section id="count" class="panel active">
      <textarea id="countInput" placeholder="텍스트를 입력하세요"></textarea>
      <div class="results">
        <p>문자 수 (공백 포함): <span id="countInclude">0</span></p>
        <p>문자 수 (공백 제외): <span id="countExclude">0</span></p>
        <p>단어 수: <span id="wordCount">0</span></p>
      </div>
      <button class="copy" id="copyBtn">복사</button>
    </section>
    <section id="morph" class="panel">
      <textarea id="morphInput" placeholder="형태소를 분석할 텍스트를 입력하세요"></textarea>
      <ul id="morphList"><li>분석 준비 중…</li></ul>
    </section>
  </div>
  <script>
    // 탭 전환
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.target).classList.add('active');
      });
    });
    // 글자 수 기능
    const ci = document.getElementById('countInput');
    ci.addEventListener('input', () => {
      const t = ci.value;
      document.getElementById('countInclude').textContent = t.length;
      document.getElementById('countExclude').textContent = t.replace(/\s/g, '').length;
      document.getElementById('wordCount').textContent = t.trim() ? t.trim().split(/\s+/).length : 0;
    });
    document.getElementById('copyBtn').addEventListener('click', () => {
      navigator.clipboard.writeText(ci.value).catch(() => {});
    });
    // 형태소 분석 기능
    const mi = document.getElementById('morphInput'),
          ml = document.getElementById('morphList');
    mi.addEventListener('input', async () => {
      const txt = mi.value.trim();
      if (!txt) {
        ml.innerHTML = '<li>분석 준비 중…</li>';
        return;
      }
      try {
        const res = await fetch(
          `https://open-korean-text-api.herokuapp.com/tokenize?text=${encodeURIComponent(txt)}`
        );
        const tokens = await res.json();
        ml.innerHTML = tokens.map(tok => `<li>${tok.text} <small>(${tok.pos})</small></li>`).join('');
      } catch (e) {
        console.error(e);
        ml.innerHTML = '<li>분석 오류 발생</li>';
      }
    });
  </script>
</body>
</html>
