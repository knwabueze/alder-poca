import React from 'react'
import { inject } from 'mobx-react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import stores from '../lib/root.store'

const PublicRoute = ({ component: Component, auth, ...rest }) => {      
    return <Route {...rest} render={props => {
        return !!stores.auth.currentUser ?
            <Redirect to={{ pathname: '/', state: { from: props.location } }} /> :
            <Component {...props} />
    }} />
}

PublicRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

export default inject(stores => ({ auth: stores.auth }))(PublicRoute);