import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message, lang } = req.body;
  const systemPrompt =
    lang === "ja"
      ? "あなたは優しくて安心できるゴースト『Guardian Ghost』です。短い言葉で励ましや癒しを伝えてください。"
      : "You are a gentle ghost named Guardian Ghost. Reply in short, comforting, mystical messages.";

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 80,
    });
    const reply = completion.choices[0].message.content.trim();
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI API failed" });
  }
}
