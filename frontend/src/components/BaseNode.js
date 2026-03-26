import { Handle, Position } from "reactflow";
import styles from "./BaseNode.module.css";

export const BaseNode = ({ id, title, inputs = [], outputs = [], children }) => {
  return (
    <div className={styles.container}>

      <div className={styles.titleBar}>{title}</div>

      <div className={styles.content}>{children}</div>

      {/* Dynamic input handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input}
          id={input}
          type="target"
          position={Position.Left}
          className={styles.port}
          style={{
            top: 50 + index * 22,   // spacing
          }}
        />
      ))}

      {/* Dynamic output handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output}
          id={output}
          type="source"
          position={Position.Right}
          className={styles.port}
          style={{
            top: 50 + index * 22,
          }}
        />
      ))}
    </div>
  );
};
