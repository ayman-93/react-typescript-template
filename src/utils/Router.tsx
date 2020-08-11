import React, { lazy, Suspense, useState, useEffect } from "react";
import { Switch, Route, Redirect, RouteProps } from "react-router-dom";

import { App } from '../components/app'
import { currentAuthenticatedUser } from './AuthManager';
import SignInForm from "../pages/login";
import SignUpForm from "../pages/signUp";
import ChangePassword from "../pages/changePassword";


// const PrivateRoute = ({ children, ...rest }: RouteProps) => {
//     const [redirect, setRedirect]: any = useState(false)
//     useEffect(() => {
//         currentAuthenticatedUser().then(() => setRedirect(false)).catch(() => setRedirect(true))
//     }, [])
//     return (
//         <Route
//             {...rest}
//             render={({ location }) =>
//                 !redirect ? (
//                     rest.component
//                 ) : (
//                         <Redirect
//                             to={{
//                                 pathname: "/login",
//                                 state: { from: location }
//                             }}
//                         />
//                     )
//             }
//         />
//     );
// }

const PrivateRoute: React.FC<{
    component: React.FC;
    path: string;
    exact: boolean;
    location?: RouteProps;
}> = (props) => {

    const [redirect, setRedirect]: any = useState(false)
    useEffect(() => {
        currentAuthenticatedUser().then(() => setRedirect(false)).catch(() => setRedirect(true))
    }, [])

    return !redirect ? (<Route path={props.path} exact={props.exact} component={props.component} />) :
        (<Redirect
            to={{
                pathname: "/login",
                state: { from: props.location }
            }}
        />);
};

export default () => (
    <Switch>
        <PrivateRoute exact path="/" component={App} />
        <PrivateRoute exact path="/test" component={App} />
        <Route path="/login" exact component={SignInForm} />
        <Route path="/signup" exact component={SignUpForm} />
        <Route path="/change-password" exact component={ChangePassword} />
        <Route path="*" render={({ location }) => <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>} />
    </Switch>
);