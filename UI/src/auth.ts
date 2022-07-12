import { IAuthResponse } from "./Interfaces/IAuthResponse";

export function getAuthFormHTML(): string {
    return `
    <form class="mui-form" id="auth-form">
        <div class="mui-textfield">
            <input type="email" id="email" required>
            <label for="email">Email</label>
        </div>
        <div class="mui-textfield">
            <input type="password" id="password" required>
            <label for="password">Пароль</label>
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


export function authWithEmailAndPassword(
    email: string, 
    password: string
): Promise<string> {
    return fetch("http://localhost:5050/api/v1/Auth/login", {    
        method: "POST",
        body: JSON.stringify({
            email, password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response: Response): Promise<IAuthResponse> => response.json())
        .then((data: IAuthResponse): string => {
            return data.token;
        });
}