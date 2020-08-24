import React from 'react';
import {Redirect} from 'react-router-dom';

interface LogoutProps {
    loggedIn: boolean,
    logoutFunction: () => void
}

export class LogoutPage extends React.Component<LogoutProps, any> {
    render() {
        if (this.props.loggedIn)
            this.props.logoutFunction();
        return <Redirect to='/login'/>
    }
}