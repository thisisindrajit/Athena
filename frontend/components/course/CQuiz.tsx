"use client";

import { FC, useState } from 'react';
import { Button } from '../ui/button';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ICQuizProps {
    question: string;
    options: string[];
    answer: string;
};

const CQuiz: FC<ICQuizProps> = ({ question, options, answer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setAttempts(prev => prev + 1);
    };

    const isCorrect = selectedAnswer === answer;

    // Handle radio change
    const handleRadioChange = (value: string) => {
        if (isSubmitted && isCorrect) return; // Prevent changes if correct answer is submitted
        setSelectedAnswer(value);
        if (isSubmitted && !isCorrect) {
            // Auto-reset if wrong answer was submitted
            setIsSubmitted(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-lg/relaxed xl:text-xl/relaxed font-bold">{question}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <RadioGroup
                    value={selectedAnswer}
                    onValueChange={handleRadioChange}
                    disabled={isSubmitted && isCorrect}
                    className="space-y-2"
                >
                    {options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem
                                value={String(index + 1)}
                                id={`option-${index}`}
                            />
                            <Label htmlFor={`option-${index}`} className='text-base'>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
                {!isSubmitted && (
                    <Button
                        type="submit"
                        disabled={!selectedAnswer}
                        className="w-fit"
                    >
                        Submit answer
                    </Button>
                )}
                {isSubmitted && (
                    <div className={`p-3 w-fit font-medium rounded-md ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {isCorrect
                            ? `Correct answer! You got it in ${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}.`
                            : 'Incorrect answer. Select another option to try again!'}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CQuiz;
