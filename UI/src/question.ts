import { IQuestion } from "./Interfaces/IQuestion";
import { addQuestionToLocalStorage } from "./utils";
import { IQuestionResponse } from "./Interfaces/IQuestionResponse";

export class Question {
    static create(question: IQuestion): Promise<void> {
        return fetch("http://localhost:5050/api/v1/newQuestion", {
            method: "POST",
            body: JSON.stringify(question),
            headers: {
                "Content-Type": "application/json"
            }, 
        })
            .then((response: Response): Promise<IQuestionResponse> => {
                return response.json();
            })
            .then((json: IQuestionResponse): IQuestion => {
                question.id = json.id;
                return question;
            })
            .then(addQuestionToLocalStorage);
    }
}