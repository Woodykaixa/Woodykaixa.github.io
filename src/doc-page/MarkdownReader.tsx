import React from 'react';
import marked from 'marked';
import {highlightAuto} from 'highlight.js';
import {sanitize} from 'dompurify';
import 'highlight.js/styles/atom-one-light.css';
import './MarkdownReader.css';

interface MarkdownReaderState {
    url: string,
    md: string
}

export class MarkdownReader extends React.Component<any, MarkdownReaderState> {

    constructor(props: any) {
        super(props);
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: (code) => highlightAuto(code).value,
            gfm: true, // 允许 GitHub标准的markdown.
            pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
            // sanitize: true, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
            // tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
            breaks: false, // 允许回车换行（该选项要求 gfm 为true）
            smartLists: true, // 使用比原生markdown更时髦的列表
            smartypants: false, // 使用更为时髦的标点
        });
        this.state = {url: process.env.PUBLIC_URL + '/test.md', md: ''};
    }

    componentDidMount() {
        this.loadMarkdown();
    }

    loadMarkdown = () => {
        fetch(this.state.url).then(res => res.text()).then(res => {
            this.setState({md: marked(res)});
        });
    }


    render() {
        return (
            <div className="MarkdownContainer">
                <div className="markdown-content"
                     dangerouslySetInnerHTML={{__html: sanitize(this.state.md)}}>
                </div>
            </div>
        );
    }
}