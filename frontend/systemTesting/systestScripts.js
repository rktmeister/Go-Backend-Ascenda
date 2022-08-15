// import * as e2e from "./lib";
const e2e = require("./systest");
const fuzzer = require("./fuzzer");

const test1 = async () => {
    await e2e.startup();
    // await e2e.expectedLogin();
    await e2e.login("jjj1", "jjj");
    await e2e.expectedHomePage();
    await e2e.inputFilterBar(
        "1",
        "29-08-2022",
        "31-08-2022",
        100,
        4000,
        1,
        5
    );
    await e2e.feature1WithError("berlin", 1, 10);
    await e2e.feature2(15);
    await e2e.feature3(1);
    await e2e.feature4(
        2,
        "heckin",
        "doggo",
        "09875212",
        "heckin@doggo.com",
        "gib bone plox"
    );
    await e2e.passStripeMenu();
}

const test2 = async () => {
    await e2e.startup();
    await e2e.expectedLogin();
    await e2e.expectedHomePage();
    await e2e.inputFilterBar(
        "1",
        "29-08-2022",
        "31-08-2022",
        100,
        4000,
        1,
        5
    );
    await e2e.feature1("berlin", 1);
    await e2e.feature2(15);
    await e2e.feature3(1);
    await e2e.stressFeature4_v2();
}

const test3 = async () => {
    await e2e.startup();
    await e2e.createAccount("jjj1", "jjj");
    await e2e.loginAndOutRepeatedly("jjj1", "jjj", 5);
};

const test4 = async () => {
    await e2e.startup();
    await e2e.login("jjj1", "jjj");
    await e2e.expectedHomePage();
    await e2e.feature1WithError("berlin", 1, 1);
    await e2e.fuzzFilterBar(20);
};

test1();
test2();
test3();
test4();