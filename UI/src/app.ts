import { isValidInput } from "./Utils/isValidInput";
import { IQuestion } from "./Interfaces/IQuestion";
import { Question } from "./question";
import { renderList } from "./Utils/renderList";
import { Modal } from "./modal";
import "./styles.scss";

const form: Element = document.querySelector("#form");
const input: HTMLInputElement = form.querySelector("#question-input");
const submitBtn: HTMLButtonElement = form.querySelector("#submit");
const modalBtn: HTMLButtonElement = document.body.querySelector("#modal-btn");
const question = new Question();

function submitFormHandler(event: Event, question: Question): void {
    event.preventDefault(); // Не перезагружать страницу
    if (isValidInput(input.value)) {
        const questionData: IQuestion = {
            text: input.value.trim(),
            date: new Date().toJSON(),
        };

        submitBtn.disabled = true;
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

function handlerFun(event: Event): void{ 
    submitFormHandler(event, question); 
}

const modalHTML: Modal = new Modal(modalBtn, question);
modalHTML.createBtnEvents();
form.addEventListener("submit", handlerFun);
window.addEventListener("load", renderList);
input.addEventListener("input", imputChanged);