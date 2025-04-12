import React, { useState } from "react";

const CursorPopup = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleButtonClick = (e) => {
    const newPos = { x: e.clientX, y: e.clientY };
    const buttonText = e.target.innerText; // 👈 Get the inner text of the clicked button

    setMessage(buttonText);
    setPosition(newPos);
    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="w-screen h-screen relative bg-gray-100">
      {showPopup && (
        <div
          className="absolute bg-black text-white text-sm px-3 py-2 rounded shadow-lg transition-opacity duration-300"
          style={{
            top: position.y,
            left: position.x,
            transform: "translate(-50%, -120%)",
          }}
        >
          {message} <br />
          X: {position.x}, Y: {position.y}
        </div>
      )}

      <div className="m-20 bg-amber-200 p-4 rounded flex flex-col gap-4">
        <button
          onClick={handleButtonClick}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Show Cursor Position
        </button>

        <div
          onClick={handleButtonClick}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          fghf
        </div>
      </div>
    </div>
  );
};

export default CursorPopup;
