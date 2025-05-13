const inputText = document.getElementById('inputText');
const countInclude = document.getElementById('countInclude');
const countExclude = document.getElementById('countExclude');
const wordCount = document.getElementById('wordCount');

function updateCounts() {
  const text = inputText.value;
  countInclude.textContent = text.length;
  countExclude.textContent = text.replace(/\s/g, '').length;
  const words = text.trim().split(/\s+/);
  wordCount.textContent = text.trim() ? words.length : 0;
}

inputText.addEventListener('input', updateCounts);
const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(inputText.value)
    .then(() => alert('텍스트가 복사되었습니다!'))
    .catch(err => console.error('복사 실패:', err));
});
