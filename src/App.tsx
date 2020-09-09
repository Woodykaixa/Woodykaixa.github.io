import React from 'react';
import './App.css';
import {NavBar} from "./NavBar";
import {IndexPage} from "./index/IndexPage";
import {DocPage} from "./doc-page/DocPage";
import {LoginPage} from "./login/LoginPage";
import {LogoutPage} from "./logout/LogoutPage";
import {RegisterPage} from "./register/RegisterPage";
import {Footer, FooterItemProps} from "./Footer";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import {isLargeScreen} from "./common/common";

interface AppNavBarSiteItem {
    name: string,
    link: string
}

interface AppState {
    navSites: AppNavBarSiteItem[], // 导航栏显示的链接
    isLoggedInUser: boolean, // 当前用户已登录
    footerSites: FooterItemProps[], // 底部页脚显示的链接
    width: number, // document.body.clientWidth
    height: number, // document.body.clientHeight
    isLargeScreen: boolean
}

export class App extends React.Component<any, AppState> {
    setResponsiveStates = () => {
        const docWidth = document.body.clientWidth;
        this.setState({
            width: docWidth,
            height: document.body.clientHeight,
            isLargeScreen: isLargeScreen(docWidth)
        });
    }

    constructor(props: any) {
        super(props);
        const docWidth = document.body.clientWidth;
        this.state = {
            navSites: [
                {name: '关于', link: '/'},
                {name: '文档', link: '/docs'},
            ],
            isLoggedInUser: false,
            footerSites: [
                {name: 'Copyright ©2020 Woodykaixa. All rights reserved.'}
            ],
            width: docWidth,
            height: document.body.clientHeight,
            isLargeScreen: isLargeScreen(docWidth)
        };
        window.onresize = this.setResponsiveStates;
    }

    onDocumentRerender = () => {
        this.setResponsiveStates();
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
                    <NavBar items={this.state.navSites} loggedIn={this.state.isLoggedInUser}
                            title="Kaixa Site" screenWidth={this.state.width}
                            isLargeScreen={this.state.isLargeScreen}/>
                    <div className="MainContent">
                        <Switch>
                            <Route path="/login">
                                <LoginPage loggedIn={this.state.isLoggedInUser}
                                           loginFunction={this.userLogin}
                                           screenWidth={this.state.width}
                                           isLargeScreen={this.state.isLargeScreen}/>
                            </Route>
                            <Route path="/logout">
                                <LogoutPage loggedIn={this.state.isLoggedInUser}
                                            logoutFunction={this.userLogout}/>
                            </Route>
                            <Route path="/register">
                                <RegisterPage/>
                            </Route>
                            <Route path="/docs">
                                <DocPage loggedIn={this.state.isLoggedInUser}/>
                            </Route>
                            <Route path="/">
                                <IndexPage/>
                            </Route>
                        </Switch>
                    </div>
                    <Footer sites={this.state.footerSites} screenWidth={this.state.width}
                            screenHeight={this.state.height}
                            isLargeScreen={this.state.isLargeScreen}/>

                </BrowserRouter>
            </div>
        );
    }
}

export default App;
