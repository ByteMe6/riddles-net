import { useState } from 'react';
import './RiddleChat.scss';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

function RiddleChat() {
  const [riddle, setRiddle] = useState('');
  const [answer, setAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function getRiddle() {
    setLoading(true);
    setError('');
    setResult('');
    setRiddle('');
    setAnswer('');
    setUserAnswer('');
    try {
      const prompt = 'Come up with an interesting riddle in English and give only the riddle, and write the answer separately. RIDDLE MUST BE IN ENGLISH. Format: Riddle: ... Answer: ...';
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });
      const data = await res.json();
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        const text = data.candidates[0].content.parts.map((p) => p.text).join(' ');
        const match = text.match(/Riddle:(.*)Answer:(.*)/is);
        if (match) {
          setRiddle(match[1].trim());
          setAnswer(match[2].trim());
        } else {
          setError('Failed to recognize the riddle. Please try again.');
        }
      } else if (data.error) {
        setError(`Gemini API error: ${data.error.message || 'Unknown error'} (code: ${data.error.code || 'no code'})`);
      } else {
        setError('Error: failed to get a response from Gemini.');
      }
    } catch (e) {
      setError('API connection error: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  function normalizeAnswer(ans) {
    return ans
      .toLowerCase()
      .replace(/^(a|an)\s+/g, '')
      .trim();
  }

  function checkAnswer(e) {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const normalizedUserAnswer = normalizeAnswer(userAnswer);
    const normalizedAnswer = normalizeAnswer(answer);

    if (normalizedUserAnswer === normalizedAnswer) {
      setResult('Correct! 🎉. You can click "get a riddle" and get other one');
    } else {
      setResult('Incorrect. Try another one (click get a riddle)!');
    }
  }

  return (
    <div className="riddle-chat-container">
      <h2 className="riddle-chat-title">Riddles from AI</h2>
      <button
        onClick={getRiddle}
        disabled={loading}
        className={`riddle-chat-button ${loading ? 'riddle-chat-button-disabled' : ''}`}
      >
        {loading ? 'Generating...' : 'Get a riddle'}
      </button>
      {error && <div className="riddle-chat-error">{error}</div>}
      {riddle && (
        <div className="riddle-chat-content">
          <div className="riddle-chat-label">Riddle:</div>
          <div className="riddle-chat-riddle">{riddle}</div>
          <div className="riddle-chat-input-row">
            <input
              type="text"
              placeholder="Your answer..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="riddle-chat-input"
              disabled={!!result}
            />
            <button
              onClick={checkAnswer}
              className="riddle-chat-check-button"
              disabled={!!result}
            >
              Check
            </button>
          </div>
          {result && (
            <div
              className={`riddle-chat-result ${
                result.startsWith('Correct') ? 'riddle-chat-result-correct' : 'riddle-chat-result-incorrect'
              }`}
            >
              {result}
            </div>
          )}
          {result && <div className="riddle-chat-answer">Answer: {answer}</div>}
        </div>
      )}
    </div>
  );
}

export default RiddleChat;