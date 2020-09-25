import React from 'react';
import marked from 'marked';
import {highlightAuto} from 'highlight.js';
import {sanitize} from 'dompurify';
import 'highlight.js/styles/atom-one-light.css';
import './DocumentReader.css';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolder} from '@fortawesome/free-solid-svg-icons';
import {faFileAlt} from '@fortawesome/free-regular-svg-icons';
import {urlFor} from "../common/env";

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

interface DocumentCatalogueProps {
    project: string,
    projectFiles: Array<string | ProjectFolder>,
    openProjectFile: (content: string, type: string) => void
}

interface DocumentCatalogueState {

}

class DocumentCatalogue extends React.Component<DocumentCatalogueProps, DocumentCatalogueState> {

    onFileItemClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.nativeEvent.target as HTMLAnchorElement;
        const fileType = target.href.endsWith('.md') ? 'markdown' : 'text';
        console.log(target.href + " is: " + fileType);
        fetch(target.href, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors'
        }).then(res => res.json()).then(json => {
            if (json.success) {
                const content = (fileType === 'markdown') ?
                    sanitize(marked(json.content)) : json.content;
                this.props.openProjectFile(content, fileType);
            } else {
                this.props.openProjectFile(json.err, 'text');
            }
        }).catch(() => {
            this.props.openProjectFile('failed to fetch:' + target.href, 'text');
        });
    }

    renderFileOrFolder = (base: string, file: string | ProjectFolder) => {
        if (typeof file === 'string') {
            return <li className='FileItem' key={file}>
                <a href={urlFor('project_file/') + this.props.project + base + '/' + file}
                   onClick={this.onFileItemClick}>
                    <FontAwesomeIcon icon={faFileAlt} style={{marginRight: 10, color: '#adc1e4'}}/>
                    {file}
                </a>
            </li>;
        }
        return <li className='FolderItem' key={file.folderName}>
            <div>
                <FontAwesomeIcon icon={faFolder} color='#f9d870' style={{marginRight: 10}}/>
                {file.folderName}
            </div>
            <ul>
                {file.contents.map((f) => {
                    return this.renderFileOrFolder(base + '/' + file.folderName, f);
                })}
            </ul>
        </li>;
    }

    render() {
        console.log(this.props.projectFiles);
        return (
            <nav className="DocumentCatalogueContainer">
                <header className="DocumentCatalogueHeader">{this.props.project}</header>
                <ul className="DocumentCatalogueTopFolder">
                    {this.props.projectFiles.map(f => {
                        return this.renderFileOrFolder('', f);
                    })}
                </ul>
            </nav>
        );
    }
}

interface FileReaderProps {
    fileContent: string,
    fileType: string
}

interface FileReaderState {

}

class FileReader extends React.Component<FileReaderProps, FileReaderState> {

    render() {
        const content = this.props.fileType === 'markdown' ?
            <div className="MarkdownContent"
                 dangerouslySetInnerHTML={{__html: sanitize(this.props.fileContent)}}/>
            : <div className="MarkdownContent">
                {this.props.fileContent.split('\n').map((str, line) =>
                    <div key={line}>{str}</div>)}
            </div>;
        return (
            <div className="MarkdownContainer">
                <Link to="../">back</Link>
                {content}
            </div>
        );
    }
}


interface ProjectReaderProps {
    project: string,
    files: Array<string | ProjectFolder>,
    updateProjectFiles: (files: Array<string | ProjectFolder>) => void
}

interface ProjectReaderState {
    fileContent: string,
    fileType: string
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
        this.state = {fileContent: '欢迎使用kaixadoc', fileType: 'markdown'};
    }

    openProjectFile = (content: string, type: string) => {
        this.setState({fileContent: content, fileType: type});
    }


    render() {
        return (
            <div className="DocumentReaderContainer">
                <DocumentCatalogue project={this.props.project}
                                   projectFiles={this.props.files}
                                   openProjectFile={this.openProjectFile}/>
                <FileReader fileContent={this.state.fileContent} fileType={this.state.fileType}/>
            </div>
        );
    }
}