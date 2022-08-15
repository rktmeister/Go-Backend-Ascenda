import fuzzer from "./fuzzer";

const addTwoNumbers = (param1, param2) => {
    return param1 + param2;
};

test("testing fuzzInputs from our custom fuzzing library", () => {
    const res = fuzzer.fuzzInputs(
        "testing addTwoNumbers function",   // description
        addTwoNumbers,                      // function to test
        [3, 4],                             // example parameters for addTwoNumbers
        5                                   // try 5 times with randomized input based on example parameters
    );

    console.log(res.attempts);
    expect(res.attempts.length).toBe(5);

    const checkPass = res.check([
        ["output should be equal to sum of inputs", (inputArr, output) => output === (inputArr[0] + inputArr[1])],
        ["there should only be two inputs", (inputArr, output) => inputArr.length === 2],
    ]);

    expect(checkPass).toBe(true);
});



