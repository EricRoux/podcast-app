import { IQuestion } from "./Interfaces/IQuestion";

export class Question {
    static create<T>(question: IQuestion): Promise<T> {
        return fetch("http://localhost:5050/api/v1/newQuestion", {
            method: "POST",
            body: JSON.stringify(question),
            headers: {
                "Content-Type": "application/json"
            }, 
        })
            .then((response: Response): Promise<T> => {
                if(!response.ok) {
                    throw new Error(response.statusText);
                } else {
                    return response.json();
                }
            });
    }
}