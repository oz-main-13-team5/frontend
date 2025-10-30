import { useState } from "react";

function App() {
  const [selected, setSelected] = useState("");

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-lg font-bold">라디오 버튼 테스트</h1>

      {/* 첫 번째 버튼 */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          onClick={() => setSelected("option1")}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
            ${selected === "option1" ? "border-green-400" : "border-gray-400"}`}
        >
          {selected === "option1" && <div className="w-3 h-3 rounded-full bg-green-400"></div>}
        </div>
        <span className="text-sm font-medium text-gray-800">옵션 1</span>
      </label>

      {/* 두 번째 버튼 */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          onClick={() => setSelected("option2")}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
            ${selected === "option2" ? "border-green-400" : "border-gray-400"}`}
        >
          {selected === "option2" && <div className="w-3 h-3 rounded-full bg-green-400"></div>}
        </div>
        <span className="text-sm font-medium text-gray-800">옵션 2</span>
      </label>
    </div>
  );
}

export default App;