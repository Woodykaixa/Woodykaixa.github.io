import React from 'react';
import "./ToolPage.css";
import {ResponsiveInputComponent} from "../common/ResponsiveInputComponent";
import {ResponsiveComponentProps} from "../common/common";

interface LoginFormInfoProps extends ResponsiveComponentProps {

}

interface LoginInfoFormState {
    sid: string,
    pwAF: string,
    pwVPN: string,
    table: string
}

class LoginInfoForm extends React.Component<LoginFormInfoProps, LoginInfoFormState> {

    constructor(props: LoginFormInfoProps) {
        super(props);
        this.state = {sid: '', pwAF: '', pwVPN: '', table: ''};
    }

    query = (e: React.SyntheticEvent) => {
        e.preventDefault();
        fetch('http://localhost:5000/BjutSchedule', {
            method: 'POST',
            body: JSON.stringify({
                schoolId: this.state.sid,
                vpn: this.state.pwVPN,
                af: this.state.pwAF
            }),
            mode: 'cors',
            credentials: 'include'
        }).then(res => res.text()).then(txt => {
            console.log(txt);
        });
    }

    setSchoolId = (newId: string) => {
        this.setState({sid: newId});
    }

    setAF = (newAF: string) => {
        this.setState({pwAF: newAF});
    }

    setVPN = (newVPN: string) => {
        this.setState({pwVPN: newVPN});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.query}>
                    <h3>课表查询</h3>
                    <ResponsiveInputComponent placeholder="学号" name="schoolId"
                                              screenWidth={this.props.screenWidth}
                                              isLargeScreen={this.props.isLargeScreen}
                                              value={this.state.sid}
                                              setValue={this.setSchoolId}/>
                    <ResponsiveInputComponent placeholder="教务密码" name="pwForAF"
                                              screenWidth={this.props.screenWidth}
                                              isLargeScreen={this.props.isLargeScreen}
                                              value={this.state.pwAF} setValue={this.setAF}
                                              type="password"/>
                    <ResponsiveInputComponent placeholder="网关密码" name="pwForVPN"
                                              screenWidth={this.props.screenWidth}
                                              isLargeScreen={this.props.isLargeScreen}
                                              value={this.state.pwVPN} setValue={this.setVPN}
                                              type="password"/>
                    <button>查询</button>
                </form>
                <div dangerouslySetInnerHTML={{__html: this.state.table}}/>
            </div>
        );
    }
}

interface ToolPageProps extends ResponsiveComponentProps {

}

interface TollPageState {
    txt: string
}

export class ToolPage extends React.Component<ToolPageProps, any> {


    render() {
        return (
            <div>
                <LoginInfoForm screenWidth={this.props.screenWidth}
                               isLargeScreen={this.props.isLargeScreen}/>
            </div>
        );
    }
}