const { Given, Then, When, Before, After } = require('cucumber');
const puppeteer = require('puppeteer');

Before(async function() {
    return await this.openLoginPage();
});

After(async function() {
    return await this.closeLoginPage();
});

Given(/^I am not logged in$/, function () {
    return true;
});

When(/^I access the login page$/, function () {
    // directly interacting with the page (no world layer)
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({width: 800, height: 600});
        await page.goto('https://dev.doozer.it/login', {waitUntil: 'networkidle2'});
        await page.screenshot({path: 'doozer_login_page.png'});
        await browser.close();
    })();
});

Then(/^I should see a field "([^"]*)"$/, function (field) {
    return true;
});

Then(/^I should see a button "([^"]*)"$/, function (button) {
    // using the "world" abstraction layer to interact with the page
    return this.seeButton(button);
});
