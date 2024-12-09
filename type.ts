interface dataType {
    name: string,
    question: {
        question: String,
        note: String,
        placeholder: String,
        type: "select" | "mutli-select" | "number",
        options?: {
            text: String,
            value: number
        }[],
    }[],
    extra: {
        icon: null,
        bg: "bg-x-500"
    }
}[]
