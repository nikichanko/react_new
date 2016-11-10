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
                                {id: "username", type: 'text', name: 'username', placeholder:'username', validation_regex: /^.{4,12}$/g, validation_error:'not valid username'},
                                {id: "rights", type: 'radio', name: 'rights', label: 'Reights?', validation_error:'not valid rigths'},
                                {id: "t1", type: 'textarea', name: 't1', validation_regex: /^.{4,12}$/g, validation_error:'not valid t1'},
                                {id: "submit", type: 'submit', name: 'submit_form'}
                        ]}
                />
            </div>
        );
    }
}