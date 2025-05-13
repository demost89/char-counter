// script.js — 이 안의 모든 내용을 지우고, 아래 코드만 붙여넣으세요

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

  const apiUrl   = `https://open-korean-text.herokuapp.com/tokenize?text=${encodeURIComponent(text)}`;
  const proxyUrl
