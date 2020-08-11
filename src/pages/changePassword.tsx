import React, { useRef, useState } from "react";

import { useAuthDataContext } from "../utils/AuthDataProvider";
import { changePassword } from "../utils/AuthManager";

const ChangePassword = () => {
    const { onLogin }: any = useAuthDataContext();

    const [error, setError] = useState(null);

    /*
     * We use uncontrolled inputs to simplify the example
     */
    const oldPswInput = useRef<HTMLInputElement>(null);
    const newPswInput = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const currentFormValue: { oldPassword: string, newPassword: string } = {
            oldPassword: oldPswInput && oldPswInput.current ? oldPswInput.current.value : "",
            newPassword: newPswInput && newPswInput.current ? newPswInput.current.value : ""
        };

        changePassword(currentFormValue).then((user: any) => {
            onLogin(user);
        }).catch(setError);
    };

    return (
        <div>
            {error ? (<span style={{ backgroundColor: "red" }} >{error}</span>) : null}
            <input ref={oldPswInput} type="text" name="oldPswInput" />
            <input ref={newPswInput} type="text" name="newPassword" />
            <button onClick={handleSubmit}>Sign in</button>
        </div>
    );
};

export default ChangePassword;