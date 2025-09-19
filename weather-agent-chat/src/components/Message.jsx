import ReactMarkdown from "react-markdown";

function Message({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl break-words whitespace-pre-line
          ${isUser 
            ? "bg-blue-400 text-white rounded-br-none" 
            : "bg-gray-200 text-gray-400 rounded-bl-none"
          }
          max-w-[50%] sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]
        `}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Message;
