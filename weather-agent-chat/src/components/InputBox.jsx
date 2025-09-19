import { useState } from "react";
import { Send } from "lucide-react";

function InputBox({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex
        items-center
        w-full
        max-w-lg
        bg-white
        border
        border-gray-150
        rounded-xl
        px-2
        py-2
        focus-within:ring-2
        focus-within:ring-blue-200
        transition-shadow
        shadow-sm
        hover:shadow-md
      "
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ㅤ"
        className="
          flex-1
          h-12
          bg-transparent
          border-none
          outline-none
          text-gray-600
          placeholder-gray-400
          px-2
        "
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled}
        className="
          ml-2
          flex
          items-center
          justify-center
          w-12
          h-12
          bg-blue-500
          rounded-full
          text-white
          hover:bg-blue-300
          disabled:opacity-50
          transition-colors
        "
      >
        <Send size={12} />
      </button>
    </form>
  );
}

export default InputBox;
