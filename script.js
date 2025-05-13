// 탭 전환
const tabs = document.querySelectorAll('.tab-btn');
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
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
const mi = document.getElementById('morphInput');
const ml = document.getElementById('morphList');
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
    ml.innerHTML = tokens
      .map(tok => `<li>${tok.text} <small>(${tok.pos})</small></li>`)
      .join('');
  } catch (e) {
    console.error(e);
    ml.innerHTML = '<li>분석 오류 발생</li>';
  }
});
