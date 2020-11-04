/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    ADMIN, ADMIN_HOME, USER_HOME, LOGGED_OUT_VIEW
} from './constants';

import { getToken, setToken, getUser } from '../../../api/user';

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
    
    const foundSession = getToken();
    console.log(foundSession);

    // upon mount of this app, check if the user is authenticated in the state

    return (
        // if the user is logged in, let them proceed, otherwise redirect to login page
        <Route
            render={() => (foundSession ? (
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
