export function createErrorMessage(message: string, className: string = ".mui-form"): void {
    if(!document.querySelector(".error-message")){
        const form: HTMLFormElement = document.querySelector(className);
        const fetchError: HTMLDivElement = document.createElement("div");
        fetchError.className = "error-message";
        fetchError.innerHTML = `<p>${message}</p>`;
        fetchError.style.color = "red";
        form.before(fetchError);
        setTimeout((): void => {
            fetchError.remove();
        }, 3000);
    }    
}