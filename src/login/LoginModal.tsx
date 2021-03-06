import React from 'react';
import './LoginModal.css';
import {ResponsiveComponentProps} from "../common/common";
import {ResponsiveInputComponent} from "../common/ResponsiveInputComponent";
import Modal from "react-modal";

const loginModalStyle: Modal.Styles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        borderRadius: 5
    }
};


interface LoginProps extends ResponsiveComponentProps {
    loginFunction: () => Promise<boolean>,
    registerFunction: () => Promise<boolean>,
    openLoginModal: () => void,
    closeLoginModal: () => void,
    loginModalOpen: boolean,
    username: string,
    password: string,
    nameChanged: (name: string) => void,
    pwdChanged: (pwd: string) => void
}

interface LoginState {

}

export class LoginModal extends React.Component<LoginProps, LoginState> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentWillUnmount() {
        Modal.setAppElement('.App');
    }


    onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (await this.props.loginFunction()) {
            this.props.closeLoginModal();
        } else {
            alert('error');
        }
    }

    onRegister = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const registerSuccess = await this.props.registerFunction();
        if (registerSuccess) {
            await this.props.loginFunction();
            this.props.closeLoginModal();
        } else {
            console.log('register failed');
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.loginModalOpen} style={loginModalStyle}
                   shouldCloseOnOverlayClick={true}>
                <form className="LoginForm" onSubmit={this.onSubmit}>
                    <button className="LoginFormCloseButton" onClick={this.props.closeLoginModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={20}
                             height={20}>
                            <line x1="3" y1="3" x2="17" y2="17"/>
                            <line x1="17" y1="3" x2="3" y2="17"/>
                        </svg>
                    </button>
                    <h3 className='LoginFormTitle'>登录</h3>
                    <ResponsiveInputComponent name="name" placeholder="用户名"
                                              screenWidth={this.props.screenWidth}
                                              isLargeScreen={this.props.isLargeScreen}
                                              value={this.props.username}
                                              setValue={this.props.nameChanged}/>
                    <ResponsiveInputComponent type="password" name="pwd" placeholder="密 码"
                                              screenWidth={this.props.screenWidth}
                                              isLargeScreen={this.props.isLargeScreen}
                                              value={this.props.password}
                                              setValue={this.props.pwdChanged}/>
                    <div className="LoginFormButtonArea">
                        <div>
                            <button type='submit' className="SecondButton"
                                    onClick={this.onRegister}>注册
                            </button>
                        </div>
                        <div>
                            <button className="MainButton" type="submit">登录
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        );
    }
}