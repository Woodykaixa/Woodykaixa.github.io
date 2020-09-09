import React from 'react';
import marked from 'marked';
import {highlightAuto} from 'highlight.js';
import {sanitize} from 'dompurify';
import 'highlight.js/styles/atom-one-light.css';
import './DocumentReader.css';

interface MarkdownReaderProps {
    file: string
}

interface MarkdownReaderState {
    fileContent: string
}

export class DocumentReader extends React.Component<MarkdownReaderProps, MarkdownReaderState> {

    private filepath: string;

    constructor(props: MarkdownReaderProps) {
        super(props);
        console.log(this.props);
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
                {content}
            </div>
        );
    }
}