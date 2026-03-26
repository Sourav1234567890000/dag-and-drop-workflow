// src/nodes/OutputNode.js
import { useState, useEffect } from "react";
import { BaseNode } from "../components/BaseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  // Optional: sync with parent
  useEffect(() => {
    if (data?.onChange) {
      data.onChange(id, { outputName: currName, outputType });
    }
  }, [currName, outputType]);

  return (
    <BaseNode
      id={id}
      title="Output"
      inputs={["input"]} // one input
      outputs={[]}       // no outputs
    >
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
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
            style={{
              width: "90%",
              marginTop: "2px",
              padding: "4px",
              fontSize: "12px",
            }}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
