import { isValidInput } from "../../../src/Utils/isValidInput";

describe("Тестирование валидности введенного вопроса", (): void => {
    test("Меньше 10", (): void => {
        expect(isValidInput("123456")).toBe(false);
    });
    test("Левая граница. 10 символов", (): void => {
        expect(isValidInput("1234567890")).toBe(true);
    });
    test("Строка пробелов", (): void => {
        expect(isValidInput("          ")).toBe(false);
    });
    test("Пустая строка", (): void => {
        expect(isValidInput("")).toBe(false);
    });
    test("Слишком длинная строка", (): void => {
        expect(isValidInput("8".repeat(300))).toBe(false);
    });
    test("Правая граница. 256 символов", (): void => {
        expect(isValidInput("8".repeat(256))).toBe(true);
    });
});
