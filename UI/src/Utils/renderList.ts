import { IQuestion, IQuestions } from "../Interfaces/IQuestion";
import { getQuestionsFromLocalStorage } from "./getQuestionsFromLocalStorage";

function toCard(question: IQuestion, email: string): string {
    return `
    <div class="mui--text-black-54">
        #${question.id}
        ${new Date(question.date).toLocaleTimeString()}
        ${new Date(question.date).toLocaleDateString()}
        from ${email}
    </div>
    <div>${question.text}</div>
    <br>
    `;
}

export function renderList(): void {
    const questions: IQuestions = getQuestionsFromLocalStorage();
    const questionList: Array<IQuestion> = questions.list;
    const html: string = questionList.length
        ? questionList.map((q: IQuestion): string => toCard(q, questions.email)).join("")
        : `<div class="mui--text-black-54 mui--text-body2">
            Вы пока не задавали вопросов
        </div>`;
    const list: HTMLElement = document.querySelector("#list");
    list.innerHTML = html;
}