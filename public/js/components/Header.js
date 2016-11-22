import React from "react";

import constants from "../constants";

import Menu from "./Menu/Menu";
import LonginForm from "./Form/LoginForm";
import LoggedUser from "./Logged/LoggedUser";

export default class Header extends React.Component{
    render(){
        return (
            <header className="header">
                <Menu extraMenu={constants.extraMenu}/>
                {constants.logged ? <LoggedUser loggedInfo={constants.logged} /> : <LonginForm />}          
            </header>
        );
    }
}
