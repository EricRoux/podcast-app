/* eslint-disable max-lines-per-function */
import {By, WebDriver, createDriver, createDir, createScreenShoot} from "../selenium";

jest.setTimeout(30000);

async function emailChecker(
    lineText: string, 
    driver: typeof WebDriver,
    formType: string,
    panel: number
): Promise<void> {
    await driver.findElement(By.xpath("//button[@id='modal-btn']"))
        .click();
    await driver.findElement(By.xpath(`//a[@data-mui-controls='pane-default-${panel.toString()}']`))
        .click();
    await driver.findElement(By.xpath(`//input[@id='email'][contains(@class, '${formType}Email')]`))
        .sendKeys(lineText);
    await driver.findElement(By.xpath(`//button[@id='${formType}Submit']`)).click();
    const message = await driver.findElement(By.xpath("//div[@class='error-message'][@style='color: red;']"));
    await message.findElement(By.xpath("//p[contains(text(), 'Неправильный Email')]"));
}

describe("Проверка валидности Email", (): void => {
    let driver: typeof WebDriver;
    let testNumber: number = 1;
    const date: string = new Date().toJSON();
    const path: string = `./UI/tests/e2e/img/modalEmail.test/${date}`;

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
    test("Некорректно заданный email 1 (ayth)", async (): Promise<void> => {
        const lineText: string = "a@a.a";
        await emailChecker(lineText, driver, "auth", 1);
    });
    test("Некорректно заданный email 2 (reg)", async (): Promise<void> => {
        const lineText: string = "a@a.a";
        await emailChecker(lineText, driver, "reg", 2);
    });
    test("Некорректно заданный email 3 (reg)", async (): Promise<void> => {
        const lineText: string = "a";
        await emailChecker(lineText, driver, "reg", 2);
    });
    test("Некорректно заданный email 4 (reg)", async (): Promise<void> => {
        const lineText: string = "a@";
        await emailChecker(lineText, driver, "reg", 2);
    });
    test("Некорректно заданный email 5 (reg)", async (): Promise<void> => {
        const lineText: string = "a@a.";
        await emailChecker(lineText, driver, "reg", 2);
    });
    test("Некорректно заданный email 6 (reg)", async (): Promise<void> => {
        const lineText: string = "a@a. ";
        await emailChecker(lineText, driver, "reg", 2);
    });
    test("Некорректно заданный email 7 (reg)", async (): Promise<void> => {
        const lineText: string = "a@a.r ";
        await emailChecker(lineText, driver, "reg", 2);
    });
    test("Некорректно заданный email 8 (reg)", async (): Promise<void> => {
        const lineText: string = "@mail.ru";
        await emailChecker(lineText, driver, "reg", 2);
    });
});