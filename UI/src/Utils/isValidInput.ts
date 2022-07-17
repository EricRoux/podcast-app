export function isValidInput(value: string): boolean {
    return value.trim().length >= 10 && value.trim().length <= 256;
}