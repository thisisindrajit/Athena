export const APP_NAME = "Athena";
export const APP_DESCRIPTION =
  "Athena is an AI-powered application designed to revolutionize learning by automatically generating personalized educational courses.";
export const PREFERENCES = {
  LEVEL: [
    "Beginner 🌱", // Seedling for beginner
    "Intermediate 🚀", // Rocket for progressing
    "Advanced 🎓", // Graduation Cap for advanced
  ],
  DURATION: [
    "Short ⚡", // Lightning for quick
    "Medium ⏳", // Hourglass for moderate time
    "Long 🐢", // Turtle for slow and steady
  ],
  FOCUS: [
    "Broad 🌍", // Globe for broad scope
    "In-Depth 🔬", // Microscope for detailed focus
  ],
};


export const mockData = {
  "course_id": "1",
  "title": "Introduction to Quantum Computing",
  "description": "A beginner-friendly introduction to the fascinating world of quantum computing.",
  "preferences": {
      "level": "BEGINNER",
      "duration": "SHORT",
      "focus": "IN-DEPTH"
  },
  "metadata": {
      "count": {
          "modules": 4,
          "lessons": 12,
          "activities": 4
      }
  },
  "modules": [
      {
          "module_id": "1001",
          "title": "Quantum Mechanics Fundamentals",
          "description": "Essential quantum mechanics concepts for quantum computing.",
          "content": [
              {
                  "lesson_id": "100101",
                  "title": "Superposition and Qubits",
                  "description": "Understanding superposition and the qubit.",
                  "content": "## Superposition\nQubits can exist in a superposition of states..."
              },
              {
                  "lesson_id": "100102",
                  "title": "Entanglement",
                  "description": "Exploring the phenomenon of quantum entanglement.",
                  "content": "## Entanglement\nEntanglement is a correlation between qubits..."
              },
              {
                  "activity_id": "100103",
                  "title": "Quiz: Quantum Mechanics Basics",
                  "description": "Test your knowledge of quantum mechanics fundamentals.",
                  "type": "quiz",
                  "content": {
                      "question": "What is superposition?",
                      "options": ["A state of being in two places at once", "A linear combination of states", "A type of quantum gate", "A measurement process"],
                      "answer": 1
                  }
              }]
      },
      {
          "module_id": "1002",
          "title": "Quantum Gates and Circuits",
          "description": "Learn about quantum gates and how to build quantum circuits.",
          "content": [
              {
                  "lesson_id": "100201",
                  "title": "Single-Qubit Gates",
                  "description": "Exploring the Pauli-X, Pauli-Y, Pauli-Z, and Hadamard gates.",
                  "content": "## Single-Qubit Gates\nThese gates operate on a single qubit..."
              },
              {
                  "lesson_id": "100202",
                  "title": "Multi-Qubit Gates",
                  "description": "Understanding CNOT and other multi-qubit gates.",
                  "content": "## Multi-Qubit Gates\nThese gates operate on multiple qubits..."
              },
              {
                  "activity_id": "100203",
                  "title": "Quiz: Quantum Gates",
                  "description": "Test your knowledge of quantum gates.",
                  "type": "quiz",
                  "content": {
                      "question": "What does the Hadamard gate do?",
                      "options": ["Creates entanglement", "Rotates a qubit around the X-axis", "Puts a qubit in superposition", "Measures a qubit"],
                      "answer": 2
                  }
              }
          ]
      },
      {
          "module_id": "1003",
          "title": "Quantum Algorithms",
          "description": "Introduction to famous quantum algorithms.",
          "content": [
              {
                  "lesson_id": "100301",
                  "title": "Deutsch's Algorithm",
                  "description": "A simple algorithm demonstrating quantum speedup.",
                  "content": "## Deutsch's Algorithm\nThis algorithm solves a simple problem faster than classical algorithms..."
              },
              {
                  "lesson_id": "100302",
                  "title": "Grover's Algorithm",
                  "description": "Quantum search algorithm.",
                  "content": "## Grover's Algorithm\nThis algorithm searches an unsorted database faster than classical algorithms..."
              },
              {
                  "activity_id": "100303",
                  "title": "Quiz: Quantum Algorithms",
                  "description": "Test your knowledge of quantum algorithms.",
                  "type": "quiz",
                  "content": {
                      "question": "What is the purpose of Grover's algorithm?",
                      "options": ["Factoring large numbers", "Searching an unsorted database", "Simulating quantum systems", "Breaking encryption"],
                      "answer": 1
                  }
              }
          ]
      },
      {
          "module_id": "1004",
          "title": "Quantum Computing Platforms",
          "description": "Overview of different quantum computing platforms.",
          "content": [
              {
                  "lesson_id": "100401",
                  "title": "Superconducting Qubits",
                  "description": "Introduction to superconducting qubits.",
                  "content": "## Superconducting Qubits\nThese qubits are based on superconducting circuits..."
              },
              {
                  "lesson_id": "100402",
                  "title": "Trapped Ions",
                  "description": "Introduction to trapped ion qubits.",
                  "content": "## Trapped Ions\nThese qubits are based on trapped ions..."
              }
          ]
      }
  ]
}

