import React from 'react';
import {MarkdownReader} from "./MarkdownReader";
import {Redirect} from 'react-router-dom';
import "./DocPage.css";

interface DocLinkProps {
    displayName: string,
    linkName: string,
    open: (file: string) => void
}

class DocLink extends React.Component<DocLinkProps, any> {

    toLink = () => {
        this.props.open(this.props.linkName);
    }

    render() {
        return <li className="DocLink" onClick={this.toLink}>{this.props.displayName}</li>;
    }
}

interface DocProps {
    loggedIn: boolean,
    onRerender: () => void
}

interface DocState {
    docs: string[],
    opened: string | null
}

export class DocPage extends React.Component<DocProps, DocState> {

    docs: string[] = [
        'markdown测试文件',
        'robots.txt'
    ]

    constructor(props: DocProps) {
        super(props);
        this.state = {docs: this.docs, opened: null};
    }

    openFile = (file: string) => {
        this.setState({opened: file});
    }

    closeFile = () => {
        this.setState({opened: null});
    }

    render() {
        if (this.props.loggedIn) {
            if (this.state.opened === null) {
                return (
                    <div>
                        <div>
                            <ul>
                                {this.state.docs.map(
                                    (file, index) =>
                                        <DocLink displayName={file} linkName={file} key={index}
                                                 open={this.openFile}/>
                                )}
                            </ul>
                        </div>
                    </div>
                );
            } else {
                return (
                    <MarkdownReader/>
                );
            }
        }
        return <Redirect to='/login?from_link=/docs'/>;
    }
}