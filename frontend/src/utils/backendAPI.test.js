import { render, screen } from '@testing-library/react';
import { formatQueryParameters, DB_ADDRESS } from "./backendAPI";

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