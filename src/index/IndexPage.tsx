import React from 'react';
import "./IndexPage.css";
import {urlFor} from "../common/env";

interface RepoLink {
    title: string,
    link: string,
    description: string
}

interface IndexPageState {
    fetching: boolean,
    fetchSuccess: boolean,
    avatar: string,
    name: string,
    company: string,
    github: string,
    repos: RepoLink[]
}

export class IndexPage extends React.Component<any, IndexPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            avatar: '',
            company: '',
            github: '',
            repos: [],
            fetching: true,
            fetchSuccess: false
        };
    }

    componentDidMount() {
        fetch(urlFor('my_profile')).then(res => res.json()).then(json => {
            if (json.success) {
                this.setState({
                    fetchSuccess: true,
                    fetching: false,
                    avatar: json.avatar_url,
                    name: json.name,
                    company: json.company,
                    github: json.html_url,
                    repos: json.repos
                });
            } else {
                this.setState({
                    fetching: false,
                    fetchSuccess: false
                });
            }
        });
    }

    render() {
        if (this.state.fetching) {
            return <div>
                Loading. Please wait
            </div>;
        } else if (!this.state.fetchSuccess) {
            return <div>
                Fetch failed.
            </div>;
        }
        return (
            <div className="IndexPageContainer">
                <div className="IndexPageInfoContainer">
                    <div className="IndexPageAvatarBox">
                        <img src={this.state.avatar} alt={this.state.name}/>
                    </div>
                    <div className="IndexPageInfoBox">
                        <h2 className="IndexPageNameBox">{this.state.name}</h2>
                        <div className="IndexPageCompanyBox">{this.state.company}</div>
                        <div className="IndexPageLinkBox">
                            <a href={this.state.github}>{this.state.github}</a>
                        </div>
                    </div>
                </div>
                <ul className="IndexPageRepoList">
                    <h3>代码仓库</h3>
                    {this.state.repos.map((repo, index) =>
                        <li key={index}><a href={repo.link}>{repo.title}</a></li>)}
                </ul>
            </div>
        );
    }
}