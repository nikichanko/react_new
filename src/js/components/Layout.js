import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import PageContent from "./PageContent";

export default class Layout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={this.props.wraperClass}>
                <Header className={this.props.headerClass}/>
                <PageContent className={this.props.contentClass}/>
                <Footer className={this.props.footerClass}/>
            </div>
        );
    }
}
