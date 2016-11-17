import React from "react";

import Form from "./Form/Form";

export default class PageContent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={this.props.className}>
                <Form action="http://localhost:8080/json.json" method="get" use_xml="true"
                        onCompleteXmlSubmit={function(response){
                            console.log('rrr', response);
                        }}
                        fields={[
                                {id: "username", type: 'text', name: 'username', placeholder:'username', validation_regex: /^.{4,12}$/g, validation_error:'not valid username', value:''},
                                {id: "rights", type: 'checkbox', name: 'rights', label: 'Reights?', validation_error:'not valid rigths', isChecked: true},
                                {id: "t1", type: 'textarea', name: 't1', validation_regex: /^.{4,12}$/g, validation_error:'not valid t1', value:'dfdfdf'},
                                {id: "selec1", type: 'select', name: 'selec1', value:'2mi', 
                                    options: [
                                                {"text": "op1", "value": "1mi"},
                                                {"text": "op2", "value": "2mi"},
                                                {"text": "op3", "value": "3mi"},
                                            ]
                                },
                                {id: "genter1", type: 'radio', name: 'genter', label: 'Male',isChecked: false, groupname: "Sex"},
                                {id: "genter2", type: 'radio', name: 'genter', label: 'female',isChecked: false, groupname: "Sex"},
                                {id: "genter3", type: 'radio', name: 'genter', label: 'other',isChecked: false, groupname: "Sex"},
                                {id: "submit", type: 'submit', name: 'submit_form', value:'Submit'}
                        ]}
                />
            </div>
        );
    }
}