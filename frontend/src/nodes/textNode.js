import { useState, useEffect, useRef } from "react";
import { BaseNode } from "../components/BaseNode";

// Valid JS variable check
const isValidIdentifier = (name) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name);

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Resize node as user types
  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  // Extract {{variables}}
  const extractVariables = (str) => {
    const regex = /\{\{(.*?)\}\}/g;
    let match;
    const vars = new Set();

    while ((match = regex.exec(str)) !== null) {
      const raw = match[1].trim();
      if (isValidIdentifier(raw)) vars.add(raw);
    }
    return [...vars];
  };

  // Whenever text changes → update variables + resize
useEffect(() => {
  const vars = extractVariables(text);
  setVariables(vars);
  autoResize();
  console.log('Current variable handles:', vars.map(v => `${id}-${v}`));
}, [text]); 


  return (
    <BaseNode
      id={id}
      title="Text"
      // inputs={["input", ...variables.map(v => `${id}-${v}`)]}
      // inputs={variables.map((v) => `${id}-input-${v}`)} // left handles
      inputs={variables}
      outputs={[`${id}-output`]} // one output
    >
      <div style={{ width: "100%", padding: "5px" }}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something… Use {{variable}}"
          style={{
            width: "90%",
            minHeight: "40px",
            fontSize: "12px",
            resize: "none",
            overflow: "hidden",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "6px"
          }}
        />  

        <div style={{ fontSize: "11px", marginTop: "6px", opacity: 0.6 }}>
          Variables detected:{" "}
          {variables.length === 0 ? "None" : variables.join(", ")}
        </div>
      </div>
    </BaseNode>
  );
};
