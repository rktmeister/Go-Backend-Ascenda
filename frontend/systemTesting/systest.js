const { Builder, By, Key, until } = require("selenium-webdriver");
const fuzzer = require("./fuzzer");
const { fuzzInputs } = require("./fuzzer");


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
    }, timeout, 'Timeout waiting for ' + locator.value);
}

function clickWhenClickableFound(element, timeout, driver) {
    driver.wait(function () {
        return element.click().then(function () {
            return true;
        }, function (err) {
            throw err;
        });
    }, timeout, 'Timeout after ' + timeout);
}

// function clickWhenClickableMultiple(locator, timeout, driver) {
//     driver.wait(function () {
//         return driver.findElements(locator).then(function (elements) {
//             return elements.map(elem => {
//                 elem.click().then(function () {
//                     return true;
//                 }, function (err) {
//                     return false;
//                 })
//             });
//         }, function (err) {
//             return false;
//         });
//     }, timeout, 'Timeout waiting for ' + locator.value);
// }

module.exports.monolithicRunthrough = async () => {
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
    await driver.findElement(By.id("destinationInput")).sendKeys("Ber");
    await driver.findElement(By.id("destinationInput")).sendKeys("li");
    await driver.wait(until.elementLocated(By.id("destinationCardtOik")), 10000).click();
    await clickWhenClickable(By.id("submitButton"), 10000, driver);

    await driver.wait(until.elementLocated(By.id("hotelCard0DaK")), 10000).click();
    await clickWhenClickable(By.id("submitButton"), 10000, driver);

    await driver.wait(until.elementLocated(By.id("roomTypeDropdown")), 10000).click();
    await driver.wait(until.elementLocated(By.id("Deluxe Room, 1 King Bed, Non Smoking")), 10000).click();
    await clickWhenClickable(By.xpath("//*[text() = 'Select']"), 10000, driver);
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

let driver;

module.exports.startup = async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3001/");
    driver.manage().window().maximize();
};

module.exports.expectedLogin = async () => {
    await driver.findElement(By.id("loginButton")).click();
    await driver.wait(until.elementLocated(By.id("userName")), 10000).sendKeys("sunrise");
    await driver.findElement(By.id("password")).sendKeys("1234");
    await driver.findElement(By.id("submitButton")).click();
};

module.exports.expectedHomePage = async () => {
    await driver.wait(until.elementLocated(By.id("bookButton"), 10000)).click();
};

module.exports.expectedFeature1 = async () => {
    await driver.findElement(By.id("destinationInput")).sendKeys("Berli");
    await driver.wait(until.elementLocated(By.id("destinationCardtOik")), 10000).click();
    await clickWhenClickable(By.id("submitButton"), 10000, driver);
};

const explicitConcat = (key, n) => {
    let res = "";
    for (let i = 0; i < n; i++) {
        res += key;
    }
    console.log(res);
    console.log(key.repeat(50));
    return res;
}

module.exports.inputFilterBar = async (
    numberOfRooms,
    checkInDate,
    checkOutDate,
    minPrice,
    maxPrice,
    minRating,
    maxRating
) => {
    await driver.wait(until.elementLocated(By.id("numberOfRooms"), 10000)).sendKeys(Key.BACK_SPACE.repeat(10) + numberOfRooms);

    // await driver.findElement(By.id("checkInDate")).sendKeys(Key.DELETE + checkInDate);
    // await driver.findElement(By.id("checkOutDate")).sendKeys(Key.DELETE + checkOutDate);

    const MIN_PRICE_KEY = minPrice > 0 ? Key.RIGHT : Key.LEFT;
    const MAX_PRICE_KEY = minPrice > 0 ? Key.LEFT : Key.RIGHT;
    const MIN_RATING_KEY = minPrice > 0 ? Key.RIGHT : Key.LEFT;
    const MAX_RATING_KEY = minPrice > 0 ? Key.LEFT : Key.RIGHT;

    await driver.findElement(By.xpath("//div[@id='priceSlider']//input[contains(@class, 'input-type-range-min')]")).sendKeys(MIN_PRICE_KEY.repeat(Math.floor(minPrice / 100)));
    await driver.findElement(By.xpath("//div[@id='priceSlider']//input[contains(@class, 'input-type-range-max')]")).sendKeys(MAX_PRICE_KEY.repeat(Math.floor((10000 - maxPrice) / 100)));

    await driver.findElement(By.xpath("//div[@id='ratingSlider']//input[contains(@class, 'input-type-range-min')]")).sendKeys(MIN_PRICE_KEY.repeat(minRating));
    await driver.findElement(By.xpath("//div[@id='ratingSlider']//input[contains(@class, 'input-type-range-max')]")).sendKeys(MAX_PRICE_KEY.repeat(5 - maxRating));


    await driver.findElement(By.id("submitFilter")).click();
};

module.exports.fuzzFilterBar = async (numberOfIterations) => {
    fuzzer.activate();
    await driver.sleep(1000);
    for (let i = 0; i < numberOfIterations; i++) {
        await driver.sleep(1000);
        await this.inputFilterBar(
            fuzzer.ifActive.randomDigitsAsString(null, 0, 2),
            fuzzer.ifActive.randomDate(null),
            fuzzer.ifActive.randomDate(null),
            fuzzer.ifActive.randomDigitsAsString(null, 0, 5),
            fuzzer.ifActive.randomDigitsAsString(null, 0, 5),
            fuzzer.ifActive.randomDigitsAsString(null, 0, 1),
            fuzzer.ifActive.randomDigitsAsString(null, 0, 1),
        );
        // await driver.sleep(1000);
    }
    fuzzer.deactivate();
};

module.exports.feature1 = async (fuzzyDestinationName, buttonToSelect) => {
    await driver.findElement(By.id("destinationInput")).sendKeys(fuzzyDestinationName);
    const arr = await driver.wait(until.elementsLocated(By.xpath("//div[@id='destinationMenu']//button")), 10000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id='destinationMenu']//button[${Math.min(arr.length, buttonToSelect)}]`)), 10000).click();
    await clickWhenClickable(By.id("submitButton"), 10000, driver);
};

module.exports.feature1WithError = async (fuzzyDestinationName, buttonToSelect, numberOfIterations) => {
    for (let i = 0; i < numberOfIterations; i++) {
        await clickWhenClickable(By.id("submitButton"), 10000, driver);
        await driver.wait(until.alertIsPresent(), 10000)
            .then(() => {
                let alert = driver.switchTo().alert();
                return alert.accept()
                console.log("go on");
            });
        await driver.sleep(1000);
    }


    await driver.findElement(By.id("destinationInput")).sendKeys(fuzzyDestinationName);
    const arr = await driver.wait(until.elementsLocated(By.xpath("//div[@id='destinationMenu']//button")), 10000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id='destinationMenu']//button[${Math.min(arr.length, buttonToSelect)}]`)), 10000).click();
    await clickWhenClickable(By.id("submitButton"), 10000, driver);
};

module.exports.expectedFeature2 = async () => {
    await driver.wait(until.elementLocated(By.id("hotelCard0DaK")), 10000).click();
    await clickWhenClickable(By.id("submitButton"), 10000, driver);
};

function scrollToFn(driver, elem, scrollAmount) {
    return elem.getAttribute('scrollTop').then(function (val) {
        scrollAmount += +val;       // written as +val for string to number conversion
        return driver.executeScript("arguments[0].scrollTop = arguments[1]", elem, scrollAmount);
    });
}

module.exports.feature2 = async (hotelToSelect) => {

    //await driver.wait(until.elementLocated(By.xpath(`//div[@id='hotelMenu']//button[8]`)), 10000).click();
    const hotelMenu = await driver.wait(until.elementLocated(By.id("hotelMenu")), 10000);
    for (let i = 0; i < hotelToSelect + 10; i++) {
        await scrollToFn(driver, hotelMenu, 200);
        await driver.sleep(0.5 * 1000);
    }

    const arr = await driver.wait(until.elementsLocated(By.xpath("//div[@id='hotelMenu']//button")), 10000);

    for (let i = arr.length; i > 0; i--) {
        console.log(i);
        try {
            await arr[i].click();
            console.log("yay", i);
            break;
        } catch (e) {
            console.log("fail", i);
        }
    }

    //await clickWhenClickable(By.xpath(`//div[@id='hotelMenu']//button[${hotelToSelect}]`), 10000, driver);
    await clickWhenClickable(By.id("submitButton"), 10000, driver);
};

module.exports.expectedFeature3 = async () => {
    await driver.wait(until.elementLocated(By.id("roomTypeDropdown")), 10000).click();
    await driver.wait(until.elementLocated(By.id("Deluxe Room, 1 King Bed, Non Smoking")), 10000).click();
    await clickWhenClickable(By.xpath("//*[text() = 'Select']"), 10000, driver);
    await clickWhenClickable(By.xpath("//*[text() = 'NEXT STAGE']"), 10000, driver);
};

module.exports.feature3 = async (roomTypeToChoose) => {
    await driver.wait(until.elementLocated(By.id("roomTypeDropdown")), 10000).click();
    await driver.sleep(5 * 1000);
    const arr = await driver.wait(until.elementsLocated(By.xpath("//select[@id='roomTypeDropdown']//option")), 10000);
    console.log(arr);
    arr[Math.min(arr.length - 1, roomTypeToChoose)].click();

    await driver.executeScript("window.scrollBy(0,2000)");
    await driver.sleep(3000);
    // await clickWhenClickable(By.xpath("//button[contains(text(), 'Select')]"), 10000, driver);
    //     console.log(await driver.findElement(By.xpath("//button[contains(text(), 'Select')]")))
    const buttonArr = await driver.wait(until.elementsLocated(By.xpath("//button[contains(text(), 'Select')]")), 10000);
    for (let i = 0; i < buttonArr.length; i++) {
        try {
            await buttonArr[i].click();
            console.log("yay", i);
            break;
        } catch (e) {
            console.log("fail", i, e);
        }
    }

    await clickWhenClickable(By.xpath("//*[text() = 'NEXT STAGE']"), 10000, driver);

};

module.exports.expectedFeature4 = async () => {
    await driver.wait(until.elementLocated(By.id("salutation")), 10000).click();
    await driver.findElement(By.id("Mr")).click();
    await driver.findElement(By.id("firstName")).sendKeys("Boris");
    await driver.findElement(By.id("lastName")).sendKeys("Johnson");
    await driver.findElement(By.id("phoneNumber")).sendKeys("12345678");
    await driver.findElement(By.id("userEmail")).sendKeys("boris@johnson.com");
    await driver.findElement(By.id("specialRequests")).sendKeys("hasta la vista please");
    await driver.findElement(By.id("submit")).click();
};

module.exports.feature4 = async (
    salutationToChoose,
    firstName,
    lastName,
    phoneNumber,
    userEmail,
    specialRequests
) => {
    await driver.wait(until.elementLocated(By.id("salutation")), 10000).click();
    const arr = await driver.wait(until.elementsLocated(By.xpath("//select[@id='salutation']//option")), 10000);
    arr[Math.min(arr.length - 1, salutationToChoose)].click();

    await driver.findElement(By.id("firstName")).sendKeys(firstName);
    await driver.findElement(By.id("lastName")).sendKeys(lastName);
    await driver.findElement(By.id("phoneNumber")).sendKeys(phoneNumber);
    await driver.findElement(By.id("userEmail")).sendKeys(userEmail);
    await driver.findElement(By.id("specialRequests")).sendKeys(specialRequests);
    await driver.findElement(By.id("submit")).click();
}

module.exports.stressFeature4 = async () => {
    fuzzer.activate();
    for (let i = 0; i < 50; i++) {
        await driver.wait(until.elementLocated(By.id("salutation")), 10000).click();
        const arr = await driver.wait(until.elementsLocated(By.xpath("//select[@id='salutation']//option")), 10000);
        arr[Math.min(arr.length - 1, fuzzer.ifActive.randomInteger(null, 0, arr.length))].click();

        await driver.findElement(By.id("firstName")).sendKeys(Key.BACK_SPACE.repeat(100) + fuzzer.ifActive.randomString(null, 0, 100));
        await driver.findElement(By.id("lastName")).sendKeys(Key.BACK_SPACE.repeat(100) + fuzzer.ifActive.randomString(null, 0, 100));
        await driver.findElement(By.id("phoneNumber")).sendKeys(Key.BACK_SPACE.repeat(100) + fuzzer.ifActive.randomString(null, 7, 8));
        await driver.findElement(By.id("userEmail")).sendKeys(Key.BACK_SPACE.repeat(100) + fuzzer.ifActive.randomString(null, 0, 8));
        await driver.findElement(By.id("specialRequests")).sendKeys(Key.BACK_SPACE.repeat(1000) + fuzzer.ifActive.randomString(null, 0, 1000));
        await driver.findElement(By.id("submit")).click();
    }
    fuzzer.deactivate();
}

module.exports.stressFeature4_v2 = async () => {
    fuzzer.activate();
    const alertBar = await driver.wait(until.elementLocated(By.id("alert")), 10000);
    console.log("HI", await alertBar.getAttribute("innerHTML"));
    while ((await alertBar.getAttribute("innerHTML")) !== "Redirecting to checkout...") {
        await driver.wait(until.elementLocated(By.id("salutation")), 10000).click();
        const arr = await driver.wait(until.elementsLocated(By.xpath("//select[@id='salutation']//option")), 10000);
        arr[Math.min(arr.length - 1, fuzzer.ifActive.randomInteger(null, 0, arr.length))].click();

        await driver.findElement(By.id("firstName")).sendKeys(Key.BACK_SPACE.repeat(100) + fuzzer.ifActive.randomLetters(null, 0, 50));
        await driver.findElement(By.id("lastName")).sendKeys(Key.BACK_SPACE.repeat(100) + fuzzer.ifActive.randomLetters(null, 0, 50));
        await driver.findElement(By.id("phoneNumber")).sendKeys(Key.BACK_SPACE.repeat(100) + fuzzer.ifActive.randomDigitsAsString(null, 0, 8));
        await driver.findElement(By.id("userEmail")).sendKeys(Key.BACK_SPACE.repeat(100) + fuzzer.ifActive.randomLetters(null, 0, 8) + "@" + fuzzer.ifActive.randomLetters(null, 0, 8) + ".com");
        await driver.findElement(By.id("specialRequests")).sendKeys(Key.BACK_SPACE.repeat(1000) + fuzzer.ifActive.randomString(null, 0, 500));
        await driver.findElement(By.id("submit")).click();
        await driver.sleep(100);
        console.log("HI", await alertBar.getAttribute("innerHTML"));
    }
    fuzzer.deactivate();
}

module.exports.passStripeMenu = async () => {
    await driver.wait(until.elementLocated(By.id("cardNumber")), 10000).sendKeys("4242424242424242");
    await driver.findElement(By.id("cardExpiry")).sendKeys("323");
    await driver.findElement(By.id("cardCvc")).sendKeys("323");
    await driver.findElement(By.id("billingName")).sendKeys("Boris Johnson");
    await driver.findElement(By.id("billingAddressLine1")).sendKeys("10 Downing St");
    await driver.findElement(By.id("billingAddressLine2")).sendKeys("London");
    await driver.findElement(By.id("billingPostalCode")).sendKeys("12345");
    await driver.findElement(By.xpath("//*[@type='submit']")).click();
};

module.exports.createAccount = async (username, password) => {
    await driver.wait(until.elementLocated(By.id("createAccountButton")), 10000).click();
    await driver.wait(until.elementLocated(By.id("userName")), 10000).sendKeys(username);
    await driver.findElement(By.id("password")).sendKeys(password);
    await driver.findElement(By.id("submitButton")).click();
};

module.exports.logout = async () => {
    await driver.wait(until.elementLocated(By.id("logoutButton")), 10000).click();
}

module.exports.login = async (username, password) => {
    await driver.wait(until.elementLocated(By.id("loginButton")), 10000).click();
    await driver.wait(until.elementLocated(By.id("userName")), 10000).sendKeys(username);
    await driver.findElement(By.id("password")).sendKeys(password);
    await driver.findElement(By.id("submitButton")).click();
};

module.exports.loginAndOutRepeatedly = async (username, password, numberOfIterations) => {
    await driver.sleep(1000);
    for (let i = 0; i < numberOfIterations; i++) {
        await this.logout();
        await this.login(username, password);
        // await driver.sleep(1000);
    }
}