import React from "react";
import "./NavBar.css";

interface NavBarItemProp {
    name: string,
    link: string
}

export interface NavBarProps {
    items: NavBarItemProp[],
    title: string
}

class NavBarItem extends React.Component<NavBarItemProp, any> {
    handleClick = () => {
        alert("点个锤子，还没做完呢");
    }

    render() {
        return (
            <li className="NavItem">
                <h3>
                    <a href="#" target="_self" rel="noopener noreferrer"
                       onClick={this.handleClick}>
                        {this.props.name}
                    </a>
                </h3>
            </li>
        )
    }
}

class UserInfo extends React.Component<any, any> {
    render() {
        return (
            <ul className="UserInfo">
                <li>你好，kaixa</li>
            </ul>
        );
    }
}

export class NavBar extends React.Component<NavBarProps, any> {
    render() {
        return (
            <div className="NavBarContainer">
                <h1 className="Title">{this.props.title}</h1>
                <ul className="NavBarItemContainer">
                    {this.props.items.map((value, index) => <NavBarItem name={value.name}
                                                                        link={value.link}
                                                                        key={index}/>)}
                </ul>
                <UserInfo/>
            </div>);
    }
}