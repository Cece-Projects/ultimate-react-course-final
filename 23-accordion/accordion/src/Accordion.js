import { useState } from "react";
import AccordionItem from "./AccordionItem";

export default function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <div className="accordion">
      <ul>
        {data.map((el, i) => (
          <AccordionItem
            curOpen={curOpen}
            key={el.title}
            num={i}
            onOpen={setCurOpen}
            title={el.title}
          >
            {el.text}
          </AccordionItem>
        ))}
      </ul>

      <AccordionItem
        curOpen={curOpen}
        key="23"
        num={23}
        onOpen={setCurOpen}
        title="Can you click this?"
      >
        <div>
          <p>
            Happy Birthday!
            <span>🥳</span>
          </p>
        </div>
      </AccordionItem>
    </div>
  );
}
