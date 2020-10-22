import React from 'react';
import "./IndexPage.css";
import {urlFor} from "../common/env";
import {ResponsiveComponentProps} from "../common/common";
import {faBuilding} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";
import {faLink} from "@fortawesome/free-solid-svg-icons";

interface RepoLink {
    title: string,
    link: string,
    description: string,
    fork: number,
    star: number,
    language: string
}

interface RepoTagProps extends RepoLink, ResponsiveComponentProps {

}

class RepoTag extends React.Component<RepoTagProps, any> {
    render() {
        return (
            <div className="RepoTagContainer">
                <a href={this.props.link}>
                    <h4>{this.props.title}</h4>
                    <p>{this.props.description}</p>
                </a>
                <div className="RepoTagInfoContainer">
                    <span style={{width: 10}}/>
                    <span>
                        <p>stars: {this.props.star}</p>
                    </span>
                    <span style={{width: 20}}/>
                    <span>
                        <p>forks: {this.props.fork}</p>
                    </span>
                </div>
            </div>
        );
    }
}

interface IndexPageState {
    fetching: boolean,
    fetchSuccess: boolean,
    avatar: string,
    name: string,
    company: string,
    github: string,
    repos: RepoLink[],
    blog: string,
    location: string
}

interface IndexPageProps extends ResponsiveComponentProps {

}

export class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
    constructor(props: IndexPageProps) {
        super(props);
        this.state = {
            name: '',
            avatar: '',
            company: '',
            github: '',
            blog: '',
            location: '',
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
                    repos: json.repos,
                    location: json.location,
                    blog: json.blog
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
            return <div className="FullPage">
                Loading. Please wait
            </div>;
        } else if (!this.state.fetchSuccess) {
            return <div className="FullPage">
                Fetch failed.
            </div>;
        }
        return (
            <div>
                <div className="IndexPageInfoContainer">
                    <div className="IndexPageInfo">
                        <div className="IndexPageAvatarBox">
                            <img alt="avatar"
                                 src="https://avatars1.githubusercontent.com/u/22990333?s=460&amp;u=ab4f382b52aae8a47f29de660ed2b4551e8b1d72&amp;v=4"/>
                        </div>
                        <div className="IndexPageInfoBox">
                            <h2 className="IndexPageNameBox">{this.state.name}</h2>
                            <div className="IndexPageCompanyBox">
                                <FontAwesomeIcon icon={faBuilding}
                                                 style={{width: 16, marginRight: 5}}/>
                                {this.state.company}
                            </div>
                            <div className="IndexPageBlogBox">
                                <FontAwesomeIcon icon={faLink}
                                                 style={{width: 16, marginRight: 5}}/>
                                {this.state.blog}
                            </div>
                            <div className="IndexPageLocationBox">
                                <FontAwesomeIcon icon={faMapMarkedAlt}
                                                 style={{width: 16, marginRight: 5}}/>
                                {this.state.location}
                            </div>
                            <div className="IndexPageLinkBox">
                                <a href={this.state.github}>{this.state.github}</a>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="IndexPageContainer FullPage">
                    <div className="IndexPageProfBox">
                        <div>
                            <img style={{maxWidth: '100%'}}
                                 src="https://github-readme-stats.vercel.app/api?username=Woodykaixa&show_icons=true"
                                 alt="https://github.com/anuraghazra/github-readme-stats"/>
                        </div>
                        <div>
                            <img style={{maxWidth: '100%'}}
                                 src="https://github-readme-stats.vercel.app/api/top-langs/?username=Woodykaixa&layout=compact&hide=html)"
                                 alt=""/>
                        </div>
                    </div>
                    <div className="SplitLine"/>
                    <div>
                        <h3>代码仓库</h3>
                        <ul className="IndexPageRepoList">
                            {this.state.repos.map((repo, index) =>
                                <li key={index}>
                                    <RepoTag title={repo.title} link={repo.link}
                                             description={repo.description} fork={repo.fork}
                                             star={repo.star} language={repo.language}
                                             isLargeScreen={this.props.isLargeScreen}
                                             screenWidth={this.props.screenWidth}/>
                                </li>)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}