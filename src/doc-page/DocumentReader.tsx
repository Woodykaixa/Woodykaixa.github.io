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

export interface ProjectFolder {
    folderName: string
    contents: Array<string | ProjectFolder>
}

interface DocumentCatalogueProps {
    project: string,
    projectFiles: Array<string | ProjectFolder>
}

interface DocumentCatalogueState {

}

class DocumentCatalogue extends React.Component<DocumentCatalogueProps, DocumentCatalogueState> {

    renderFileOrFolder = (file: string | ProjectFolder) => {
        if (typeof file === 'string') {
            return <li className='FileItem' key={file}>
                <FontAwesomeIcon icon={faFileAlt} style={{marginRight: 10, color: '#adc1e4'}}/>
                {file}
            </li>;
        }
        return <li className='FolderItem' key={file.folderName}>
            <div>
                <FontAwesomeIcon icon={faFolder} color='#f9d870' style={{marginRight: 10}}/>
                {file.folderName}
            </div>
            <ul>
                {file.contents.map(this.renderFileOrFolder)}
            </ul>
        </li>;
    }

    render() {
        console.log(this.props.projectFiles);
        return (
            <nav className="DocumentCatalogueContainer">
                <header className="DocumentCatalogueHeader">{this.props.project}</header>
                <ul className="DocumentCatalogueTopFolder">
                    {this.props.projectFiles.map(this.renderFileOrFolder)}
                </ul>
            </nav>
        );
    }
}


interface ProjectReaderProps {
    project: string,
    files: Array<string | ProjectFolder>,
    updateProjectFiles: (files: Array<string | ProjectFolder>) => void

}

export class ProjectReader extends React.Component<ProjectReaderProps, any> {

    constructor(props: ProjectReaderProps) {
        super(props);
        fetch("http://127.0.0.1:5000/projectDoc/" + this.props.project, {
            mode: 'cors',
            credentials: 'include'
        }).then(res => res.json()).then(json => {
            this.props.updateProjectFiles(json as Array<string | ProjectFolder>);
        });
    }


    render() {
        return (
            <div className="DocumentReaderContainer">
                <DocumentCatalogue project={this.props.project}
                                   projectFiles={this.props.files}/>
                <FileReader file="test.md"/>
            </div>
        );
    }
}


interface FileReaderProps {
    file: string
}

interface FileReaderState {
    fileContent: string
}

class FileReader extends React.Component<FileReaderProps, FileReaderState> {

    private filepath: string;

    constructor(props: FileReaderProps) {
        super(props);
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: (code) => highlightAuto(code).value,
            gfm: true, // 允许 GitHub标准的markdown.
            pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
            breaks: false, // 允许回车换行（该选项要求 gfm 为true）
            smartLists: true, // 使用比原生markdown更时髦的列表
            smartypants: false, // 使用更为时髦的标点
        });
        this.filepath = process.env.PUBLIC_URL + '/' + this.props.file;
        this.state = {fileContent: ''};
    }

    componentDidMount() {
        this.loadMarkdown();
    }

    loadMarkdown = () => {
        fetch(this.filepath).then(res => res.text()).then(res => {
            if (this.props.file.endsWith('.md')) {
                this.setState({fileContent: marked(res)});
            } else {
                this.setState({fileContent: res});
            }
        });
    }


    render() {
        const content = this.props.file.endsWith('.md') ?
            <div className="MarkdownContent"
                 dangerouslySetInnerHTML={{__html: sanitize(this.state.fileContent)}}/>
            : <div className="MarkdownContent">
                {this.state.fileContent.split('\n').map((str, line) =>
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