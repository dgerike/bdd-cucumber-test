const { Given, Then, When, Before, After } = require('cucumber');
const expect = require('expect-puppeteer');
// const assert = require('assert');
const { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(10 * 1000);

Before(async function () {
    return await this.openLoginPage();
});

Given('I am not logged in', async function () {
    if (await this.isLoggedIn()) {
        await this.logout();
    }
});

When('I login as an object manager', async function () {
    return await this.performLogin('object manager');
});

When('I click on the button {string}', async function (button) {
    if (button === 'create order') {
        await this.clickButton('material-fab');
    } else if (button === 'Complete configuration') {
        await expect(this.page).toClick('material-button', { text: 'Complete configuration' });
        await this.page.waitFor(2000);
        await this.page.screenshot({path: 'reports/screenshots/doozer_modernize.png'});
    }
});

When('I enter {string} into the search box', async function (search) {
    await this.page.keyboard.type(search);
    await this.page.waitFor(300);
    await this.page.screenshot({ path: 'reports/screenshots/doozer_search_apartment.png' });
});

When('I choose an apartment from the list', async function () {
    await this.clickButton('material-button:nth-child(1)');
});

When('I enter {int} as the number of rooms', async function (rooms) {
    await this.enterRooms(rooms);
});

When('I enter {float} as the bathroom area', async function (bathroom) {
    await this.enterBathroom(bathroom);
});

When('I enter {float} as the kitchen area', async function (kitchen) {
    await this.enterKitchen(kitchen);
});

Then('I expect the configurator button to be in the state {string}', async function (state) {
    await this.page.waitFor(2000);

    if (state === 'active') {
        await expect(this.page).toMatchElement('material-button[aria-disabled="false"]', {text: 'Complete configuration'});
    } else {
        await expect(this.page).toMatchElement('material-button[aria-disabled="true"]', {text: 'Complete configuration'});
    }

    await this.page.screenshot({path: 'reports/screenshots/doozer_config_button.png'});
});

Then('I am redirected to the page {string}', async function (destination) {
    if (destination === "shop view") {
        await expect(this.page).toMatch('What do you want to modernize?');
    } else if (destination === "basic configurator") {
        await expect(this.page).toMatch('What is the basic data of the apartment');
    }
});

After(async function () {
    return await this.closeLoginPage();
});
