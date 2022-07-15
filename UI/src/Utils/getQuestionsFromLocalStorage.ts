import { IQuestions } from "../Interfaces/IQuestion";

export function getQuestionsFromLocalStorage(): IQuestions {
    const result: IQuestions = {
        list: JSON.parse(localStorage.getItem("questions") || "[]"),
        email: localStorage.getItem("email") || ""
    };
    return result;
}