import { useState } from "react";
import BillInput from "./BillInput";
import SelectPercentage from "./SelectPercentage";
import Output from "./Output";
import Reset from "./Reset";

function App() {
  const [myPercentage, setMyPercentage] = useState(0);
  const [friendsPercentage, setFriendsPercentage] = useState(0);
  const [charge, setCharge] = useState(0);
  const tip = charge * ((myPercentage + friendsPercentage) / 2 / 100);

  function handleAddCharge(e) {
    setCharge(Number(e.target.value));
  }

  function handleReset() {
    setMyPercentage(0);
    setFriendsPercentage(0);
    setCharge(0);
  }

  return (
    <div>
      <BillInput charge={charge} onAddCharge={handleAddCharge} />
      <SelectPercentage
        percentage={myPercentage}
        onSelectPercentage={(e) => setMyPercentage(Number(e.target.value))}
      >
        <span>How did you like the service?</span>
      </SelectPercentage>
      <SelectPercentage
        percentage={friendsPercentage}
        onSelectPercentage={(e) => setFriendsPercentage(Number(e.target.value))}
      >
        <span>How did your friend like the service?</span>
      </SelectPercentage>
      <Output charge={charge} tip={tip} />
      <Reset onReset={handleReset} />
    </div>
  );
}

export default App;
