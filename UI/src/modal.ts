import { createModal } from "./Utils/createModal";
import { getAuthFormHTML } from "./ModalHTMLForm";
import { IUserAuth } from "./Interfaces/IUserAuth";
import { checkEmail, checkPasswordDiff, checkPasswordLen } from "./Utils/CheckCreds";
import { postRequest, URL } from "./auth";
import { createErrorMessage } from "./Utils/createErrorMessage";

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
        this.regFormHandler = this.regFormHandler.bind(this);
        this.getCreds = this.getCreds.bind(this);
    }
    
    private closeModal(): void {
        document.querySelector(`.${this.modalClass}`).remove();
        this.modalBtn.innerText = "+";
    }

    private getCreds(className: string): IUserAuth {
        return {
            email: (<HTMLInputElement>document
                .querySelector(className)
                .querySelector("#email")
            ).value,
        
            password: (<HTMLInputElement>document
                .querySelector(className)
                .querySelector("#password")
            ).value,
        };
    }
    
    private authFormHandler(event: Event): void {
        event.preventDefault();
        const userAuth: IUserAuth = this.getCreds(".auth-form");
        if(!checkEmail(userAuth.email)) {
            createErrorMessage("Неправильный Email",".mui-textfield");
            return;
        }
        this.closeModal();
        postRequest(URL.Login, userAuth);
    }

    private regFormHandler(event: Event): void {
        event.preventDefault();
        const userAuth: IUserAuth = this.getCreds(".reg-form");
        const password2: string = (<HTMLInputElement>document
            .querySelector(".reg-form")
            .querySelector("#password2"))
            .value;
        if(!checkEmail(userAuth.email)) {
            createErrorMessage("Неправильный Email",".mui-textfield");
            return;
        } else if(!checkPasswordLen(userAuth.password)){
            createErrorMessage("Пароль слишком короткий",".mui-textfield");
            return; 
        } else if(!checkPasswordDiff(userAuth.password, password2)) {
            createErrorMessage("Пароль слишком короткий",".mui-textfield");
            return;
        }
        this.closeModal();
        postRequest(URL.Registration, userAuth);
    }
    
    private modalEvents(): void {
        const authForm: HTMLFormElement = document.querySelector(".auth-form");
        authForm.addEventListener("submit", this.authFormHandler, {once: true});
        const regForm: HTMLFormElement = document.querySelector(".reg-form");
        regForm.addEventListener("submit", this.regFormHandler, {once: true});
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