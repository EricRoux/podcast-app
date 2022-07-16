import { IQuestion } from "../Interfaces/IQuestion";
import { getQuestionsFromLocalStorage } from "./getQuestionsFromLocalStorage";

export function AddQuestionToLocalStorage(question: IQuestion): void {
    const questions: IQuestion[] = getQuestionsFromLocalStorage();
    const questionIndex: number = questions.findIndex(
        (q: IQuestion): boolean => q.id == question.id);
    if(questionIndex != -1)
        questions[questionIndex] = question;
    else
        questions.push(question);
    const allQuestionToString: string = JSON.stringify(questions);
    localStorage.setItem("questions", allQuestionToString);
}