import React from 'react';
import './LoginPage.css';
import logo from '../logo.svg';
import {Redirect} from 'react-router-dom';
import {ResponsiveComponentProps} from "../common/common";


interface InputComponentProps extends ResponsiveComponentProps {
    placeholder: string,
    name: string,
    type?: string
}


interface InputComponentState {
    value: string
}


class InputComponent extends React.Component<InputComponentProps, InputComponentState> {

    constructor(props: InputComponentProps) {
        super(props);
        this.state = {value: ''};
    }

    OnChange = (e: React.SyntheticEvent) => {
        let target = e.target as HTMLInputElement;
        this.setState({value: target.value});
    }

    render() {
        return (
            <div className="InputBorder">
                {
                    this.props.isLargeScreen ?
                        <label className="InputHint">{this.props.placeholder}</label> :
                        null
                }
                <input type={this.props.type ? this.props.type : "text"} name={this.props.name}
                       value={this.state.value}
                       placeholder={this.props.isLargeScreen ? "" : this.props.placeholder}
                       autoComplete={this.props.type === "password" ? "current-password" : "on"}
                       onChange={this.OnChange}/>
            </div>
        );
    }
}

interface LoginProps extends ResponsiveComponentProps {
    loggedIn: boolean,
    loginFunction: () => void
}

export class LoginPage extends React.Component<LoginProps, any> {

    onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.props.loginFunction();
    }

    render() {
        if (this.props.loggedIn)
            return <Redirect to='/'/>;
        return (
            <div className="LoginFormContainer">
                {
                    this.props.isLargeScreen ?
                        <aside className="ImgArea">
                            <img src={logo} alt="tmp logo"/>
                        </aside>
                        : null
                }
                <form className="LoginForm" onSubmit={this.onSubmit}>
                    <h3>登录</h3>
                    <InputComponent name="name" placeholder="用户名"
                                    screenWidth={this.props.screenWidth}
                                    isLargeScreen={this.props.isLargeScreen}/>
                    <InputComponent type="password" name="pwd" placeholder="密 码"
                                    screenWidth={this.props.screenWidth}
                                    isLargeScreen={this.props.isLargeScreen}/>
                    <button className="LoginButton">登录</button>
                </form>
            </div>
        );
    }
}