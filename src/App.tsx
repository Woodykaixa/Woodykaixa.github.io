import React from 'react';
import './App.css';
import {NavBar} from "./NavBar";
import {IndexPage} from "./index/IndexPage";
import {DocPage} from "./doc-page/DocPage";
import {LoginModal} from "./login/LoginModal";
import {LogoutPage} from "./logout/LogoutPage";
import {ToolPage} from "./tool-page/ToolPage";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import {Fetch, isLargeScreen} from "./common/common";
import {
    WhoAmIResponse,
    LoginResponse,
    RegisterResponse
} from "./common/ServerInterface";
import cookie from 'react-cookies';

export interface AppNavBarSiteItem {
    name: string,
    link: string,
    desc: string
}

interface AppState {
    navSites: AppNavBarSiteItem[], // 导航栏显示的链接
    isLoggedInUser: boolean, // 当前用户已登录
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
            navSites: [{
                name: '关于',
                link: '/',
                desc: '展示个人信息以及网站信息'
            }, {
                name: '文章',
                link: '/docs',
                desc: '用于展示我自己参与的项目文档，注册用户根据自己的权限访问相应的文档，同时还有一个公开文档作为博客使用'
            },
                // {
                //     name: '工具', link: '/tools', desc: '有一些小工具，供部分人使用'
                // }
            ],
            isLoggedInUser: false,
            width: docWidth,
            height: document.body.clientHeight,
            isLargeScreen: isLargeScreen(docWidth),
            showLoginModal: false,
            username: '',
            password: ''
        };
        window.onresize = this.setResponsiveStates;

        const uname = cookie.load('uname');
        let exp = new Date();
        exp.setDate(exp.getDate() + 1);
        Fetch('/auth/whoami', 'GET').then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        }).then((json: WhoAmIResponse) => {
            const username = json.data.username;
            if (username !== null && uname === username) {
                cookie.save('uname', username, {
                    path: '/',
                    expires: exp
                });
                this.setState({isLoggedInUser: true, username});
            } else {
                cookie.remove('uname');
            }
        }).catch(err => {
            console.log('failed to fetch whoami: ' + err);
            cookie.remove('uname');
        });
    }

    userRegister = async () => {
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('password', this.state.password);
        let registerSuccess = false;
        await Fetch('/auth/register', 'POST', data).then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        }).then((json: RegisterResponse) => {
            if (json.err) {
                throw new Error(json.data);
            }
            registerSuccess = true;
        }).catch(err => {
            console.log(err);
        });
        return registerSuccess;
    }

    userLogin = async () => {
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('password', this.state.password);
        await Fetch('/auth/login', 'POST', data).then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        }).then((json: LoginResponse) => {
            if (json.err) {
                throw new Error(`${json.err}: ${json.data}`);
            }
            if (json.data === 'welcome') {
                this.setState({isLoggedInUser: true});
                let exp = new Date();
                exp.setDate(exp.getDate() + 1);
                cookie.save('uname', this.state.username, {
                    path: '/',
                    expires: exp
                });
            } else {
                throw new Error('Unknown error: ' + json.data);
            }
        }).catch(err => {
            console.log(err);
        });
        console.log(cookie.loadAll(false));

        return this.state.isLoggedInUser;
    }

    userLogout = async () => {
        await Fetch('/auth/logout', 'GET').then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        }).then(() => {
            this.setState({isLoggedInUser: false});
            cookie.remove('uname');
        }).catch(err => {
            console.log(err);
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
                <LoginModal loginFunction={this.userLogin} registerFunction={this.userRegister}
                            screenWidth={this.state.width}
                            username={this.state.username} password={this.state.password}
                            isLargeScreen={this.state.isLargeScreen}
                            loginModalOpen={this.state.showLoginModal}
                            openLoginModal={this.openLoginModal}
                            closeLoginModal={this.closeLoginModal}
                            nameChanged={this.nameChanged} pwdChanged={this.passwordChanged}/>
                <BrowserRouter>
                    <NavBar items={this.state.navSites} loggedIn={this.state.isLoggedInUser}
                            username={this.state.username} title="卡夏妙妙屋"
                            screenWidth={this.state.width}
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
                                           isLargeScreen={this.state.isLargeScreen}
                                           navSites={this.state.navSites}/>
                            </Route>
                        </Switch>
                    </div>


                </BrowserRouter>
            </div>
        );
    }
}

export default App;
