import { createModal } from "./Utils/createModal";
import { getAuthFormHTML, authWithEmailAndPassword } from "./auth";
import { createErrorMessage } from "./Utils/createErrorMessage";
import { IUserAuth } from "./Interfaces/IUserAuth";
import { Question } from "./question";
import { IQuestion, IQuestions } from "./Interfaces/IQuestion";
import { AddQuestionToLocalStorage } from "./Utils/AddQuestionToLocalStorage";
import { renderList } from "./Utils/renderList";

export class Modal {

    private modalBtn: HTMLButtonElement;
    private modalClass: string = "modal";
    private question: Question;

    constructor(modalBtn: HTMLButtonElement, question: Question) {
        this.modalBtn = modalBtn;
        this.question = question;
        
        this.createBtnEvents = this.createBtnEvents.bind(this);
        this.modal = this.modal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.modalEvents = this.modalEvents.bind(this);
        this.authFormHandler = this.authFormHandler.bind(this);
    }

    private openModal(className: string): void {
        createModal(className, "Авторизация", getAuthFormHTML());
    }
    
    private closeModal(): void {
        document.querySelector(`.${this.modalClass}`).remove();
        this.modalBtn.innerText = "+";
    }
    
    private authFormHandler(event: Event): void {
        event.preventDefault();
        const target: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
        const userAuth: IUserAuth = {
            email: (
                <HTMLInputElement>document
                    .querySelector(`.${target.className}`)
                    .querySelector("#authEmail")
            ).value,
        
            password: (
                <HTMLInputElement>document
                    .querySelector(`.${target.className}`)
                    .querySelector("#authPassword")
            ).value,
        };
        
        this.closeModal();
        authWithEmailAndPassword(userAuth)
            .then((token: string): Promise<IQuestions> => {
                localStorage.setItem("bearer", token);
                localStorage.setItem("email", userAuth.email);
                localStorage.removeItem("questions");
                // this.modalBtn.innerText = "o";
                return this.question.fetch();
            })
            .then((questions: IQuestions): void => {
                if(questions.status == 0) return; 
                questions.list.forEach((question: IQuestion): void => {
                    AddQuestionToLocalStorage(question);
                });
            })
            .then(renderList)
            .catch((rejected: PromiseRejectedResult): void => {
                console.log(rejected);
                createErrorMessage();
                this.closeModal();
            });
    }
    
    private modalEvents(className: string): void {
        const modal = document.querySelector(`.${className}`);
        modal.addEventListener("submit", this.authFormHandler, {once: true});
        modal.className = className;
    }
    
    private modal(): void {
        if(this.modalBtn.innerText == "+"){
            this.openModal(this.modalClass);
            this.modalBtn.innerText = "-";
        } else if(this.modalBtn.innerText == "-") {
            this.closeModal();
            this.modalBtn.innerText = "+";
        } else {
            this.closeModal();
            this.question.fetch();
        }
        this.modalEvents(this.modalClass);
    }

    createBtnEvents(): void {
        this.modalBtn.addEventListener("click", this.modal);
    }
}