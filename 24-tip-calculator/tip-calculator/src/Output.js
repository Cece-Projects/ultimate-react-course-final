function Output({ charge, tip }) {
  return (
    <p>
      You pay ${charge + tip} (${charge} + ${tip} tip)
    </p>
  );
}

export default Output;
