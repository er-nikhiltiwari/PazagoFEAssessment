import { useState, useRef, useEffect } from "react";
import InputBox from "./InputBox";
import Message from "./Message";
import useWeatherAPI from "../hooks/useWeatherAPI";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const { fetchWeather, loading } = useWeatherAPI();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatWeatherResponse = (text) => {
    return text
      .replace(/\\n/g, "\n") // Convert escaped newlines to actual newlines
      .replace(/\\/g, "") // Remove remaining backslashes
      .replace(/\*\*/g, "") // Remove markdown bold syntax
      .replace(/\s+/g, " ") // Normalize whitespace
      .trim(); // Remove leading/trailing whitespace
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text: text.trim() };
    const loadingMessage = { sender: "bot", text: "🔍 Fetching weather..." };

    try {
      // Add user message and loading indicator
      setMessages((prev) => [...prev, userMessage, loadingMessage]);

      // Fetch weather data
      const reply = await fetchWeather(text);
      const formattedReply = formatWeatherResponse(reply);

      // Replace loading message with weather data
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: "bot", text: formattedReply },
      ]);
    } catch (error) {
      // Handle error cases
      const errorMessage =
        error.message === "LOCATION_NOT_FOUND"
          ? `I couldn't find the location "${text}". Please check the spelling and try again.`
          : "Sorry, I couldn't fetch the weather information. Please try again.";

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: "bot", text: errorMessage },
      ]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col w-full max-w-xl h-[250px] border rounded-xl shadow-lg bg-white">
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 rounded-t-xl">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-3">
            
            </div>
          ) : (
            messages.map((msg, i) => (
              <Message key={`msg-${i}`} sender={msg.sender} text={msg.text} />
            ))
          )}
          <div ref={messagesEndRef} className="h-[1px]" />
        </div>

        <div className="border-t p-3 bg-white rounded-b-xl">
          <InputBox
            onSend={handleSend}
            disabled={loading}
            placeholder="ㅤ"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
