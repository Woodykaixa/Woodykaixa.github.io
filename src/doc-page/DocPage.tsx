import React from 'react';
import {ProjectReader} from "./ProjectReader";
import {Switch, Route, Link, BrowserRouter} from 'react-router-dom';
import "./DocPage.css";
import {Fetch, ResponsiveComponentProps} from "../common/common";
import {ProjectItem, DocResponse, ProjectFolder} from "../common/ServerInterface";

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


interface ProjectListProps {
    projects: ProjectItem[]
}

class ProjectList extends React.Component<ProjectListProps, any> {

    render() {
        return (
            <div>
                <ul className="ProjectList">
                    {this.props.projects.map(
                        (doc, index) =>
                            <DocLink displayName={doc.name}
                                     linkName={doc.url}
                                     key={index}/>
                    )}
                </ul>
            </div>
        );
    }
}

interface DocProps extends ResponsiveComponentProps {
    loggedIn: boolean
}


interface DocState {
    projects: ProjectItem[],
    projectFiles: Array<string | ProjectFolder>,
    ProjectsQueried: boolean
}

export class DocPage extends React.Component<DocProps, DocState> {
    constructor(props: DocProps) {
        super(props);
        this.state = {projects: [], projectFiles: [], ProjectsQueried: false};
    }

    componentDidMount() {
        Fetch('/doc', 'GET').then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        }).then((json: DocResponse) => {
            if (json.err) {
                throw new Error('Failed to fetch projects');
            }
            this.setState({projects: json.data, ProjectsQueried: true});
        }).catch(err => {
            console.log(err);
        });

    }

    updateProjectFiles = (files: Array<string | ProjectFolder>) => {
        this.setState({projectFiles: files});
    }

    render() {
        if (!this.state.ProjectsQueried) {
            return <div>
                loading projects. please wait.
            </div>;
        }
        return (
            <div className="FullPage">
                <BrowserRouter basename='/docs'>
                    <Switch>
                        {this.state.projects.map((project, index) =>
                            <Route key={index} path={'/' + project.url}>
                                <div className="DocPageContainer">
                                    <ProjectReader project={project.name}
                                                   files={this.state.projectFiles}
                                                   updateProjectFiles={this.updateProjectFiles}
                                                   screenWidth={this.props.screenWidth}
                                                   isLargeScreen={this.props.isLargeScreen}/>
                                </div>
                            </Route>)}
                        <Route path='/'>
                            <ProjectList projects={this.state.projects}/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>

        );

    }
}