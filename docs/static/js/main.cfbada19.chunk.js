(this.webpackJsonpkaixa_website=this.webpackJsonpkaixa_website||[]).push([[0],{265:function(e,t,a){},266:function(e,t,a){},267:function(e,t,a){},277:function(e,t,a){},279:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(25),o=a.n(s),i=(a(44),a(8)),c=a.n(i),l=a(15),u=a(2),p=a(3),h=a(5),m=a(4),d=(a(46),a(47),a(14)),g=a(12),f=a(11),v=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){return r.a.createElement("li",{className:this.props.isLargeScreen?"NavItem":"NarrowNavItem"},r.a.createElement("h3",null,r.a.createElement(d.b,{to:this.props.link},this.props.name)))}}]),a}(r.a.Component),E=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).tryLogout=Object(l.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.props.requestLogout();case 2:if(!t.sent){t.next=4;break}alert("failed to logout");case 4:case"end":return t.stop()}}),t)}))),e}return Object(p.a)(a,[{key:"render",value:function(){var e;return e=this.props.loggedIn?r.a.createElement("button",{className:"UserInfoLoginButton",onClick:this.tryLogout},"\u9000\u51fa\u767b\u5f55"):r.a.createElement("button",{className:"UserInfoLoginButton",onClick:this.props.openLoginModal},"\u767b\u5f55/\u6ce8\u518c"),r.a.createElement("ul",{className:"UserInfo"},r.a.createElement("li",null,e))}}]),a}(r.a.Component),b=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).RightSideNarBarRef=void 0,n.closeSelf=function(){n.RightSideNarBarRef.current.classList.add("RightSideNavBarLeave"),setTimeout((function(){var e=n.RightSideNarBarRef.current;n.props.closeRightSideNavContent(),e.classList.remove("RightSideNavBarLeave")}),400)},n.RightSideNarBarRef=r.a.createRef(),n}return Object(p.a)(a,[{key:"componentDidMount",value:function(){var e=this;setTimeout((function(){e.RightSideNarBarRef.current.classList.remove("RightSideNavBarEnter")}),400)}},{key:"render",value:function(){return r.a.createElement("div",{className:"RightSideBarMask",onClick:this.closeSelf},r.a.createElement("div",{className:"RightSideBarContainer RightSideNavBarEnter",ref:this.RightSideNarBarRef},this.props.loggedIn?r.a.createElement("div",null,r.a.createElement("div",{className:"RightSideUsername"},"\u4f60\u597d, "+this.props.username),r.a.createElement("div",{className:"SplitLine"})):null,r.a.createElement("ul",{className:"RightSideBarItemContainer"},this.props.navItems.map((function(e,t){return r.a.createElement("li",{key:t},r.a.createElement(d.b,{to:e.link}," ",e.name))}))),r.a.createElement("div",{className:"SplitLine"}),r.a.createElement("div",{className:"RightSideOperationBox"},this.props.loggedIn?r.a.createElement("button",{className:"RightSideLogout",onClick:this.props.requestLogout},"\u9000\u51fa\u767b\u5f55"):r.a.createElement("button",{className:"RightSideLogin",onClick:this.props.openLoginModal},"\u767b\u5f55/\u6ce8\u518c"))))}}]),a}(r.a.Component),j=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).onToggleButtonClick=function(){var e=!n.state.showRightSideNavBarContent;n.setState({showRightSideNavBarContent:e})},n.closeRightSideBar=function(){n.setState({showRightSideNavBarContent:!1})},n.state={showRightSideNavBarContent:!1},n}return Object(p.a)(a,[{key:"render",value:function(){var e,t=this,a=this.props.isLargeScreen?null:r.a.createElement("button",{className:"ToggleButton",onClick:this.onToggleButtonClick},r.a.createElement(g.a,{icon:f.g,style:{width:20,height:20,color:"white"}}));return this.props.isLargeScreen?e=r.a.createElement("div",{className:"NavBarContentContainer"},r.a.createElement("ul",{className:"NavBarSiteItemContainer"},this.props.items.map((function(e,a){return r.a.createElement(v,{name:e.name,link:e.link,key:a,screenWidth:t.props.screenWidth,isLargeScreen:t.props.isLargeScreen})}))),r.a.createElement(E,{loggedIn:this.props.loggedIn,openLoginModal:this.props.openLoginModal,requestLogout:this.props.requestLogout})):this.state.showRightSideNavBarContent&&(e=r.a.createElement(b,{closeRightSideNavContent:this.closeRightSideBar,navItems:this.props.items,username:this.props.username,loggedIn:this.props.loggedIn,requestLogout:this.props.requestLogout,openLoginModal:this.props.openLoginModal})),r.a.createElement("div",{className:"NavBarContainer"},r.a.createElement("div",{className:"NavBarMain"},r.a.createElement("div",{className:"Title"},this.props.title),this.props.isLargeScreen?e:a),this.props.isLargeScreen?null:e)}}]),a}(r.a.Component),w=(a(54),function(e){return e.startsWith("/")?"https://www.kaixa.cn"+e:"https://www.kaixa.cn/"+e});function S(e){return e>768}var y=function(e,t,a){var n={method:t,mode:"cors",credentials:"include",referrerPolicy:"no-referrer-when-downgrade"};return null!==a&&(n.body=a),fetch(w(e),n)},k=a(20),N=(a(55),function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).canvas=void 0,n.drawCircle=function(e,t,a,n,r){e.fillStyle="rgba(0, 0, 0, "+r+")",e.beginPath(),e.arc(t,a,n,0,2*Math.PI),e.fill(),e.closePath()},n.canvas=r.a.createRef(),n}return Object(p.a)(a,[{key:"componentDidMount",value:function(){for(var e=this.canvas.current.getContext("2d"),t=1;t<10;t++)this.drawCircle(e,80+40*Math.cos(t*Math.PI/5),80+40*Math.sin(t*Math.PI/5),8,.1*t)}},{key:"render",value:function(){return r.a.createElement("div",{className:"LoadingContainer FullPage"},r.a.createElement("canvas",{className:"LoadingSpin",ref:this.canvas,width:"160",height:"160"}),r.a.createElement("div",null,"Loading. Please Wait..."))}}]),a}(r.a.Component)),L=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){var e=this.props.title;return this.props.language&&(e+=" (".concat(this.props.language,")")),r.a.createElement("div",{className:"RepoTagContainer"},r.a.createElement("a",{href:this.props.link},r.a.createElement("h3",null,e)),r.a.createElement("p",null,this.props.description),r.a.createElement("div",{className:"RepoTagInfoContainer"},r.a.createElement("span",{style:{width:10}}),r.a.createElement("span",null,r.a.createElement("p",null,"stars: ",this.props.star)),r.a.createElement("span",{style:{width:20}}),r.a.createElement("span",null,r.a.createElement("p",null,"forks: ",this.props.fork))))}}]),a}(r.a.Component),C=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={name:"",company:"",github:"",blog:"",location:"",repos:[],fetching:!0,fetchSuccess:!1,loginName:"",followers:0,following:0,repoCount:0,bio:""},n}return Object(p.a)(a,[{key:"componentDidMount",value:function(){var e=this;y("admin_profile","GET").then((function(e){if(e.ok)return e.json();throw new Error("".concat(e.status,": ").concat(e.statusText))})).then((function(t){if(t.err)throw e.setState({fetching:!1,fetchSuccess:!1}),new Error(t.data);var a=t.data;e.setState({fetchSuccess:!0,fetching:!1,name:a.name,company:a.company,github:a.github,location:a.location,blog:a.blog,bio:a.bio,loginName:a.loginName,following:a.following,followers:a.followers,repoCount:a.repoCount}),a.repos.sort((function(e,t){return t.star-e.star})),e.setState({repos:a.repos})}))}},{key:"render",value:function(){var e=this;return this.state.fetching?r.a.createElement(N,null):this.state.fetchSuccess?r.a.createElement("div",null,r.a.createElement("div",{className:"IndexPageInfoContainer"},r.a.createElement("div",{className:"IndexPageInfo"},r.a.createElement("div",{className:"IndexPageAvatarBox"},r.a.createElement("img",{alt:"avatar",src:"https://avatars1.githubusercontent.com/u/22990333?s=460&u=ab4f382b52aae8a47f29de660ed2b4551e8b1d72&v=4"})),r.a.createElement("div",{className:"IndexPageInfoBox"},r.a.createElement("h1",{className:"IndexPageLoginNameBox"},this.state.loginName),r.a.createElement("div",{className:"IndexPageCompanyBox"},r.a.createElement(g.a,{icon:k.a,style:{width:16,marginRight:5}}),this.state.company),r.a.createElement("div",{className:"IndexPageBlogBox"},r.a.createElement(g.a,{icon:f.f,style:{width:16,marginRight:5}}),this.state.blog),r.a.createElement("div",{className:"IndexPageLinkBox"},r.a.createElement(g.a,{icon:f.b,style:{width:16,marginRight:5}}),r.a.createElement("a",{href:this.state.github},this.state.github)),r.a.createElement("div",{className:"IndexPageLocationBox"},r.a.createElement(g.a,{icon:f.h,style:{width:16,marginRight:5}}),this.state.location)))),r.a.createElement("div",{className:"IndexPageContainer"},r.a.createElement("h3",{className:"ParaTitle"},"\u6211\u7684\u7edf\u8ba1\u4fe1\u606f"),r.a.createElement("div",{className:"IndexPageProfBox"},r.a.createElement("div",null,r.a.createElement("img",{style:{maxWidth:"100%"},src:"https://github-readme-stats.vercel.app/api?username=Woodykaixa&show_icons=true",alt:"My stats"})),r.a.createElement("div",null,r.a.createElement("img",{style:{maxWidth:"100%"},src:"https://github-readme-stats.vercel.app/api/top-langs/?username=Woodykaixa&layout=compact&hide=html&card_width=439.94",alt:"My favorite languages"}))),r.a.createElement("div",{className:"SplitLine"}),r.a.createElement("h3",{className:"ParaTitle"},"\u6211\u7684\u4ee3\u7801"),r.a.createElement("ul",{className:"IndexPageRepoList"},this.state.repos.map((function(t,a){return r.a.createElement("li",{key:a},r.a.createElement(L,{title:t.title,link:t.link,description:t.description,fork:t.fork,star:t.star,language:t.language,isLargeScreen:e.props.isLargeScreen,screenWidth:e.props.screenWidth,isForked:t.isForked}))}))),r.a.createElement("h3",{className:"ParaTitle"},"\u5173\u4e8e\u672c\u7ad9"),r.a.createElement("div",{className:"AboutSiteBlock"},r.a.createElement("p",null,"\u6b22\u8fce\u6765\u5230\u5361\u590f\u5999\u5999\u5c4b\u3002"),r.a.createElement("p",null,"\u8fd9\u91cc\u662f\u6211\u7684\u4e2a\u4eba\u7f51\u7ad9\uff0c\u4e5f\u662f\u6211\u7684\u7f51\u9875\u5236\u4f5c\u5927\u4f5c\u4e1a\u3002",r.a.createElement("b",null,"\u5173\u4e8e"),"\u9875\u9762\u5c55\u793a\u4e2a\u4eba\u4fe1\u606f\u4ee5\u53ca\u7f51\u7ad9\u4fe1\u606f\uff1b",r.a.createElement("b",null,"\u6587\u6863"),"\u9875\u9762\u53ef\u4ee5\u7528\u4e8e\u5c55\u793a\u6211\u81ea\u5df1\u53c2\u4e0e\u7684\u9879\u76ee\u6587\u6863\uff0c\u6ce8\u518c\u7528\u6237\u6839\u636e\u81ea\u5df1\u7684\u6743\u9650\u8bbf\u95ee\u76f8\u5e94\u7684\u6587\u6863\uff0c\u540c\u65f6\u8fd8\u6709\u4e00\u4e2a\u516c\u5f00\u6587\u6863\u4f5c\u4e3a\u535a\u5ba2\u4f7f\u7528\uff1b",r.a.createElement("b",null,"\u5de5\u5177"),"\u9875\u9762\u662f\u4e00\u4e9b\u5c0f\u5de5\u5177\uff0c\u4f9b\u90e8\u5206\u4eba\u4f7f\u7528\u3002"),r.a.createElement("p",null,"\u672c\u9875\u9762\u7684\u5236\u4f5c\u4f7f\u7528\u4e86\u5982\u4e0b\u7ec4\u4ef6\uff1aReact\u3001React-Router\u3001React-Modal\u3001React-Cookies\u3001FontAwesome\u3002 \u540c\u65f6\uff0c\u7f51\u9875\u98ce\u683c\u53c2\u8003\u4e86Material Design\uff0c\u5e76\u4f7f\u7528",r.a.createElement("a",{href:"https://github.com/anuraghazra/github-readme-stats"},"github-readme-stats"),"\u751f\u6210\u7edf\u8ba1\u4fe1\u606f\u3002"),r.a.createElement("p",{style:{marginTop:20,textAlign:"right",paddingRight:10}},r.a.createElement("small",null,"Copyright \xa92020 Woodykaixa. All rights reserved."))))):r.a.createElement("div",{className:"ErrorMessage FullPage"},"Failed in fetching my_profile. Please try refresh or",r.a.createElement("a",{href:"mailto:690750353@qq.com"}," contact with me"))}}]),a}(r.a.Component),O=a(18),x=a.n(O),F=a(38),I=a(21);a(264),a(265);x.a.setOptions({renderer:new x.a.Renderer,highlight:function(e){return Object(F.highlightAuto)(e).value},gfm:!0,pedantic:!1,breaks:!1,smartLists:!0,smartypants:!1});var P=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){return r.a.createElement("li",{className:"FileItem"},r.a.createElement("a",{href:w("/doc/")+this.props.project+this.props.basePath+"/"+this.props.filename,onClick:this.props.onFileItemClick,key:this.props.basePath+"/"+this.props.filename},r.a.createElement("div",{style:{paddingLeft:20*this.props.indent+10}},r.a.createElement(g.a,{icon:k.b,style:{marginRight:10,color:"#adc1e4",width:20,height:20}}),this.props.filename)))}}]),a}(r.a.Component),R=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).swapExpandingState=function(){n.state.expanded?n.setState({expanded:!1}):n.setState({expanded:!0})},n.state={expanded:!1},n}return Object(p.a)(a,[{key:"render",value:function(){var e=this,t=this.props.basePath+"/"+this.props.folderName;return r.a.createElement("li",{className:"FolderItem",style:{paddingLeft:20*this.props.indent}},r.a.createElement("div",null,r.a.createElement(g.a,{icon:this.state.expanded?f.e:f.d,color:"#f9d870",style:{marginRight:10,width:20,height:20,cursor:"pointer"},onClick:this.swapExpandingState}),r.a.createElement("span",null,this.props.folderName)),this.state.expanded?r.a.createElement("ul",null,this.props.contents.map((function(n){return"string"===typeof n?r.a.createElement(P,{project:e.props.project,onFileItemClick:e.props.onFileItemClick,filename:n,basePath:t,indent:e.props.indent+1}):r.a.createElement(a,{project:e.props.project,folderName:n.folderName,basePath:t,contents:n.contents,onFileItemClick:e.props.onFileItemClick,indent:e.props.indent+1})}))):null)}}]),a}(r.a.Component),B=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).DropList=void 0,n.switchStatus=function(){if(n.state.expanded){var e=n.DropList.current;e.classList.remove("SelectorExpand"),e.classList.add("SelectorHide"),setTimeout((function(){n.setState({expanded:!1})}),300)}else n.setState({expanded:!0})},n.selectFile=function(e){e.preventDefault(),n.switchStatus(),n.props.fileSelected(e.target.href)},n.state={expanded:!1},n.DropList=r.a.createRef(),n}return Object(p.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"SelectorMain"},r.a.createElement("div",{className:"SelectedItem"},this.props.current,this.state.expanded?r.a.createElement("div",{className:"SelectorDropList SelectorExpand ",ref:this.DropList},this.props.files.map((function(t,a){return r.a.createElement("a",{onClick:e.selectFile,key:a,href:w("/doc/")+e.props.project+t},t)}))):null),r.a.createElement("button",{className:"SelectionButton",onClick:this.switchStatus},r.a.createElement(g.a,{icon:f.c})))}}]),a}(r.a.Component),M=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).fetchFileContent=function(e){return fetch(e,{method:"POST",credentials:"include",mode:"cors"}).then((function(e){if(e.ok)return e.json();throw new Error(e.statusText)}))},n.onFileItemClick=function(e){e.preventDefault();var t=e.nativeEvent.target.parentElement.href,a=".md"===t.substring(t.length-3)?"markdown":"text",r=t.substr(t.lastIndexOf("/")+1);n.fetchFileContent(t).then((function(e){if(e.err)n.props.openProjectFile("error:\n"+e.data,"text",r);else{var t="markdown"===a?Object(I.sanitize)(x()(e.data)):e.data;n.props.openProjectFile(t,a,r)}})).catch((function(){n.props.openProjectFile("failed to fetch:"+t,"text",r)}))},n.selectFileInMobileSelector=function(e){var t=".md"===e.substring(e.length-3)?"markdown":"text",a=e.substring(e.lastIndexOf("/"));n.fetchFileContent(e).then((function(e){if(e.err)n.props.openProjectFile("error:\n"+e.data,"text",a);else{var r="markdown"===t?Object(I.sanitize)(x()(e.data)):e.data;n.props.openProjectFile(r,t,a)}})).catch((function(){n.props.openProjectFile("failed to fetch:"+e,"text",a)}))},n.iterFile=function(){var e=[];return n.props.projectFiles.forEach((function(t){!function t(a,n){"string"===typeof n?e.push(a+"/"+n):n.contents.forEach((function(e){t(a+"/"+n.folderName,e)}))}("",t)})),e},n.state={showMask:!1},n}return Object(p.a)(a,[{key:"render",value:function(){var e=this;return console.log(this.props.projectFiles),this.props.isLargeScreen?r.a.createElement("nav",{className:"DocumentCatalogueContainer"},r.a.createElement("header",{className:"DocumentCatalogueHeader"},r.a.createElement("div",null,this.props.project)),r.a.createElement("div",{className:"DocumentCatalogueBody"},r.a.createElement("ul",{className:"DocumentCatalogueTopFolder"},r.a.createElement("li",{className:"FileItem"},r.a.createElement("div",null,r.a.createElement(d.b,{to:"../",className:"CloseProjectLink"},r.a.createElement(g.a,{icon:f.a,style:{width:20,height:20}})),"\u8fd4\u56de")),this.props.projectFiles.map((function(t){return"string"===typeof t?r.a.createElement(P,{filename:t,project:e.props.project,basePath:"",onFileItemClick:e.onFileItemClick,indent:0}):r.a.createElement(R,{folderName:t.folderName,project:e.props.project,basePath:"",contents:t.contents,onFileItemClick:e.onFileItemClick,indent:0})}))))):r.a.createElement("div",{className:"MobileCatalogueContainer"},r.a.createElement("div",{style:{wordBreak:"keep-all"}},"\u5f53\u524d\u6587\u4ef6\uff1a"),r.a.createElement(B,{files:this.iterFile(),current:this.props.currentFile,project:this.props.project,fileSelected:this.selectFileInMobileSelector}))}}]),a}(r.a.Component),T=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){var e="markdown"===this.props.fileType?r.a.createElement("div",{className:"FileContent",dangerouslySetInnerHTML:{__html:Object(I.sanitize)(this.props.fileContent)}}):r.a.createElement("div",{className:"FileContent"},this.props.fileContent.split("\n").map((function(e,t){return r.a.createElement("div",{key:t,style:{fontSize:"large"}},e)})));return r.a.createElement("div",{className:"FileContainer"},r.a.createElement("ul",{className:"FileHeader"},r.a.createElement("li",{className:"FileTab"},this.props.filename)),r.a.createElement("div",{className:"FileBody"},e))}}]),a}(r.a.Component),W=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).openProjectFile=function(e,t,a){n.setState({fileContent:e,fileType:t,filename:decodeURIComponent(a)})},y("/doc/"+n.props.project,"GET").then((function(e){if(e.ok)return e.json();throw new Error(e.statusText)})).then((function(e){if(e.err)throw new Error(e.data);n.props.updateProjectFiles(e.data)})).catch((function(e){console.log(e),n.setState({fileContent:"".concat(e,": when opening project ").concat(n.props.project),filename:"Error"})})),n.state={fileContent:"\u6b22\u8fce\u4f7f\u7528kaixadoc",fileType:"markdown",filename:"welcome"},n}return Object(p.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"ProjectReaderContainer"},r.a.createElement(M,{project:this.props.project,description:this.props.description,projectFiles:this.props.files,currentFile:this.state.filename,openProjectFile:this.openProjectFile,screenWidth:this.props.screenWidth,isLargeScreen:this.props.isLargeScreen}),r.a.createElement(T,{fileContent:this.state.fileContent,fileType:this.state.fileType,filename:this.state.filename}))}}]),a}(r.a.Component),D=a(6),A=(a(266),function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"AccessibleProjectItem"},r.a.createElement("li",{className:"ProjectItemName"},r.a.createElement(d.b,{to:"/"+this.props.url},this.props.name),r.a.createElement("p",null,this.props.description)))}}]),a}(r.a.Component)),U=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"ProjectListContainer"},r.a.createElement("ul",{className:"ProjectList"},this.props.projects.map((function(e,t){return r.a.createElement(A,{name:e.name,url:e.url,description:e.description,key:t})}))),r.a.createElement("p",{style:{textAlign:"right"}},r.a.createElement("small",null," \u5982\u60f3\u83b7\u53d6\u66f4\u591a\u6587\u6863\u7684\u8bbf\u95ee\u6743\u9650\uff0c\u8bf7\u8054\u7cfb\u7ba1\u7406\u5458\u3002")))}}]),a}(r.a.Component),V=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).updateProjectFiles=function(e){n.setState({projectFiles:e})},n.state={projects:[],projectFiles:[],ProjectsQueried:!1},n}return Object(p.a)(a,[{key:"componentDidMount",value:function(){var e=this;y("/doc/","GET").then((function(e){if(e.ok)return e.json();throw new Error(e.statusText)})).then((function(t){if(t.err)throw new Error("Failed to fetch projects");e.setState({projects:t.data,ProjectsQueried:!0})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this;return this.state.ProjectsQueried?r.a.createElement("div",{className:"FullPage"},r.a.createElement(d.a,{basename:"/docs"},r.a.createElement(D.d,null,this.state.projects.map((function(t,a){return r.a.createElement(D.b,{key:a,path:"/"+t.url},r.a.createElement("div",{className:"DocPageContainer"},r.a.createElement(W,{project:t.name,files:e.state.projectFiles,updateProjectFiles:e.updateProjectFiles,screenWidth:e.props.screenWidth,isLargeScreen:e.props.isLargeScreen,description:t.description})))})),r.a.createElement(D.b,{path:"/"},r.a.createElement(U,{projects:this.state.projects}))))):r.a.createElement("div",null,"loading projects. please wait.")}}]),a}(r.a.Component),q=(a(267),function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).OnChange=function(t){var a=t.target;e.props.setValue(a.value)},e}return Object(p.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"ResponsiveInputBorder"},this.props.isLargeScreen?r.a.createElement("label",{className:"ResponsiveInputHint"},this.props.placeholder):null,r.a.createElement("input",{type:this.props.type?this.props.type:"text",name:this.props.name,value:this.props.value,placeholder:this.props.isLargeScreen?"":this.props.placeholder,autoComplete:"password"===this.props.type?"current-password":"on",onChange:this.OnChange}))}}]),a}(r.a.Component)),_=a(29),H=a.n(_),z={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)",padding:0,borderRadius:5}},G=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).onSubmit=function(){var e=Object(l.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,n.props.loginFunction();case 3:if(!e.sent){e.next=7;break}n.props.closeLoginModal(),e.next=8;break;case 7:alert("error");case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.onRegister=function(){var e=Object(l.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,n.props.registerFunction();case 3:if(!e.sent){e.next=10;break}return e.next=7,n.props.loginFunction();case 7:n.props.closeLoginModal(),e.next=11;break;case 10:console.log("register failed");case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.state={username:"",password:""},n}return Object(p.a)(a,[{key:"componentWillUnmount",value:function(){H.a.setAppElement(".App")}},{key:"render",value:function(){return r.a.createElement(H.a,{isOpen:this.props.loginModalOpen,style:z,shouldCloseOnOverlayClick:!0},r.a.createElement("form",{className:"LoginForm",onSubmit:this.onSubmit},r.a.createElement("button",{className:"LoginFormCloseButton",onClick:this.props.closeLoginModal},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:20,height:20},r.a.createElement("line",{x1:"3",y1:"3",x2:"17",y2:"17"}),r.a.createElement("line",{x1:"17",y1:"3",x2:"3",y2:"17"}))),r.a.createElement("h3",{className:"LoginFormTitle"},"\u767b\u5f55"),r.a.createElement(q,{name:"name",placeholder:"\u7528\u6237\u540d",screenWidth:this.props.screenWidth,isLargeScreen:this.props.isLargeScreen,value:this.props.username,setValue:this.props.nameChanged}),r.a.createElement(q,{type:"password",name:"pwd",placeholder:"\u5bc6 \u7801",screenWidth:this.props.screenWidth,isLargeScreen:this.props.isLargeScreen,value:this.props.password,setValue:this.props.pwdChanged}),r.a.createElement("div",{className:"LoginFormButtonArea"},r.a.createElement("div",null,r.a.createElement("button",{type:"submit",className:"SecondButton",onClick:this.onRegister},"\u6ce8\u518c")),r.a.createElement("div",null,r.a.createElement("button",{className:"MainButton",type:"submit"},"\u767b\u5f55")))))}}]),a}(r.a.Component),J=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){return this.props.loggedIn&&this.props.logoutFunction(),r.a.createElement(D.a,{to:"/login"})}}]),a}(r.a.Component),Q=(a(277),function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).query=function(e){e.preventDefault(),fetch(w("BjutSchedule"),{method:"POST",body:JSON.stringify({schoolId:n.state.sid,vpn:n.state.pwVPN,af:n.state.pwAF}),mode:"cors",credentials:"include"}).then((function(e){return e.text()})).then((function(e){console.log(e)}))},n.setSchoolId=function(e){n.setState({sid:e})},n.setAF=function(e){n.setState({pwAF:e})},n.setVPN=function(e){n.setState({pwVPN:e})},n.state={sid:"",pwAF:"",pwVPN:"",table:""},n}return Object(p.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{style:{paddingTop:"1rem"}},r.a.createElement("form",{onSubmit:this.query},r.a.createElement("h3",null,"\u8bfe\u8868\u67e5\u8be2"),r.a.createElement(q,{placeholder:"\u5b66\u53f7",name:"schoolId",screenWidth:this.props.screenWidth,isLargeScreen:this.props.isLargeScreen,value:this.state.sid,setValue:this.setSchoolId}),r.a.createElement(q,{placeholder:"\u6559\u52a1\u5bc6\u7801",name:"pwForAF",screenWidth:this.props.screenWidth,isLargeScreen:this.props.isLargeScreen,value:this.state.pwAF,setValue:this.setAF,type:"password"}),r.a.createElement(q,{placeholder:"\u7f51\u5173\u5bc6\u7801",name:"pwForVPN",screenWidth:this.props.screenWidth,isLargeScreen:this.props.isLargeScreen,value:this.state.pwVPN,setValue:this.setVPN,type:"password"}),r.a.createElement("button",null,"\u67e5\u8be2")),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.table}}))}}]),a}(r.a.Component)),$=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"FullPage"},r.a.createElement(Q,{screenWidth:this.props.screenWidth,isLargeScreen:this.props.isLargeScreen}))}}]),a}(r.a.Component),K=a(16),X=a.n(K),Y=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;Object(u.a)(this,a),(n=t.call(this,e)).setResponsiveStates=function(){var e=document.body.clientWidth;n.setState({width:e,height:document.body.clientHeight,isLargeScreen:S(e)})},n.userRegister=Object(l.a)(c.a.mark((function e(){var t,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=new FormData).append("username",n.state.username),t.append("password",n.state.password),a=!1,e.next=6,y("/auth/register","POST",t).then((function(e){if(e.ok)return e.json();throw new Error(e.statusText)})).then((function(e){if(e.err)throw new Error(e.data);a=!0})).catch((function(e){console.log(e)}));case 6:return e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)}))),n.userLogin=Object(l.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=new FormData).append("username",n.state.username),t.append("password",n.state.password),e.next=5,y("/auth/login","POST",t).then((function(e){if(e.ok)return e.json();throw new Error(e.statusText)})).then((function(e){if(e.err)throw new Error("".concat(e.err,": ").concat(e.data));if("welcome"!==e.data)throw new Error("Unknown error: "+e.data);n.setState({isLoggedInUser:!0});var t=new Date;t.setDate(t.getDate()+1),X.a.save("uname",n.state.username,{path:"/",expires:t})})).catch((function(e){console.log(e)}));case 5:return console.log(X.a.loadAll(!1)),e.abrupt("return",n.state.isLoggedInUser);case 7:case"end":return e.stop()}}),e)}))),n.userLogout=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y("/auth/logout","GET").then((function(e){if(e.ok)return e.json();throw new Error(e.statusText)})).then((function(){n.setState({isLoggedInUser:!1}),X.a.remove("uname")})).catch((function(e){console.log(e)}));case 2:return e.abrupt("return",n.state.isLoggedInUser);case 3:case"end":return e.stop()}}),e)}))),n.openLoginModal=function(){n.setState({showLoginModal:!0})},n.closeLoginModal=function(){n.setState({showLoginModal:!1})},n.passwordChanged=function(e){n.setState({password:e})},n.nameChanged=function(e){n.setState({username:e})};var r=document.body.clientWidth;n.state={navSites:[{name:"\u5173\u4e8e\u672c\u7ad9",link:"/"},{name:"\u6587\u6863",link:"/docs"},{name:"\u5de5\u5177",link:"/tools"}],isLoggedInUser:!1,width:r,height:document.body.clientHeight,isLargeScreen:S(r),showLoginModal:!1,username:"",password:""},window.onresize=n.setResponsiveStates;var s=X.a.load("uname"),o=new Date;return o.setDate(o.getDate()+1),y("/auth/whoami","GET").then((function(e){if(e.ok)return e.json();throw new Error(e.statusText)})).then((function(e){var t=e.data.username;null!==t&&s===t?(X.a.save("uname",t,{path:"/",expires:o}),n.setState({isLoggedInUser:!0,username:t})):X.a.remove("uname")})).catch((function(e){console.log("failed to fetch whoami: "+e),X.a.remove("uname")})),n}return Object(p.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(G,{loginFunction:this.userLogin,registerFunction:this.userRegister,screenWidth:this.state.width,username:this.state.username,password:this.state.password,isLargeScreen:this.state.isLargeScreen,loginModalOpen:this.state.showLoginModal,openLoginModal:this.openLoginModal,closeLoginModal:this.closeLoginModal,nameChanged:this.nameChanged,pwdChanged:this.passwordChanged}),r.a.createElement(d.a,null,r.a.createElement(j,{items:this.state.navSites,loggedIn:this.state.isLoggedInUser,username:this.state.username,title:"\u5361\u590f\u5999\u5999\u5c4b",screenWidth:this.state.width,isLargeScreen:this.state.isLargeScreen,openLoginModal:this.openLoginModal,requestLogout:this.userLogout}),r.a.createElement("div",{className:"MainContent"},r.a.createElement(D.d,null,r.a.createElement(D.b,{path:"/logout"},r.a.createElement(J,{loggedIn:this.state.isLoggedInUser,logoutFunction:this.userLogout})),r.a.createElement(D.b,{path:"/docs"},r.a.createElement(V,{loggedIn:this.state.isLoggedInUser,screenWidth:this.state.width,isLargeScreen:this.state.isLargeScreen})),r.a.createElement(D.b,{path:"/tools"},r.a.createElement($,{screenWidth:this.state.width,isLargeScreen:this.state.isLargeScreen})),r.a.createElement(D.b,{path:"/"},r.a.createElement(C,{screenWidth:this.state.width,isLargeScreen:this.state.isLargeScreen}))))))}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},39:function(e,t,a){e.exports=a(279)},44:function(e,t,a){},46:function(e,t,a){},47:function(e,t,a){},54:function(e,t,a){},55:function(e,t,a){}},[[39,1,2]]]);
//# sourceMappingURL=main.cfbada19.chunk.js.map