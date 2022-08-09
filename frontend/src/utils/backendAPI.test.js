import { render, screen } from '@testing-library/react';
import { formatQueryParameters, DB_ADDRESS, fetchErrorAdapter } from "./backendAPI";

import fuzzer from '../fuzzing/fuzzer';

test('format query parameters', () => {
    expect(formatQueryParameters(
        DB_ADDRESS,
        "/some/endpoint",
        {
            "param1": 1,
            "param2": "hello",
            "param3": 123.45,
        }
    )).toBe(
        "http://localhost:3000/api/some/endpoint?param1=1&param2=hello&param3=123.45"
    );
});

test("format query parameters randomized", () => {
    expect((() => {
        const res = fuzzer.fuzzInputs("check that does not crash", formatQueryParameters, [
            DB_ADDRESS,
            "/some/endpoint",
            {
                "param1": 1,
                "param2": "hello",
                "param3": 123.45,
            }
        ], 100);
        console.log(res.attempts[0]);
        return res.check([
            ["check that does not crash", (inputArr, output) => true]
        ]);
    })()).toBe(true);
});

// test("fetch error adaptor works", async () => {
//     const r = () => ({
//         ok: false,
//         status: "401",
//     });
//     const mockFetcher = () => new Promise((r) => {
//         setTimeout(r, 1000);
//     });
//     const res = await fetchErrorAdapter(mockFetcher);
//     console.log(res);
// })