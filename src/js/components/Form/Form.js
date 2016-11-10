import React from "react";

require('../../../css/form.css');

export default class Form extends React.Component{
    constructor(props){
        super(props);

        this.state = {fields_: this.props.fields.map(function(field){
            return {id: field.id, className:'forminput', classNameError: 'error_'+field.id}
        })};
        this.onChangeValidation = this.onChangeValidation.bind(this);
    }

    onChangeValidation(event) {
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
        //this field has validation so made it
        let fields = this.state.fields_;
        fields.map(function(f, i){
            if(f.id === field_id){
                let classN = f.className.split(' ');
                let classNError = f.classNameError.split(' ');    
                let pattern = new RegExp(validation_regex);
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

                fields[i].className = classN.join(' ');
                fields[i].classNameError = classNError.join(' ');
                return false;
            }
        });
        this.setState({ fields_ : fields});
    }

    FromfieldsBuild(){
        const self = this;
        return self.props.fields.map(function(input, i){
            if(input.type !== 'textarea')
                return <Input key={input.id} id={input.id} type={input.type} name={input.name} placeholder={input.placeholder}
                            label={input.hasOwnProperty('label')?input.label:''}
                            validation_regex={input.hasOwnProperty('validation_regex')?input.validation_regex:''}
                            onChange={self.onChangeValidation}
                            className={self.state.fields_[i].className}
                            classNameError={self.state.fields_[i].classNameError}
                            ref={input.id}
                        />
            else
                return <Textarea key={input.id} id={input.id} name={input.name} onChange={self.onChangeValidation} ref={input.id}
                        />
        });
    }

    render(){
        const fields = this.FromfieldsBuild();
        return(
           <form action={this.props.action} method={this.props.method}>
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
                <textarea id={this.props.id} onChange={this.props.onCh}/>
                {this.props.validation_regex !== '' && (<div className={'error_'+this.props.id}></div>)}
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
                <input id={this.props.id} type={this.props.type} name={this.props.name} onChange={this.props.onChange} className={this.props.className} placeholder={this.props.placeholder}/>
                {this.props.label !== '' && (<label for={this.props.id}>{this.props.label}</label>)}
                {this.props.validation_regex !== '' && (<div className={this.props.classNameError}></div>)}
            </div>
        )
    }
}