import { IQuestion, IQuestionRequest, IQuestions } from "./Interfaces/IQuestion";
import { AddQuestionToLocalStorage } from "./Utils/AddQuestionToLocalStorage";
import { createErrorMessage } from "./Utils/createErrorMessage";

export function createQuestion(question: IQuestionRequest): Promise<void> {
    return fetch("http://localhost:5050/api/v1/newQuestion", {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("bearer"),
            "Content-Type": "application/json"
        }
    })
        .then((response: Response): Promise<IQuestions> => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Something went wrong");
        })
        .then((questionResponse: IQuestions): IQuestion => {
            if(questionResponse.status == 1)
                return questionResponse.questions[0];
            createErrorMessage(questionResponse.message);
            throw new Error("Something went wrong");
        })
        .then(AddQuestionToLocalStorage)
        .catch((rejected: PromiseRejectedResult): void => {
            console.log(rejected);
            createErrorMessage("Потеряно соединение с сервером");
        });
}

export function getQuestions(): Promise<IQuestions> {
    if(!localStorage.getItem("bearer")) throw new Error("Вы не авторизованы");
    return fetch("http://localhost:5050/api/v1/getQuestions", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("bearer"),
            "Content-Type": "application/json"
        }
    })
        .then((response: Response): Promise<IQuestions> => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Something went wrong");
        });
}
