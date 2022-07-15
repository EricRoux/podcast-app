import { IAuthResponse } from "./Interfaces/IAuthResponse";
import { IUserAuth } from "./Interfaces/IUserAuth";

function AuthFormHTML(): string {
    return `
    <form class="mui-form" id="auth-form">
        <div class="mui-textfield">
            <input type="email" id="authEmail" required>
            <label for="authEmail">Email</label>
        </div>
        <div class="mui-textfield">
            <input type="password" id="authPassword" required>
            <label for="authPassword">Пароль</label>
        </div>
        <button 
            type="submit" 
            class="mui-btn mui-btn--raised mui-btn--primary"
        >
            Войти
        </button>
    </form>
    `;
}

function regFormHTML(): string {
    return `
    <form class="mui-form">
        <div class="mui-textfield">
            <input type="email" id="regEmail" required>
            <label for="regEmail">Email</label>
        </div>
        <div class="mui-textfield">
            <input type="password" id="regPassword1" required>
            <label for="password">Пароль</label>
        </div>
        <div class="mui-textfield">
            <input type="password" id="regPassword2" required>
            <label for="password">Пароль</label>
        </div>
        <button 
            type="submit" 
            class="mui-btn mui-btn--raised mui-btn--primary"
        >
            Зарегистрироваться
        </button>
    </form>
    `;
}

export function getAuthFormHTML(): string {
    return `
    <ul class="mui-tabs__bar">
        <li class="mui--is-active">
            <a data-mui-toggle="tab" data-mui-controls="pane-default-1">Авторизация</a>
        </li>
        <li>
            <a data-mui-toggle="tab" data-mui-controls="pane-default-2">Регистрация</a>
        </li>
    </ul>
    <div class="mui-tabs__pane mui--is-active" id="pane-default-1">` + AuthFormHTML() + `</div>
    <div class="mui-tabs__pane" id="pane-default-2">` + regFormHTML() + "</div>";
}

export function authWithEmailAndPassword(
    userAuth: IUserAuth
): Promise<string> {
    return fetch("http://localhost:5050/api/v1/Auth/login", {    
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
            throw new Error("Something went wrong");
        });
}