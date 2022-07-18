/* eslint-disable @typescript-eslint/no-var-requires */
const {Builder, By, Key, until, Capabilities, WebDriver} = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

async function openChromeTest(): Promise<void> {
    const options = new chrome.Options();
    const driver = await new Builder()
        .usingServer("http://localhost:4444")
        .setChromeOptions(options)
        .forBrowser("chrome")
        .build();
    try {
        await driver.get("https://www.google.com");
        await driver.getTitle();
        await driver.manage().setTimeouts({implicit: 1000});
        const searchBox = await driver.findElement(By.name("q"));    
        await searchBox.sendKeys("Selenium", Key.ENTER);        
        const firstResult = await driver.wait(
            until.elementLocated(By.css("h3")),
            10000
        );
        console.log(await firstResult.getAttribute("textContent"));    
        const value = await firstResult.getAttribute("textContent");
        assert.deepStrictEqual(value, "Selenium");
        await driver.quit();
    } catch (error) {
        console.log(error);
        await driver.quit();
    }
}

openChromeTest();

export {
    Builder, By, Key, until, Capabilities, WebDriver,
    assert, chrome
};