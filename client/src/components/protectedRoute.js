import React from "react";
import {Route, Redirect} from "react-router-dom";


function ProtectedRoute ({children, ...rest}) {
    return <Route {...rest}>
        {rest.isAuthenticated ? children : <Redirect to="/login"></Redirect>}
    </Route>
}


export default ProtectedRoute;