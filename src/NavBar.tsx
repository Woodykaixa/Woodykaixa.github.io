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
    openLoginModal: () => void,
    requestLogout: () => Promise<boolean>
}

class UserInfo extends React.Component<UserInfoProps, any> {

    tryLogout = async () => {
        if (!await this.props.requestLogout()) {
            alert('error');
        }
    }

    render() {
        let authButton;
        if (this.props.loggedIn) {
            authButton =
                <button className='UserInfoLoginButton' onClick={this.tryLogout}>退出登录</button>;
        } else {
            authButton = <button className='UserInfoLoginButton'
                                 onClick={this.props.openLoginModal}>登录/注册</button>;
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
    loggedIn: boolean,
    openLoginModal: () => void

}

interface ResponsiveNarBarProps extends ResponsiveComponentProps, NavBarProps {
    requestLogout: () => Promise<boolean>
}

interface NavBarState {
    showNavBarContent: boolean
}

export class NavBar extends React.Component<ResponsiveNarBarProps, NavBarState> {
    constructor(props: ResponsiveNarBarProps) {
        super(props);
        this.state = {showNavBarContent: false};
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
                                        isLargeScreen={this.props.isLargeScreen}/>)}
                    </ul>
                    <UserInfo loggedIn={this.props.loggedIn}
                              openLoginModal={this.props.openLoginModal}
                              requestLogout={this.props.requestLogout}/>
                </div>
            );
        } else if (this.state.showNavBarContent) {
            NavBarContent = (
                <ul className="NarrowNavBarContainer">
                    {this.props.items.map((value, index) =>
                        <NavBarItem name={value.name} link={value.link} key={index}
                                    screenWidth={this.props.screenWidth}
                                    isLargeScreen={this.props.isLargeScreen}/>)}
                    <li>
                        <UserInfo loggedIn={this.props.loggedIn}
                                  openLoginModal={this.props.openLoginModal}
                                  requestLogout={this.props.requestLogout}/>
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