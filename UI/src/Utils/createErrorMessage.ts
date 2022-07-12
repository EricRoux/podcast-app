export function createErrorMessage(): void {
    if(!document.querySelector(".error-message")){
        const form: HTMLFormElement = document.querySelector(".mui-form");
        const fetchError: HTMLDivElement = document.createElement("div");
        fetchError.className = "error-message";
        fetchError.innerHTML = "<p>Потеряно соединение с сервером<p>";
        fetchError.style.color = "red";
        form.before(fetchError);
        setTimeout((): void => {
            fetchError.remove();
        }, 3000);
    }    
}