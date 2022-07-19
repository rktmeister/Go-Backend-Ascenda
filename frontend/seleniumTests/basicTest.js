const { Builder, By, Key, until } = require("selenium-webdriver");

const test1 = async () => {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/");
    await driver.findElement(By.id("clickme")).click();

    await driver.wait(until.elementLocated(By.id("email")), 10000).sendKeys("hi@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("asd");
    await driver.findElement(By.id("submitButton")).click();


    await driver.wait(until.elementLocated(By.id("numberOfRooms"), 10000)).sendKeys("12");
    await driver.findElement(By.id("checkInDate")).sendKeys("01-30-2015");
    await driver.findElement(By.id("checkOutDate")).sendKeys("01-30-2015");
    await driver.findElement(By.id("minPrice")).sendKeys("1");
    await driver.findElement(By.id("maxPrice")).sendKeys("3");


};
test1();