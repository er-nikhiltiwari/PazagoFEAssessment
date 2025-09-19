import ChatWindow from "./components/ChatWindow";
import "./App.css";

function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-[100px] h-[250px] bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col">
        <header className="bg-blue-500 text-white text-lg font-semibold p-4 text-center">
          ㅤ
        </header>
        <ChatWindow />
      </div>
    </div>
  );
}

export default App;
