// 탭 전환
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});

// 글자·단어 수 세기
const countInput = document.getElementById('countInput');
const countInclude = document.getElementById('countInclude');
const countExclude = document.getElementById('countExclude');
const wordCount = document.getElementById('wordCount');
const copyBtn = document.getElementById('copyBtn');

function updateCount() {
  const text = countInput.value;
  countInclude.textContent = text.length;
  countExclude.textContent = text.replace(/\s/g, '').length;
  wordCount.textContent = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

countInput.addEventListener('input', updateCount);
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(countInput.value);
});

// 형태소 분석 (open-korean-text-api 활용) :contentReference[oaicite:0]{index=0}
const morphInput = document.getElementById('morphInput');
const morphList = document.getElementById('morphList');

morphInput.addEventListener('input', async function() {
  const text = this.value.trim();
  if (!text) {
    morphList.innerHTML = '<li>텍스트를 입력하세요.</li>';
    return;
  }
  morphList.innerHTML = '<li>분석 중…</li>';
  try {
    const res = await fetch(
      `https://open-korean-text-api.herokuapp.com/tokenize?text=${encodeURIComponent(text)}`
    );
    const data = await res.json();
    morphList.innerHTML = '';
    data.forEach(tok => {
      const li = document.createElement('li');
      li.textContent = `${tok.text} [${tok.pos}]`;
      morphList.appendChild(li);
    });
  } catch (e) {
    morphList.innerHTML = '<li>분석 오류가 발생했습니다.</li>';
    console.error(e);
  }
});
