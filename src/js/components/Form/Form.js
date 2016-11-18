import React from "react";
import func from "../../globalFunctions.js";

import '../../../css/form.css';

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

    validateFields(){
        let state_fields = this.state.state_fields;
        const self = this;
        let not_validated_count = 0;
        let fields_same_name = [];
        state_fields.map(function(f, i){
            const field = self.getValidatedfield(f);
            if(!field.validated)
                not_validated_count++;

            if(!fields_same_name.hasOwnProperty(f.name))
                fields_same_name[f.name] = [];
            fields_same_name[f.name].push({inx: i, validated: field.validated});

            return field;
        });

        // for radio fileds with same name
        for(var i in fields_same_name){
            if(fields_same_name[i].length > 1){
                let field = fields_same_name[i];
                var validated_result = field.map(function(a) {return a.validated;});
                var is_valid_group = validated_result.indexOf(true)!==-1;
                if(is_valid_group)
                    not_validated_count -= field.length - 1;
                for(var j=0; j<field.length - (is_valid_group ? 0 : 1); j++){
                    var inx = field[j].inx;
                    state_fields[inx].className = state_fields[inx].className.replace('notvalidated','');
                    state_fields[inx].classNameError = state_fields[inx].classNameError.replace('active','');
                }
            }
        }

        this.setState({state_fields : state_fields});
        return not_validated_count;
    }

    onSubmit(event){
        const not_validated_count = this.validateFields();
        if(not_validated_count===0){
            if(this.props.use_xml){
                event.preventDefault();
                const self = this;
                let xml = new func.xmlhttpRequest({
                    url: self.props.action,
                    type: self.props.method,
                    params: JSON.stringify(self.state.state_fields.map(function(f,i){
                        if(f.validated)
                            return {name: f.name, value: f.value}
                    })),
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
            let state_field = self.state.state_fields[i];
            if (field.type === 'textarea')
                return <Textarea key={field.id} id={field.id} name={state_field.name} 
                                onChange={self.onChange} ref={field.id}
                                validation_regex={state_field.validation_regex}
                                className={state_field.className}
                                classNameError={state_field.classNameError}
                                errorValidation={field.validation_error}
                                ref={field.id}
                                value={state_field.value}
                                groupname={field.groupname}
                        />
           else if (field.type === 'select')
                return <Select  key={field.id} id={field.id} name={state_field.name}
                                onChange={self.onChange} ref={field.id}
                                validation_regex={state_field.validation_regex}
                                className={state_field.className}
                                classNameError={state_field.classNameError}
                                errorValidation={field.validation_error}
                                ref={field.id}
                                value={state_field.value}
                                options={field.options}
                                groupname={field.groupname}
                                isChecked={state_field.isChecked}
                        />
            else  
                return <Input key={field.id} id={field.id} type={field.type} name={state_field.name} placeholder={field.placeholder}
                                label={field.hasOwnProperty('label')?field.label:''}
                                validation_regex={state_field.validation_regex}
                                onChange={self.onChange}
                                isChecked={state_field.isChecked}
                                className={state_field.className}
                                classNameError={state_field.classNameError}
                                errorValidation={field.validation_error}
                                ref={field.id}
                                value={state_field.value}
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
           <form action={this.props.action} method={this.props.method} onSubmit={this.onSubmit} className={this.props.className}>
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