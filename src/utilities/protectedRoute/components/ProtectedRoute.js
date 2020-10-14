/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    ADMIN, ADMIN_HOME, USER_HOME, LOGGED_OUT_VIEW
} from './constants';

/**
 * A wrapper for routers, which is used to limit which route users who have not signed in can use
 *
 * @function
 * @param {Component} component - the jsx component for default page layout
 * @param {func} authenticated - A boolean value indicating if the current user is loggedIn or not
 */
export default function PrivateRoute({
    component: Component,
    authenticated,
}) {
    // import the authentication status of both admin and user
    // const dispatch = useDispatch();
    // const isAdminAuthenticated = useSelector(state => state.adminAuthenticated);
    // const isUserAuthenticated = useSelector(state => state.userAuthenticated);

    // // define the authenticated status depending on what was passed into the route
    // const usrAuthenticated = (authenticated === ADMIN) ? isAdminAuthenticated : isUserAuthenticated;
    // const homPage = (authenticated === ADMIN) ? ADMIN_HOME : USER_HOME;

    // upon mount of this app, check if the user is authenticated in the state
    // otherwise check firebase if the user is authenticated via cookies
    // useEffect(() => {
    //     if (!usrAuthenticated) {
    //         // set the state for both user and admin
    //         // if they are logged in
    //         dispatch(actions.isAdminAuthenticated());
    //         dispatch(userActions.isUserAuthenticated());
    //     }
    // }, [dispatch, usrAuthenticated]);

    return (
        // if the user is logged in, let them proceed, otherwise redirect to login page
        <Route
            render={() => (authenticated === true ? (
                <Component />
            ) : (
                <Redirect to={LOGGED_OUT_VIEW} />
            ))}
        />
    );
}

// define the proptypes and their default values

PrivateRoute.propTypes = {
    authenticated: PropTypes.string,
    component: PropTypes.func,
};

PrivateRoute.defaultProps = {
    authenticated: false,
    component: 0,
};
