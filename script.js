const inputText = document.getElementById('inputText');
const countInclude = document.getElementById('countInclude');
const countExclude = document.getElementById('countExclude');
const wordCount = document.getElementById('wordCount');
const copyBtn = document.getElementById('copyBtn');

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
    .catch(err => console.error('복사 실패:', err));
});
const morphList = document.getElementById('morphList');

async function analyzeMorph() {
  const text = inputText.value;
  if (!text.trim()) {
    morphList.innerHTML = '';
    return;
  }
  // 형태소 분석 실행
  const tokens = await OpenKoreanTextProcessor.tokenize(text);
  const normalized = await OpenKoreanTextProcessor.normalize(tokens);
  const parsed = await OpenKoreanTextProcessor.parse(normalized);
  // 결과 렌더링
  morphList.innerHTML = parsed.map(item => `
    <li>
      ${item.text} <small>(${item.pos})</small>
    </li>
  `).join('');
}

// 입력 이벤트에 형태소 분석도 연결
inputText.addEventListener('input', () => {
  updateCounts();
  analyzeMorph();
});
