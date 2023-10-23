function BillInput({ charge, onAddCharge }) {
  return (
    <div>
      <span>How much was the bill?</span>
      <span> $</span>
      <input type="text" onChange={onAddCharge} value={charge} />
    </div>
  );
}

export default BillInput;
