/* eslint-disable @typescript-eslint/no-var-requires */
import {By, WebDriver, createDriver} from "../selenium";
const testUser = require("../testUser.json");

jest.setTimeout(30000);

async function authChecker(
    lineText: string, 
    driver: typeof WebDriver,
    linePassword: string
): Promise<void> {
    await driver.findElement(By.xpath("//button[@id='modal-btn']"))
        .click();
    await driver.findElement(By.xpath("//input[@id='email'][contains(@class, 'authEmail')]"))
        .sendKeys(lineText);
    await driver.findElement(By.xpath("//input[contains(@class, 'authPassword')]"))
        .sendKeys(linePassword);
    await driver.findElement(By.xpath("//button[@id='authSubmit']")).click();
}

describe("Проверка авторизации", (): void => {
    let driver: typeof WebDriver;
    beforeAll(async (): Promise<void> => {
        driver = await createDriver();
        await driver.manage().setTimeouts({ implicit: 1000 });
    });

    beforeEach(async (): Promise<void> => {
        await driver.get("http://172.17.0.1:3000");
    });
    
    afterAll(async (): Promise<void> => {
        // await driver.close();
        // await driver.quit();
    });
    test("Aвторизация обычного пользователя", async (): Promise<void> => {
        const lineEmail: string = testUser.email;
        const linePassword: string = testUser.password;
        await authChecker(lineEmail, driver, linePassword);
        await driver.sleep(10000);
        await driver.findElement(By.xpath(`//div[@class="mui--text-black-54"][contains(text(), '${lineEmail}')]`));
    });
    test("Aвторизация администратра", async (): Promise<void> => {
        const lineEmail: string = testUser.admin.email;
        const linePassword: string = testUser.admin.password;
        const anyUser: string = testUser.email;
        await authChecker(lineEmail, driver, linePassword);
        await driver.findElement(By.xpath(`//div[@class="mui--text-black-54"][contains(text(), '${anyUser}')]`));
    });
});