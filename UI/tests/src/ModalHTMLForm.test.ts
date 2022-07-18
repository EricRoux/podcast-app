import { getAuthFormHTML } from "../../src/ModalHTMLForm";

describe("Создание Modal окна", (): void => {
    test("Получение окна", (): void => {
        expect(getAuthFormHTML.toString()).toMatchSnapshot();
    });
});