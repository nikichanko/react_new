import React from "react";
const path = require('path');

export default class Menu extends React.Component{
    constructor(props){
        super(props);
    }

    buildExtraMenu(){
        const exptra_menu = this.props.extraMenu || [];
        const sub_menu = function(m){
            var submenu;
            if(m.submenu !== undefined && m.submenu.length){
                submenu = m.submenu.map(function(sm){
                    return (
                        <li key={sm.label}>
                            <a href={path.join(__dirname, sm.href)}>{sm.label}</a>
                        </li>
                    );
                });
                submenu = (<ul>{submenu}</ul>);
            }
            return submenu;
        }
        return exptra_menu.map(function(m){
            return (
                <li key={m.label}>
                    <a href={path.join(__dirname, m.href)}>{m.label}</a>
                    {sub_menu(m)}
                </li>
            );
        });
    }

    render(){
        return (
            <nav>
                <ul>
                    <li key="index.html">
                        <a href={path.join(__dirname, "index.html")}>Home</a>
                    </li>
                    {this.buildExtraMenu()}
                </ul> 
            </nav>
        );
    }
}
