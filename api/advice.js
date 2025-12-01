// api/advice.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { form, score } = req.body;

  const systemPrompt = `
あなたは介護支援のAIアシスタントです。
ユーザーの状況（週の問題回数、重症度、ケア時間など）を踏まえ、
・負担軽減のアドバイス
・利用できる支援制度のヒント
・家庭でできる改善案
・若年ケアラー対応のガイド
を短く、分かりやすく返してください。
`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify({ form, score }) },
      ],
      max_tokens: 200,
    });

    res.status(200).json({
      advice: completion.choices[0].message.content.trim(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI API failed" });
  }
}
