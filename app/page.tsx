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

    return (
        <div className="h-screen w-screen">
            {/* Categories Section */}
            <div className="w-full">
                <div className="w-full flex p-5">
                    <div className="mx-auto items-center justify-center flex gap-7">
                        {data.map((v, index) => (
                            <div key={index} onClick={() => setSelectedScene(index)} className="cursor-pointer">
                                <div
                                    className={cn(
                                        "flex gap-2 text-foreground/60 px-3 rounded text-sm font-semibold",
                                        selectedScene === index && v.extra.bg
                                    )}
                                >
                                    {v.name}
                                </div>
                                <div
                                    className={cn(
                                        selectedScene === index ? v.extra.bg : "bg-gray-300",
                                        "w-full mx-auto h-1 mt-2 rounded-full"
                                    )}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Questions Section */}
            <div className="w-full h-96 bg-lime-500 overflow-auto">
                {/* <img
                    src="https://cdn.pixabay.com/photo/2020/03/14/17/01/flowers-4931217_960_720.png"
                    alt="Background"
                    className="h-full fixed left-0 bottom-0"
                />
                <img
                    src="https://cdn.pixabay.com/photo/2016/04/02/21/01/earth-1303628_960_720.png"
                    alt="Earth"
                    className="h-96 fixed top-0 right-0"
                /> */}
                <div className="p-10 mx-auto max-w-3xl h-96">
                    <div className="py-10">
                        {data[selectedScene].question.map((q) => (
                            <div key={q.question} className="mb-6">
                                <h1 className="text-xl font-semibold text-background mb-2">{q.question}</h1>
                                {q.type === "select" && (
                                    <select
                                        className="w-full bg-background border p-2 rounded text-foreground"
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
                                    <div className="flex flex-wrap gap-2">
                                        {q.options?.map((o, index) => (
                                            <label key={index} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-background"
                                                    onChange={(e) => {
                                                        const selected = answers.find(
                                                            (a) =>
                                                                a.idCategory === data[selectedScene].name &&
                                                                a.idQuestion === q.question
                                                        )?.value.mutliSelect || [];
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
                                                {o.text}
                                            </label>
                                        ))}
                                    </div>
                                )}
                                {q.type === "number" && (
                                    <input
                                        type="number"
                                        className="w-full bg-background border p-2 rounded text-foreground"
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
