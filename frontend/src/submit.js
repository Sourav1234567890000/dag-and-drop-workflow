import { useStore } from "./store";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      const result = await response.json();

      alert(
        `Pipeline Results:
        Nodes: ${result.num_nodes}
        Edges: ${result.num_edges}
        Is DAG: ${result.is_dag ? "Yes" : "No"}`
      );
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Error contacting backend!");
    }
  };

  return (
    <button
      onClick={handleSubmit}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      Submit
    </button>
  );
};
