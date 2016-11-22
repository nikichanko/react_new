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
            <div className="wrapper">
                <Header/>
                <PageContent/>
                <Footer/>
            </div>
        );
    }
}
