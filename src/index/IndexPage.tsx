import React from 'react';
import "./IndexPage.css";

interface RepoLink {
    title: string,
    link: string,
    description: string
}

interface IndexPageState {
    avatar: string,
    name: string,
    company: string,
    github: string,
    repos: RepoLink[]
}

export class IndexPage extends React.Component<any, IndexPageState> {
    constructor(props: any) {
        super(props);
        this.state = {name: '', avatar: '', company: '', github: '', repos: []};
    }

    componentDidMount() {
        fetch('https://api.github.com/users/Woodykaixa').then(res => res.json()).then(json => {
            this.setState({
                avatar: json.avatar_url,
                name: json.name,
                company: json.company,
                github: json.html_url
            });
            fetch(json.repos_url).then(res => res.json()).then((repoObjects: any[]) => {
                const repos = repoObjects.map(r => {
                    return {title: r.name, link: r.html_url, description: r.description};
                });
                this.setState({repos: repos});
            });
        });
    }

    render() {
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
                    {this.state.repos.map(repo => <li><a href={repo.link}>{repo.title}</a></li>)}
                </ul>
            </div>
        );
    }
}