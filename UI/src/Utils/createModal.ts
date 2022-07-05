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
    
    // const html: string = `
    // <tr>
    //     <td>
    //         <label for="username">Username:</label>
    //     </td>
    //     <td>
    //         <input 
    //             id="newInputUsername" 
    //             pattern="\w+" 
    //             type="text" 
    //             placeholder="Enter your username" 
    //             tabindex="1" 
    //             autofocus>
    //         </td>
    // </tr>
    // <tr>
    //     <td>
    //         <label for="password">Password:</label>
    //     </td>
    //     <td>
    //         <input 
    //             id="newInputPassword" 
    //             pattern="\w+" 
    //             type="password" 
    //             placeholder="Enter your password" 
    //             tabindex="2">
    //         </td>
    // </tr>
    // <tr> 
    //     <td>
    //         <input 
    //             id="sign-in-btn" 
    //          class="newLoginSingIn" 
    //          type="submit" 
    //          value="Sign in" 
    //          tabindex="3">
    //     </td>
    //     <td>
    //         <input 
    //             id="sign-in-btn" 
    //             class="newLoginExit" 
    //             type="button" 
    //             value="Exit" 
    //             tabindex="4">
    //     </td>
    // </tr>`;
}
