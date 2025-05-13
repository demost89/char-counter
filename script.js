// ——————————————————————————
// 1) 탭 전환 로직
// ——————————————————————————
const tabs = document.querySelectorAll('.menu .tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // active 클래스 제거
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content')
      .forEach(c => c.classList.remove('active'));

    // 클릭된 탭에 active 추가
    tab.classList.add('active');
    document.getElementById(tab.dataset.target)
      .classList.add('active');
  });
});

// ——————————————————————————
// 2) 글자 수 세기 기능
// ——————————————————————————
const inputText     = document.getElementById('inputText');
const countInclude  = document.getElementById('countInclude');
const countExclude  = document.getElementById('countExclude');
const wordCount     = document.getElementById('wordCount');
const copyBtn       = document.getElementById('copyBtn');

function updateCounts() {
  const text = inputText.value;
  countInclude.textContent = text.length;
  countExclude.textContent = text.replace(/\s/g, '').length;
  const words = text.trim().split(/\s+/);
  wordCount.textContent = text.trim() ? words.length : 0;
}
inputText.addEventListener('input', updateCounts);
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(inputText.value)
    .then(() => alert('텍스트가 복사되었습니다!'))
    .catch(() => alert('복사에 실패했습니다.'));
});

// ——————————————————————————
// 3) 형태소 분석 기능
//    (실패 시엔 “분석 준비 중” 메시지 유지)
// ——————————————————————————
const morphInput = document.getElementById('morphInput');
const morphList  = document.getElementById('morphList');

async function analyzeMorph() {
  const text = morphInput.value.trim();
  if (!text) {
    morphList.innerHTML = '<li>분석 준비 중…</li>';
    return;
  }

  try {
    // CORS 이슈가 없는 프록시 경유 호출 (AllOrigins)
    const apiUrl   = `https://open-korean-text.herokuapp.com/tokenize?text=${encodeURIComponent(text)}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;
    const res    = await fetch(proxyUrl);
    const data   = await res.json();
    const tokens = data.tokens || data;
    morphList.innerHTML = tokens
      .map(tok => `<li>${tok.text} <small>(${tok.pos})</small></li>`)
      .join('');
  } catch {
    // 분석 실패 시 메시지 유지
    morphList.innerHTML = '<li>분석 준비 중…</li>';
  }
}

morphInput.addEventListener('input', analyzeMorph);
