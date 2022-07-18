/* eslint-disable @typescript-eslint/no-var-requires */
const {Builder, By, Key, until, Capabilities, WebDriver} = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

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
    return driver;
}

export {
    Builder, By, Key, until, Capabilities, WebDriver,
    assert, chrome, createDriver
};