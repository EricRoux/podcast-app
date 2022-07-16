function AuthFormHTML(): string {
    return `
    <form class="mui-form auth-form">
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
            id="authSubmit"
            class="mui-btn mui-btn--raised mui-btn--primary"
        >
            Войти
        </button>
    </form>
    `;
}

function regFormHTML(): string {
    return `
    <form class="mui-form reg-form">
        <div class="mui-textfield">
            <input type="email" id="email" required>
            <label for="email">Email</label>
        </div>
        <div class="mui-textfield">
            <input type="password" id="password" required>
            <label for="password">Пароль</label>
        </div>
        <div class="mui-textfield">
            <input type="password" id="password2" required>
            <label for="password">Пароль</label>
        </div>
        <button 
            type="submit" 
            id="regSubmit"
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