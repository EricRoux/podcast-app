export function SaveEmailToLocalStorage(email: string): void {
    localStorage.setItem("email", email);
}