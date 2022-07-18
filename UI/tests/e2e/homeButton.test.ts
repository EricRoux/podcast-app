/* eslint-disable max-lines-per-function */
import {By, WebDriver, createDriver, createDir, createScreenShoot} from "../selenium";

jest.setTimeout(30000);

describe("Проверка кнопок на домашней странице", (): void => {
    let driver: typeof WebDriver;
    let testNumber: number = 1;
    const date: string = new Date().toJSON();
    const path: string = `./UI/tests/e2e/img/homeButton.test/${date}`;

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
    test("Ввести строку под неавторизованным пользователем", async (): Promise<void> => {
        const lineText: string = "12345";
        await driver.findElement(By.xpath("//input[@id='question-input']"))
            .sendKeys(lineText);
        await driver.findElement(By.xpath("//button[@id='submit'][@disabled]"));
        const errorMessage: string = await driver.findElement(By.xpath("//div[@class='error-message'][@style='color: red;']"))
            .getAttribute("textContent");
        expect(errorMessage).toBe("Сначала авторизуйтесь");
    });
    test("Проверка +/- кнопки авторизации", async (): Promise<void> => {
        const modalBtn = await driver.findElement(By.xpath("//button[@id='modal-btn']"));
        let value = await modalBtn.getAttribute("textContent");
        console.log(value);
        expect(value).toBe("+");
        modalBtn.click();
        value = await modalBtn.getAttribute("textContent");
        expect(value).toBe("-");
    });
});