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

const answer = [
    {
        idCategory: "",
        idQuestion: "",
        value: {
            number: 50,
            select: "idSelect",
            mutliSelect: ["isSelect1", "idSelect2"]
        } //if
    }
]