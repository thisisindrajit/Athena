// import { QueryClient } from "@tanstack/react-query";

import { LayoutGrid, Map } from "lucide-react";
import Link from "next/link";

// const Course = async ({
//     params,
// }: {
//     params: Promise<{ id: number }>
// }) => {
//      const { id } = await params;
//      TODO: Fetch course data from API
//      const queryClient = new QueryClient()

//      await queryClient.prefetchQuery({
//          queryKey: ['course', id],
//          queryFn: getCourse,
//      })

const Course = () => {
    const mockData = {
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


    return <div className="flex gap-4">
        {/* Sidebar (For size xl and greater) */}
        <div className="hidden xl:block h-fit min-w-112 rounded-xl sticky top-21 mt-1.25 border shadow-lg dark:bg-foreground/5 overflow-hidden">
            <div className="flex flex-col gap-3 overflow-auto h-[calc(100dvh-12rem)] p-3">
                <Link className="bg-secondary text-secondary-foreground p-2.5 font-medium rounded-md flex items-center gap-2" href={`/course/${mockData.course_id}`}><LayoutGrid className="h-4 w-4" />{mockData.title}</Link>
                {mockData.modules.map((module) => (
                    <Link className="bg-secondary/10 border border-secondary/50 p-2.5 font-medium rounded-md flex items-center gap-2" href={`/course/module/${module.module_id}`} key={`${mockData.course_id}-${module.module_id}`}>
                        <Map className="h-4 w-4" /> {module.title}
                    </Link>
                ))}
            </div>
        </div>
        {/* Course content */}
        {/* Main content */}
        <div className="w-full flex flex-col gap-8 min-h-[calc(100dvh-12rem)]">
            Course content goes here...
        </div>
    </div>;
}

export default Course;