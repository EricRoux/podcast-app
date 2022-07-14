import { createModal } from "./Utils/createModal";
import { getAuthFormHTML, authWithEmailAndPassword } from "./auth";
import { createErrorMessage } from "./Utils/createErrorMessage";
import { IUserAuth } from "./Interfaces/IUserAuth";
import { Question } from "./question";

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
    
    private closeModal(className: string): void {
        document.querySelector(`.${className}`).remove();
    }
    
    private authFormHandler(event: Event): void {
        event.preventDefault();
        const target: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
        const userAuth: IUserAuth = {
            email: (
                <HTMLInputElement>document
                    .querySelector(`.${target.className}`)
                    .querySelector("#email")
            ).value,
        
            password: (
                <HTMLInputElement>document
                    .querySelector(`.${target.className}`)
                    .querySelector("#password")
            ).value,
        };
        
        this.closeModal(target.className);
        authWithEmailAndPassword(userAuth)
            .then((token: string): Promise<void> => {
                localStorage.setItem("authToken", token);
                this.modalBtn.innerText = "o";
                return this.question.fetch(token);
                // reloadQuestions();
            })
            .catch((rejected: PromiseRejectedResult): void => {
                console.log(rejected);
                createErrorMessage();
                this.closeModal(this.modalClass);
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
            this.closeModal(this.modalClass);
            this.modalBtn.innerText = "+";
        } else {
            this.closeModal(this.modalClass);
            // reloadQuestions();
        }
        this.modalEvents(this.modalClass);
    }

    createBtnEvents(): void {
        this.modalBtn.addEventListener("click", this.modal);
    }
}