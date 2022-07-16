import { IQuestion } from "../Interfaces/IQuestion";

export function getQuestionsFromLocalStorage(): IQuestion[] {
    const result: IQuestion[] = JSON.parse(localStorage.getItem("questions") || "[]");
    return result;
}