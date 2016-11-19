import React from "react";

import Menu from "./Menu/Menu";
import LonginForm from "./Form/LoginForm";
import LoggedUser from "./Logged/LoggedUser";


export default class Header extends React.Component{
    render(){
        return (
            <header className="header">
                <Menu extraMenu={window.extra_menu} />
                {window.login_info ? <LoggedUser loggedInfo={window.login_info} /> : <LonginForm />}

                
            </header>
        );
    }
}
