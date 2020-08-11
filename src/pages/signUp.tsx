import React, { useRef, useState, RefObject } from "react";
import { useAuthDataContext } from "../utils/AuthDataProvider";
import { signUp } from "../utils/AuthManager";

const SignUpForm = () => {
    const { onLogin }: any = useAuthDataContext();

    const [error, setError] = useState(null);

    /*
     * We use uncontrolled inputs to simplify the example
     */
    const nameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const pswInput = useRef<HTMLInputElement>(null);
    const confirmPswInput = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const currentFormValue: { credentials: { name: string, email: string, password: string, password_confirmation: string } } = {
            credentials: {
                name: nameInput && nameInput.current ? nameInput.current.value : "",
                email: emailInput && emailInput.current ? emailInput.current.value : "",
                password: pswInput && pswInput.current ? pswInput.current.value : "",
                password_confirmation: confirmPswInput && confirmPswInput.current ? confirmPswInput.current.value : ""
            }
        };

        signUp(currentFormValue).then((user: any) => {
            onLogin(user);
        }).catch(setError);
    };

    return (
        <div>
            {error ? (<span style={{ backgroundColor: "red" }} >{error}</span>) : null}
            <input ref={nameInput} type="text" name="name" />
            <input ref={emailInput} type="text" name="email" />
            <input ref={pswInput} type="password" name="password" />
            <input ref={confirmPswInput} type="password" name="confirmPswInput" />
            <button onClick={handleSubmit}>Sign in</button>
        </div>
    );
};

export default SignUpForm;