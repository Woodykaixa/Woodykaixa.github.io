import React from 'react';
import './App.css';
import {NavBar} from "./NavBar";
import {DocPage} from "./index/DocPage";
import {LoginPage} from "./login/LoginPage";
import {LogoutPage} from "./logout/LogoutPage";
import {RegisterPage} from "./register/RegisterPage";
import {Route, BrowserRouter, Switch} from "react-router-dom";

interface AppNavBarSiteItem {
    name: string,
    link: string
}

interface AppState {
    sites: AppNavBarSiteItem[], // 导航栏显示的链接
    isLoggedInUser: boolean, // 当前用户已登录
}

export class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            sites: [
                {name: 'baidu', link: 'https://www.baidu.com'},
                {name: 'github', link: 'https://github.com'},
                {name: 'bjutlab', link: 'https://www.bjutlab.cn'},
            ],
            isLoggedInUser: false
        }
    }

    userLogin = () => {
        this.setState({isLoggedInUser: true});
    }

    userLogout = () => {
        this.setState({isLoggedInUser: false});
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <NavBar items={this.state.sites} loggedIn={this.state.isLoggedInUser}
                            title="Kaixa's Site"/>
                    <div className="MainContent">
                        <Switch>
                            <Route path="/login">
                                <LoginPage loggedIn={this.state.isLoggedInUser}
                                           loginFunction={this.userLogin}/>
                            </Route>
                            <Route path="/logout">
                                <LogoutPage loggedIn={this.state.isLoggedInUser}
                                            logoutFunction={this.userLogout}/>
                            </Route>
                            <Route path="/register">
                                <RegisterPage/>
                            </Route>
                            <Route path="/">
                                <DocPage loggedIn={this.state.isLoggedInUser}/>
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
