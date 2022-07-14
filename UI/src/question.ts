import { IQuestion } from "./Interfaces/IQuestion";
import { AddQuestionToLocalStorage } from "./Utils/AddQuestionToLocalStorage";
import { IQuestionResponse } from "./Interfaces/IQuestionResponse";
import { createErrorMessage } from "./Utils/createErrorMessage";

export class Question {
    create(question: IQuestion): Promise<void> {
        return fetch("http://localhost:5050/api/v1/newQuestion", {
            method: "POST",
            body: JSON.stringify(question),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response: Response): Promise<IQuestionResponse> => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Something went wrong");
            })
            .then((json: IQuestionResponse): void => { //IQuestion => {
                question.id = json.id;
                // return question;
            })
            // .then()
            .catch((rejected: PromiseRejectedResult): void => {
                console.log(rejected);
                createErrorMessage();
            });
    }
    fetch(token: string): Promise<void> {
        return fetch("http://localhost:5050/api/v1/newQuestion", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        })
            .then((response: Response): Promise<string> => response.json())
            .then((questions: string): void => {
                console.log(token);
                console.log(questions);
            })
            .catch((rejected: PromiseRejectedResult): void => {
                console.log(rejected);
                createErrorMessage();
            }); 
    }
}