const { Given, Then, When } = require('cucumber');
const assert = require('assert');
const puppeteer = require('puppeteer');
const expect = require('expect-puppeteer');

Given(/^I am not logged in$/, function () {
    return true;
});
When(/^I access the login page$/, function () {
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
    (async (button) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({width: 800, height: 600});
        await page.goto('https://dev.doozer.it/login', {waitUntil: 'networkidle2'});

        // assertion with pure puppeteer
        const buttonText = await page.$eval('button', e => e.innerText);
        await assert.equal(button.toLowerCase(), buttonText.toLowerCase());

        // same assertion with expect-puppeteer
        await expect(page).toClick('button', {text: button})

        await browser.close();
    })(button);
});
