import { createModal } from "./Utils/createModal";
import { getAuthFormHTML, authWithEmailAndPassword } from "./auth";

export class Modal {

    private modalBtn: HTMLButtonElement;

    constructor(modalBtn: HTMLButtonElement) {
        this.modalBtn = modalBtn;
        
        this.createBtnEvents = this.createBtnEvents.bind(this);
        this.modal = this.modal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.modalEvents = this.modalEvents.bind(this);
        this.authFormHandler = this.authFormHandler.bind(this);
    }

    openModal(className: string): void {
        createModal(className, "Авторизация", getAuthFormHTML());
    }
    
    closeModal(className: string): void {
        document.querySelector(`.${className}`).remove();
    }
    
    authFormHandler(event: Event): void {
        event.preventDefault();
        const target: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
        const email: string = (
            <HTMLInputElement>document
                .querySelector(`.${target.className}`)
                .querySelector("#email")
        ).value;
    
        const password: string = (
            <HTMLInputElement>document
                .querySelector(`.${target.className}`)
                .querySelector("#email")
        ).value;
        
        this.closeModal(target.className);
        authWithEmailAndPassword(email, password)
            .then((token: string): void => {
                localStorage.setItem("authToken", token);
                this.modalBtn.innerText = "o";
                // reloadQuestions();
            });
    }
    
    modalEvents(className: string): void {
        const modal = document.querySelector(`.${className}`);
        modal.addEventListener("submit", this.authFormHandler, {once: true});
        modal.className = className;
    }
    
    modal(): void {
        const modalClass: string = "modal";
        if(this.modalBtn.innerText == "+"){
            this.openModal(modalClass);
            this.modalBtn.innerText = "-";
        } else if(this.modalBtn.innerText == "-") {
            this.closeModal(modalClass);
            this.modalBtn.innerText = "+";
        } else {
            // reloadQuestions();
        }
        this.modalEvents(modalClass);
    }

    createBtnEvents(): void {
        this.modalBtn.addEventListener("click", this.modal);
    }
}