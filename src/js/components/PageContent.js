import React from "react";

import constants from "../constants";
import IndexPage from "./Pages/IndexPage"; // page_id = 11 index.html
import ErrorPage from "./Pages/ErrorPage"; // page_id = undefined


export default class PageContent extends React.Component{
    render(){
        let pageContent;
        const current_page = constants.current_page || '2';
        const extraContent = constants.extra_page_content;
        const component_props   = constants.component_props || {};
        switch(current_page){
            //index page
            case '11' : 
                pageContent = (<IndexPage extraContent={extraContent} component_props={component_props}/>);
                break;
            default:
                pageContent = (<ErrorPage />);
                break;
        }
        return pageContent;
    }
}