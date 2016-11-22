import React from "react";

import constants from "../constants";

import IndexPage from "./Pages/IndexPage"; // page_id = 11 index.html
import CartPage from "./Pages/CartPage";   // page_id = 12 cart.html
import ShopPage from "./Pages/ShopPage";   // page_id = 13 shop.html
import ErrorPage from "./Pages/ErrorPage"; // page_id = undefined

import func from "../globalFunctions";

export default class PageContent extends React.Component{
    render(){
        let pageContent;
        const extraContent = constants.extra_page_content;
        const component_props = constants.component_props;
        switch(constants.current_page){
            case '2':
                pageContent = (<ErrorPage {...component_props} extraContent={extraContent}/>);
                break;
            //index page
            case '11' : 
                pageContent = (<IndexPage {...component_props} extraContent={extraContent}/>);
                break;
            //cart page
            case '12' : 
                pageContent = (<CartPage {...component_props} extraContent={extraContent}/>);
                break;
            //shop page
            case '13' :
                pageContent = (<ShopPage {...component_props} extraContent={extraContent}/>);
                break;
            //error page
            default:
                pageContent = (<ErrorPage {...component_props} extraContent={extraContent}/>);
                break;
        }
        return pageContent;
    }
}