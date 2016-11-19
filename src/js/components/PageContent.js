import React from "react";

import IndexPage from "./Pages/IndexPage"; // page_id = 11 index.html
import ErrorPage from "./Pages/ErrorPage"; // page_id = undefined

import constants from "../constants";

export default class PageContent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let pageContent;
        switch(this.props.page_id){
            //index page
            case constants.pages.index : 
                pageContent = (<IndexPage />);
                break;
            default:
                pageContent = (<ErrorPage />);
                break;
        }
        return pageContent;
    }
}