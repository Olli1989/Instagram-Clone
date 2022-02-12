import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function ProtectedRoute({ user, children, ...rest }) {
    return (
        <Route
            {...rest}
            render={() => {
                if (user) {
                    return children;
                }
                
                if (!user) {
                    return (
                        <Navigate
                            to={{
                                pathname: ROUTES.LOGIN
                            }}
                        />
                    );
                }
                
                return null;
            }}
        />
    );
}