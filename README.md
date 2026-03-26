Task Management — Node-Based Workflow UI
Technical Assessment – Sourav Singh Negi

This project implements a node-based workflow builder using React + React Flow, following the assessment instructions.
The focus is on creating a clean UI and correct functional behavior for the following node types:

Input Node

Text Node (with auto variable detection)

Output Node

Connections (Edges)

Pipeline Execution Preview

`````````````````````````````Features Implemented``````````````
✔ 1. Input Node

Lets user enter:

Input Name

Input Type (Text/File)

Automatically generates an output handle.

Can connect to any Text Node variable input.

✔ 2. Text Node

Accepts user text.

Automatically detects variables in the format:
{{variableName}}

Creates dynamic input handles for each variable detected.

Resizes text area dynamically.

Shows detected variables below the textarea.

Allows connections only after valid variables are typed.

✔ 3. Output Node

Displays the processed final output from connected Text Nodes.

Simple and clean design.

Fully functional with node connections.

✔ 4. Node Connections

Only valid connections allowed:

Input Node → Text Node

Text Node → Output Node

Dynamic handles appear/disappear correctly.

Workflow visually shows the correct DAG (Direct Acyclic Graph).

✔ 5. Pipeline Execution

Backend endpoint:

Receives node structure and input values

Replaces variables inside Text Node

Generates final output in execution order

🛠 Tech Stack
Frontend

React.js

React Flow

Vanilla CSS (clean & minimal)

Context API for node handling (if applicable)

Backend

Node.js + Express

Simple pipeline processor to evaluate node graph

CORS enabled

``````````````````````Project Structure```````````````````````````
project/
 ├── frontend/
 │    ├── src/
 │    │    ├── components/
 │    │    │    └── BaseNode.jsx
 │    │    ├── nodes/
 │    │    │    ├── InputNode.jsx
 │    │    │    ├── TextNode.jsx
 │    │    │    └── OutputNode.jsx
 │    │    └── App.jsx
 │    ├── package.json
 │    └── README.md (optional)
 │
 ├── backend/
 │    ├── server.js
 │    ├── pipelineProcessor.js
 │    └── package.json
 │
 └── README.md  (this file)

▶️ How to Run the Project
1️⃣ Start Backend
cd backend
npm install
node server.js


Backend runs on:
http://localhost:5000

2️⃣ Start Frontend
cd frontend
npm install
npm start


Frontend runs on:
http://localhost:3000

🧪 How to Test the Workflow

Add Input Node → set name “name”

Add Input Node → set name “age”

Add Text Node

Type something like:
Hello, my name is {{name}} and I am {{age}} years old.

Connect:

input1 → name handle

input2 → age handle

Add Output Node and connect Text Node output → Output Node.

Run Pipeline → see final processed string.


