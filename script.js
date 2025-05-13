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