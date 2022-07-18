/* eslint-disable max-lines-per-function */
import {By, WebDriver, createDriver, createDir, createScreenShoot} from "../selenium";

jest.setTimeout(30000);

async function passwordChecker(
    lineText: string, 
    driver: typeof WebDriver,
    linePassword1: string,
    linePassword2: string
): Promise<void> {
    await driver.findElement(By.xpath("//button[@id='modal-btn']"))
        .click();
    await driver.findElement(By.xpath("//a[@data-mui-controls='pane-default-2']"))
        .click();
    await driver.findElement(By.xpath("//input[@id='email'][contains(@class, 'regEmail')]"))
        .sendKeys(lineText);
    await driver.findElement(By.xpath("//input[contains(@class, 'regPassword1')]"))
        .sendKeys(linePassword1);
    await driver.findElement(By.xpath("//input[contains(@class, 'regPassword2')]"))
        .sendKeys(linePassword2);
    await driver.findElement(By.xpath("//button[@id='regSubmit']")).click();
}

describe("Проверка валидности пароля", (): void => {
    let driver: typeof WebDriver;
    let testNumber: number = 1;
    const date: string = new Date().toJSON();
    const path: string = `./UI/tests/e2e/img/modalPassword.test/${date}`;

    beforeAll(async (): Promise<void> => {
        await createDir(path);
        driver = await createDriver();    
    });

    beforeEach(async (): Promise<void> => {
        await driver.get("http://172.17.0.1:3000");
    });

    afterEach(async (): Promise<void> => {
        await createScreenShoot(driver, path, testNumber);
        testNumber++;
    });
    
    afterAll(async (): Promise<void> => {
        await driver.close();
        await driver.quit();
    });
    test("Проверка пароля 1 (reg). Размер меньше 6", async (): Promise<void> => {
        const lineEmail: string = "temp@mail.ru";
        const linePassword1: string = "12345";
        const linePassword2: string = "12345";
        await passwordChecker(lineEmail, driver, linePassword1, linePassword2);
        await driver.findElement(By.xpath("//p[contains(text(), 'Пароль слишком короткий')]"));
    });
    test("Проверка пароля 2 (reg). Разные пароли 1", async (): Promise<void> => {
        const lineEmail: string = "temp@mail.ru";
        const linePassword1: string = "12345678";
        const linePassword2: string = "12345321";
        await passwordChecker(lineEmail, driver, linePassword1, linePassword2);
        await driver.findElement(By.xpath("//p[contains(text(), 'Пароли не совпадают')]"));
    });
    test("Проверка пароля 3 (reg). Разные пароли 2", async (): Promise<void> => {
        const lineEmail: string = "temp@mail.ru";
        const linePassword1: string = "12345678";
        const linePassword2: string = "";
        await passwordChecker(lineEmail, driver, linePassword1, linePassword2);
        await driver.findElement(By.xpath("//p[contains(text(), 'Пароли не совпадают')]"));
    });
    test("Проверка пароля 4 (reg). Разные пароли 3", async (): Promise<void> => {
        const lineEmail: string = "temp@mail.ru";
        const linePassword1: string = "12345678";
        const linePassword2: string = "12 345678";
        await passwordChecker(lineEmail, driver, linePassword1, linePassword2);
        await driver.findElement(By.xpath("//p[contains(text(), 'Пароли не совпадают')]"));
    });
    test("Проверка пароля 5 (reg). Разные пароли 4", async (): Promise<void> => {
        const lineEmail: string = "temp@mail.ru";
        const linePassword1: string = "";
        const linePassword2: string = "12345678";
        await passwordChecker(lineEmail, driver, linePassword1, linePassword2);
        await driver.findElement(By.xpath("//p[contains(text(), 'Пароль слишком короткий')]"));
    });
});