const inputText = document.getElementById('inputText');
const countInclude = document.getElementById('countInclude');
const countExclude = document.getElementById('countExclude');
const wordCount = document.getElementById('wordCount');
const copyBtn = document.getElementById('copyBtn');
const morphList = document.getElementById('morphList');

// 글자 수, 단어 수 계산 함수
function updateCounts() {
  const text = inputText.value;
  countInclude.textContent = text.length;
  countExclude.textContent = text.replace(/\s/g, '').length;
  const words = text.trim().split(/\s+/);
  wordCount.textContent = text.trim() ? words.length : 0;
}

// 형태소 분석 함수
async function analyzeMorph() {
  const text = inputText.value;
  if (!text.trim()) {
    morphList.innerHTML = '';
    return;
  }
  const tokens = await OpenKoreanTextProcessor.tokenize(text);
  const normalized = await OpenKoreanTextProcessor.normalize(tokens);
  const parsed = await OpenKoreanTextProcessor.parse(normalized);
  morphList.innerHTML = parsed.map(item =>
    `<li>${item.text} <small>(${item.pos})</small></li>`
  ).join('');
}

// 이벤트 연결
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
