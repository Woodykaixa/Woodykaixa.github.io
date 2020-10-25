import React from 'react';
import "./IndexPage.css";
import {Fetch} from "../common/common";
import {ResponsiveComponentProps} from "../common/common";
import {faBuilding} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {AdminProfileData, AdminProfileResponse, RepoLink} from "../common/ServerInterface";
import {Loading} from "../common/LoadingComponent";


interface RepoTagProps extends RepoLink, ResponsiveComponentProps {

}

class RepoTag extends React.Component<RepoTagProps, any> {
    render() {
        let displayTitle = this.props.title;
        if (this.props.language) {
            displayTitle += ` (${this.props.language})`;
        }
        return (
            <div className="RepoTagContainer">
                <a href={this.props.link}>
                    <h3>{displayTitle}</h3>
                </a>
                <p>{this.props.description}</p>

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

interface IndexPageState extends AdminProfileData {
    fetching: boolean,
    fetchSuccess: boolean,
}

interface IndexPageProps extends ResponsiveComponentProps {

}

export class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
    constructor(props: IndexPageProps) {
        super(props);
        this.state = {
            name: '',
            company: '',
            github: '',
            blog: '',
            location: '',
            repos: [],
            fetching: true,
            fetchSuccess: false,
            loginName: '',
            followers: 0,
            following: 0,
            repoCount: 0,
            bio: ''
        };
    }

    componentDidMount() {
        Fetch('admin_profile', 'GET').then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status}: ${res.statusText}`);
        }).then((json: AdminProfileResponse) => {
                if (json.err) {
                    this.setState({
                        fetching: false,
                        fetchSuccess: false
                    });
                    throw new Error(json.data as string);
                }
                const data = json.data as AdminProfileData;
                this.setState({
                    fetchSuccess: true,
                    fetching: false,
                    name: data.name,
                    company: data.company,
                    github: data.github,
                    location: data.location,
                    blog: data.blog,
                    bio: data.bio,
                    following: data.following,
                    followers: data.followers,
                    repoCount: data.repoCount
                });
                data.repos.sort((a, b) => b.star - a.star);
                this.setState({
                    repos: data.repos
                });
            }
        );
    }

    render() {
        if (this.state.fetching) {
            return <Loading/>;
        } else if (!this.state.fetchSuccess) {
            return <div className="ErrorMessage FullPage">
                Failed in fetching my_profile. Please try refresh or
                <a href="mailto:690750353@qq.com"> contact with me</a>
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
                                <FontAwesomeIcon icon={faLink}
                                                 style={{width: 16, marginRight: 5}}/>
                                <a href={this.state.github}>{this.state.github}</a>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="IndexPageContainer">
                    <h3 className="ParaTitle">我的统计信息</h3>
                    <div className="IndexPageProfBox">
                        <div>
                            <img style={{maxWidth: '100%'}}
                                 src="https://github-readme-stats.vercel.app/api?username=Woodykaixa&show_icons=true"
                                 alt="My stats"/>
                        </div>
                        <div>
                            <img style={{maxWidth: '100%'}}
                                 src="https://github-readme-stats.vercel.app/api/top-langs/?username=Woodykaixa&layout=compact&hide=html&card_width=439.94"
                                 alt="My favorite languages"/>
                        </div>
                    </div>
                    <div className="SplitLine"/>
                    <h3 className="ParaTitle">我的代码</h3>
                    <ul className="IndexPageRepoList">
                        {this.state.repos.map((repo, index) =>
                            <li key={index}>
                                <RepoTag title={repo.title} link={repo.link}
                                         description={repo.description} fork={repo.fork}
                                         star={repo.star} language={repo.language}
                                         isLargeScreen={this.props.isLargeScreen}
                                         screenWidth={this.props.screenWidth}
                                         isForked={repo.isForked}/>
                            </li>)}
                    </ul>
                    <h3 className="ParaTitle">关于本站</h3>
                    <div className="AboutSiteBlock">
                        <p>
                            欢迎来到卡夏妙妙屋。
                        </p>
                        <p>
                            这里是我的个人网站，也是我的网页制作大作业。
                            <b>关于</b>页面展示了我的个人信息，也声明了本网站的信息；
                            <b>文档</b>页面可以用于展示我自己参与的项目文档，注册用户根据自己的权限访问相应的文档，同时还有一个公开文档作为博客使用；
                            <b>工具</b>页面是一些小工具，供部分人使用。
                        </p>
                        <p>
                            本页面的制作使用了如下组件：React、React-Router、React-Modal、React-Cookies、FontAwesome。
                            同时，网页风格参考了Material Design，并使用
                            <a href="https://github.com/anuraghazra/github-readme-stats">github-readme-stats</a>
                            生成统计信息。
                        </p>
                        <p style={{marginTop: 20, textAlign: 'right', paddingRight: 10}}>
                            <small>
                                Copyright ©2020 Woodykaixa. All rights reserved.
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}