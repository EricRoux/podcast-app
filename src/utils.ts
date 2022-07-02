export function isValid(value: string): boolean {
    return value.length >= 10 && value.length <= 256;
}