import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
    return <Route
        {...rest}
        render={(props) => auth.authed
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        } />
}

export default inject("auth")(observer(ProtectedRoute));