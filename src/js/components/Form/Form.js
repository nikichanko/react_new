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
                value: field.value, 
                isChecked: field.isChecked ? '1' : '0',
                name: field.name,
                validation_regex: (field.type === 'radio' || field.type === 'checkbox' || field.type === 'select') && field.validation_error !== undefined ? /^(?=.*1).{1}$/g : field.validation_regex,
                validated: false,
                type: field.type
            }
        })};
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event){
        const props_fields = this.props.fields;
        const state_fields = this.state.state_fields;
        const self = this;
        let not_validated_count = 0;
        let serialize_fields = [];
        let fields_same_name = [];
        state_fields.map(function(f, i){
            const field = self.getValidatedfield(f);
            if(field.validated)
                serialize_fields.push({name: f.name, value: f.value});
            else
                not_validated_count++;

            if(!fields_same_name.hasOwnProperty(f.name))
                fields_same_name[f.name] = [];
            fields_same_name[f.name].push({inx: i, validated: field.validated});

            return field;
        });

        for(var i in fields_same_name){
            if(fields_same_name[i].length > 1){
                let field = fields_same_name[i];
                var validated_result = field.map(function(a) {return a.validated;});
                var is_valid_group = validated_result.indexOf(true)!==-1;
                if(is_valid_group){
                    not_validated_count -= field.length - 1;
                    for(var j=0; j<field.length; j++){
                        state_fields[field[j].inx].className = state_fields[field[j].inx].className.replace('notvalidated','');
                        state_fields[field[j].inx].classNameError = state_fields[field[j].inx].classNameError.replace('active','');
                    }
                }
                else {
                    for(var j=0; j<field.length; j++){
                        if(j<(field.length-1)){
                            state_fields[field[j].inx].className = state_fields[field[j].inx].className.replace('notvalidated','');
                            state_fields[field[j].inx].classNameError = state_fields[field[j].inx].classNameError.replace('active','');
                        }

                    }
                }
            }
        }

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

    getValidatedfield(field) {
        if(field.validation_regex === undefined){
            field.validated = true;
            return field;
        }
        let classN = field.className.split(' ');
        let classNError = field.classNameError.split(' ');
        const regex = new RegExp(field.validation_regex);
        const validated = regex.test(field.type === 'radio' || field.type === 'checkbox' || field.type === 'select'? field.isChecked : field.value);

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
        let target_field_id = event.target.id;
        let state_fields = this.state.state_fields;
        if(!this.refs.hasOwnProperty(target_field_id))
            return;
        const targt_field = this.refs[target_field_id];

        //this field has validation so DO it
        let self = this;
        state_fields.map(function(f, i){
            if(f.id === target_field_id){
                f.isChecked = f.isChecked === '0' ? '1' : (f.type==='select' ? '1': '0');  // reverse choice for radio and checkbox fields each time change the fields, but for select just once
                f.value = value;
                return self.getValidatedfield(f);
            }else if(f.type==='radio' && f.name === targt_field.props.name){
                //group with same name radio input fields
                if(f.isChecked === '1')
                    f.isChecked = '0';
                f.className = f.className.replace('notvalidated','');
                f.classNameError = f.classNameError.replace('active','');
                return f;
            }
        });
        this.setState({state_fields : state_fields});
    }

    FromfieldsBuild(){
        const self = this;
        let fields = [];
        let group_names = [];
        fields = self.props.fields.map(function(field, i){
            if(field.groupname !== undefined && group_names.indexOf(field.groupname)===-1){
                group_names.push(field.groupname);
            }
            if (field.type === 'textarea')
                return <Textarea key={field.id} id={field.id} name={self.state.state_fields[i].name} 
                                    onChange={self.onChange} ref={field.id}
                                    validation_regex={self.state.state_fields[i].validation_regex}
                                    className={self.state.state_fields[i].className}
                                    classNameError={self.state.state_fields[i].classNameError}
                                    errorValidation={field.validation_error}
                                    ref={field.id}
                                    value={self.state.state_fields[i].value}
                                    groupname={field.groupname}
                        />
           else if (field.type === 'select')
                return <Select  key={field.id} id={field.id} name={self.state.state_fields[i].name}
                                onChange={self.onChange} ref={field.id}
                                validation_regex={self.state.state_fields[i].validation_regex}
                                className={self.state.state_fields[i].className}
                                classNameError={self.state.state_fields[i].classNameError}
                                errorValidation={field.validation_error}
                                ref={field.id}
                                value={self.state.state_fields[i].value}
                                options={field.options}
                                groupname={field.groupname}
                                isChecked={self.state.state_fields[i].isChecked}
                        />
            else  
                return <Input key={field.id} id={field.id} type={field.type} name={self.state.state_fields[i].name} placeholder={field.placeholder}
                                label={field.hasOwnProperty('label')?field.label:''}
                                validation_regex={self.state.state_fields[i].validation_regex}
                                onChange={self.onChange}
                                isChecked={self.state.state_fields[i].isChecked}
                                className={self.state.state_fields[i].className}
                                classNameError={self.state.state_fields[i].classNameError}
                                errorValidation={field.validation_error}
                                ref={field.id}
                                value={self.state.state_fields[i].value}
                                groupname={field.groupname}
                        />
        });
        //if there are any grouped fields wrap them in proper div
        for(var i in group_names){
            let group_fields = [];
            let idx = -1;
            for(var j in fields){
                if(fields[j].props.groupname === group_names[i]){
                  group_fields.push(fields[j]);
                  idx = j;
                  fields[j] = null;
                }
            }
            if(group_fields.length && idx >= 0){
                fields[idx] = (<Group key={'form_group'+group_names[i]} id={'form_group'+group_names[i]} className={'form_group '+group_names[i]} fields={group_fields}/>);
            }
        }

        return fields;
    }

    render(){
        const fields = this.FromfieldsBuild();
        return(
           <form action={this.props.action} method={this.props.method} onSubmit={this.onSubmit}>
                {fields}
           </form>
        )
    }
}

class Group extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={this.props.className} id={this.props.id}>
                {this.props.fields}
            </div>
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
                {this.props.errorValidation !== undefined && (<div className={this.props.classNameError}>{this.props.errorValidation}</div>)}
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
                {this.props.errorValidation !== undefined && (<div className={this.props.classNameError}>{this.props.errorValidation}</div>)}
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
                checked={this.props.isChecked==='1'?true:false}/>
                {this.props.label !== '' && (<label for={this.props.id}>{this.props.label}</label>)}
                {this.props.errorValidation !== undefined && (<div className={this.props.classNameError}>{this.props.errorValidation}</div>)}
            </div>
        )
    }
}