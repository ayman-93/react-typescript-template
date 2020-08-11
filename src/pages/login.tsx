import React, { useRef, useState } from "react";
import { RouteProps } from 'react-router';
import { History, Location } from 'history';

import { useAuthDataContext } from "../utils/AuthDataProvider";
import { login } from "../utils/AuthManager";

interface Ilocation {
    from: { pathname: string }
}

interface ISignInFormProps {
    location: Location<Ilocation>,
    history: History
}

const SignInForm = (props: ISignInFormProps) => {
    const { onLogin }: any = useAuthDataContext();

    const [error, setError] = useState(null);

    /*
     * We use uncontrolled inputs to simplify the example
     */
    const emailInput = useRef<HTMLInputElement>(null);
    const pswInput = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const currentFormValue: { email: string, password: string } = {
            email: emailInput && emailInput.current ? emailInput.current.value : "",
            password: pswInput && pswInput.current ? pswInput.current.value : ""
        };

        login(currentFormValue).then((user: any) => {
            onLogin(user);
            props.history.push('/')
        }).catch(setError);
    };

    return (
        <div>
            <h1>From {props.location.state.from.pathname}</h1>
            {error ? (<span style={{ backgroundColor: "red" }} >{error}</span>) : null}
            <input ref={emailInput} type="text" name="email" />
            <input ref={pswInput} type="password" name="password" />
            <button onClick={handleSubmit}>Sign in</button>
        </div>
    );
};

export default SignInForm;