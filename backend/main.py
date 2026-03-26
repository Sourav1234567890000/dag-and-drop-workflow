from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],      # Allow POST, OPTIONS, etc.
    allow_headers=["*"],      # Allow Content-Type: application/json
)


class Node(BaseModel):
    id: str
    type: str = None
    position: dict = None
    data: dict = None

class Edge(BaseModel):
    id: str = None
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

# DAG CHECK FUNCTION (Topological sort)
def is_dag(nodes, edges):
    graph = {}
    indeg = {}

    # Initialize graph structure
    for n in nodes:
        graph[n.id] = []
        indeg[n.id] = 0

    # Build adjacency list + indegree map
    for e in edges:
        graph[e.source].append(e.target)
        indeg[e.target] += 1

    # Kahn’s algorithm
    queue = [n for n in indeg if indeg[n] == 0]
    visited = 0

    while queue:
        node = queue.pop(0)
        visited += 1
        for neigh in graph[node]:
            indeg[neigh] -= 1
            if indeg[neigh] == 0:
                queue.append(neigh)

    # If visited != nodes => cycle exists
    return visited == len(nodes)

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag
    }
