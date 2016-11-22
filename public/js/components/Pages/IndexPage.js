import React from "react";
import func from "../../globalFunctions";

export default class IndexPages extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="page-content">
                {this.props.extraContent && <div dangerouslySetInnerHTML={func.createMarkup(this.props.extraContent)} />}
            </div>
        );
    }
}