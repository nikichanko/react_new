import React from "react";

import Form from "./Form";
import constants from "../../globals";

export default class LoginForm extends React.Component{
    render(){
        return (
                <Form action="http://localhost:8080/json.json" method="get" use_xml="true" className="loginForm"
                        onCompleteXmlSubmit={function(response){
                            console.log('rrr', response);
                        }}
                        fields={[
                                {id: "username", type: 'text', name: 'username', placeholder:'username', validation_regex: constants.regex.username, validation_error:'not valid username', value:''},
                                {id: "rights", type: 'checkbox', name: 'rights', label: 'condidtions?', validation_error:'need to enable', isChecked: false},
                                {id: "t1", type: 'textarea', name: 't1', validation_regex: constants.regex.password, validation_error:'not valid t1', value:''},
                                {id: "selec1", type: 'select', name: 'selec1', value:'2mi', validation_error:'not selec1 select',
                                    options: [
                                                {"text": "op1", "value": "1mi"},
                                                {"text": "op2", "value": "2mi"},
                                                {"text": "op3", "value": "3mi"},
                                            ]
                                },
                                {id: "genter1", type: 'radio', name: 'genter', label: 'Male',value: "male" ,isChecked: false, groupname: "Sex",validation_error:'need to enable'},
                                {id: "genter2", type: 'radio', name: 'genter', label: 'female',value: "female", isChecked: false, groupname: "Sex",validation_error:'need to enable'},
                                {id: "genter3", type: 'radio', name: 'genter', label: 'other',value: "other", isChecked: false, groupname: "Sex", validation_error:'need to enable'},

                                {id: "radio_test", type: 'radio', name: 'radio_test', label: 'radio_test',value: "radio_test", isChecked: false, validation_error:'need to enable222'},
                                {id: "submit", type: 'submit', name: 'submit_form', value:'Submit'}
                        ]}
                />
        );
    }
}

