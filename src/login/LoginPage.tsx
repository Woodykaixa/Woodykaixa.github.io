import React from 'react';
import './LoginPage.css';
import logo from '../logo.svg';
import {Redirect} from 'react-router-dom';
import {ResponsiveComponentProps} from "../common/common";
import {ResponsiveInputComponent} from "../common/ResponsiveInputComponent";

interface LoginProps extends ResponsiveComponentProps {
    loggedIn: boolean,
    loginFunction: () => void
}

interface LoginState {
    redirectTo: string
}

export class LoginPage extends React.Component<LoginProps, LoginState> {

    constructor(props: any) {
        super(props);
        this.state = {redirectTo: window.location.href.substr(window.location.href.lastIndexOf('=') + 1)};
    }

    onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.props.loginFunction();
    }

    fakeCallback = (value: string) => {
        console.log(value);
    }

    render() {
        if (this.props.loggedIn)
            return <Redirect to={this.state.redirectTo}/>;
        return (
            <div className="LoginFormContainer FullPage">
                {
                    this.props.isLargeScreen ?
                        <aside className="ImgArea">
                            <img src={logo} alt="tmp logo"/>
                        </aside>
                        : null
                }
                <form className="LoginForm" onSubmit={this.onSubmit}>
                    <h3>登录</h3>
                    <ResponsiveInputComponent name="name" placeholder="用户名"
                                              screenWidth={this.props.screenWidth}
                                              isLargeScreen={this.props.isLargeScreen} value=""
                                              setValue={this.fakeCallback}/>
                    <ResponsiveInputComponent type="password" name="pwd" placeholder="密 码"
                                              screenWidth={this.props.screenWidth}
                                              isLargeScreen={this.props.isLargeScreen} value=""
                                              setValue={this.fakeCallback}/>
                    <button>登录</button>
                </form>
            </div>
        );
    }
}