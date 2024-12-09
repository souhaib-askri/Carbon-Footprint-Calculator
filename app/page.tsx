"use client"

import { cn } from "@/lib/utils"
import { Beef, Building2, Car, Home, Plug2 } from "lucide-react"
import { useState } from "react"

export default function page() {

    const [selectedScene, setSelectedScene] = useState(0)

    return (
        <div className="h-screen w-screen ">
            <div className="w-full">
                <div className="w-full  flex p-5">
                    <div className="mx-auto  items-center justify-center flex gap-7">
                        {data.map((v, index) => (
                            <div className="">
                                <div className="flex gap-2 text-foreground/60 px-3 rounded text-sm font-semibold">
                                    <v.icon size={20} className={cn(index === 0 && v.extra.tx)} />
                                    {v.name}
                                </div>
                                <div className={cn(index === 0 && v.extra.bg, "w-full mx-auto h-1 mt-2 rounded-full")}></div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="relative w-full mb-20 ">
                    <svg
                        className="absolute bottom-0 left-0 w-full text-lime-500 transform translate-y-full bg-background border-none"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,0 C150,60 450,-60 900,60 C1050,120 1200,60 1200,60 L1200,120 L0,120 Z"
                            className="fill-current translate-y-2"
                        />
                    </svg>
                </div>
            </div>
            <div className="w-full h-full bg-lime-500">
                <img src="https://cdn.pixabay.com/photo/2020/03/14/17/01/flowers-4931217_960_720.png" alt="" className="h-full fixed left-0 -bottom-0" />
                <img src="https://cdn.pixabay.com/photo/2016/04/02/21/01/earth-1303628_960_720.png" alt="" className="h-96 fixed  top-0 right-0" />
                <div className="p-10 mx-auto max-w-3xl h-full">
                    <div className="py-10">
                        {data[1].questions.map((q) => (
                            <div className="">
                                <h1 className="text-xl text-ba font-semibold  text-background mb-2">
                                    {q.question}
                                </h1>
                                {q.option.map((o, index) => (
                                    <div className={cn(index === 0 && "border-white", "border-4 border-background w-full bg-background p-5 mb-2")}>{o.text}</div>
                                ))}
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
        name: "Transport",
        icon: Car,
        extra: {
            bg: "bg-lime-500",
            tx: "text-lime-500",
        },
        questions: [
            {
                question: "How would you best describe your diet?",
                type: "select",
                option: [
                    {
                        text: "yes",
                        value: 10
                    },
                    {
                        text: "no",
                        value: 0
                    },
                ]
            }
        ]
    },
    {
        name: "Venue",
        icon: Building2,
        extra: {
            bg: "bg-indigo-500",
            tx: "text-indigo-500",
        },
        questions: [
            {
                question: "How would you best describe your diet?",
                type: "select",
                option: [
                    {
                        text: "yes",
                        value: 10
                    },
                    {
                        text: "no",
                        value: 0
                    },
                ]
            }
        ]
    },
    {
        name: "Electricity",
        icon: Plug2,
        extra: {
            bg: "bg-pink-500",
            tx: "text-pink-500",
        },
        questions: [
            {
                question: "How would you best describe your diet?",
                type: "select",
                option: [
                    {
                        text: "yes",
                        value: 10
                    },
                    {
                        text: "no",
                        value: 0
                    },
                ]
            }
        ]
    },
    {
        name: "Food",
        icon: Beef,
        extra: {
            bg: "bg-lime-500",
            tx: "text-lime-500",
        },
        questions: [
            {
                question: "How would you best describe your diet?",
                type: "select",
                option: [
                    {
                        text: "yes",
                        value: 10
                    },
                    {
                        text: "no",
                        value: 0
                    },
                ]
            }
        ]
    }
]