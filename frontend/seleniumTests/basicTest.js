const { Builder, By, Key, until } = require("selenium-webdriver");


function clickWhenClickable(locator, timeout, driver) {
    driver.wait(function () {
        return driver.findElement(locator).then(function (element) {
            return element.click().then(function () {
                return true;
            }, function (err) {
                return false;
            })
        }, function (err) {
            return false;
        });
    }, timeout, 'Timeout waiting for ' + locator.value);;
}


const test1 = async () => {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3001/");
    driver.manage().window().maximize();
    await driver.findElement(By.id("loginButton")).click();

    await driver.wait(until.elementLocated(By.id("userName")), 10000).sendKeys("sunrise");
    await driver.findElement(By.id("password")).sendKeys("1234");
    await driver.findElement(By.id("submitButton")).click();


    await driver.wait(until.elementLocated(By.id("bookButton"), 10000)).click();

    await driver.wait(until.elementLocated(By.id("numberOfRooms"), 10000)).sendKeys(Key.BACK_SPACE + "2");
    await driver.findElement(By.id("submitFilter")).click();
    // await driver.findElement(By.id("checkInDate")).sendKeys("01-30-2015");
    // await driver.findElement(By.id("checkOutDate")).sendKeys("01-30-2015");

    await driver.findElement(By.id("destinationInput")).sendKeys("Ber");
    await driver.findElement(By.id("destinationInput")).sendKeys("li");
    // for (let i = 0; i < 10; i++) {
    //     await driver.findElement(By.id("destinationInput")).sendKeys("n");
    //     await driver.findElement(By.id("destinationInput")).sendKeys(Key.BACK_SPACE);
    // }    

    await driver.wait(until.elementLocated(By.id("destinationCardtOik")), 10000).click();
    //driver.executeScript("arguments[0].scrollIntoView()", driver.wait(until.elementLocated(By.id("submitButton")), 10000));

    const res = await clickWhenClickable(By.id("submitButton"), 10000, driver);
    console.log(res);

    await driver.wait(until.elementLocated(By.id("hotelCard0DaK")), 10000).click();
    await clickWhenClickable(By.id("submitButton"), 10000, driver);

    await driver.wait(until.elementLocated(By.id("hotelCard0DaK")), 10000).click();

    await driver.wait(until.elementLocated(By.id("roomTypeDropdown")), 10000).click();

    await driver.wait(until.elementLocated(By.id("Deluxe Room, 1 King Bed, Non Smoking")), 10000).click();

    //await driver.findElement(By.partialLinkText("Choose")).click();

    await clickWhenClickable(By.xpath("//*[text() = 'Choose']"), 10000, driver);

    await clickWhenClickable(By.xpath("//*[text() = 'NEXT STAGE']"), 10000, driver);

    await driver.wait(until.elementLocated(By.id("salutation")), 10000).click();
    await driver.findElement(By.id("Mr")).click();
    await driver.findElement(By.id("firstName")).sendKeys("Boris");
    await driver.findElement(By.id("lastName")).sendKeys("Johnson");
    await driver.findElement(By.id("phoneNumber")).sendKeys("12345678");
    await driver.findElement(By.id("userEmail")).sendKeys("boris@johnson.com");
    await driver.findElement(By.id("specialRequests")).sendKeys("hasta la vista please");
    await driver.findElement(By.id("submit")).click();

    await driver.wait(until.elementLocated(By.id("cardNumber")), 10000).sendKeys("4242424242424242");
    await driver.findElement(By.id("cardExpiry")).sendKeys("323");
    await driver.findElement(By.id("cardCvc")).sendKeys("323");
    await driver.findElement(By.id("billingName")).sendKeys("Boris Johnson");
    await driver.findElement(By.id("billingAddressLine1")).sendKeys("10 Downing St");
    await driver.findElement(By.id("billingAddressLine2")).sendKeys("London");
    await driver.findElement(By.id("billingPostalCode")).sendKeys("12345");
    await driver.findElement(By.xpath("//*[@type='submit']")).click();


};

test1();