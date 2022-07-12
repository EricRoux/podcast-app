import { IQuestion } from "./Interfaces/IQuestion";
import { addQuestionToLocalStorage } from "./Utils/addQuestionToLocalStorage";
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
            .then((json: IQuestionResponse): IQuestion => {
                question.id = json.id;
                return question;
            })
            .then(addQuestionToLocalStorage)
            .catch((rejected: PromiseRejectedResult): void => {
                console.log(rejected);
                createErrorMessage();
            });
    }
}