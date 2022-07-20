import { IQuestion } from "../Interfaces/IQuestion";
import { getQuestionsFromLocalStorage } from "./getQuestionsFromLocalStorage";

function toCard(num: number, question: IQuestion): string {
    return `
    <div class="mui--text-black-54">
        #${num+1}
        ${new Date(question.date).toLocaleTimeString()}
        ${new Date(question.date).toLocaleDateString()}
        from ${question.email}
    </div>
    <div>${question.text}</div>
    <br>
    `;
}

function updateEmail(): void {
    const author: HTMLElement = document.querySelector(".author");
    author.innerText = localStorage.getItem("email") || "Не авторизован";
}

function renderList(): void {
    const questions: IQuestion[] = getQuestionsFromLocalStorage();
    if(!questions) return;
    const html: string = questions.length
        ? questions.map(
            (q: IQuestion, index: number): string => toCard(index, q)
        ).join("")
        : `<div class="mui--text-black-54 mui--text-body2">
            Вы пока не задавали вопросов
        </div>`;
    const list: HTMLElement = document.querySelector("#list");
    list.innerHTML = html;
}

export function render(): void {
    renderList();
    updateEmail();
}