import React from "react";

const path = require('path');

export default class LoggedUser extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="logged-user">
                <span>{this.props.loggedInfo.username}</span>
                <a href={path.join(__dirname, this.props.loggedInfo.profilepage)}>profile</a>
                {this.props.loggedInfo.hasOwnProperty('avatar') && <img src={this.props.loggedInfo.avatar} alt={this.props.loggedInfo.username}/>}
            </div>
        );
    }
}