import { useState } from "react";
import { sendMessageToBot } from "../services/api";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const data = await sendMessageToBot(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080706] text-white px-6 py-10">

      <div className="mx-auto max-w-4xl">

        <div className="mb-8">
          <p className="text-sm text-orange-500">
            VIBRO AI
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Your Music Assistant
          </h1>

          <p className="mt-2 text-stone-400">
            Ask me anything about music.
          </p>
        </div>

        <div className="min-h-[500px] rounded-3xl border border-white/10 bg-[#12100F] p-6">

          <div className="space-y-5">

            {messages.length === 0 && (
              <div className="text-center py-20">
                <div className="text-5xl">
                  🎵
                </div>

                <h2 className="mt-5 text-xl font-bold">
                  What are you listening to?
                </h2>

                <p className="mt-2 text-stone-500">
                  Ask VIBRO AI for music recommendations.
                </p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                    msg.sender === "user"
                      ? "bg-orange-500 text-black"
                      : "bg-white/10 text-stone-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white/10 px-5 py-3 text-stone-400">
                  VIBRO AI is thinking...
                </div>
              </div>
            )}

          </div>
        </div>

        <form
          onSubmit={handleSend}
          className="mt-5 flex gap-3"
        >

          <input
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            placeholder="Ask something about music..."
            className="flex-1 rounded-full border border-white/10 bg-[#12100F] px-6 py-4 text-white outline-none placeholder:text-stone-600 focus:border-orange-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-orange-500 px-7 py-4 font-bold text-black transition hover:bg-orange-400 disabled:opacity-50"
          >
            Send
          </button>

        </form>

      </div>

    </div>
  );
};

export default Chatbot;