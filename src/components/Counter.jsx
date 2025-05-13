import React, { useState, useEffect } from "react";
const Counter = ({ target, duration}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    const incrementTime = duration / end;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <div className="text-4xl font-bold">
      {count}
    </div>
  );
};

export default Counter;
