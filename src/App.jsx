import { useState } from "react";
import { askAIForAdvice } from "./askAIForAdvice";

export default function App() {
  const [score, setScore] = useState(3);
  const [form, setForm] = useState({
    careTime: "",
    problemsPerWeek: "",
  });

  const [advice, setAdvice] = useState("");

  async function handleSubmit() {
    const result = await askAIForAdvice(form, score);
    setAdvice(result);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>介護AIアドバイザー</h1>

      <label>
        週の問題回数:
        <input
          type="number"
          value={form.problemsPerWeek}
          onChange={(e) =>
            setForm({ ...form, problemsPerWeek: e.target.value })
          }
        />
      </label>
      <br />

      <label>
        介護時間（1日）:
        <input
          type="number"
          value={form.careTime}
          onChange={(e) =>
            setForm({ ...form, careTime: e.target.value })
          }
        />
      </label>
      <br />

      <label>
        スコア:
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
        />
      </label>

      <br /><br />
      <button onClick={handleSubmit}>AI に相談する</button>

      <hr />

      <h2>AIアドバイス</h2>
      <p>{advice}</p>
    </div>
  );
}
