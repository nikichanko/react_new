import React from "react";
import func from "../../globalFunctions.js";

import '../../../css/form.css';
import formStore from "../../store/formStore";

export default class Form extends React.Component{
    constructor(props){
        super(props);

        this.state = {state_fields: this.props.fields.map(function(field){
            return {
                id: field.id, 
                className:'forminput', 
                classNameError: 'error_input', 
                value: field.value !== undefined ? field.value : (field.isChecked?'1':'0'), 
                isChecked: field.isChecked,
                validated: false
            }
        })};
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.groups = [];
    }
/*
    componentDidMount(){
        fetch('/api/serverTime').then(function(response){
            return response.json().then(function(json){
                console.log(json.time)
            })
        }).catch(function(response){
            console.log("error!");
        });
    }
*/

    onSubmit(event){
        const props_fields = this.props.fields;
        const state_fields = this.state.state_fields;
        let self = this;
        let not_validated_count = 0;
        let serialize_fields = [];
        state_fields.map(function(f, i){
            let validation_regex = props_fields[i].validation_regex;
            serialize_fields.push({
                name: props_fields[i].name,
                value: f.value
            })
            var field = self.getValidatedfield(f, validation_regex);
            if(!field.validated)
                not_validated_count++;
            return field;
        });
        this.setState({state_fields : state_fields});
        if(not_validated_count==0){
            if(this.props.use_xml){
                event.preventDefault();
                let xml = new func.xmlhttpRequest({
                    url: self.props.action,
                    type: self.props.method,
                    params: JSON.stringify(serialize_fields),
                    onCompleteRequest: function(response){
                        self.props.onCompleteXmlSubmit(response);
                    }
                });
                xml.doRequest();
            }
        }else{
            event.preventDefault();
        }
    }

    getValidatedfield(field, validation_regex) {
        if(validation_regex === undefined){
            field.validated = true;
            return field;
        }
        let classN = field.className.split(' ');
        let classNError = field.classNameError.split(' ');
        let pattern = new RegExp(validation_regex);
        let validated = pattern.test(field.value);
        if(!validated && classN.indexOf('notvalidated')===-1){
            classN.push('notvalidated');
        }
        else if(validated && classN.indexOf('notvalidated')!==-1){
            classN.splice(classN.indexOf('notvalidated'), 1);
        }

        if(!validated && classNError.indexOf('active')===-1){
            classNError.push('active');
        }
        else if(validated && classNError.indexOf('active')!==-1){
            classNError.splice(classNError.indexOf('active'), 1);
        }

        field.className = classN.join(' ');
        field.classNameError = classNError.join(' ');
        field.validated = validated;
        return field;
    }

    onChange(event) {

        const value = event.target.value;
        let field_id = event.target.id;
        let state_fields = this.state.state_fields;
        if(!this.refs.hasOwnProperty(field_id))
            return;
        let field = this.refs[field_id];
        let validation_regex = field.props.validation_regex;
        //this field has validation so DO it
        let self = this;
        console.log(state_fields);
        state_fields.map(function(f, i){
            if(f.id === field_id){
                f.isChecked = !f.isChecked;
                f.value = (field.props.type==='radio' || field.props.type==='checkbox')?(f.isChecked?'1':'0'):value;
                return self.getValidatedfield(f, validation_regex);
            }
        });
        this.setState({ state_fields : state_fields});
    }

    FromfieldsBuild(){
        const self = this;
        return self.props.fields.map(function(field, i){
            if(field.grouplabel !== undefined && self.groups.indexOf(field.grouplabel)===-1){
                self.groups.push(field.grouplabel);
            }
            if (field.type === 'textarea')
                return <Textarea key={field.id} id={field.id} name={field.name} 
                                    onChange={self.onChange} ref={field.id}
                                    validation_regex={field.hasOwnProperty('validation_regex')?field.validation_regex:''}
                                    className={self.state.state_fields[i].className}
                                    classNameError={self.state.state_fields[i].classNameError}
                                    errorValidation={field.validation_error}
                                    ref={field.id}
                                    value={self.state.state_fields[i].value}
                        />
            if (field.type === 'select')
                return <Select  key={field.id} id={field.id} name={field.name}
                                onChange={self.onChange} ref={field.id}
                                validation_regex={field.hasOwnProperty('validation_regex')?field.validation_regex:''}
                                className={self.state.state_fields[i].className}
                                classNameError={self.state.state_fields[i].classNameError}
                                errorValidation={field.validation_error}
                                ref={field.id}
                                value={self.state.state_fields[i].value}
                                options={field.options}
                        />
            else  
                return <Input key={field.id} id={field.id} type={field.type} name={field.name} placeholder={field.placeholder}
                        label={field.hasOwnProperty('label')?field.label:''}
                        validation_regex={field.hasOwnProperty('validation_regex')?field.validation_regex:''}
                        onChange={self.onChange}
                        isChecked={self.state.state_fields[i].isChecked}
                        className={self.state.state_fields[i].className}
                        classNameError={self.state.state_fields[i].classNameError}
                        errorValidation={field.validation_error}
                        ref={field.id}
                        value={self.state.state_fields[i].value}
                        grouplabel={field.grouplabel}
                    />
        });
    }

    render(){
        const fields1 = this.FromfieldsBuild();
        for(var i in this.groups){
            let fields_group = [];
            for(var j in fields1){
                if(fields1[j].props.grouplabel === this.groups[i]){
                  fields_group[j] = fields1[j];
                //  fields1 = fields1.splice(j,1);
                }
            }
           // if(j !== undefined){
            console.log(fields_group);
         //   }

        }
 const fields = this.FromfieldsBuild();
      //  console.log(fields);
        return(
           <form action={this.props.action} method={this.props.method} onSubmit={this.onSubmit}>
                {fields}
           </form>
        )
    }
}

class Select extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const options = this.props.options.map(function(option, i){
            return <Option {...option} key={option.text}/>
        });
        return(
            <div>
                <select id={this.props.id} onChange={this.props.onChange} className={this.props.className} value={this.props.value}>
                    {options}
                </select>
            </div>
        )
    }
}

class Option extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <option value={this.props.value}>{this.props.text}</option>
        )    
    }
}

class Textarea extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <textarea id={this.props.id} onChange={this.props.onChange} className={this.props.className} value={this.props.value}/>
                {this.props.validation_regex !== '' && (<div className={this.props.classNameError}>{this.props.errorValidation}</div>)}
            </div>
        )
    }
}

class Input extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} 
                onChange={this.props.onChange} className={this.props.className} placeholder={this.props.placeholder}
                checked={this.props.isChecked}/>
                {this.props.label !== '' && (<label for={this.props.id}>{this.props.label}</label>)}
                {this.props.validation_regex !== '' && (<div className={this.props.classNameError}>{this.props.errorValidation}</div>)}
            </div>
        )
    }
}