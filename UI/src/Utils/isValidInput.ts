export function isValidInput(value: string): boolean {
    return value.length >= 10 && value.length <= 256;
}