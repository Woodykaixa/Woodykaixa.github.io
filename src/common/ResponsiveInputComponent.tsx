import React from "react";
import {ResponsiveComponentProps} from "./common";

interface InputComponentProps extends ResponsiveComponentProps {
    placeholder: string,
    name: string,
    value: string,
    setValue: (value: string) => void,
    type?: string,
}

export class ResponsiveInputComponent extends React.Component<InputComponentProps, any> {

    OnChange = (e: React.SyntheticEvent) => {
        let target = e.target as HTMLInputElement;
        this.props.setValue(target.value);
    }

    render() {
        return (
            <div className="ResponsiveInputBorder">
                {
                    this.props.isLargeScreen ?
                        <label className="ResponsiveInputHint">{this.props.placeholder}</label> :
                        null
                }
                <input type={this.props.type ? this.props.type : "text"} name={this.props.name}
                       value={this.props.value}
                       placeholder={this.props.isLargeScreen ? "" : this.props.placeholder}
                       autoComplete={this.props.type === "password" ? "current-password" : "on"}
                       onChange={this.OnChange}/>
            </div>
        );
    }
}