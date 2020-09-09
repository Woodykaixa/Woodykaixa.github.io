import React from "react";
import "./NavBar.css";
import {Link} from 'react-router-dom';
import {ResponsiveComponentProps} from "./common/common";

interface NavBarItemProps {
    name: string,
    link: string
}

interface ResponsiveNavBarItemProp extends ResponsiveComponentProps, NavBarItemProps {
}

class NavBarItem extends React.Component<ResponsiveNavBarItemProp, any> {
    render() {
        return (
            <li className={this.props.isLargeScreen ? "NavItem" : "NarrowNavItem"}>
                <h3>
                    <Link to={this.props.link}>{this.props.name}</Link>
                </h3>
            </li>
        );
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
    items: NavBarItemProps[],
    title: string,
    loggedIn: boolean

}

interface ResponsiveNarBarProps extends ResponsiveComponentProps, NavBarProps {
}

interface NavBarState {
    showingLoginPage: boolean,
    showNavBarContent: boolean
}

export class NavBar extends React.Component<ResponsiveNarBarProps, NavBarState> {
    constructor(props: ResponsiveNarBarProps) {
        super(props);
        this.state = {showingLoginPage: true, showNavBarContent: false};
    }

    handleShowingPageChanged = (showLogin: boolean) => {
        this.setState({showingLoginPage: showLogin});
    }

    onToggleButtonClick = () => {
        let newShowingState = !this.state.showNavBarContent;
        this.setState({showNavBarContent: newShowingState});
    }

    render() {
        let toggleButton = this.props.isLargeScreen ? null :
            <button className="ToggleButton" onClick={this.onToggleButtonClick}/>;

        let NavBarContent;
        if (this.props.isLargeScreen) {
            NavBarContent = (
                <div className="NavBarContentContainer">
                    <ul className="NavBarSiteItemContainer">
                        {this.props.items.map((value, index) =>
                            <NavBarItem name={value.name} link={value.link} key={index}
                                        screenWidth={this.props.screenWidth}
                                        screenHeight={this.props.screenHeight}
                                        onDocumentRerender={this.props.onDocumentRerender}
                                        isLargeScreen={this.props.isLargeScreen}/>)}
                    </ul>
                    <UserInfo loggedIn={this.props.loggedIn}
                              showingLogin={this.state.showingLoginPage}
                              onPageChanged={this.handleShowingPageChanged}/>
                </div>
            );
        } else if (this.state.showNavBarContent) {
            NavBarContent = (
                <ul className="NarrowNavBarContainer">
                    {this.props.items.map((value, index) =>
                        <NavBarItem name={value.name} link={value.link} key={index}
                                    screenWidth={this.props.screenWidth}
                                    screenHeight={this.props.screenHeight}
                                    onDocumentRerender={this.props.onDocumentRerender}
                                    isLargeScreen={this.props.isLargeScreen}/>)}
                    <li>
                        <UserInfo loggedIn={this.props.loggedIn}
                                  showingLogin={this.state.showingLoginPage}
                                  onPageChanged={this.handleShowingPageChanged}/>
                    </li>
                </ul>
            );
        }

        return (
            <div className="NavBarContainer">
                <div className="NavBarMain">
                    <span className="Title">{this.props.title}</span>
                    {this.props.isLargeScreen ? NavBarContent : toggleButton}
                </div>
                {this.props.isLargeScreen ? null : NavBarContent}
            </div>
        );
    }

}