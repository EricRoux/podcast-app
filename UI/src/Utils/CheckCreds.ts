export function checkEmail(email: string): boolean {
    try{
        const at: string[] = email.split("@");
        const dot: string[] = at[1].split(".");
        return at[0].trim().length > 0 && 
            dot[0].trim().length > 0 &&  
            dot[1].trim().length > 1;
    } catch {
        return false;
    }
    
}


export function checkPasswordLen(password: string): boolean {
    return password.trim().length > 5;
}

export function checkPasswordDiff(
    password1: string,
    password2: string
): boolean {
    return password1.trim() == password2.trim();
}

