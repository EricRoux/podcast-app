import { createModal } from "./Utils/createModal";
import { getAuthFormHTML, authWithEmailAndPassword } from "./auth";
import { createErrorMessage } from "./Utils/createErrorMessage";
import { IUserAuth } from "./Interfaces/IUserAuth";
import { getQuestions } from "./question";
import { IQuestion, IQuestions } from "./Interfaces/IQuestion";
import { AddQuestionToLocalStorage } from "./Utils/AddQuestionToLocalStorage";
import { renderList } from "./Utils/renderList";

export class Modal {

    private modalBtn: HTMLButtonElement;
    private modalClass: string = "modal";

    constructor(modalBtn: HTMLButtonElement) {
        this.modalBtn = modalBtn;
        
        this.createBtnEvents = this.createBtnEvents.bind(this);
        this.modal = this.modal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.modalEvents = this.modalEvents.bind(this);
        this.authFormHandler = this.authFormHandler.bind(this);
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
                localStorage.removeItem("questions");
                // this.modalBtn.innerText = "o";
                return getQuestions();
            })
            .then((json: IQuestions): void => {
                if(json.status == 0) console.log(json.message); 
                json.questions.forEach((question: IQuestion): void => {
                    AddQuestionToLocalStorage(question);
                });
            })
            .then(renderList)
            .catch((rejected: PromiseRejectedResult): void => {
                console.log(rejected);
                createErrorMessage("Потеряно соединение с сервером");
            });
    }
    
    private modalEvents(): void {
        const modal = document.querySelector("#auth-form");
        modal.addEventListener("submit", this.authFormHandler);
        // modal.addEventListener(
        //      "#regSubmit", 
        //      this.authFormHandler
        // );
        // modal.className = className;
    }

    private openModal(className: string): void {
        createModal(className, "Авторизация", getAuthFormHTML());
        this.modalEvents();
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
            // getQuestions();
        }
    }

    createBtnEvents(): void {
        this.modalBtn.addEventListener("click", this.modal);
    }
}