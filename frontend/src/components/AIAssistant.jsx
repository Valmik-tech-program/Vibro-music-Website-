import { useState } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { sendMessageToBot } from "../services/api";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm VIBRO AI. How can I help you with music?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleSend = async (event) => {
    event.preventDefault();

    if (!message.trim() || loading) {
      return;
    }

    const userMessage = message.trim();

    // Show user's message
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
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I couldn't process your request.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating AI Button */}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-black shadow-2xl transition hover:scale-110 hover:bg-orange-400"
        >
          <Sparkles size={26} />
        </button>
      )}

      {/* Chat Popup */}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[380px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#12100F] shadow-2xl">

          {/* Header */}

          <div className="flex items-center justify-between border-b border-white/10 bg-[#181412] px-5 py-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-black">
                <Sparkles size={20} />
              </div>

              <div>
                <h2 className="font-bold text-white">
                  VIBRO AI
                </h2>

                <p className="text-xs text-stone-500">
                  Music Assistant
                </p>
              </div>

            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-stone-400 hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>

          </div>


          {/* Messages */}

          <div className="flex-1 space-y-4 overflow-y-auto p-5">

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
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
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
                <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-stone-400">
                  Thinking...
                </div>
              </div>
            )}

          </div>


          {/* Input */}

          <form
            onSubmit={handleSend}
            className="border-t border-white/10 p-4"
          >

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">

              <input
                type="text"
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder="Ask about music..."
                className="flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-stone-600"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-black transition hover:bg-orange-400 disabled:opacity-50"
              >
                <Send size={16} />
              </button>

            </div>

          </form>

        </div>
      )}
    </>
  );
};

export default AIAssistant;