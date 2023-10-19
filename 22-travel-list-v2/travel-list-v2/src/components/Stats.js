export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your list 🚀</em>
      </footer>
    );

  // DERIVED STATE
  // Derived state refers to a computed value based on
  // existing state or props in a component and stored in a variable.
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${numItems} itmes on your list, you have already packed
        
        ${numPacked}
        (${percentage}%)`}
      </em>
    </footer>
  );
}
