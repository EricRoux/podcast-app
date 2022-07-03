import "./styles.scss";
import { isValid } from "./utils";

const form: HTMLElement = document.querySelector("#form");
const input: HTMLInputElement = form.querySelector("#question-input");
const submitBtn: HTMLButtonElement = form.querySelector("#submit");

interface IQuestion {
    text: string,
    date: string,
}

function submitFormHandler(event: Event): void {
    event.preventDefault(); // Не перезагружать страницу
    if (isValid(input.value)) {
        const question: IQuestion = {
            text: input.value.trim(),
            date: new Date().toJSON(),
        };

        submitBtn.disabled = true;
        console.log("Question", question);

        input.value = "";
        input.className = "";
    }
}

function imputChanged(): void {
    submitBtn.disabled = !isValid(input.value);
}

form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", imputChanged);