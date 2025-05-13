// api/tokenize.js
import OpenKoreanTextProcessor from 'open-korean-text';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }
  const { text } = req.query;
  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }
  try {
    const tokens = await OpenKoreanTextProcessor.tokenize(text);
    return res.status(200).json(tokens);
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }
}
