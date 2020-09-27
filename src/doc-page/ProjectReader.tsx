import React from 'react';
import marked from 'marked';
import {highlightAuto} from 'highlight.js';
import {sanitize} from 'dompurify';
import 'highlight.js/styles/atom-one-light.css';
import './ProjectReader.css';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolder, faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {faFileAlt} from '@fortawesome/free-regular-svg-icons';
import {urlFor} from "../common/env";
import {ResponsiveComponentProps} from "../common/common";

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: (code) => highlightAuto(code).value,
    gfm: true, // 允许 GitHub标准的markdown.
    pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
    breaks: false, // 允许回车换行（该选项要求 gfm 为true）
    smartLists: true, // 使用比原生markdown更时髦的列表
    smartypants: false, // 使用更为时髦的标点
});

export interface ProjectFolder {
    folderName: string
    contents: Array<string | ProjectFolder>
}

interface DocumentCatalogueProps extends ResponsiveComponentProps {
    project: string,
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

    onFileItemClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!this.props.isLargeScreen) {
            this.hideMobileMask();
        }
        const target = e.nativeEvent.target as HTMLLIElement;
        const link = (target.parentElement as HTMLAnchorElement).href;
        const fileType = link.endsWith('.md') ? 'markdown' : 'text';
        const name = link.substr(link.lastIndexOf('/') + 1);
        fetch(link, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors'
        }).then(res => res.json()).then(json => {
            if (json.success) {
                const content = (fileType === 'markdown') ?
                    sanitize(marked(json.content)) : json.content;
                this.props.openProjectFile(content, fileType, name);
            } else {
                this.props.openProjectFile('error:\n' + json.err, 'text', name);
            }
        }).catch(() => {
            this.props.openProjectFile('failed to fetch:' + link, 'text', name);
        });
    }

    renderFileOrFolder = (base: string, file: string | ProjectFolder) => {
        if (typeof file === 'string') {
            return <a href={urlFor('project_file/') + this.props.project + base + '/' + file}
                      onClick={this.onFileItemClick} key={base + '/' + file}>
                <li className='FileItem'>
                    <FontAwesomeIcon icon={faFileAlt} style={{marginRight: 10, color: '#adc1e4'}}/>
                    {file}
                </li>
            </a>;
        }
        return <li className='FolderItem' key={file.folderName}>
            <div>
                <FontAwesomeIcon icon={faFolder} color='#f9d870' style={{marginRight: 10}}/>
                <span>{file.folderName}</span>
            </div>
            <ul>
                {file.contents.map((f) => {
                    return this.renderFileOrFolder(base + '/' + file.folderName, f);
                })}
            </ul>
        </li>;
    }

    showMobileMask = () => {
        this.setState({showMask: true});
    }

    hideMobileMask = () => {
        this.setState({showMask: false});
    }

    mobileRenderFileOrFolder = (base: string, file: string | ProjectFolder) => {
        if (typeof file === 'string') {
            return <a href={urlFor('project_file/') + this.props.project + base + '/' + file}
                      key={base + '/' + file} onClick={this.onFileItemClick}>
                <li className="FileItem">
                    {base + '/' + file}
                </li>
            </a>;
        }
        return <li key={base + '/' + file.folderName} className="FolderItem">
            <ul>
                {file.contents.map(f => {
                    return this.mobileRenderFileOrFolder(base + '/' + file.folderName, f);
                })}
            </ul>
        </li>;
    }

    render() {
        console.log(this.props.projectFiles);
        if (this.props.isLargeScreen) {
            return (
                <nav className="DocumentCatalogueContainer">
                    <header className="DocumentCatalogueHeader">
                        <div style={{width: 'fit-content'}}>
                            <Link to="../" className="CloseProjectLink"><FontAwesomeIcon
                                icon={faAngleLeft}/></Link>
                        </div>
                        <div>{this.props.project}</div>
                    </header>
                    <div className="DocumentCatalogueBody">
                        <ul className="DocumentCatalogueTopFolder">
                            {this.props.projectFiles.map(f => {
                                return this.renderFileOrFolder('', f);
                            })}
                        </ul>
                    </div>
                </nav>
            );
        }
        return (
            <div className="MobileCatalogueContainer">
                <div style={{wordBreak: 'keep-all'}}>当前文件：</div>
                <div className="MobileCatalogueChangeButton"
                     onClick={this.showMobileMask}>
                    {this.props.currentFile}
                </div>
                {
                    this.state.showMask
                        ? <div className="MobileMask" onClick={this.hideMobileMask}>
                            <ul className="MobileFileList">
                                {
                                    this.props.projectFiles.map(f => {
                                        return this.mobileRenderFileOrFolder('', f);
                                    })
                                }
                            </ul>
                        </div>
                        : null
                }
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
        fetch(urlFor('projectDoc/') + this.props.project, {
            mode: 'cors',
            credentials: 'include'
        }).then(res => res.json()).then(json => {
            this.props.updateProjectFiles(json as Array<string | ProjectFolder>);
        });
        this.state = {fileContent: '欢迎使用kaixadoc', fileType: 'markdown', filename: 'welcome'};
    }

    openProjectFile = (content: string, type: string, name: string) => {
        this.setState({fileContent: content, fileType: type, filename: name});
    }


    render() {
        return (
            <div className="ProjectReaderContainer">
                <DocumentCatalogue project={this.props.project}
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