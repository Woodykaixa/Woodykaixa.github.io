import React from 'react';
import {MarkdownReader} from "./MarkdownReader";
import {Redirect} from 'react-router-dom';

interface DocProps {
    loggedIn: boolean
}

export class DocPage extends React.Component<DocProps, any> {
    render() {
        if (this.props.loggedIn)
            return (
                <MarkdownReader/>
            );
        return <Redirect to='/login'/>;
    }
}