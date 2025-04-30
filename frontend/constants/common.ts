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
  course_id: 1,
  topic: "Introduction to Quantum Computing",
  description: `## Course Overview

Welcome to the fascinating world of quantum computing! This course is designed to provide a beginner-friendly introduction to the core concepts and principles that underpin this revolutionary field. Whether you're a student, a professional, or simply curious about the future of computation, this course will equip you with the foundational knowledge you need to understand and explore the exciting possibilities of quantum computing.

## What You'll Learn

Throughout this course, you will:

*   **Understand the basics of quantum mechanics:** Learn about superposition, entanglement, and other fundamental quantum phenomena that are essential for quantum computing.
*   **Explore quantum gates and circuits:** Discover how quantum gates manipulate qubits and how to build quantum circuits to perform computations.
*   **Dive into quantum algorithms:** Get introduced to famous quantum algorithms like Deutsch's algorithm and Grover's algorithm, and understand how they offer speedups over classical algorithms.
*   **Survey quantum computing platforms:** Explore different physical platforms for building quantum computers, including superconducting qubits and trapped ions.

## Course Structure

This course is divided into four modules, each covering a specific aspect of quantum computing:

### Module 1: Quantum Mechanics Fundamentals

In this module, we'll lay the groundwork by exploring the essential concepts of quantum mechanics that are crucial for understanding quantum computing.

*   **Superposition and Qubits:** Learn about the concept of superposition, where a qubit can exist in multiple states simultaneously, and how it differs from classical bits.
*   **Entanglement:** Explore the phenomenon of quantum entanglement, where two or more qubits become correlated in such a way that they share the same fate, no matter how far apart they are.
*   **Quiz: Quantum Mechanics Basics:** Test your understanding of the fundamental concepts covered in this module.

### Module 2: Quantum Gates and Circuits

This module will introduce you to the building blocks of quantum computation: quantum gates and circuits.

*   **Single-Qubit Gates:** Learn about the Pauli-X, Pauli-Y, Pauli-Z, and Hadamard gates, and how they manipulate single qubits.
*   **Multi-Qubit Gates:** Understand CNOT and other multi-qubit gates, which are essential for creating entanglement and performing complex quantum operations.
*   **Quiz: Quantum Gates:** Test your knowledge of quantum gates and their functionalities.

### Module 3: Quantum Algorithms

In this module, we'll explore some of the most famous quantum algorithms and see how they can solve problems faster than classical algorithms.

*   **Deutsch's Algorithm:** Discover a simple algorithm that demonstrates the potential for quantum speedup.
*   **Grover's Algorithm:** Learn about Grover's algorithm, a quantum search algorithm that can find a specific item in an unsorted database more efficiently than classical algorithms.
*   **Quiz: Quantum Algorithms:** Test your understanding of the quantum algorithms covered in this module.

### Module 4: Quantum Computing Platforms

This module will provide an overview of the different physical platforms that are being used to build quantum computers.

*   **Superconducting Qubits:** Introduction to superconducting qubits, which are based on superconducting circuits and are one of the leading platforms for quantum computing.
*   **Trapped Ions:** Introduction to trapped ion qubits, which use individual ions trapped in electromagnetic fields to represent qubits.

## Prerequisites

No prior knowledge of quantum mechanics or computer science is required. This course is designed for beginners and will provide all the necessary background information.

## Target Audience

This course is suitable for:

*   Students interested in learning about quantum computing
*   Professionals looking to expand their knowledge of emerging technologies
*   Anyone curious about the future of computation

## Join Us on This Exciting Journey!

Quantum computing is a rapidly evolving field with the potential to revolutionize many aspects of our lives. This course will provide you with a solid foundation to explore this exciting field and prepare you for the quantum future.`,
  preferences: {
    level: "BEGINNER",
    duration: "SHORT",
    focus: "IN-DEPTH",
  },
  metadata: {
    count: {
      modules: 4,
      lessons: 12,
      activities: 4,
    },
  },
  modules: [
    {
      module_id: 1001,
      title: "Quantum Mechanics Fundamentals",
      moduleOrder: 1,
      description:
        "Essential quantum mechanics concepts for quantum computing.",
      content: [
        {
          lesson_id: 100101,
          title: "Superposition and Qubits",
          displayOrder: 1,
          description: "Understanding superposition and the qubit.",
          content: {
            type: "MARKDOWN",
            value:
              "## Superposition\nQubits can exist in a superposition of states...",
          },
        },
        {
          lesson_id: 100102,
          title: "Entanglement",
          displayOrder: 2,
          description: "Exploring the phenomenon of quantum entanglement.",
          content: {
            type: "MARKDOWN",
            value:
              "## Entanglement\nEntanglement is a correlation between qubits...",
          },
        },
        {
          activity_id: 100103,
          title: "Quiz: Quantum Mechanics Basics",
          displayOrder: 3,
          type: "quiz",
          content: {
            question: "What is superposition?",
            options: [
              "A state of being in two places at once",
              "A linear combination of states",
              "A type of quantum gate",
              "A measurement process",
            ],
            answer: 1,
          },
        },
      ],
    },
    {
      module_id: 1002,
      title: "Quantum Gates and Circuits",
      moduleOrder: 2,
      description:
        "Learn about quantum gates and how to build quantum circuits.",
      content: [
        {
          lesson_id: 100201,
          title: "Single-Qubit Gates",
          displayOrder: 1,
          content: {
            type: "MARKDOWN",
            value:
              "## Single-Qubit Gates\nThese gates operate on a single qubit...",
          },
        },
        {
          lesson_id: 100202,
          title: "Multi-Qubit Gates",
          displayOrder: 2,
          content: {
            type: "MARKDOWN",
            value:
              "## Multi-Qubit Gates\nThese gates operate on multiple qubits...",
          },
        },
        {
          activity_id: 100203,
          title: "Quiz: Quantum Gates",
          displayOrder: 3,
          type: "quiz",
          content: {
            question: "What does the Hadamard gate do?",
            options: [
              "Creates entanglement",
              "Rotates a qubit around the X-axis",
              "Puts a qubit in superposition",
              "Measures a qubit",
            ],
            answer: 2,
          },
        },
      ],
    },
    {
      module_id: 1003,
      title: "Quantum Algorithms",
      moduleOrder: 3,
      description: "Introduction to famous quantum algorithms.",
      content: [
        {
          lesson_id: 100301,
          title: "Deutsch's Algorithm",
          displayOrder: 1,
          content: {
            type: "MARKDOWN",
            value:
              "## Deutsch's Algorithm\nThis algorithm solves a simple problem faster than classical algorithms...",
          },
        },
        {
          lesson_id: 100302,
          title: "Grover's Algorithm",
          displayOrder: 2,
          content: {
            type: "MARKDOWN",
            value:
              "## Grover's Algorithm\nThis algorithm searches an unsorted database faster than classical algorithms...",
          },
        },
        {
          activity_id: 100303,
          title: "Quiz: Quantum Algorithms",
          displayOrder: 3,
          type: "quiz",
          content: {
            question: "What is the purpose of Grover's algorithm?",
            options: [
              "Factoring large numbers",
              "Searching an unsorted database",
              "Simulating quantum systems",
              "Breaking encryption",
            ],
            answer: 1,
          },
        },
      ],
    },
    {
      module_id: 1004,
      title: "Quantum Computing Platforms",
      moduleOrder: 4,
      description: "Overview of different quantum computing platforms.",
      content: [
        {
          lesson_id: 100401,
          title: "Superconducting Qubits",
          displayOrder: 1,
          description: "Introduction to superconducting qubits.",
          content: {
            type: "MARKDOWN",
            value:
              "## Superconducting Qubits\nThese qubits are based on superconducting circuits...",
          },
        },
        {
          lesson_id: 100402,
          title: "Trapped Ions",
          displayOrder: 2,
          description: "Introduction to trapped ion qubits.",
          content: {
            type: "MARKDOWN",
            value: "## Trapped Ions\nThese qubits are based on trapped ions...",
          },
        },
      ],
    },
  ],
};
