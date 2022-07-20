import { isValidInput } from "./Utils/isValidInput";
import { IQuestionRequest } from "./Interfaces/IQuestion";
import { createQuestion } from "./question";
import { render } from "./Utils/renderList";
import { createErrorMessage } from "./Utils/createErrorMessage";
import { Modal } from "./modal";
import "./styles.scss";

const form: Element = document.querySelector("#form");
const input: HTMLInputElement = form.querySelector("#question-input");
const submitBtn: HTMLButtonElement = form.querySelector("#submit");
const modalBtn: HTMLButtonElement = document.body.querySelector("#modal-btn");


function submitFormHandler(event: Event): void {
    event.preventDefault(); // Не перезагружать страницу
    if (isValidInput(input.value)) {
        const questionData: IQuestionRequest = {
            text: input.value.trim(),
            date: new Date().toJSON(),
        };

        submitBtn.disabled = true;
        createQuestion(questionData)
            .then((): void => {
                input.value = "";
                input.className = "";
                render();
            });
    }
}

function imputChanged(): void {
    if(localStorage.getItem("bearer"))
        submitBtn.disabled = !isValidInput(input.value);
    else if(input.value != ""){
        submitBtn.disabled = true;
        createErrorMessage("Сначала авторизуйтесь");
    }
}

const modalHTML: Modal = new Modal(modalBtn);
modalHTML.createBtnEvents();
form.addEventListener("submit", submitFormHandler);
window.addEventListener("load", render);
input.addEventListener("input", imputChanged);