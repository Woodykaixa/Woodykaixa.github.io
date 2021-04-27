import React from 'react';
import marked from 'marked';
import {highlightAuto} from 'highlight.js';
import {sanitize} from 'dompurify';
import 'highlight.js/styles/atom-one-light.css';
import './ProjectReader.css';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolder, faAngleLeft, faFolderOpen, faExpand} from '@fortawesome/free-solid-svg-icons';
import {faFileAlt} from '@fortawesome/free-regular-svg-icons';
import {urlFor} from "../common/env";
import {Fetch, ResponsiveComponentProps} from "../common/common";
import {
    ProjectFileResponse,
    ProjectFolder,
    ProjectHierarchyResponse
} from "../common/ServerInterface";

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: (code) => highlightAuto(code).value,
    gfm: true, // 允许 GitHub标准的markdown.
    pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
    breaks: false, // 允许回车换行（该选项要求 gfm 为true）
    smartLists: true, // 使用比原生markdown更时髦的列表
    smartypants: false, // 使用更为时髦的标点
});


interface DocumentFileItemProps {
    filename: string,
    project: string,
    basePath: string,
    onFileItemClick: (e: React.SyntheticEvent) => void,
    indent: number
}

class DocumentFileItem extends React.Component<DocumentFileItemProps, any> {
    render() {
        return (
            <li className="FileItem">
                <a
                    href={urlFor('/doc/') + this.props.project + this.props.basePath + '/' + this.props.filename}
                    onClick={this.props.onFileItemClick}
                    key={this.props.basePath + '/' + this.props.filename}>
                    <div style={{paddingLeft: this.props.indent * 20 + 10}}>
                        <FontAwesomeIcon icon={faFileAlt}
                                         style={{
                                             marginRight: 10,
                                             color: '#adc1e4',
                                             width: 20,
                                             height: 20
                                         }}/>
                        {this.props.filename}
                    </div>
                </a>
            </li>

        );
    }
}

interface DocumentFolderItemProps {
    project: string,
    folderName: string,
    basePath: string,
    contents: Array<string | ProjectFolder>,
    onFileItemClick: (e: React.SyntheticEvent) => void,
    indent: number
}

interface DocumentFolderItemState {
    expanded: boolean
}

class DocumentFolderItem extends React.Component<DocumentFolderItemProps, DocumentFolderItemState> {
    constructor(props: DocumentFolderItemProps) {
        super(props);
        this.state = {expanded: false};
    }

    swapExpandingState = () => {
        if (this.state.expanded) {
            this.setState({expanded: false});
        } else {
            this.setState({expanded: true});
        }
    }

    render() {
        const requestBasePath = this.props.basePath + '/' + this.props.folderName;
        return (
            <li className="FolderItem" style={{paddingLeft: this.props.indent * 20}}>
                <div>
                    <FontAwesomeIcon icon={this.state.expanded ? faFolderOpen : faFolder}
                                     color='#f9d870'
                                     style={{
                                         marginRight: 10,
                                         width: 20,
                                         height: 20,
                                         cursor: 'pointer'
                                     }}
                                     onClick={this.swapExpandingState}/>
                    <span>{this.props.folderName}</span>
                </div>
                {this.state.expanded ?
                    <ul>
                        {this.props.contents.map(f => {
                            if (typeof f === 'string') {
                                return <DocumentFileItem project={this.props.project}
                                                         onFileItemClick={this.props.onFileItemClick}
                                                         filename={f}
                                                         basePath={requestBasePath}
                                                         indent={this.props.indent + 1}/>;
                            }
                            return <DocumentFolderItem project={this.props.project}
                                                       folderName={f.folderName}
                                                       basePath={requestBasePath}
                                                       contents={f.contents}
                                                       onFileItemClick={this.props.onFileItemClick}
                                                       indent={this.props.indent + 1}/>;
                        })}
                    </ul> :
                    null}
            </li>
        );
    }
}

interface MobileFileSelectorProps {
    files: string[],
    current: string,
    project: string,
    fileSelected: (file: string) => void
}

interface MobileFileSelectorState {
    expanded: boolean
}

class MobileFileSelector extends React.Component<MobileFileSelectorProps, MobileFileSelectorState> {

    private DropList: React.RefObject<HTMLDivElement>;

    constructor(props: MobileFileSelectorProps) {
        super(props);
        this.state = {expanded: false};
        this.DropList = React.createRef();
    }

    switchStatus = () => {
        if (this.state.expanded) {
            const list = this.DropList.current as HTMLDivElement;
            list.classList.remove('SelectorExpand');
            list.classList.add('SelectorHide');
            setTimeout(() => {
                this.setState({expanded: false});
            }, 300);
        } else {
            this.setState({expanded: true});

        }
    }

    selectFile = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.switchStatus();
        this.props.fileSelected((e.target as HTMLAnchorElement).href);
    }

    render() {
        return (
            <div className='SelectorMain'>
                <div className='SelectedItem'>
                    {this.props.current}
                    {
                        this.state.expanded ?
                            <div className='SelectorDropList SelectorExpand ' ref={this.DropList}>
                                {this.props.files.map((f, i) =>
                                    <a onClick={this.selectFile} key={i}
                                       href={urlFor('/doc/') + this.props.project + f}>{f}</a>)}
                            </div>
                            : null
                    }
                </div>
                <button className='SelectionButton' onClick={this.switchStatus}>
                    <FontAwesomeIcon icon={faExpand}/>
                </button>
            </div>
        );
    }
}

interface DocumentCatalogueProps
    extends ResponsiveComponentProps {
    project: string,
    description: string,
    projectFiles: Array<string | ProjectFolder>,
    currentFile: string,
    openProjectFile: (content: string, type: string, name: string) => void
}

interface DocumentCatalogueState {
    showMask: boolean
}

class DocumentCatalogue extends React.Component<DocumentCatalogueProps, DocumentCatalogueState> {

    constructor(props: DocumentCatalogueProps) {
        super(props);
        this.state = {showMask: false};
    }

    fetchFileContent = (link: string): Promise<ProjectFileResponse> => {
        return fetch(link, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors'
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        });
    }

    onFileItemClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.nativeEvent.target as HTMLLIElement;
        console.log("onFileItemClick:", target);
        const link = (target.parentElement as HTMLAnchorElement).href;
        const fileType = link.substring(link.length - 3) === '.md' ? 'markdown' : 'text';
        const name = link.substr(link.lastIndexOf('/') + 1);
        this.fetchFileContent(link).then((json: ProjectFileResponse) => {
            if (json.err) {
                this.props.openProjectFile('error:\n' + json.data, 'text', name);
            } else {
                const content = (fileType === 'markdown') ?
                    sanitize(marked(json.data)) : json.data;
                this.props.openProjectFile(content, fileType, name);
            }
        }).catch(() => {
            this.props.openProjectFile('failed to fetch:' + link, 'text', name);
        });
    }

    selectFileInMobileSelector = (file: string) => {
        const fileType = file.substring(file.length - 3) === '.md' ? 'markdown' : 'text';
        const name = file.substring(file.lastIndexOf('/'));
        this.fetchFileContent(file).then((json: ProjectFileResponse) => {
            if (json.err) {
                this.props.openProjectFile('error:\n' + json.data, 'text', name);
            } else {
                const content = (fileType === 'markdown') ?
                    sanitize(marked(json.data)) : json.data;
                this.props.openProjectFile(content, fileType, name);
            }
        }).catch(() => {
            this.props.openProjectFile('failed to fetch:' + file, 'text', name);
        });
    }

    iterFile = (): string[] => {
        const files: string[] = [];
        const iterFiles = (base: string, file: string | ProjectFolder) => {
            if (typeof file === 'string') {
                files.push(base + '/' + file);
            } else {
                file.contents.forEach(content => {
                    iterFiles(base + '/' + file.folderName, content);
                });
            }
        };
        this.props.projectFiles.forEach(f => {
            iterFiles('', f);
        });
        return files;
    }

    render() {
        console.log(this.props.projectFiles);
        if (this.props.isLargeScreen) {
            return (
                <nav className="DocumentCatalogueContainer">
                    <header className="DocumentCatalogueHeader">
                        <div>{this.props.project}</div>
                        <div className="DocumentCatalogueDesc">{this.props.description}</div>
                    </header>
                    <div className="DocumentCatalogueBody">
                        <ul className="DocumentCatalogueTopFolder">
                            <li className="FileItem">
                                <div>
                                    <Link to="../" className="CloseProjectLink">
                                        <FontAwesomeIcon icon={faAngleLeft}
                                                         style={{width: 20, height: 20}}/>
                                    </Link>
                                    返回
                                </div>
                            </li>
                            {this.props.projectFiles.map(f => {
                                if (typeof f === 'string') {
                                    return <DocumentFileItem filename={f}
                                                             project={this.props.project}
                                                             basePath=''
                                                             onFileItemClick={this.onFileItemClick}
                                                             indent={0}/>;
                                }
                                return <DocumentFolderItem folderName={f.folderName}
                                                           project={this.props.project} basePath=''
                                                           contents={f.contents}
                                                           onFileItemClick={this.onFileItemClick}
                                                           indent={0}/>;
                            })}
                        </ul>
                    </div>
                </nav>
            );
        }
        return (
            <div className="MobileCatalogueContainer">
                <div style={{wordBreak: 'keep-all'}}>当前文件：</div>
                <MobileFileSelector files={this.iterFile()} current={this.props.currentFile}
                                    project={this.props.project}
                                    fileSelected={this.selectFileInMobileSelector}/>
            </div>
        );
    }
}

interface FileReaderProps {
    fileContent: string,
    fileType: string,
    filename: string
}

interface FileReaderState {

}

class FileReader extends React.Component<FileReaderProps, FileReaderState> {

    render() {
        const content = this.props.fileType === 'markdown' ?
            <div className="FileContent"
                 dangerouslySetInnerHTML={{__html: sanitize(this.props.fileContent)}}/>
            : <div className="FileContent">
                {this.props.fileContent.split('\n').map((str, line) =>
                    <div key={line} style={{fontSize: 'large'}}>{str}</div>)}
            </div>;
        return (
            <div className="FileContainer">
                <ul className="FileHeader">
                    <li className="FileTab">{this.props.filename}</li>
                </ul>
                <div className="FileBody">
                    {content}
                </div>
            </div>
        );
    }
}


interface ProjectReaderProps extends ResponsiveComponentProps {
    project: string,
    description: string,
    files: Array<string | ProjectFolder>,
    updateProjectFiles: (files: Array<string | ProjectFolder>) => void
}

interface ProjectReaderState {
    fileContent: string,
    fileType: string,
    filename: string
}

export class ProjectReader extends React.Component<ProjectReaderProps, ProjectReaderState> {

    constructor(props: ProjectReaderProps) {
        super(props);
        Fetch('/doc/' + this.props.project, 'GET').then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        }).then((json: ProjectHierarchyResponse) => {
            if (json.err) {
                throw new Error(json.data as string);
            }
            this.props.updateProjectFiles(json.data as Array<string | ProjectFolder>);
        }).catch(err => {
            console.log(err);
            this.setState({
                fileContent: `${err}: when opening project ${this.props.project}`,
                filename: 'Error'
            });
        });
        this.state = {fileContent: '欢迎使用kaixadoc', fileType: 'markdown', filename: 'welcome'};
    }

    openProjectFile = (content: string, type: string, name: string) => {
        this.setState({fileContent: content, fileType: type, filename: decodeURIComponent(name)});
    }


    render() {
        return (
            <div className="ProjectReaderContainer">
                <DocumentCatalogue project={this.props.project}
                                   description={this.props.description}
                                   projectFiles={this.props.files}
                                   currentFile={this.state.filename}
                                   openProjectFile={this.openProjectFile}
                                   screenWidth={this.props.screenWidth}
                                   isLargeScreen={this.props.isLargeScreen}/>
                <FileReader fileContent={this.state.fileContent} fileType={this.state.fileType}
                            filename={this.state.filename}/>
            </div>
        );
    }
}
