const { setWorldConstructor } = require("cucumber");
const puppeteer = require("puppeteer");
const expect = require('expect-puppeteer');
const assert = require('assert');

const LOGIN_PAGE = "https://dev.doozer.it/login";

class LoginWorld {
    async openLoginPage() {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
        await this.page.goto(LOGIN_PAGE);
    }

    async seeButton(button) {
        // assertion with pure puppeteer
        const buttonText = await this.page.$eval('button', e => e.innerText);
        await assert.equal(button.toLowerCase(), buttonText.toLowerCase());

        // same assertion with expect-puppeteer
        await expect(this.page).toClick('button', { text: button });
    }

    async closeLoginPage() {
        await this.browser.close();
    }
}

setWorldConstructor(LoginWorld);
