import AccordionItem from "./AccordionItem";

export default function Accordion({ data }) {
  return (
    <div className="accordion">
      <ul>
        {data.map((el, i) => (
          <AccordionItem
            num={i}
            title={el.title}
            text={el.text}
            key={el.title}
          />
        ))}
      </ul>
    </div>
  );
}
