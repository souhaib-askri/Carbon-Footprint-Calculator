"use client"
import { cn } from "@/lib/utils";
import { Beef, Building2, Car, Home, Plug2 } from "lucide-react";
import { useState } from "react";

export default function page() {

    const [selectedScene, setSelectedScene] = useState(0); // For category selection
    const [answers, setAnswers] = useState([]); // To store user inputs
    const [showResults, setShowResults] = useState(false);

    const calculateCarbonFootprint = () => {
        let totalCarbon = 0;
        
        answers.forEach(answer => {
            switch(answer.idCategory) {
                case "Transportation":
                    // Calculate transportation emissions
                    if (answer.idQuestion === "What is your primary mode of transportation?") {
                        const transportMode = answer.value.select;
                        const weeklyKm = answers.find(a => 
                            a.idCategory === "Transportation" && 
                            a.idQuestion === "How many kilometers do you drive weekly?"
                        )?.value.number || 0;
                        
                        // Monthly kilometers (weekly * 4)
                        const monthlyKm = weeklyKm * 4;
                        
                        switch(transportMode) {
                            case 1: // Car
                                // Average car emission: 0.2 kg CO2 per km
                                totalCarbon += monthlyKm * 0.2;
                                break;
                            case 2: // Public Transport
                                // Bus/Train emission: 0.04 kg CO2 per km
                                totalCarbon += monthlyKm * 0.04;
                                break;
                            case 3: // Bicycle
                                // No emissions
                                break;
                            case 4: // Walking
                                // No emissions
                                break;
                        }
                    }
                    break;

                case "Energy Usage":
                    // Calculate energy usage emissions
                    if (answer.idQuestion === "What is your monthly electricity usage (kWh)?") {
                        // Average emission factor: 0.5 kg CO2 per kWh
                        const monthlyKwh = answer.value.number || 0;
                        totalCarbon += monthlyKwh * 0.5;

                        // Check for renewable energy usage
                        const renewableEnergy = answers.find(a => 
                            a.idCategory === "Energy Usage" && 
                            a.idQuestion === "Do you use renewable energy sources?"
                        )?.value.mutliSelect || [];

                        // Reduce emissions based on renewable energy usage
                        if (renewableEnergy.length > 0 && !renewableEnergy.includes(4)) { // If using renewables (not "None")
                            totalCarbon -= (monthlyKwh * 0.5) * (renewableEnergy.length * 0.2); // 20% reduction per renewable source
                        }
                    }
                    break;

                case "Waste Management":
                    // Calculate waste management emissions
                    if (answer.idQuestion === "How much waste do you produce weekly (kg)?") {
                        // Average waste emission: 0.5 kg CO2 per kg of waste
                        const weeklyWaste = answer.value.number || 0;
                        const monthlyWaste = weeklyWaste * 4;
                        totalCarbon += monthlyWaste * 0.5;

                        // Check recycling habits
                        const recycling = answers.find(a => 
                            a.idCategory === "Waste Management" && 
                            a.idQuestion === "Do you recycle regularly?"
                        )?.value.mutliSelect || [];

                        // Reduce emissions based on recycling habits
                        totalCarbon -= (monthlyWaste * 0.5) * (recycling.length * 0.1); // 10% reduction per recycled material
                    }
                    break;

                case "Food Consumption":
                    // Calculate food consumption emissions
                    if (answer.idQuestion === "How often do you eat meat per week?") {
                        // Average meat consumption emission: 6.5 kg CO2 per meal
                        const weeklyMeatMeals = answer.value.number || 0;
                        const monthlyMeatEmissions = weeklyMeatMeals * 4 * 6.5;
                        totalCarbon += monthlyMeatEmissions;

                        // Check for local food sourcing
                        const localFood = answers.find(a => 
                            a.idCategory === "Food Consumption" && 
                            a.idQuestion === "Do you prioritize locally sourced food?"
                        )?.value.select;

                        // Reduce emissions if using local food
                        if (localFood === 1) { // Yes
                            totalCarbon -= monthlyMeatEmissions * 0.2; // 20% reduction for local sourcing
                        }
                    }
                    break;
            }
        });

        // Convert to metric tons per year
        const annualMetricTons = (totalCarbon * 12) / 1000;
        return annualMetricTons.toFixed(2);
    };

    const getRecommendations = (carbonFootprint) => {
        const recommendations = [];
        const footprint = parseFloat(carbonFootprint);

        // Transportation recommendations
        const transportMode = answers.find(a => 
            a.idCategory === "Transportation" && 
            a.idQuestion === "What is your primary mode of transportation?"
        )?.value.select;

        if (transportMode === 1) { // Car user
            recommendations.push("Consider using public transportation or carpooling to reduce emissions");
            recommendations.push("For short distances, try walking or cycling");
        }

        // Energy recommendations
        const renewableEnergy = answers.find(a => 
            a.idCategory === "Energy Usage" && 
            a.idQuestion === "Do you use renewable energy sources?"
        )?.value.mutliSelect || [];

        if (!renewableEnergy.length || renewableEnergy.includes(4)) {
            recommendations.push("Consider installing solar panels or switching to renewable energy sources");
            recommendations.push("Use energy-efficient appliances and LED lighting");
        }

        // Waste recommendations
        const recycling = answers.find(a => 
            a.idCategory === "Waste Management" && 
            a.idQuestion === "Do you recycle regularly?"
        )?.value.mutliSelect || [];

        if (recycling.length < 3) {
            recommendations.push("Increase your recycling habits - try to recycle paper, plastic, metal, and glass");
            recommendations.push("Start composting organic waste to reduce landfill emissions");
        }

        // Food recommendations
        const meatConsumption = answers.find(a => 
            a.idCategory === "Food Consumption" && 
            a.idQuestion === "How often do you eat meat per week?"
        )?.value.number || 0;

        if (meatConsumption > 3) {
            recommendations.push("Consider reducing meat consumption and trying plant-based alternatives");
            recommendations.push("Choose locally sourced and seasonal food products");
        }

        // General recommendations based on total footprint
        if (footprint > 10) {
            recommendations.push("Your carbon footprint is significantly high. Consider making immediate changes to reduce emissions");
        } else if (footprint > 5) {
            recommendations.push("Your carbon footprint is moderate. There's room for improvement in your daily habits");
        } else {
            recommendations.push("Great job! Your carbon footprint is relatively low. Keep up the sustainable practices");
        }

        return recommendations;
    };

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

    const handleNext = () => {
        if (selectedScene < data.length - 1) {
            setSelectedScene(selectedScene + 1);
        } else if (selectedScene === data.length - 1) {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (showResults) {
            setShowResults(false);
        } else if (selectedScene > 0) {
            setSelectedScene(selectedScene - 1);
        }
    };

    const handleStartOver = () => {
        setShowResults(false);
        setSelectedScene(0);
        setAnswers([]);
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

    const isAllSectionsComplete = () => {
        return data.every((section, index) => {
            const currentQuestions = section.question;
            const currentAnswers = answers.filter(
                (answer) => answer.idCategory === section.name
            );

            return currentQuestions.every((question) => {
                const answer = currentAnswers.find((a) => a.idQuestion === question.question);
                if (!answer) return false;

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
        });
    };

    if (showResults) {
        const carbonFootprint = calculateCarbonFootprint();
        const recommendations = getRecommendations(carbonFootprint);

        return (
            <div className="min-h-screen w-full bg-background flex flex-col">
                <div className={cn(
                    "flex-1 w-full overflow-auto bg-gradient-to-b from-emerald-500 to-emerald-600"
                )}>
                    <div className="container mx-auto px-4 py-6 md:py-10">
                        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-10">
                            <h1 className="text-3xl font-bold text-white mb-6 text-center">Your Carbon Footprint Results</h1>
                            
                            <div className="bg-white/20 rounded-lg p-6 mb-8">
                                <div className="text-center">
                                    <p className="text-lg text-white mb-2">Your Estimated Annual Carbon Footprint</p>
                                    <p className="text-5xl font-bold text-white mb-2">{carbonFootprint}</p>
                                    <p className="text-white/80">Metric Tons CO2e/year</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-4">Category Breakdown</h2>
                                    <div className="space-y-3">
                                        {data.map((category, index) => (
                                            <div key={index} className="bg-white/10 rounded-lg p-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-white">{category.name}</span>
                                                    <span className="text-white font-semibold">
                                                        {/* Calculate per category emissions */}
                                                        {(carbonFootprint / data.length).toFixed(2)} MT
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-4">Recommendations</h2>
                                    <div className="space-y-3">
                                        {recommendations.map((rec, index) => (
                                            <div key={index} className="bg-white/10 rounded-lg p-4">
                                                <p className="text-white">{rec}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="sticky bottom-0 w-full bg-background/80 backdrop-blur-sm p-4 shadow-lg">
                    <div className="container mx-auto max-w-3xl flex justify-between gap-4">
                        <button
                            onClick={handlePrevious}
                            className="px-6 py-2 rounded-lg font-semibold transition-all duration-200 bg-gray-500 text-white hover:bg-gray-600"
                        >
                            Back to Questions
                        </button>
                        <button
                            onClick={handleStartOver}
                            className="px-6 py-2 rounded-lg font-semibold transition-all duration-200 bg-emerald-500 text-white hover:bg-emerald-600"
                        >
                            Start Over
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
                        className={cn(
                            "px-6 py-2 rounded-lg font-semibold transition-all duration-200",
                            selectedScene === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-600 text-white"
                        )}
                        disabled={selectedScene === 0}
                    >
                        Previous
                    </button>
                    {selectedScene === data.length - 1 ? (
                        <button
                            onClick={() => setShowResults(true)}
                            disabled={!isAllSectionsComplete()}
                            className={cn(
                                "px-6 py-2 rounded-lg font-semibold transition-all duration-200",
                                isAllSectionsComplete() 
                                    ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                                    : "bg-gray-300 cursor-not-allowed"
                            )}
                        >
                            View Results
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            disabled={!isCurrentSectionComplete()}
                            className={cn(
                                "px-6 py-2 rounded-lg font-semibold transition-all duration-200",
                                isCurrentSectionComplete() 
                                    ? data[selectedScene].extra.bg + " hover:opacity-90 text-white" 
                                    : "bg-gray-300 cursor-not-allowed"
                            )}
                        >
                            Next
                        </button>
                    )}
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
