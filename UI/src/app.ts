import "./styles.scss";
import { isValidInput } from "./Utils/isValidInput";
import { IQuestion } from "./Interfaces/IQuestion";
import { Question } from "./question";
import { renderList } from "./Utils/renderList";
import { createModal } from "./Utils/createModal";
import { getAuthFormHTML, authWithEmailAndPassword } from "./auth";

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

function openModal(className: string): void {
    createModal(className, "Авторизация", getAuthFormHTML());
}

function closeModal(className: string): void {
    document.querySelector(`.${className}`).remove();
}

function authFormHandler(event: Event): void {
    event.preventDefault();
}

function modalEvents(className: string): void {
    document
        .querySelector(`.${className}`)
        .addEventListener("submit", authFormHandler, {once: true});
}

function modalAuthorization(className: string): void {
    const email: string = (
        <HTMLInputElement>document
            .querySelector(`.${className}`)
            .querySelector("#email")
    ).value;

    const password: string = (
        <HTMLInputElement>document
            .querySelector(`.${className}`)
            .querySelector("#email")
    ).value;

    authWithEmailAndPassword(email, password)
        .then((token: string): void => {
            localStorage.setItem("authToken", token);
            modalBtn.innerText = "o";
            reloadQuestions();
        });
}

function modal(): void {
    const modalClass: string = "modal";
    if(modalBtn.innerText == "+"){
        openModal(modalClass);
        modalBtn.innerText = "-";
    } else if(modalBtn.innerText == "-") {
        closeModal(modalClass);
        modalBtn.innerText = "+";
    } else {
        reloadQuestions();
    }
    modalEvents(modalClass);
    modalAuthorization(modalClass);
}

window.addEventListener("load", renderList);
form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", imputChanged);
modalBtn.addEventListener("click", modal);