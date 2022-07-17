import { checkEmail, checkPasswordDiff, checkPasswordLen } from "../../src/Utils/CheckCreds";

describe("Проверка валидности email", (): void => {
    test("Валидный email", (): void => {
        expect(checkEmail("test@mail.ru")).toBe(true);
    });
    test("Email без названия", (): void => {
        expect(checkEmail("@mail.ru")).toBe(false);
    });
    test("Email без домена", (): void => {
        expect(checkEmail("test@.ru")).toBe(false);
    });
    test("Email без глобального домена .ru", (): void => {
        expect(checkEmail("test@mail.")).toBe(false);
    });
    test("Email без названия @", (): void => {
        expect(checkEmail("testmail.ru")).toBe(false);
    });
    test("Строка из 1 символа", (): void => {
        expect(checkEmail("t")).toBe(false);
    });
    test("Минимальное количество строк", (): void => {
        expect(checkEmail("a@a.aa")).toBe(true); 
    });
    test("Пустая строка", (): void => {
        expect(checkEmail("")).toBe(false); 
    });
    test("Пробелы вместо имени", (): void => {
        expect(checkEmail(" @a.aa")).toBe(false); 
    }); 
    test("Пробелы вместо домена", (): void => {
        expect(checkEmail("a@ .aa")).toBe(false); 
    }); 
    test("Пробелы вместо глобального домена", (): void => {
        expect(checkEmail("a@a.  ")).toBe(false); 
    });
    test("Email из пробелов", (): void => {
        expect(checkEmail(" @ .  ")).toBe(false); 
    }); 
});

describe("Проверка длины пароля", (): void => {
    test("Левая граница. 6 символов", (): void => {
        expect(checkPasswordLen("123456")).toBe(true);
    });
    test("Менее 6 символов", (): void => {
        expect(checkPasswordLen("12345")).toBe(false);
    });
    test("Строка из пробелов", (): void => {
        expect(checkPasswordLen("      ")).toBe(false);
    });
    test("Пароль менее 6 сиволов но дополненный пробелами", (): void => {
        expect(checkPasswordLen(" 1234   ")).toBe(false);
    });
});
describe("Проверка совпадения паролей", (): void => {
    test("Идентичные пароли", (): void => {
        expect(checkPasswordDiff("123456", "123456")).toBe(true);
        expect(checkPasswordDiff("123456", "123456 ")).toBe(true);
        expect(checkPasswordDiff("123456 ", "123456")).toBe(true);
    });
    test("Отличные друг от друга пароли", (): void => {
        expect(checkPasswordDiff("123456", "132456")).toBe(false);
        expect(checkPasswordDiff("123456", "1234")).toBe(false);
    });
});