import React from "react";

import Form from "./Form/Form";

export default class PageContent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={this.props.className}>
                <Form action="" method="post" use_ajax="true"
                        fields={[
                                {id: "email", type: 'text', name: 'email', placeholder:'email', validation_regex: '//g', validation_error:'not valid emial', value :""},
                                {id: "rights", type: 'radio', name: 'rights', label: 'Reights?', validation_regex:'//g', validation_error:'not valid rigths', value : ""},
                                {id: "t1", type: 'textarea', name: 't1', value :"test 1"}
                        ]}
                />
            </div>
        );
    }
}