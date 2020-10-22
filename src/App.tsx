import React from 'react';
import './App.css';
import {NavBar} from "./NavBar";
import {IndexPage} from "./index/IndexPage";
import {DocPage} from "./doc-page/DocPage";
import {LoginModal} from "./login/LoginModal";
import {LogoutPage} from "./logout/LogoutPage";
import {ToolPage} from "./tool-page/ToolPage";
import {Footer, FooterItemProps} from "./Footer";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import {isLargeScreen, ServerResponse} from "./common/common";
import {urlFor} from "./common/env";
import cookie from 'react-cookies';

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
    isLargeScreen: boolean,  // width > 768px
    showLoginModal: boolean, // 显示登录对话框
    username: string,
    password: string
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
                {name: '工具', link: '/tools'},
            ],
            isLoggedInUser: false,
            footerSites: [
                {name: 'Copyright ©2020 Woodykaixa. All rights reserved.'}
            ],
            width: docWidth,
            height: document.body.clientHeight,
            isLargeScreen: isLargeScreen(docWidth),
            showLoginModal: false,
            username: '',
            password: ''
        };
        window.onresize = this.setResponsiveStates;
    }

    userLogin = async () => {
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('password', this.state.password);
        await fetch(urlFor('login'), {
            method: 'POST',
            body: data,
            mode: 'cors',
            credentials: 'include',
            referrerPolicy: 'no-referrer-when-downgrade'
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status}: ${res.statusText}`);
        }).then((json: ServerResponse) => {
            if (json.err === 0) {
                if (json.data === 'welcome') {
                    this.setState({isLoggedInUser: true});

                } else {
                    throw new Error('Unknown error: ' + json.data);
                }
            } else {
                throw new Error(`${json.err}: ${json.data}`);
            }
        }).catch(err => {
            console.log(err);
        });
        console.log(cookie.loadAll(false));

        return this.state.isLoggedInUser;
    }

    userLogout = async () => {
        await fetch(urlFor('/logout'), {
            credentials: 'include',
            mode: 'cors',
            method: 'GET'
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status}: ${res.statusText}`);
        }).then(json => {
            this.setState({isLoggedInUser: false});
        });
        return this.state.isLoggedInUser;
    }

    openLoginModal = () => {
        this.setState({showLoginModal: true});
    }

    closeLoginModal = () => {
        this.setState({showLoginModal: false});
    }

    passwordChanged = (value: string) => {
        this.setState({password: value});
    }

    nameChanged = (value: string) => {
        this.setState({username: value});
    }

    render() {
        return (
            <div className="App">
                <LoginModal loginFunction={this.userLogin} screenWidth={this.state.width}
                            username={this.state.username} password={this.state.password}
                            isLargeScreen={this.state.isLargeScreen}
                            loginModalOpen={this.state.showLoginModal}
                            openLoginModal={this.openLoginModal}
                            closeLoginModal={this.closeLoginModal}
                            nameChanged={this.nameChanged} pwdChanged={this.passwordChanged}/>
                <BrowserRouter>
                    <NavBar items={this.state.navSites} loggedIn={this.state.isLoggedInUser}
                            title="Kaixa Site" screenWidth={this.state.width}
                            isLargeScreen={this.state.isLargeScreen}
                            openLoginModal={this.openLoginModal}
                            requestLogout={this.userLogout}/>
                    <div className="MainContent">
                        <Switch>
                            <Route path="/logout">
                                <LogoutPage loggedIn={this.state.isLoggedInUser}
                                            logoutFunction={this.userLogout}/>
                            </Route>
                            <Route path="/docs">
                                <DocPage loggedIn={this.state.isLoggedInUser}
                                         screenWidth={this.state.width}
                                         isLargeScreen={this.state.isLargeScreen}/>
                            </Route>
                            <Route path="/tools">
                                <ToolPage screenWidth={this.state.width}
                                          isLargeScreen={this.state.isLargeScreen}/>
                            </Route>
                            <Route path="/">
                                <IndexPage screenWidth={this.state.width}
                                           isLargeScreen={this.state.isLargeScreen}/>
                            </Route>
                        </Switch>
                    </div>
                    <Footer sites={this.state.footerSites} screenWidth={this.state.width}
                            isLargeScreen={this.state.isLargeScreen}/>

                </BrowserRouter>
            </div>
        );
    }
}

export default App;
