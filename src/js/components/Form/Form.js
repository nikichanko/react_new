import React from "react";

require('../../../css/form.css');

export default class Form extends React.Component{
    constructor(props){
        super(props);

        this.state = {state_fields: this.props.fields.map(function(field){
            return {id: field.id, className:'forminput', classNameError: 'error_input', value: field.value}
        })};
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event){
        event.preventDefault();
        const props_fields = this.props.fields;
        const state_fields = this.state.state_fields;
        let self = this;
        state_fields.map(function(f, i){
            if(validation_regex !== undefined) {
                return self.getValidatedfield(f, props_fields[i].validation_regex);
            }
        });
        this.setState({state_fields : state_fields});
    }

    getValidatedfield(field, validation_regex){
        let classN = field.className.split(' ');
        let classNError = field.classNameError.split(' ');
        let pattern = new RegExp(validation_regex);
        let value = field.value;
        let validated = pattern.test(value);
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
        field.value = value;
        return field;
    }

    onChange(event) {
        const value = event.target.value;
        let field_id = event.target.id;
        if(!this.refs.hasOwnProperty(field_id))
            return;
        let field = this.refs[field_id];
        let validation_regex = field.props.validation_regex;
        if(validation_regex === undefined) {
            // the filed has no validation so just return
            return;
        }

        //this field has validation so DO it
        let state_fields = this.state.state_fields;
        let self = this;
        state_fields.map(function(f, i){
            if(f.id === field_id){
                f.value = value;
                return self.getValidatedfield(f, validation_regex);
            }
        });
        this.setState({ state_fields : state_fields});
    }

    FromfieldsBuild(){
        const self = this;
        return self.props.fields.map(function(input, i){
            if(input.type !== 'textarea')
                return <Input key={input.id} id={input.id} type={input.type} name={input.name} placeholder={input.placeholder}
                            label={input.hasOwnProperty('label')?input.label:''}
                            validation_regex={input.hasOwnProperty('validation_regex')?input.validation_regex:''}
                            onChange={self.onChange}
                            className={self.state.state_fields[i].className}
                            classNameError={self.state.state_fields[i].classNameError}
                            errorValidation={input.validation_error}
                            ref={input.id}
                            value={self.state.state_fields[i].value}
                        />
            else
                return <Textarea key={input.id} id={input.id} name={input.name} 
                                    onChange={self.onChange} ref={input.id}
                                    validation_regex={input.hasOwnProperty('validation_regex')?input.validation_regex:''}
                                    className={self.state.state_fields[i].className}
                                    classNameError={self.state.state_fields[i].classNameError}
                                    errorValidation={input.validation_error}
                                    ref={input.id}
                                    value={self.state.state_fields[i].value}
                        />
        });
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
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange} className={this.props.className} placeholder={this.props.placeholder}/>
                {this.props.label !== '' && (<label for={this.props.id}>{this.props.label}</label>)}
                {this.props.validation_regex !== '' && (<div className={this.props.classNameError}>{this.props.errorValidation}</div>)}
            </div>
        )
    }
}