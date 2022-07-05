export function createModal(
    className: string, 
    title: string, 
    content: string
): void {
    if(!document.querySelector(`.${className}`)){
        const modal: HTMLElement = document.createElement("div");
        modal.classList.add(className);
        
        modal.innerHTML = `
        <div class="modal-form">
            <h1>${title}</h1>
            <div class="model-content">${content}</div>
        </div>
        `;
    
        document.body.prepend(modal);
    }
}
