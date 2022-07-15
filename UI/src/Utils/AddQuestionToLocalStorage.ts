import { IQuestion } from "../Interfaces/IQuestion";
import { getQuestionsFromLocalStorage } from "./getQuestionsFromLocalStorage";

export function AddQuestionToLocalStorage(question: IQuestion): void {
    const { list } = getQuestionsFromLocalStorage();
    const lenQuestionId: IQuestion[] = list.filter((q: IQuestion): boolean => {
        return q.id == question.id;
    });
    if(lenQuestionId.length == 0) list.push(question);
    const allQuestionToString: string = JSON.stringify(list);
    localStorage.setItem("questions", allQuestionToString);
}