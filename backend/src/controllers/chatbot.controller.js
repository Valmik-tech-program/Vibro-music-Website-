import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",

      instructions: `
        You are VIBRO AI, a helpful music assistant.

        Your job is to help users with:
        - Music recommendations
        - Music genres
        - Artists
        - Albums
        - Music discovery
        - Music-related questions
        - Mood-based music suggestions

        Keep answers friendly, useful and concise.

        If the question is unrelated to music,
        politely tell the user that you mainly help
        with music-related questions.
      `,

      input: message,
    });

    res.status(200).json({
      success: true,
      reply: response.output_text,
    });

  } catch (error) {
    console.error("Chatbot Error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong with the chatbot",
    });
  }
};