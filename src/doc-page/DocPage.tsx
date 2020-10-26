import React from 'react';
import {ProjectReader} from "./ProjectReader";
import {Switch, Route, Link, BrowserRouter} from 'react-router-dom';
import "./DocPage.css";
import {Fetch, ResponsiveComponentProps} from "../common/common";
import {ProjectItem, DocResponse, ProjectFolder} from "../common/ServerInterface";

interface AccessibleProjectProps extends ProjectItem {
}

class AccessibleProject extends React.Component<AccessibleProjectProps, any> {
    render() {
        return (
            <div className='AccessibleProjectItem'>
                <li className='ProjectItemName'>
                    <Link to={'/' + this.props.url}>
                        {this.props.name}
                    </Link>
                    <p>
                        {this.props.description}
                    </p>
                </li>
            </div>
        );
    }
}

interface ProjectListProps {
    projects: ProjectItem[]
}

class ProjectList extends React.Component<ProjectListProps, any> {
    render() {
        return (
            <div className='ProjectListContainer'>
                <ul className="ProjectList">
                    {this.props.projects.map(
                        (doc, index) =>
                            <AccessibleProject name={doc.name} url={doc.url}
                                               description={doc.description}
                                               key={index}/>
                    )}
                </ul>
                <p style={{textAlign: 'right'}}>
                    <small> 如想获取更多文档的访问权限，请联系管理员。</small>
                </p>
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
        Fetch('/doc/', 'GET').then(res => {
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
                                                   isLargeScreen={this.props.isLargeScreen}
                                                   description={project.description}/>
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