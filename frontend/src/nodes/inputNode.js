// src/nodes/InputNode.js
import { useState, useEffect } from "react";
import { BaseNode } from "../components/BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  useEffect(() => {
    if (data?.onChange) {
      data.onChange(id, { inputName: currName, inputType });
    }
  }, [currName, inputType]);

  return (
    <BaseNode
      id={id}
      title="Input"
      inputs={[]} 
      outputs={[currName]}
    >
      {/* Custom UI inside BaseNode */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "12px" }}>
          Name:
          <input
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            style={{
              width: "90%",
              marginTop: "2px",
              padding: "4px",
              fontSize: "12px",
            }}
          />
        </label>

        <label style={{ fontSize: "12px" }}>
          Type:
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
            style={{
              width: "90%",
              marginTop: "2px",
              padding: "4px",
              fontSize: "12px",
            }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
