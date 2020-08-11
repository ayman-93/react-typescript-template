import axios from "./axios";

export const currentAuthenticatedUser = () => {
    return new Promise((resolve, reject) => {
        if (localStorage.getItem("user") != null) {
            const user = JSON.parse(localStorage.getItem("user") as string);
            resolve(user);
        }
        else {
            reject();
        }
    });
}

export const login = (user: { email: string, password: string }) => {
    return axios.post('sign-in', user).then(res => {
        const user = res.data;
        localStorage.setItem("user", JSON.stringify(user))
        return user;
    })
}

export const signUp = (user: { credentials: { email: string, password: string, password_confirmation: string } }) => {
    return axios.post('sign-up', user).then(res => {
        const user = res.data;
        localStorage.setItem("user", JSON.stringify(user))
        return user;
    })
}

export const changePassword = (passwords: { oldPassword: string, newPassword: string }) => {
    return axios.patch('change-password', passwords).then(res => {
        const user = res.data;
        console.log("password changed successfuly");

    }).catch((err) => {
        console.log("password not changed err: ", err);

    })
}

export const signOut = () => {
    console.log("loging out");

    axios.get('logout').then(() => console.log("Logout Successfully")).catch(e => console.log(e))
    localStorage.removeItem("user");
}

