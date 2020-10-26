import React from "react";
import "./NavBar.css";
import {Link} from 'react-router-dom';
import {ResponsiveComponentProps} from "./common/common";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListUl} from "@fortawesome/free-solid-svg-icons";

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
        if (await this.props.requestLogout()) {
            alert('failed to logout');
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

interface RightSideNavBarProps {
    closeRightSideNavContent: () => void,
    navItems: NavBarItemProps[],
    loggedIn: boolean,
    username: string,
    openLoginModal: () => void,
    requestLogout: () => Promise<boolean>
}

class RightSideNavBar extends React.Component<RightSideNavBarProps, any> {

    private readonly RightSideNarBarRef: React.RefObject<HTMLDivElement>;

    constructor(props: RightSideNavBarProps) {
        super(props);
        this.RightSideNarBarRef = React.createRef<HTMLDivElement>();
    }

    componentDidMount() {
        setTimeout(() => {
            const container = this.RightSideNarBarRef.current as HTMLDivElement;
            container.classList.remove('RightSideNavBarEnter');
        }, 400);
    }

    closeSelf = () => {
        const container = this.RightSideNarBarRef.current as HTMLDivElement;
        container.classList.add('RightSideNavBarLeave');
        setTimeout(() => {
            const container = this.RightSideNarBarRef.current as HTMLDivElement;
            this.props.closeRightSideNavContent();
            container.classList.remove('RightSideNavBarLeave');
        }, 400);
    }

    render() {
        return (
            <div className='RightSideBarMask' onClick={this.closeSelf}>
                <div className='RightSideBarContainer RightSideNavBarEnter'
                     ref={this.RightSideNarBarRef}>
                    {
                        this.props.loggedIn ?
                            <div>
                                <div className='RightSideUsername'>
                                    {'你好, ' + this.props.username}
                                </div>
                                <div className='SplitLine'/>
                            </div> :
                            null
                    }
                    <ul className='RightSideBarItemContainer'>
                        {this.props.navItems.map((value, index) =>
                            <li key={index}>
                                <Link to={value.link}> {value.name}</Link>
                            </li>)
                        }
                    </ul>
                    <div className='SplitLine'/>
                    <div className='RightSideOperationBox'>
                        {
                            this.props.loggedIn ?
                                <button className='RightSideLogout'
                                        onClick={this.props.requestLogout}>退出登录</button> :
                                <button className='RightSideLogin'
                                        onClick={this.props.openLoginModal}>登录/注册</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export interface NavBarProps {
    items: NavBarItemProps[],
    title: string,
    loggedIn: boolean,
    username: string,
    openLoginModal: () => void

}

interface ResponsiveNarBarProps extends ResponsiveComponentProps, NavBarProps {
    requestLogout: () => Promise<boolean>
}

interface NavBarState {
    showRightSideNavBarContent: boolean
}

export class NavBar extends React.Component<ResponsiveNarBarProps, NavBarState> {
    constructor(props: ResponsiveNarBarProps) {
        super(props);
        this.state = {showRightSideNavBarContent: false};
    }

    onToggleButtonClick = () => {
        let newShowingState = !this.state.showRightSideNavBarContent;
        this.setState({showRightSideNavBarContent: newShowingState});
    }

    closeRightSideBar = () => {
        this.setState({showRightSideNavBarContent: false});
    }

    render() {
        let toggleButton = this.props.isLargeScreen ? null :
            <button className="ToggleButton" onClick={this.onToggleButtonClick}>
                <FontAwesomeIcon icon={faListUl} style={{width: 20, height: 20, color: 'white'}}/>
            </button>;

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
        } else if (this.state.showRightSideNavBarContent) {
            NavBarContent = (
                <RightSideNavBar closeRightSideNavContent={this.closeRightSideBar}
                                 navItems={this.props.items} username={this.props.username}
                                 loggedIn={this.props.loggedIn}
                                 requestLogout={this.props.requestLogout}
                                 openLoginModal={this.props.openLoginModal}/>
            );
        }

        return (
            <div className="NavBarContainer">
                <div className="NavBarMain">
                    <div className="Title">{this.props.title}</div>
                    {this.props.isLargeScreen ? NavBarContent : toggleButton}
                </div>
                {this.props.isLargeScreen ? null : NavBarContent}
            </div>
        );
    }

}