/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    $,
    waitFor,
    clear,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless,
        args: ["--start-fullscreen"]
    })
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};
step("Add task <item>", async (item) => {
    await write(item, into(textBox("What needs to be done?")));
    await press('Enter');
});

step("View <type> tasks", async function (type) {
    await click(link(type));
});

step("Complete tasks <table>", async function (table) {
    for (var row of table.rows) {
        await click(checkBox(toLeftOf(row.cells[0])));
    }
});

step("Clear all tasks", async function () {
    await evaluate(() => localStorage.clear());
});

step("Open todo application", async function () {
    await goto("todo.taiko.dev");
});

step("Must not have <table>", async function (table) {
    for (var row of table.rows) {
        assert.ok(!await text(row.cells[0]).exists(0, 0));
    }
});

step("Must display <message>", async function (message) {
    assert.ok(await text(message).exists(0, 0));
});

step("Add tasks <table>", async function (table) {
    for (var row of table.rows) {
        await write(row.cells[0]);
        await press('Enter');
    }
});

step("Must have <table>", async function (table) {
    for (var row of table.rows) {
        assert.ok(await text(row.cells[0]).exists());
    }
});

// https://github.com/AjLokes/FirstGit.git
step("Open The Bank Application", async () => {
    goto("https://parabank.parasoft.com/parabank/index.htm")
});

step("Enter username and Password for login", async () => {
    await waitFor(2000)
    await write("john", into(textBox({ name: "username" }), { timeout: 60000 }))
    await write("demo", into(textBox({ name: "password" }), { timeout: 60000 }))
    await click("LOG IN")

});

step("updating Address", async () => {
    await waitFor(2000)
    await click($("//div[@id='leftPanel']//ul//li[6]/a"));
    await clear($("//input[@id='customer.address.street']"));
    await write("1431 Main St", into(textBox({ name: "customer.address.street" })));
    await click($("//input[@class='button']"))
    await click($("//*[@id=\"leftPanel\"]/ul/li[8]/a"))
});

step("check balance of an account", async () => {
    await waitFor(2000)
    await click($("//*[@id=\"leftPanel\"]/ul/li[2]/a"));
    await click($("//*[@id=\"accountTable\"]/tbody/tr[1]/td[1]/a"));
    await click($("//*[@id=\"month\"]"));
    await click($("//*[@id=\"transactionType\"]"));
    await click($("//*[@id=\"rightPanel\"]/div/div[2]/form/table/tbody/tr[3]/td[2]/input"));
    await click($("//*[@id=\"leftPanel\"]/ul/li[8]/a"))
});


step("Open an account", async () => {
    await waitFor(2000)
    await click($("//*[@id=\"leftPanel\"]/ul/li[1]/a"));
    await click($("//*[@id=\"type\"]"));
    await click($("//*[@id=\"fromAccountId\"]"));
    await click($("//*[@id=\"rightPanel\"]/div/div/form/div/input"));
    await click($("//*[@id=\"leftPanel\"]/ul/li[8]/a"))
});

step("goto Westjet application", async function () {
    // openBrowser({args: ["--start-fullscreen"]})
    goto("https://www.westjet.com/en-ca")

});

step("Sign in a User", async () => {
    await waitFor(20000)
    // await click($("//*[@id='logo']"))
    // await click($("//*[@id='logo']"))
    await click($("//span[contains(text(),'Sign in')]"));
    await write("arijillilokesh001@gmail.com", into(textBox("Email or WestJet Rewards ID")));
    await write("loki@1998", into(textBox("Password")));
    await click($("//button[contains(text(),'Sign in')]"));
});

step("Vacatipon Package", async () => {
    await waitFor(20000)
    // await click($("//span[contains(text(),'Accept')]"))
    await click($("//li[@id='vacations-tab']"))
    await click($("//input[@id='vacations-origin-search']"))
    await write("YUL", into(textBox("Enter origin or airport")))
    await press("Tab")
    await press("Tab")
    await click($("//div[@id='vacations-destination-event']"))
    await write("Calgary", into(textBox("Enter destination or airport")))
    press("Enter")
    await click($("//i[@class='stamp plus']"))[6]
    // await click($("//div[@id='vacations-children-stepper']//button[@aria-label='Increase number of children']"))
    // await click($("//div[@id='vacations-infants-stepper']//button[@aria-label='Increase number of infants']"))

})


step("vactaion date", async () => {
    await waitFor(2000)
    await click($("//input[@id='vacations-depart']"))
    // await click($("//div[@data-full='2021-5-26']"))
    // await click($("//input[@id='vacations-return']"))
    // await click($("//div[@data-full='2021-5-30']"))
    // await click($("//div[@id='vacations-room-stepper']//button[@aria-label='Increase number of rooms']"))
    // await click($("//div[@id='vacations-room-stepper']//button[@aria-label='Increase number of rooms']"))
})

step("Click Get vacations", async () => {
    await waitFor(1000)
    // await click($("//input[@id='get-vacations-submit-button']", { timeout: 60000 }))
})


step("Navigate back to application", async () => {
    goto("https://www.westjet.com/en-ca")

});
