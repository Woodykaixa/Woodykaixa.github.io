import React from 'react';
import {ProjectReader, ProjectFolder} from "./DocumentReader";
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

interface Project {
    url: string,
    name: string
}


interface ProjectListProps {
    projects: Project[]
}

class ProjectList extends React.Component<ProjectListProps, any> {

    render() {
        return (
            <div>
                <ul>
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

interface DocProps {
    loggedIn: boolean
}


interface DocState {
    projects: Project[],
    projectFiles: Array<string | ProjectFolder>,
    ProjectsQueried: boolean
}

export class DocPage extends React.Component<DocProps, DocState> {
    constructor(props: DocProps) {
        super(props);
        this.state = {projects: [], projectFiles: [], ProjectsQueried: false};
    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/projectDoc', {
            mode: 'cors',
            credentials: 'include'
        }).then(res => res.json()).then(json => {
            this.setState({projects: json as Project[], ProjectsQueried: true});
        });

    }

    updateProjectFiles = (files: Array<string | ProjectFolder>) => {
        this.setState({projectFiles: files});
    }

    render() {
        if (this.props.loggedIn) {
            if (!this.state.ProjectsQueried) {
                return <div>
                    loading projects. please wait.
                </div>;
            }
            return (
                <BrowserRouter basename='/docs'>
                    <Switch>
                        {this.state.projects.map((project, index) =>
                            <Route key={index} path={'/' + project.url}>
                                <div className="DocPageContainer">
                                    <ProjectReader project={project.name}
                                                   files={this.state.projectFiles}
                                                   updateProjectFiles={this.updateProjectFiles}/>
                                </div>
                            </Route>)}
                        <Route path='/'>
                            <ProjectList projects={this.state.projects}/>
                        </Route>
                    </Switch>
                </BrowserRouter>

            );
        }

        return <Redirect to='/login?from_link=/docs'/>;
    }
}