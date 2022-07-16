import { IAuthResponse } from "./Interfaces/IAuthResponse";
import { IQuestion, IQuestions } from "./Interfaces/IQuestion";
import { IUserAuth } from "./Interfaces/IUserAuth";
import { getQuestions } from "./question";
import { AddQuestionToLocalStorage } from "./Utils/AddQuestionToLocalStorage";
import { createErrorMessage } from "./Utils/createErrorMessage";
import { renderList } from "./Utils/renderList";

export enum URL {
    Login = "/api/v1/Auth/login",
    Registration = "/api/v1/Auth/registration"
}

function sendPOSTWithEmailAndPassword(
    path: URL,
    userAuth: IUserAuth
): Promise<string> {
    return fetch("http://localhost:5050" + path, {    
        method: "POST",
        body: JSON.stringify(userAuth),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response: Response): Promise<IAuthResponse> => response.json())
        .then((data: IAuthResponse): string => {
            if(data.status == 1)
                return data.token;
            else
                createErrorMessage(data.message);
            throw new Error(data.message);
        });
}

export function postRequest(path: URL, userAuth: IUserAuth): void {
    sendPOSTWithEmailAndPassword(path, userAuth)
        .then((token: string): Promise<IQuestions> => {
            localStorage.setItem("bearer", token);
            localStorage.removeItem("questions");
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