import React from 'react';
import './LoginPage.css';
import logo from './logo.svg';
import {Redirect} from 'react-router-dom';


interface InputComponentProps {
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
                <label className="InputHint">{this.props.placeholder}</label>
                <input type={this.props.type ? this.props.type : "text"} name={this.props.name}
                       value={this.state.value}
                       autoComplete={this.props.type === "password" ? "current-password" : "on"}
                       onChange={this.OnChange}/>
            </div>
        );
    }
}

interface LoginProps {
    loggedIn: boolean,
    loginFunction: () => void;
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
                <aside className="ImgArea">
                    <img src={logo} alt="tmp logo"/>
                </aside>
                <form className="LoginForm" onSubmit={this.onSubmit}>
                    <h3>登录</h3>
                    <InputComponent name="name" placeholder="用户名"/>
                    <InputComponent type="password" name="pwd" placeholder="密 码"/>
                    <button className="LoginButton">登录</button>
                </form>
            </div>
        );
    }
}