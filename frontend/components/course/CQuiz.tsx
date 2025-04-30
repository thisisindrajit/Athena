"use client";

import { FC, useState } from 'react';

interface ICQuizProps {
    question: string;
    options: string[];
    answer: string;
};

const CQuiz: FC<ICQuizProps> = ({ question, options, answer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const isCorrect = selectedAnswer === answer;

    return (
        <>
            <h2 className="text-xl font-bold mb-4">{question}</h2>
            <form onSubmit={handleSubmit}>
                {options.map((option, index) => (
                    <div key={index} className="mb-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="answer"
                                value={String(index + 1)}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                disabled={isSubmitted}
                                className="mr-2"
                            />
                            {option}
                        </label>
                    </div>
                ))}
                {!isSubmitted && (
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={!selectedAnswer}
                    >
                        Submit
                    </button>
                )}
                {isSubmitted && (
                    <div className={`mt-4 p-2 rounded ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {isCorrect ? 'Correct answer!' : 'Incorrect answer. Try again!'}
                    </div>
                )}
            </form>
        </>
    );
};

export default CQuiz;