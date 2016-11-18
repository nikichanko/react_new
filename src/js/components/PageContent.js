import React from "react";

import LonginForm from "./Form/LoginForm";

export default class PageContent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={this.props.className}>
                <LonginForm />
            </div>
        );
    }
}