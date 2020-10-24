import React from "react";
import "./Footer.css";
import {ResponsiveComponentProps} from "./common/common";

export interface FooterItemProps {
    name: string
}

interface FooterProps extends ResponsiveComponentProps {
    sites: FooterItemProps[]
}

export class Footer extends React.Component<FooterProps, any> {
    render() {
        return (
            <div className="Footer">
                <div className="FooterInfo">
                    <ul>
                        {this.props.sites.map(
                            (site, index) => <li key={index}>{site.name}</li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}