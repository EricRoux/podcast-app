import "./styles.scss";
import { isValid } from "./utils";

const form: HTMLElement = document.querySelector("#form");
const input: HTMLInputElement = form.querySelector("#question-input");
const submitBtn: HTMLButtonElement = form.querySelector("#submit");

interface question {
    text: string,
    date: string,
}

function submitFormHandler(event: Event): void {
    event.preventDefault(); // Не перезагружать страницу
    if (isValid(input.value)) {
        const question: question = {
            text: input.value.trim(),
            date: new Date().toJSON(),
        };

        submitBtn.disabled = true;
        console.log("Question", question);

        input.value = "";
        input.className = "";
        submitBtn.disabled = false;
    }
}

function imputChanged(): void {
    submitBtn.disabled = !isValid(input.value);
}

form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", imputChanged);