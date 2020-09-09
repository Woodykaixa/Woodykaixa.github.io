import React from 'react';
import {DocumentReader} from "./DocumentReader";
import {Switch, Redirect, Route, Link, BrowserRouter} from 'react-router-dom';
import "./DocPage.css";

interface DocLinkProps {
    displayName: string,
    linkName: string
}

class DocLink extends React.Component<DocLinkProps, any> {

    render() {
        return <li className="DocLink"><Link
            to={'/' + this.props.linkName}>{this.props.displayName}</Link></li>;
    }
}

interface DocProps {
    loggedIn: boolean
}

interface docFile {
    filename: string,
    displayName: string
}

interface DocState {
    docs: docFile[],
}

export class DocPage extends React.Component<DocProps, DocState> {

    docs: docFile[] = [
        {
            displayName: 'markdown测试文件',
            filename: 'test.md'
        },
        {
            displayName: 'robots协议文件',
            filename: 'robots.txt'
        }
    ]

    constructor(props: DocProps) {
        super(props);
        this.state = {docs: this.docs};
    }

    render() {
        if (this.props.loggedIn) {
            return (
                <BrowserRouter basename='/docs'>
                    <Switch>
                        {this.state.docs.map((doc, index) =>
                            <Route key={index} path={'/' + doc.filename}>
                                <DocumentReader file={doc.filename}/>
                            </Route>)}
                        <Route path='/'>
                            <div>
                                <div>
                                    <ul>
                                        {this.state.docs.map(
                                            (doc, index) =>
                                                <DocLink displayName={doc.displayName}
                                                         linkName={doc.filename}
                                                         key={index}/>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </Route>
                    </Switch>
                </BrowserRouter>

            );
        }

        return <Redirect to='/login?from_link=/docs'/>;
    }
}