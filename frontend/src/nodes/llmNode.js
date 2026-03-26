// src/nodes/LLMNode.js
import { BaseNode } from "../components/BaseNode";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={[`${id}-system`, `${id}-prompt`]} // two input handles
      outputs={[`${id}-response`]}             // one output handle
    >
      <div style={{ fontSize: "12px", marginTop: "4px" }}>
        <span>This is a LLM node.</span>
      </div>
    </BaseNode>
  );
};
