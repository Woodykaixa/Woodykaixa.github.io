import React from "react";
import "./Footer.css";

interface FooterProps {
    sites: string[]
}

export class Footer extends React.Component<FooterProps, any> {
    render() {
        return (
            <div className="Footer">
                <ul>
                    {this.props.sites.map((site, index) => <li key={index}>{site}</li>)}
                </ul>
            </div>
        );
    }
}