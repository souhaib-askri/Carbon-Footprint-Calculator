"use client"
import { cn } from "@/lib/utils";
import { Beef, Building2, Car, Home, Plug2 } from "lucide-react";
import { useState } from "react";

export default function page() {

    const [selectedScene, setSelectedScene] = useState(0); // For category selection
    const [answers, setAnswers] = useState([]); // To store user inputs

    const handleInputChange = (idCategory, idQuestion, value) => {
        setAnswers((prev) => {
            const updated = [...prev];
            const index = updated.findIndex(
                (answer) => answer.idCategory === idCategory && answer.idQuestion === idQuestion
            );
            if (index !== -1) {
                updated[index].value = value;
            } else {
                updated.push({ idCategory, idQuestion, value });
            }
            return updated;
        });
    };

    const isCurrentSectionComplete = () => {
        const currentQuestions = data[selectedScene].question;
        const currentAnswers = answers.filter(
            (answer) => answer.idCategory === data[selectedScene].name
        );

        return currentQuestions.every((question) => {
            const answer = currentAnswers.find((a) => a.idQuestion === question.question);
            if (!answer) return false;

            // Check if the answer has a valid value based on its type
            switch (question.type) {
                case 'select':
                    return answer.value.select !== '';
                case 'mutli-select':
                    return answer.value.mutliSelect && answer.value.mutliSelect.length > 0;
                case 'number':
                    return answer.value.number !== null && answer.value.number !== undefined;
                default:
                    return false;
            }
        });
    };

    const handleNext = () => {
        if (selectedScene < data.length - 1) {
            setSelectedScene(selectedScene + 1);
        }
    };

    const handlePrevious = () => {
        if (selectedScene > 0) {
            setSelectedScene(selectedScene - 1);
        }
    };

    return (
        <div className="min-h-screen w-full bg-background flex flex-col">
            {/* Categories Section */}
            <div className="w-full sticky top-0 bg-background z-10 shadow-sm">
                <div className="w-full p-3 md:p-5">
                    <div className="mx-auto items-center justify-center flex flex-wrap gap-4 md:gap-7">
                        {data.map((v, index) => (
                            <div key={index} onClick={() => setSelectedScene(index)} className="cursor-pointer">
                                <div
                                    className={cn(
                                        "flex items-center gap-2 text-foreground/60 px-3 py-2 rounded text-sm font-semibold transition-all duration-200 hover:opacity-80",
                                        selectedScene === index && v.extra.bg
                                    )}
                                >
                                    {v.name}
                                </div>
                                <div
                                    className={cn(
                                        selectedScene === index ? v.extra.bg : "bg-gray-300",
                                        "w-full mx-auto h-1 mt-2 rounded-full transition-all duration-200"
                                    )}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Questions Section */}
            <div className={cn(
                "flex-1 w-full overflow-auto",
                "bg-gradient-to-b",
                data[selectedScene].extra.bg,
                data[selectedScene].extra.bg.replace('bg-', 'from-'),
                data[selectedScene].extra.bg.replace('500', '600').replace('bg-', 'to-')
            )}>
                <div className="container mx-auto px-4 py-6 md:py-10">
                    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-10">
                        {data[selectedScene].question.map((q) => (
                            <div key={q.question} className="mb-8">
                                <h1 className="text-lg md:text-xl font-semibold text-background mb-2">{q.question}</h1>
                                {q.note && (
                                    <p className="text-sm text-background/80 mb-3 italic">{q.note}</p>
                                )}
                                {q.type === "select" && (
                                    <select
                                        className="w-full bg-background/90 border border-background/20 p-3 rounded-lg text-foreground focus:ring-2 focus:ring-lime-300 focus:border-transparent transition-all duration-200"
                                        placeholder={q.placeholder}
                                        onChange={(e) =>
                                            handleInputChange(
                                                data[selectedScene].name,
                                                q.question,
                                                { select: e.target.value }
                                            )
                                        }
                                    >
                                        <option value="">{q.placeholder}</option>
                                        {q.options?.map((o, index) => (
                                            <option key={index} value={o.value}>
                                                {o.text}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {q.type === "mutli-select" && (
                                    <div className="flex flex-wrap gap-3">
                                        {q.options?.map((o, index) => (
                                            <label key={index} className="flex items-center gap-2 bg-background/90 px-4 py-2 rounded-lg cursor-pointer hover:bg-background/95 transition-all duration-200">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-lime-500 rounded"
                                                    onChange={(e) => {
                                                        const selected = answers.find(
                                                            (a) =>
                                                                a.idCategory === data[selectedScene].name &&
                                                                a.idQuestion === q.question
                                                        )?.value?.mutliSelect || [];
                                                        if (e.target.checked) {
                                                            handleInputChange(data[selectedScene].name, q.question, {
                                                                mutliSelect: [...selected, o.value],
                                                            });
                                                        } else {
                                                            handleInputChange(data[selectedScene].name, q.question, {
                                                                mutliSelect: selected.filter((val) => val !== o.value),
                                                            });
                                                        }
                                                    }}
                                                />
                                                <span className="text-foreground">{o.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                                {q.type === "number" && (
                                    <input
                                        type="number"
                                        className="w-full bg-background/90 border border-background/20 p-3 rounded-lg text-foreground focus:ring-2 focus:ring-lime-300 focus:border-transparent transition-all duration-200"
                                        placeholder={q.placeholder}
                                        onChange={(e) =>
                                            handleInputChange(
                                                data[selectedScene].name,
                                                q.question,
                                                { number: parseFloat(e.target.value) }
                                            )
                                        }
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="sticky bottom-0 w-full bg-background/80 backdrop-blur-sm p-4 shadow-lg">
                <div className="container mx-auto max-w-3xl flex justify-between gap-4">
                    <button
                        onClick={handlePrevious}
                        disabled={selectedScene === 0}
                        className={cn(
                            "px-6 py-2 rounded-lg font-semibold transition-all duration-200",
                            selectedScene === 0
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-gray-500 text-white hover:bg-gray-600"
                        )}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!isCurrentSectionComplete() || selectedScene === data.length - 1}
                        className={cn(
                            "px-6 py-2 rounded-lg font-semibold transition-all duration-200",
                            !isCurrentSectionComplete() || selectedScene === data.length - 1
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : data[selectedScene].extra.bg + " text-white hover:opacity-90"
                        )}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

const data = [
    {
        name: "Transportation",
        question: [
            {
                question: "What is your primary mode of transportation?",
                note: "Choose the option you use most often.",
                placeholder: "Select transportation mode",
                type: "select",
                options: [
                    { text: "Car", value: 1 },
                    { text: "Public Transport", value: 2 },
                    { text: "Bicycle", value: 3 },
                    { text: "Walking", value: 4 }
                ]
            },
            {
                question: "How many kilometers do you drive weekly?",
                note: "Enter an estimate.",
                placeholder: "e.g., 100",
                type: "number"
            },
            {
                question: "Do you carpool?",
                note: "Select all that apply.",
                placeholder: "Choose options",
                type: "mutli-select",
                options: [
                    { text: "Always", value: 1 },
                    { text: "Sometimes", value: 2 },
                    { text: "Never", value: 3 }
                ]
            },
            {
                question: "What is the average fuel efficiency of your car (km/l)?",
                note: "Provide the most accurate estimate.",
                placeholder: "e.g., 15",
                type: "number"
            },
            {
                question: "Do you use air travel frequently?",
                note: "Select an option.",
                placeholder: "Choose frequency",
                type: "select",
                options: [
                    { text: "Yes", value: 1 },
                    { text: "No", value: 2 }
                ]
            }
        ],
        extra: {
            icon: null,
            bg: "bg-green-500"
        }
    },
    {
        name: "Energy Usage",
        question: [
            {
                question: "What is your monthly electricity usage (kWh)?",
                note: "Provide an approximate value.",
                placeholder: "e.g., 300",
                type: "number"
            },
            {
                question: "Do you use renewable energy sources?",
                note: "Select applicable options.",
                placeholder: "Choose options",
                type: "mutli-select",
                options: [
                    { text: "Solar", value: 1 },
                    { text: "Wind", value: 2 },
                    { text: "Hydropower", value: 3 },
                    { text: "None", value: 4 }
                ]
            },
            {
                question: "What type of heating/cooling system do you use?",
                note: "Choose the primary system.",
                placeholder: "Select system",
                type: "select",
                options: [
                    { text: "Electric Heater", value: 1 },
                    { text: "Gas Heater", value: 2 },
                    { text: "Central Air Conditioning", value: 3 },
                    { text: "None", value: 4 }
                ]
            },
            {
                question: "How many hours daily do you use heating or cooling?",
                note: "Provide an estimate.",
                placeholder: "e.g., 5",
                type: "number"
            },
            {
                question: "Do you use energy-efficient appliances?",
                note: "Select an answer.",
                placeholder: "Choose Yes or No",
                type: "select",
                options: [
                    { text: "Yes", value: 1 },
                    { text: "No", value: 2 }
                ]
            }
        ],
        extra: {
            icon: null,
            bg: "bg-blue-500"
        }
    },
    {
        name: "Waste Management",
        question: [
            {
                question: "Do you recycle regularly?",
                note: "Select all applicable materials.",
                placeholder: "Choose options",
                type: "mutli-select",
                options: [
                    { text: "Plastic", value: 1 },
                    { text: "Paper", value: 2 },
                    { text: "Metal", value: 3 },
                    { text: "Glass", value: 4 }
                ]
            },
            {
                question: "How much waste do you produce weekly (kg)?",
                note: "Provide an approximate value.",
                placeholder: "e.g., 5",
                type: "number"
            },
            {
                question: "Do you compost organic waste?",
                note: "Select an option.",
                placeholder: "Choose Yes or No",
                type: "select",
                options: [
                    { text: "Yes", value: 1 },
                    { text: "No", value: 2 }
                ]
            },
            {
                question: "Do you minimize single-use plastics?",
                note: "Select an answer.",
                placeholder: "Choose Yes or No",
                type: "select",
                options: [
                    { text: "Yes", value: 1 },
                    { text: "No", value: 2 }
                ]
            },
            {
                question: "How often do you buy second-hand or sustainable products?",
                note: "Select an option.",
                placeholder: "Choose frequency",
                type: "select",
                options: [
                    { text: "Always", value: 1 },
                    { text: "Sometimes", value: 2 },
                    { text: "Rarely", value: 3 },
                    { text: "Never", value: 4 }
                ]
            }
        ],
        extra: {
            icon: null,
            bg: "bg-yellow-500"
        }
    },
    {
        name: "Food Consumption",
        question: [
            {
                question: "How often do you eat meat per week?",
                note: "Enter a number.",
                placeholder: "e.g., 5",
                type: "number"
            },
            {
                question: "Do you prioritize locally sourced food?",
                note: "Select an answer.",
                placeholder: "Choose Yes or No",
                type: "select",
                options: [
                    { text: "Yes", value: 1 },
                    { text: "No", value: 2 }
                ]
            },
            {
                question: "How often do you waste food?",
                note: "Select an option.",
                placeholder: "Choose frequency",
                type: "select",
                options: [
                    { text: "Always", value: 1 },
                    { text: "Sometimes", value: 2 },
                    { text: "Rarely", value: 3 },
                    { text: "Never", value: 4 }
                ]
            },
            {
                question: "Do you consume organic products?",
                note: "Select an option.",
                placeholder: "Choose Yes or No",
                type: "select",
                options: [
                    { text: "Yes", value: 1 },
                    { text: "No", value: 2 }
                ]
            },
            {
                question: "How often do you drink bottled water?",
                note: "Select an option.",
                placeholder: "Choose frequency",
                type: "select",
                options: [
                    { text: "Always", value: 1 },
                    { text: "Sometimes", value: 2 },
                    { text: "Rarely", value: 3 },
                    { text: "Never", value: 4 }
                ]
            }
        ],
        extra: {
            icon: null,
            bg: "bg-orange-500"
        }
    },
    {
        name: "Water Usage",
        question: [
            {
                question: "What is your average daily water usage (liters)?",
                note: "Provide an approximate value.",
                placeholder: "e.g., 200",
                type: "number"
            },
            {
                question: "Do you use water-saving fixtures?",
                note: "Select an answer.",
                placeholder: "Choose Yes or No",
                type: "select",
                options: [
                    { text: "Yes", value: 1 },
                    { text: "No", value: 2 }
                ]
            },
            {
                question: "How often do you water your garden?",
                note: "Select a frequency.",
                placeholder: "Choose frequency",
                type: "select",
                options: [
                    { text: "Daily", value: 1 },
                    { text: "Weekly", value: 2 },
                    { text: "Monthly", value: 3 },
                    { text: "Never", value: 4 }
                ]
            },
            {
                question: "Do you check for leaks regularly?",
                note: "Select an answer.",
                placeholder: "Choose Yes or No",
                type: "select",
                options: [
                    { text: "Yes", value: 1 },
                    { text: "No", value: 2 }
                ]
            },
            {
                question: "Do you reuse water for multiple purposes?",
                note: "Select an option.",
                placeholder: "Choose Yes or No",
                type: "select",
                options: [
                    { text: "Yes", value: 1 },
                    { text: "No", value: 2 }
                ]
            }
        ],
        extra: {
            icon: null,
            bg: "bg-purple-500"
        }
    }
];
