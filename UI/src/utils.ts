import { IQuestion } from "./Interfaces/IQuestion";

export function isValid(value: string): boolean {
    return value.length >= 10 && value.length <= 256;
}

function getQuestionFromLocalStorage(): IQuestion[] {
    return JSON.parse(localStorage.getItem("questions") || "[]");
}

export function addQuestionToLocalStorage(question: IQuestion): void {
    const allQuestion: IQuestion[] = getQuestionFromLocalStorage();
    allQuestion.push(question);
    const allQuestionToString: string = JSON.stringify(allQuestion);
    localStorage.setItem("questions", allQuestionToString);
}