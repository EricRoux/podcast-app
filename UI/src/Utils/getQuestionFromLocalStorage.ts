import { IQuestion } from "../Interfaces/IQuestion";

export function getQuestionFromLocalStorage(): IQuestion[] {
    return JSON.parse(localStorage.getItem("questions") || "[]");
}