import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from "react";
import { act } from 'react-dom/test-utils';
import * as router from 'react-router'
import fuzzer from '../../fuzzing/fuzzer';
import CreateAccountPage from './CreateAccountPage';
import Login from './Login';
const navigate = jest.fn()

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
});

test("does not crash when inputs are fuzzed", async () => {
    fuzzer.activate();
    const captures = {};
    render(<CreateAccountPage
        backendPackage={{
            attemptCreateAccount: (userName, passwordHash) => {
                captures.userName = userName;
                captures.passwordHash = passwordHash;
            },
        }}
    />);

    for (let i = 0; i < 10; i++) {
        const userNameInput = screen.getByTestId("userName");
        userNameInput.focus();
        userEvent.keyboard(fuzzer.ifActive.randomString("default user name", 0, 100));

        const passwordHashInput = screen.getByTestId("password");
        passwordHashInput.focus();
        userEvent.keyboard(fuzzer.ifActive.randomString("default password", 0, 100));

        const submitButton = screen.getByTestId("submitButton");
        fireEvent.click(submitButton);
    }

    fuzzer.deactivate();
})