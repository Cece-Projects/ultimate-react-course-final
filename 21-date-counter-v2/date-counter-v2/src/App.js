import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const date = new Date();
  date.setDate(date.getDate() + count);

  function handleReset() {
    setStep(1);
    setCount(0);
  }

  return (
    <>
      <div className="couter flex">
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>{step}</span>
      </div>

      <div className="couter flex">
        <button onClick={() => setCount((count) => count - step)}>-</button>
        {/* Note:
        I wanted to use the input type number here to ensure the user cannot type any other characters than numners.
        However, using Number() to convert the string to a numeric value while using the input type number 
        introduced another problem.
        Namely, when I tried to use the input field, manually deleting everything and then typing some numbers, 
        the input field always showed a leading zero.
        I could resolve this issue by using parseInt() instead.
        */}
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
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
        {/* Note: This space is intentional as for some reason rendering the template literals 
        the trailing spaces got ignored 🤷🏻‍♀️ */}
        {" "}
        <span>{date.toDateString()}</span>
      </p>
      {(count !== 0 || step !== 1) && (
        <div className="flex">
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
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
