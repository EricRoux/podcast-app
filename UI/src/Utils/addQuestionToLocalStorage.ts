import { IQuestion } from "../Interfaces/IQuestion";
import { getQuestionFromLocalStorage } from "./getQuestionFromLocalStorage";

export function addQuestionToLocalStorage(question: IQuestion): void {
    const allQuestion: IQuestion[] = getQuestionFromLocalStorage();
    allQuestion.push(question);
    const allQuestionToString: string = JSON.stringify(allQuestion);
    localStorage.setItem("questions", allQuestionToString);
}