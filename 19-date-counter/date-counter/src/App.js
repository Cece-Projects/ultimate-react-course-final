import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <>
      <div className="couter flex">
        <button onClick={() => setStep((step) => step - 1)}>-</button>
        <p>Step: {step}</p>
        <button onClick={() => setStep((step) => step + 1)}>+</button>
      </div>

      <div className="couter flex">
        <button onClick={() => setCount((count) => count - step)}>-</button>
        <p>Count: {count}</p>
        <button onClick={() => setCount((count) => count + step)}>+</button>
      </div>

      <p className="flex">
        <span>
          {count === 0
            ? "Today is "
            : count < 0
            ? `${Math.abs(count)}  days ago was`
            : `${count} days from today is`}
        </span>
        {" "}
        <span>{date.toDateString()}</span>
      </p>
    </>
  );
}

function App() {
  return (
    <main>
      <Counter />
    </main>
  );
}

export default App;
