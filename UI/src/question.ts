import { IQuestion, IQuestions } from "./Interfaces/IQuestion";
import { IQuestionResponse } from "./Interfaces/IQuestionResponse";
import { AddQuestionToLocalStorage } from "./Utils/AddQuestionToLocalStorage";
import { createErrorMessage } from "./Utils/createErrorMessage";

export class Question {
    create(question: IQuestion): Promise<void> {
        return fetch("http://localhost:5050/api/v1/newQuestion", {
            method: "POST",
            body: JSON.stringify(question),
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("bearer"),
                "Content-Type": "application/json"
            }
        })
            .then((response: Response): Promise<IQuestionResponse> => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Something went wrong");
            })
            .then((questionResponse: IQuestionResponse): IQuestion => {
                question.id = questionResponse.id;
                return question;
            })
            .then(AddQuestionToLocalStorage)
            .catch((rejected: PromiseRejectedResult): void => {
                console.log(rejected);
                createErrorMessage();
            });
    }
    fetch(): Promise<IQuestions> {
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
}