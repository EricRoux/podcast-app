import { IQuestion } from "../Interfaces/IQuestion";
import { getQuestionFromLocalStorage } from "./getQuestionFromLocalStorage";

function toCard(question: IQuestion): string {
    return `
    <div class="mui--text-black-54">
      ${new Date(question.date).toLocaleDateString()}
      ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>${question.text}</div>
    <br>
    `;
}

export function renderList(): void {
    const questios = getQuestionFromLocalStorage();
    const html: string = questios.length
        ? questios.map(toCard).join("")
        : "<div class=\"mui--text-black-54 mui--text-body2\">Вы пока не задавали вопросов</div>";
    const list: HTMLElement = document.querySelector("#list");
    list.innerHTML = html;
}