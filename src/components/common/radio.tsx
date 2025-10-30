// src/App.tsx
import { useState } from "react";

function App() {
  const [selected, setSelected] = useState("");

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-lg font-bold">라디오 버튼 테스트</h1>

      {/* 첫 번째 버튼 */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          name="group"
          value="option1"
          className="appearance-none w-6 h-6 rounded-full border-2 border-gray-400 checked:border-green-400 checked:bg-green-400 transition-colors"
          checked={selected === "option1"}
          onChange={() => setSelected("option1")}
        />
        <span className="text-sm font-medium text-gray-800">옵션 1</span>
      </label>

      {/* 두 번째 버튼 */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          name="group"
          value="option2"
          className="appearance-none w-6 h-6 rounded-full border-2 border-gray-400 checked:border-green-400 checked:bg-green-400 transition-colors"
          checked={selected === "option2"}
          onChange={() => setSelected("option2")}
        />
        <span className="text-sm font-medium text-gray-800">옵션 2</span>
      </label>
    </div>
  );
}

export default App;
