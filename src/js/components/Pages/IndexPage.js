import React from "react";
import func from "../../globalFunctions";
import CartPage from "./CartPage";


export default class IndexPages extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="page-content">
                <CartPage {...this.props.component_props}/>
                {this.props.extraContent && <div dangerouslySetInnerHTML={func.createMarkup(this.props.extraContent)} />}
            </div>
        );
    }
}