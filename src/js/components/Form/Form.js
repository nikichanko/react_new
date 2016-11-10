import React from "react";

require('../../../css/form.css');

export default class Form extends React.Component{
    constructor(props){
        super(props);

        this.state = {fields_: this.props.fields.map(function(field){
            return {id: field.id, className:''}
        })};

       this.handleValidation = this.handleValidation.bind(this);
    }

    handleValidation(event) {
        const value = event.target.value;
       // console.log(value.length)
        let field_id = event.target.id;
        if(!this.refs.hasOwnProperty(field_id))
            return;
        let field = this.refs[field_id];
        let validation_regex = field.props.validation_regex;
        if(validation_regex === undefined) {
            // the filed has no validation so just return
            return;
        }
      //  console.log(styles);
        //this field has validation so made it
        var pattern = new RegExp(validation_regex);
        if(!pattern.test(value)){
            console.log('not valid');
                    let fields = this.state.fields_;
        fields.map(function(f, i){
            if(f.id === field_id){
                fields[i].className = 'notvalidated';
            }
        });  
        
       // console.log(fields);
        this.setState({ fields_ : fields});
        }

    }

    FromfieldsBuild(){
        const self = this;
        return self.props.fields.map(function(input, i){
            if(input.type !== 'textarea')
                return <Input key={input.id} id={input.id} type={input.type} name={input.name} placeholder={input.placeholder}
                            label={input.hasOwnProperty('label')?input.label:''}
                            validation_regex={input.hasOwnProperty('validation_regex')?input.validation_regex:''}
                            onCh={self.handleValidation}
                            className={self.state.fields_[i].className}
                            ref={input.id}
                        />
            else
                return <Textarea key={input.id} id={input.id} name={input.name} onCh={self.handleValidation} ref={input.id}
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
                <input id={this.props.id} type={this.props.type} name={this.props.name} onChange={this.props.onCh} className={this.props.className} placeholder={this.props.placeholder}/>
                {this.props.label !== '' && (<label for={this.props.id}>{this.props.label}</label>)}
                {this.props.validation_regex !== '' && (<div className={'error_'+this.props.id}></div>)}
            </div>
        )
    }
}