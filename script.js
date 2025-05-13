const inputText     = document.getElementById('inputText');
const countInclude  = document.getElementById('countInclude');
const countExclude  = document.getElementById('countExclude');
const wordCount     = document.getElementById('wordCount');
const copyBtn       = document.getElementById('copyBtn');
const morphList     = document.getElementById('morphList');

// 글자 수 & 단어 수 계산
function updateCounts() {
  const text = inputText.value;
  countInclude.textContent = text.length;
  countExclude.textContent = text.replace(/\s/g, '').length;
  const words = text.trim().split(/\s+/);
  wordCount.textContent = text.trim() ? words.length : 0;
}

// AllOrigins 프록시를 통한 형태소 분석
async function analyzeMorph() {
  const text = inputText.value.trim();
  if (!text) {
    morphList.innerHTML = '';
    return;
  }

  // 원 API URL
  const apiUrl   = `https://open-korean-text.herokuapp.com/tokenize?text=${encodeURIComponent(text)}`;
  // CORS 프록시 경유
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;

  try {
    const res  = await fetch(proxyUrl);
    const data = await res.json();           // AllOrigins가 원본 JSON을 그대로 반환
    const tokens = data.tokens || data;      // { tokens: [...] } 또는 [...] 형태 대응
    morphList.innerHTML = tokens
      .map(tok => `<li>${tok.text} <small>(${tok.pos})</small></li>`)
      .join('');
  } catch (err) {
    console.error('형태소 분석 API 오류:', err);
    morphList.innerHTML = '<li>분석 오류 발생</li>';
  }
}

// 입력할 때마다 두 함수 실행
inputText.addEventListener('input', () => {
  updateCounts();
  analyzeMorph();
});

// 복사 버튼 기능
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(inputText
