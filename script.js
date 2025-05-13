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

// 외부 API를 이용한 형태소 분석
async function analyzeMorph() {
  const text = inputText.value.trim();
  if (!text) {
    morphList.innerHTML = '';
    return;
  }

  try {
    // 공개 형태소 분석 REST API 호출
    const res  = await fetch(
      `https://open-korean-text.herokuapp.com/tokenize?text=${encodeURIComponent(text)}`
    );
    const data = await res.json();
    const tokens = data.tokens || data;
    morphList.innerHTML = tokens
      .map(tok => `<li>${tok.text} <small>(${tok.pos})</small></li>`)
      .join('');
  } catch (err) {
    console.error('형태소 분석 API 오류:', err);
    morphList.innerHTML = '<li>분석 오류 발생</li>';
  }
}

// 입력할 때마다 실행
inputText.addEventListener('input', () => {
  updateCounts();
  analyzeMorph();
});

// 복사 버튼 기능
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(inputText.value)
    .then(() => alert('텍스트가 복사되었습니다!'))
    .catch(err => console.error('복사 실패:', err));
});
