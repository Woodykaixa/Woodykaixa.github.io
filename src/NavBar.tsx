import React from "react";
import "./NavBar.css";
import {Link} from 'react-router-dom';

interface NavBarItemProp {
    name: string,
    link: string
}

class NavBarItem extends React.Component<NavBarItemProp, any> {
    handleClick = () => {
        alert("点个锤子，还没做完呢");
    }

    render() {
        return (
            <li className="NavItem">
                <h3>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#" target="_self" rel="noopener noreferrer"
                       onClick={this.handleClick}>
                        {this.props.name}
                    </a>
                </h3>
            </li>
        )
    }
}

interface UserInfoProps {
    loggedIn: boolean,
    showingLogin: boolean,
    onPageChanged: (showLogin: boolean) => void
}

class UserInfo extends React.Component<UserInfoProps, any> {

    toLogin = () => {
        this.props.onPageChanged(true);
    }

    toRegister = () => {
        this.props.onPageChanged(false);
    }

    render() {
        let authButton;
        if (this.props.loggedIn) {
            authButton = <Link to='/logout'> 退出登录 </Link>;
        } else if (this.props.showingLogin) {
            authButton = <Link to="/register" onClick={this.toRegister}>去注册</Link>;
        } else {
            authButton = <Link to="/login" onClick={this.toLogin}>去登录</Link>;
        }

        return (
            <ul className="UserInfo">
                <li>{authButton}</li>
            </ul>
        );
    }
}

export interface NavBarProps {
    items: NavBarItemProp[],
    title: string,
    loggedIn: boolean

}

interface NavBarState {
    showingLoginPage: boolean
}

export class NavBar extends React.Component<NavBarProps, NavBarState> {
    constructor(props: NavBarProps) {
        super(props);
        this.state = {showingLoginPage: true};
    }

    handleShowingPageChanged = (showLogin: boolean) => {
        this.setState({showingLoginPage: showLogin});
    }

    render() {
        return (
            <div className="NavBarContainer">
                <h1 className="Title">{this.props.title}</h1>
                <ul className="NavBarItemContainer">
                    {this.props.items.map((value, index) => <NavBarItem name={value.name}
                                                                        link={value.link}
                                                                        key={index}/>)}
                </ul>
                <UserInfo loggedIn={this.props.loggedIn} showingLogin={this.state.showingLoginPage}
                          onPageChanged={this.handleShowingPageChanged}/>
            </div>);
    }
}