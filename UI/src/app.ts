import "./styles.scss";
import { isValidInput } from "./Utils/isValidInput";
import { IQuestion } from "./Interfaces/IQuestion";
import { Question } from "./question";
import { renderList } from "./Utils/renderList";
import { createModal } from "./Utils/createModal";

const form: HTMLElement = document.querySelector("#form");
const input: HTMLInputElement = form.querySelector("#question-input");
const submitBtn: HTMLButtonElement = form.querySelector("#submit");
const modalBtn: HTMLButtonElement = document.body.querySelector("#modal-btn");

function submitFormHandler(event: Event): void {
    event.preventDefault(); // Не перезагружать страницу
    if (isValidInput(input.value)) {
        const questionData: IQuestion = {
            text: input.value.trim(),
            date: new Date().toJSON(),
        };

        submitBtn.disabled = true;
        const question = new Question();
        question.create(questionData)
            .then((): void => {
                input.value = "";
                input.className = "";
                renderList();
            });
    }
}

function imputChanged(): void {
    submitBtn.disabled = !isValidInput(input.value);
}

function openModal(): void {
    createModal("Авторизация", "<h1>Test</h1>");
}

window.addEventListener("load", renderList);
form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", imputChanged);
modalBtn.addEventListener("click", openModal);