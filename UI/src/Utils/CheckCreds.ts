export function checkEmail(email: string): boolean {
    const at: string[] = email.split("@");
    const dot: string[] = at[1].split(".");
    console.log(at[0]);
    console.log(dot[0]);
    console.log(dot[1]);
    return at[0].length > 0 && 
           dot[0].length > 0 &&  
           dot[1].length > 1;
}


export function checkPasswordLen(password: string): boolean {
    return password.length > 5;
}

export function checkPasswordDiff(
    password1: string,
    password2: string
): boolean {
    return password1 == password2;
}

