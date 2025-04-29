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
  "topic": "Introduction to Quantum Computing",
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
          "moduleOrder": 1,
          "description": "Essential quantum mechanics concepts for quantum computing.",
          "content": [
              {
                  "lesson_id": "100101",
                  "title": "Superposition and Qubits",
                  "displayOrder": 1,
                  "description": "Understanding superposition and the qubit.",
                  "content": {
                    "type": "MARKDOWN",
                    "value": "## Superposition\nQubits can exist in a superposition of states..."
                  }
              },
              {
                  "lesson_id": "100102",
                  "title": "Entanglement",
                  "displayOrder": 2,
                  "description": "Exploring the phenomenon of quantum entanglement.",
                  "content": {
                    "type": "MARKDOWN",
                    "value": "## Entanglement\nEntanglement is a correlation between qubits..."
                  }
              },
              {
                  "activity_id": "100103",
                  "title": "Quiz: Quantum Mechanics Basics",
                  "displayOrder": 3,
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
          "moduleOrder": 2,
          "description": "Learn about quantum gates and how to build quantum circuits.",
          "content": [
              {
                  "lesson_id": "100201",
                  "title": "Single-Qubit Gates",
                  "displayOrder": 1,
                  "content": {
                    "type": "MARKDOWN",
                    "value": "## Single-Qubit Gates\nThese gates operate on a single qubit..."
                  }
              },
              {
                  "lesson_id": "100202",
                  "title": "Multi-Qubit Gates",
                  "displayOrder": 2,
                  "content": {
                    "type": "MARKDOWN",
                    "value": "## Multi-Qubit Gates\nThese gates operate on multiple qubits..."
                  }
              },
              {
                  "activity_id": "100203",
                  "title": "Quiz: Quantum Gates",
                  "displayOrder": 3,
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
          "moduleOrder": 3,
          "description": "Introduction to famous quantum algorithms.",
          "content": [
              {
                  "lesson_id": "100301",
                  "title": "Deutsch's Algorithm",
                  "displayOrder": 1,
                  "content": {
                    "type": "MARKDOWN",
                    "value": "## Deutsch's Algorithm\nThis algorithm solves a simple problem faster than classical algorithms..."
                  }
              },
              {
                  "lesson_id": "100302",
                  "title": "Grover's Algorithm",
                  "displayOrder": 2,
                  "content": {
                    "type": "MARKDOWN",
                    "value": "## Grover's Algorithm\nThis algorithm searches an unsorted database faster than classical algorithms..."
                  }
              },
              {
                  "activity_id": "100303",
                  "title": "Quiz: Quantum Algorithms",
                  "displayOrder": 3,
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
          "moduleOrder": 4,
          "description": "Overview of different quantum computing platforms.",
          "content": [
              {
                  "lesson_id": "100401",
                  "title": "Superconducting Qubits",
                  "displayOrder": 1,
                  "description": "Introduction to superconducting qubits.",
                  "content": {
                    "type": "MARKDOWN",
                    "value": "## Superconducting Qubits\nThese qubits are based on superconducting circuits..."
                  }
              },
              {
                  "lesson_id": "100402",
                  "title": "Trapped Ions",
                  "displayOrder": 2,
                  "description": "Introduction to trapped ion qubits.",
                  "content": {
                    "type": "MARKDOWN",
                    "value": "## Trapped Ions\nThese qubits are based on trapped ions..."
                  }
              }
          ]
      }
  ]
}

