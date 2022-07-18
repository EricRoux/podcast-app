/* eslint-disable @typescript-eslint/no-var-requires */
const {Builder, By, Key, until, Capabilities, WebDriver} = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");

async function createDriver(): Promise<typeof WebDriver> {
    const caps = new Capabilities();
    caps.setPageLoadStrategy("normal");

    const options = new chrome.Options();
    const driver: typeof WebDriver = await new Builder()
        .usingServer("http://localhost:4444")
        .setChromeOptions(options)
        .withCapabilities(caps)
        .forBrowser("chrome")
        .build();

    await driver.manage().setTimeouts({ implicit: 1000 });
    await driver.manage().window().maximize();
    
    return driver;
}

async function createDir(path: string): Promise<void> {
    if (await !fs.existsSync(path)){
        await fs.mkdirSync(path, { recursive: true });
    }
}

async function createScreenShoot(
    driver: typeof WebDriver, 
    path: string, 
    counter: number
): Promise<void> {
    const encodedString = await driver.takeScreenshot();
    await fs.writeFileSync(`${path}/image${counter}.png`, encodedString, "base64");
}

export {
    Builder, By, Key, until, Capabilities, WebDriver,
    assert, chrome, fs, createDriver, createDir, createScreenShoot
};